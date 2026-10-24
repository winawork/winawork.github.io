"""Verify file:// and subdirectory hosting references without installing packages."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = sorted(p for p in ROOT.glob('*.html') if not p.name.startswith('._'))
errors = []

class References(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in ('src', 'href', 'action', 'poster') and value:
                check(value, self.path)
            if key.startswith(('th:', 'layout:')):
                errors.append(f'{self.path.relative_to(ROOT)}: template attribute {key}')

def check(url, path):
    if '{{' in url:
        return
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return
    if url.startswith('/'):
        errors.append(f'{path.relative_to(ROOT)}: root path {url}')
    target = path.parent / unquote(parsed.path)
    if not target.is_file():
        errors.append(f'{path.relative_to(ROOT)}: missing {url}')

PAGES = [p for p in PAGES if not p.name.startswith('._')]
for page in PAGES:
    parser = References()
    parser.path = page
    parser.feed(page.read_text())
for css in (ROOT / 'css').glob('*.css'):
    if css.name.startswith('._'):
        continue
    source = re.sub(r'/\*.*?\*/', '', css.read_text(), flags=re.S)
    for url in re.findall(r'url\(\s*([^)]*?)\s*\)', source):
        check(url.strip('\'"'), css)
print(f'Checked {len(PAGES)} HTML pages and all CSS asset references.')
for error in sorted(set(errors)):
    print(error)
raise SystemExit(bool(errors))
