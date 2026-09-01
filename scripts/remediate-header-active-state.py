from pathlib import Path

path = Path('css/experience-upgrade.css')
css = path.read_text()
anchor = '''  .topbar.menu-open .nav-discovery-flyout a:hover,
  .topbar.menu-open .nav-discovery-flyout a:focus-visible { background: var(--surface); color: var(--ink) !important; }
'''
addition = '''  .topbar.menu-open .nav-discovery > a.active {
    position: relative;
    font-weight: 700;
  }
  .topbar.menu-open .nav-discovery > a.active::after {
    content: "";
    position: absolute;
    display: block !important;
    left: 0;
    right: auto;
    bottom: 8px;
    width: 24px;
    height: 1px;
    background: var(--ink);
    transform: none;
  }
'''
if addition not in css:
    if anchor not in css:
        raise SystemExit('mobile discovery interaction anchor not found')
    css = css.replace(anchor, anchor + addition, 1)
path.write_text(css)
print('Mobile discovery active state remediation applied.')
