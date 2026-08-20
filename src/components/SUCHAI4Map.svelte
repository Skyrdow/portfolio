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

		// Load earth texture
		const earthImg = new Image();
		earthImg.src = '/earth-topology.png';
		let earthReady = false;
		earthImg.onload = () => {
			earthReady = true;
		};

		function lonLatToXY(lon: number, lat: number): [number, number] {
			const x = ((lon + 180) / 360) * W;
			const y = ((90 - lat) / 180) * H;
			return [x, y];
		}

		function drawGrid() {
			ctx!.strokeStyle = 'rgba(255, 255, 255, 0.08)';
			ctx!.lineWidth = 0.5;
			for (let lon = -180; lon <= 180; lon += 30) {
				const [x] = lonLatToXY(lon, 0);
				ctx!.beginPath();
				ctx!.moveTo(x, 0);
				ctx!.lineTo(x, H);
				ctx!.stroke();
			}
			for (let lat = -60; lat <= 60; lat += 30) {
				const [, y] = lonLatToXY(0, lat);
				ctx!.beginPath();
				ctx!.moveTo(0, y);
				ctx!.lineTo(W, y);
				ctx!.stroke();
			}
		}

		function drawCoastlines() {
			ctx!.strokeStyle = 'rgba(100, 255, 180, 0.4)';
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

		const animate = () => {
			animId = requestAnimationFrame(animate);

			// Background: earth texture or fallback
			if (earthReady) {
				ctx!.drawImage(earthImg, 0, 0, W, H);
			} else {
				ctx!.fillStyle = '#0a1628';
				ctx!.fillRect(0, 0, W, H);
			}

			drawGrid();
			drawCoastlines();

			const now = new Date();

			// Orbit ground track
			const orbitPts = propagateOrbit(now, 360);
			ctx!.strokeStyle = 'rgba(255, 136, 51, 0.6)';
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
			const fpDeg = state.footprintRadius / 111.32;
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
