<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSatelliteAt, propagateOrbit } from '@lib/orbital';
	import { CONTINENTS } from '@lib/continents';

	let canvas: HTMLCanvasElement | null = $state(null);
	let animId = $state(0);

	onMount(() => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const W = 800;
		const H = 400;
		canvas.width = W;
		canvas.height = H;

		function lonLatToXY(lon: number, lat: number): [number, number] {
			const x = ((lon + 180) / 360) * W;
			const y = ((90 - lat) / 180) * H;
			return [x, y];
		}

		function drawCoastlines() {
			ctx!.strokeStyle = '#44cc88';
			ctx!.lineWidth = 1;
			for (const continent of CONTINENTS) {
				ctx!.beginPath();
				for (let i = 0; i < continent.length; i++) {
					const [x, y] = lonLatToXY(continent[i][0], continent[i][1]);
					if (i === 0) ctx!.moveTo(x, y);
					else ctx!.lineTo(x, y);
				}
				ctx!.stroke();
			}
		}

		function drawGrid() {
			ctx!.strokeStyle = 'rgba(50, 100, 150, 0.2)';
			ctx!.lineWidth = 0.5;
			// Meridians every 30°
			for (let lon = -180; lon <= 180; lon += 30) {
				const [x] = lonLatToXY(lon, 0);
				ctx!.beginPath();
				ctx!.moveTo(x, 0);
				ctx!.lineTo(x, H);
				ctx!.stroke();
			}
			// Parallels every 30°
			for (let lat = -60; lat <= 60; lat += 30) {
				const [, y] = lonLatToXY(0, lat);
				ctx!.beginPath();
				ctx!.moveTo(0, y);
				ctx!.lineTo(W, y);
				ctx!.stroke();
			}
		}

		const animate = () => {
			animId = requestAnimationFrame(animate);

			ctx!.fillStyle = '#0c2d48';
			ctx!.fillRect(0, 0, W, H);

			drawGrid();
			drawCoastlines();

			const now = new Date();

			// Orbit ground track
			const orbitPts = propagateOrbit(now, 360);
			ctx!.strokeStyle = 'rgba(255, 136, 51, 0.5)';
			ctx!.lineWidth = 1.5;
			ctx!.beginPath();
			let started = false;
			for (const p of orbitPts) {
				const state = getSatelliteAt(
					new Date(now.getTime() + orbitPts.indexOf(p) * (86400 / 14.90755086 / 360) * 1000)
				);
				const [x, y] = lonLatToXY(state.lon, state.lat);
				if (!started) {
					ctx!.moveTo(x, y);
					started = true;
				} else {
					ctx!.lineTo(x, y);
				}
			}
			ctx!.stroke();

			// Satellite position
			const state = getSatelliteAt(now);
			const [sx, sy] = lonLatToXY(state.lon, state.lat);

			// Footprint circle
			const fpDeg = state.footprintRadius / 111.32; // approx km → degrees
			ctx!.strokeStyle = 'rgba(255, 136, 51, 0.4)';
			ctx!.lineWidth = 1;
			ctx!.beginPath();
			ctx!.ellipse(sx, sy, (fpDeg / 360) * W, (fpDeg / 180) * H, 0, 0, Math.PI * 2);
			ctx!.stroke();

			// Satellite dot
			ctx!.fillStyle = '#ff4400';
			ctx!.beginPath();
			ctx!.arc(sx, sy, 5, 0, Math.PI * 2);
			ctx!.fill();

			// Glow
			ctx!.fillStyle = 'rgba(255, 102, 0, 0.3)';
			ctx!.beginPath();
			ctx!.arc(sx, sy, 12, 0, Math.PI * 2);
			ctx!.fill();
		};
		animate();

		onDestroy(() => cancelAnimationFrame(animId));
	});
</script>

<div class="neob-border overflow-hidden">
	<canvas bind:this={canvas} class="block w-full"></canvas>
</div>
