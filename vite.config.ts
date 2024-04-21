import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	server: {
		proxy: {
			'/api': 'http://localhost:3000/',
			'/healthcheck': 'http://localhost:3000/',
			'/socket.io': {
				target: 'http://localhost:3000/',
				ws: true,
			},
		}
	},
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
