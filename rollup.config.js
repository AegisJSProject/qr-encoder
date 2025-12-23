import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default [{
	input: 'index.js',
	external: ['qr'],
	output: [{
		file: 'index.cjs',
		format: 'cjs',
	}],
}, {
	input: 'index.js',
	plugins: [resolve()],
	output: [{
		file: 'index.min.js',
		format: 'module',
		plugins: [terser()],
		sourcemap: true,
	}],
}];
