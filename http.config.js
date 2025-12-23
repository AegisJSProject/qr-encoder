import { imports } from '@shgysk8zer0/importmap';
import { addScriptSrc, addTrustedTypePolicy, useDefaultCSP } from '@aegisjsproject/http-utils/csp.js';

addScriptSrc(
	imports['@shgysk8zer0/polyfills'],
	imports.qr,
);
addTrustedTypePolicy('aegis-sanitizer#html');

export default {
	routes: {
		'/': '@aegisjsproject/dev-server',
		'/favicon.svg': '@aegisjsproject/dev-server/favicon',
	},
	open: true,
	responsePostprocessors: [useDefaultCSP()],
};
