from pathlib import Path

path = Path('css/experience-upgrade.css')
css = path.read_text()

old = '''  .nav-shop-flyout, .nav-rooms-flyout {
    position: static;
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 0;
    padding: 4px 0 18px;
    border: 0;
    border-bottom: 1px solid var(--hairline);
    background: transparent;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: none;
  }
'''
new = '''  .nav-shop-flyout, .nav-rooms-flyout {
    position: static;
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 0;
    padding: 4px 0 18px;
    border: 0;
    border-bottom: 1px solid var(--hairline);
    background: transparent;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: none !important;
  }
'''
if old not in css:
    raise SystemExit('mobile discovery flyout owner block not found')
css = css.replace(old, new, 1)

# Five room choices form an intentionally asymmetric set. Let the final item
# finish the desktop grid rather than leaving a visually accidental blank cell.
anchor = '.nav-rooms-flyout { width: min(390px, calc(100vw - 32px)); }\n'
addition = '.nav-rooms-flyout > a:last-child:nth-of-type(odd) { grid-column: 1 / -1; }\n'
if addition not in css:
    if anchor not in css:
        raise SystemExit('rooms flyout width rule not found')
    css = css.replace(anchor, anchor + addition, 1)

# On mobile restore the natural two-column rhythm for the five-item room set.
mobile_anchor = '  .nav-shop-flyout::before, .nav-rooms-flyout::before { display: none; }\n'
mobile_addition = '  .nav-rooms-flyout > a:last-child:nth-of-type(odd) { grid-column: auto; }\n'
if mobile_addition not in css:
    if mobile_anchor not in css:
        raise SystemExit('mobile pseudo-header rule not found')
    css = css.replace(mobile_anchor, mobile_anchor + mobile_addition, 1)

path.write_text(css)
print('Rendered mobile navigation remediation applied.')
