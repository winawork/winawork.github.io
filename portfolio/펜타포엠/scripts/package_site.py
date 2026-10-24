"""Create a static-only deployment directory. Never includes Java/configuration files."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'dist'
OUTPUT.mkdir(exist_ok=True)
ignore = shutil.ignore_patterns('.DS_Store', '._*')
for folder in ('css', 'js', 'images', 'fonts'):
    shutil.copytree(ROOT / folder, OUTPUT / folder, dirs_exist_ok=True, ignore=ignore)
for name in [p.name for p in ROOT.glob('*.html') if not p.name.startswith('._')] + ['.nojekyll']:
    shutil.copy2(ROOT / name, OUTPUT / name)
print('Static deployment directory: dist/')
