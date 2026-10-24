from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re
ROOT=Path(__file__).resolve().parents[1]
errors=[]
count=0

def check(source,value):
 global count
 url=urlsplit(value)
 if url.scheme or url.netloc or not url.path: return
 count+=1
 if url.path.startswith('/') or not (source.parent/unquote(url.path)).is_file():
  errors.append(str(source.relative_to(ROOT))+': '+value)
class Parser(HTMLParser):
 def handle_starttag(self,tag,attrs):
  for k,v in attrs:
   if k in ('href','src','poster','action') and v: check(self.source,v)
for source in ROOT.glob('*.html'):
 if source.name.startswith('._'): continue
 p=Parser();p.source=source;p.feed(source.read_text())
for source in (ROOT/'css').glob('*.css'):
 text=re.sub(r'/\*.*?\*/','',source.read_text(),flags=re.S)
 for value in re.findall(r'url\(\s*([^)]*?)\s*\)',text): check(source,value.strip("\"'"))
print(f'Checked {count} local references')
for error in sorted(set(errors)): print(error)
raise SystemExit(bool(errors))
