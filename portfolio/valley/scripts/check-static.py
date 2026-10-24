#!/usr/bin/env python3
"""Check local HTML/CSS references without third-party dependencies."""
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
errors = []
checked = 0

def check(source, value):
    global checked
    url = urlsplit(value.strip())
    if url.scheme or url.netloc or not url.path:
        return
    checked += 1
    if url.path.startswith('/'):
        errors.append(f'{source.relative_to(ROOT)}: root-relative path {value}')
    elif not (source.parent / unquote(url.path)).is_file():
        errors.append(f'{source.relative_to(ROOT)}: missing {value}')

class References(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ('href', 'src', 'poster') and value:
                check(self.source, value)
            if name == 'style' and value:
                css(self.source, value)

def css(source, text):
    for value in re.findall(r'url\(\s*[\'"]?([^\)\'"\s]+)', text):
        check(source, value)

for source in ROOT.rglob('*'):
    if not source.is_file() or source.name.startswith('._'):
        continue
    if source.suffix == '.html':
        parser = References()
        parser.source = source
        parser.feed(source.read_text())
    elif source.suffix == '.css':
        css(source, source.read_text())
if errors:
    print('\n'.join(errors))
    raise SystemExit(1)
print(f'PASS: {checked} local references; {len([p for p in ROOT.glob("*.html") if not p.name.startswith("._")])} HTML entries.')
