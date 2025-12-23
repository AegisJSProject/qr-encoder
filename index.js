import encodeQR from 'qr';
const namespace = 'http://www.w3.org/2000/svg';

const SANITIZER = {
	allowElements: [
		{ name: 'svg', namespace },
		{ name: 'path', namespace },
		{ name: 'rect', namespace }],
	allowAttributes: {
		'viewBox': ['svg'],
		'xmlns': ['svg'],
		'd': ['path'],
		'fill': ['svg', 'rect'],
		'x': ['rect'],
		'y': ['rect'],
		'width': ['*'],
		'height': ['*'],
	}
};
const ECC = 'medium';
const BORDER = 4;
const SCALE = 4;
const GIF = 'gif';
const SVG = 'svg';
const FILL = '#000';
const BACKGROUND = '#fff';
const SIZE = 480;

const attr = str => {
	return String(str ?? '').replace(/[&<>"']/g, (char) => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&#39;'
	}[char]));
};

export function createGIF(input, {
	ecc = ECC,
	border = BORDER,
	scale = SCALE,
} = {}) {
	return encodeQR(input, GIF, { ecc, border, scale });
}

export const createGIFBlob = (input, {
	ecc = ECC,
	border = BORDER,
	scale = SCALE,
} = {}) => new Blob([createGIF(input, { ecc, border, scale })], { type: 'image/gif' });

export const createGIFFile = (input, name = 'qr.gif', {
	ecc = ECC,
	border = BORDER,
	scale = SCALE,
} = {}) => new File([createGIF(input, { ecc, border, scale })], name, { type: 'image/gif' });

export function createSVGString(input, {
	ecc = ECC,
	border = BORDER,
	scale = SCALE,
	size = SIZE,
	fill = FILL,
	background = BACKGROUND
} = {}) {
	const s = attr(size);

	return encodeQR(input, SVG, { ecc, border, scale })
		.replace('<svg ', `<svg fill="${attr(fill)}" height="${s}" width="${s}" `)
		.replace(/(<svg[^>]*>)/i, `$1\n\t<rect x="0" y="0" fill="${attr(background)}" height="100%" width="100%" />\n`);
}

export const createSVGBlob = (input, {
	ecc = ECC,
	border = BORDER,
	scale = SCALE,
	fill = FILL,
	background = BACKGROUND,
	size = SIZE,
} = {}) => new Blob([createSVGString(input, { ecc, border, scale, fill, background, size })], { type: 'image/svg+xml' });

export const createSVGFile = (input, name = 'qr.svg', {
	ecc = ECC,
	border = BORDER,
	scale = SCALE,
	fill = FILL,
	background = BACKGROUND,
	size = SIZE,
} = {}) => new File([createSVGString(input, { ecc, border, scale, fill, background, size })], name, { type: 'image/svg+xml' });

export function createSVGElement(input, {
	ecc = ECC,
	border = BORDER,
	scale = SCALE,
	fill = FILL,
	background = BACKGROUND,
	size = SIZE,
} = {}) {
	// eslint-disable-next-line no-undef
	const el = document.createElement('div');
	el.setHTML(
		createSVGString(input, { ecc, border, scale, fill, background, size }),
		{ sanitizer: SANITIZER }
	);
	return el.firstElementChild;
}
