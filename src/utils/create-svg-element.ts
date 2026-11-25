export function createSvgElement(markup: string): SVGElement {
  const svg = new DOMParser()
    .parseFromString(markup, 'image/svg+xml')
    .querySelector('svg');

  if (!(svg instanceof SVGSVGElement)) {
    throw new Error('SVG markup does not contain an <svg> element');
  }

  const icon = document.importNode(svg, true);
  icon.setAttribute('aria-hidden', 'true');
  icon.setAttribute('focusable', 'false');
  return icon;
}
