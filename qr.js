import { createSVGElement } from '@aegisjsproject/qr-encoder/index.min.js';
/* global document location */
document.body.append(createSVGElement(location.href, { fill: '#0f0' }));
