from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re
ROOT=Path(__file__).resolve().parents[1]
errors=[]; count=0

def check(source,value,kind='path'):
 global count
 parts=urlsplit(value.strip())
 if parts.scheme or parts.netloc or not parts.path: return
 count+=1
 target=source.parent/unquote(parts.path)
 if parts.path.startswith('/') or not target.is_file(): errors.append(f'{source.name}: invalid {value}')
 if kind=='src' and parts.path.endswith('.html'): errors.append(f'{source.name}: HTML used as media {value}')
class Parser(HTMLParser):
 def handle_starttag(self,tag,attrs):
  for key,val in attrs:
   if key in ('src','href','action','poster') and val: check(self.path,val,key)
   if key.startswith(('c:','spring:','tiles:')) or key.startswith('on'): errors.append(f'{self.path.name}: server/inline event attribute {key}')
   if key=='style' and val: css(self.path,val)
  if ':' in tag: errors.append(f'{self.path.name}: unconverted {tag}')
def css(source,text):
 for value in re.findall(r'url\(\s*([^)]*?)\s*\)',text): check(source,value.strip('\'"'))
for source in ROOT.glob('*.html'):
 text=source.read_text()
 if any(token in text for token in ('<%','${','/resources/','.gp"')): errors.append(source.name+': JSP/server path remains')
 p=Parser();p.path=source;p.feed(text)
for source in (ROOT/'css').glob('*.css'):
 css(source,re.sub(r'/\*.*?\*/','',source.read_text(),flags=re.S))
for source in (ROOT/'fonts').glob('*'):
 if source.suffix=='.woff' and source.read_bytes()[:4]!=b'wOFF': errors.append('Invalid font '+source.name)
print(f'Checked {len(list(ROOT.glob("*.html")))} HTML pages and {count} local references')
for error in sorted(set(errors)):print(error)
raise SystemExit(bool(errors))
