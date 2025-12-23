import { test, describe } from 'node:test';
import assert from 'node:assert';
import { createSVGBlob, createSVGFile, createGIFFile, createGIFBlob } from './index.js';
const signal = AbortSignal.timeout(300);
const input = 'https://github.com/AegisJSProject/qr-encoder';

describe('Test generating QR codes', () => {
	test('Test generating SVG Blobs', { signal }, () => {
		const result = createSVGBlob(input);
		assert.ok(result instanceof Blob, 'Should output a `Blob`.');
		assert.equal(result?.type, 'image/svg+xml', 'Should have an SVG type.');
		assert.notEqual(result?.size, 0, 'Should not be empty.');
	});
	test('Test generating SVG Files', { signal }, () => {
		const result = createSVGFile(input);
		assert.ok(result instanceof File, 'Should output a `Blob`.');
		assert.equal(result?.type, 'image/svg+xml', 'Should have an SVG type.');
		assert.notEqual(result?.size, 0, 'Should not be empty.');
		assert.ok(result?.name?.endsWith('.svg'), 'SVG files should have the `.svg` extension.');
	});
	test('Test generating GIF Blobs', { signal }, () => {
		const result = createGIFBlob(input);
		assert.ok(result instanceof Blob, 'Should output a `Blob`.');
		assert.equal(result?.type, 'image/gif', 'Should have an SVG type.');
		assert.notEqual(result?.size, 0, 'Should not be empty.');
	});
	test('Test generating GIF Files', { signal }, () => {
		const result = createGIFFile(input);
		assert.ok(result instanceof File, 'Should output a `Blob`.');
		assert.equal(result?.type, 'image/gif', 'Should have an GIF type.');
		assert.notEqual(result?.size, 0, 'Should not be empty.');
		assert.ok(result?.name?.endsWith('.gif'), 'SVG files should have the `.gif` extension.');
	});
});
