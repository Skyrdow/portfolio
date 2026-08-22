<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { propagateOrbit, getSatelliteAt } from '@lib/orbital';

	const R = 6371;

	let container: HTMLDivElement | null = $state(null);
	let animId = $state(0);
	let satelliteView = $state(false);

	onMount(() => {
		if (!container) return;

		const w = container.clientWidth;
		const h = 500;

		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(45, w / h, 1, 100000);
		camera.position.set(0, 4000, 14000);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(w, h);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		const textureLoader = new THREE.TextureLoader();
		const earthTex = textureLoader.load('/earth.jpg', () => {
			const skel = document.getElementById('suchai-skeleton');
			if (skel) skel.style.display = 'none';
		});
		earthTex.colorSpace = THREE.SRGBColorSpace;

		// Earth
		const earthGeo = new THREE.SphereGeometry(R, 64, 48);
		const earthMat = new THREE.MeshBasicMaterial({ map: earthTex });
		const earth = new THREE.Mesh(earthGeo, earthMat);
		scene.add(earth);

		// Atmosphere glow
		const glowGeo = new THREE.SphereGeometry(R * 1.015, 48, 32);
		const glowMat = new THREE.ShaderMaterial({
			uniforms: { color: { value: new THREE.Color(0x4488cc) } },
			vertexShader: `
				varying vec3 vNormal;
				void main() {
					vNormal = normalize(normalMatrix * normal);
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform vec3 color;
				varying vec3 vNormal;
				void main() {
					float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
					gl_FragColor = vec4(color, intensity * 0.35);
				}
			`,
			transparent: true,
			side: THREE.FrontSide,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		});
		scene.add(new THREE.Mesh(glowGeo, glowMat));

		// ── Marker: SPEL ground station, Santiago ───────
		function lonLatToPos(lon: number, lat: number, radius: number): THREE.Vector3 {
			const phi = (90 - lat) * (Math.PI / 180);
			const theta = (lon + 180) * (Math.PI / 180);
			return new THREE.Vector3(
				-radius * Math.sin(phi) * Math.cos(theta),
				radius * Math.cos(phi),
				radius * Math.sin(phi) * Math.sin(theta)
			);
		}

		const spelPos = lonLatToPos(-70.67, -33.45, R);
		const spelDir = spelPos.clone().normalize();

		// Chilean flag from SVG
		const flagTex = textureLoader.load('/Flag_of_Chile.svg');

		// Flag group: anchored at surface, oriented radially outward
		const flagW = 240,
			flagH = 160;
		const flagGroup = new THREE.Group();
		flagGroup.position.copy(spelPos);
		// Compute orientation: +Z = outward, +Y = up along pole
		const outward = spelDir.clone().normalize();
		const arbitrary =
			Math.abs(outward.y) < 0.99 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
		const right = new THREE.Vector3().crossVectors(arbitrary, outward).normalize();
		const poleUp = new THREE.Vector3().crossVectors(outward, right).normalize();
		const rotMat = new THREE.Matrix4().makeBasis(right, poleUp, outward);
		flagGroup.quaternion.setFromRotationMatrix(rotMat);
		scene.add(flagGroup);

		// Flag mesh
		const flagMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(flagW, flagH),
			new THREE.MeshBasicMaterial({ map: flagTex, side: THREE.DoubleSide })
		);
		flagMesh.position.set(flagW / 2, 0, flagH / 2 + 40);
		flagGroup.add(flagMesh);

		// Ground dot
		const groundDot = new THREE.Mesh(
			new THREE.SphereGeometry(40, 12, 8),
			new THREE.MeshBasicMaterial({ color: 0x22cc66 })
		);
		groundDot.position.copy(spelPos.clone().add(spelDir.clone().multiplyScalar(25)));
		scene.add(groundDot);

		// ── Orbit path ───────────────────────────────────
		const orbitPts = propagateOrbit(new Date(), 360);
		const orbitCoords: number[] = [];
		for (const p of orbitPts) orbitCoords.push(p[0], p[1], p[2]);
		const orbitGeo = new THREE.BufferGeometry();
		orbitGeo.setAttribute('position', new THREE.Float32BufferAttribute(orbitCoords, 3));
		scene.add(
			new THREE.Line(
				orbitGeo,
				new THREE.LineBasicMaterial({ color: 0x00ffcc, transparent: false, opacity: 1 })
			)
		);

		// ── Satellite ────────────────────────────────────
		const satMesh = new THREE.Mesh(
			new THREE.SphereGeometry(80, 12, 8),
			new THREE.MeshBasicMaterial({ color: 0xff4400 })
		);
		scene.add(satMesh);

		const satGlow = new THREE.Mesh(
			new THREE.SphereGeometry(180, 12, 8),
			new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.2 })
		);
		scene.add(satGlow);

		// ── Footprint cone (satellite → Earth) ───────────
		const fpCone = new THREE.Mesh(
			new THREE.CylinderGeometry(1, 1, 1, 32, 1, true),
			new THREE.MeshBasicMaterial({
				color: 0xff8833,
				transparent: true,
				opacity: 0.08,
				side: THREE.DoubleSide
			})
		);
		scene.add(fpCone);

		// Footprint ring on surface
		const fpRingGeo = new THREE.BufferGeometry();
		const fpRingInit: number[] = [];
		for (let i = 0; i <= 64; i++) fpRingInit.push(0, 0, 0);
		fpRingGeo.setAttribute('position', new THREE.Float32BufferAttribute(fpRingInit, 3));
		const fpRing = new THREE.Line(
			fpRingGeo,
			new THREE.LineBasicMaterial({ color: 0xff8833, transparent: true, opacity: 0.6 })
		);
		scene.add(fpRing);

		// Mouse orbit / FPS look
		let dragging = false;
		let prev = { x: 0, y: 0 };
		let rx = 0.3;
		let ry = -1.0;
		let satLookQuat = new THREE.Quaternion();

		const down = (e: MouseEvent) => {
			dragging = true;
			prev = { x: e.clientX, y: e.clientY };
		};
		const move = (e: MouseEvent) => {
			if (!dragging) return;
			const dx = (e.clientX - prev.x) * 0.005;
			const dy = (e.clientY - prev.y) * 0.005;
			if (satelliteView) {
				const yawQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -dx);
				const pitchQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -dy);
				satLookQuat.multiply(yawQ).multiply(pitchQ);
				satLookQuat.normalize();
			} else {
				ry -= dx;
				rx = Math.max(-1.2, Math.min(1.2, rx + dy));
			}
			prev = { x: e.clientX, y: e.clientY };
		};
		const up = () => (dragging = false);

		const el = renderer.domElement;
		el.addEventListener('mousedown', down);
		window.addEventListener('mousemove', move);
		window.addEventListener('mouseup', up);

		const touchStart = (e: TouchEvent) => {
			e.preventDefault();
			const t = e.touches[0];
			dragging = true;
			prev = { x: t.clientX, y: t.clientY };
		};
		const touchMove = (e: TouchEvent) => {
			if (!dragging) return;
			e.preventDefault();
			const t = e.touches[0];
			const dx = (t.clientX - prev.x) * 0.005;
			const dy = (t.clientY - prev.y) * 0.005;
			if (satelliteView) {
				const yawQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -dx);
				const pitchQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -dy);
				satLookQuat.multiply(yawQ).multiply(pitchQ);
			} else {
				ry -= dx;
				rx = Math.max(-1.2, Math.min(1.2, rx + dy));
			}
			prev = { x: t.clientX, y: t.clientY };
		};
		const touchEnd = () => (dragging = false);

		el.addEventListener('touchstart', touchStart, { passive: false });
		window.addEventListener('touchmove', touchMove, { passive: false });
		window.addEventListener('touchend', touchEnd);

		const animate = () => {
			animId = requestAnimationFrame(animate);

			const state = getSatelliteAt(new Date());
			const satPos = new THREE.Vector3(...state.position);
			satMesh.position.copy(satPos);
			satGlow.position.copy(satPos);

			// Footprint ring
			const satDir = satPos.clone().normalize();
			const center = satDir.clone().multiplyScalar(R);
			const up = satDir.clone();
			const right = new THREE.Vector3(0, 0, 1).cross(up).normalize();
			if (right.length() < 0.01) right.set(1, 0, 0);
			const forward = up.clone().cross(right).normalize();
			const fpR = state.footprintRadius;
			const ringPos = fpRing.geometry.attributes.position;
			for (let i = 0; i <= 64; i++) {
				const a = (i / 64) * Math.PI * 2;
				const pt = center
					.clone()
					.add(right.clone().multiplyScalar(Math.cos(a) * fpR))
					.add(forward.clone().multiplyScalar(Math.sin(a) * fpR));
				const onSurf = pt.clone().normalize().multiplyScalar(R);
				ringPos.setXYZ(i, onSurf.x, onSurf.y, onSurf.z);
			}
			ringPos.needsUpdate = true;

			// Footprint cone (wide end at Earth, tip at satellite)
			const coneLen = satPos.length() - R;
			fpCone.geometry.dispose();
			fpCone.geometry = new THREE.CylinderGeometry(0, fpR, coneLen, 32, 1, true);
			fpCone.position.copy(satDir.clone().multiplyScalar(R + coneLen / 2));
			const q = new THREE.Quaternion();
			q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), satDir);
			fpCone.quaternion.copy(q);

			// Slow auto-rotate
			if (!satelliteView) ry += 0.0001;

			if (satelliteView) {
				camera.position.copy(satPos);

				const defaultLook = satPos.clone().negate().normalize();
				const defaultUp = new THREE.Vector3(0, 1, 0);
				const projUp = defaultUp
					.clone()
					.sub(defaultLook.clone().multiplyScalar(defaultUp.dot(defaultLook)));
				if (projUp.length() < 0.01) projUp.set(1, 0, 0);
				projUp.normalize();

				const lookQ = new THREE.Quaternion().setFromRotationMatrix(
					new THREE.Matrix4().lookAt(new THREE.Vector3(0, 0, 0), defaultLook, projUp)
				);
				lookQ.multiply(satLookQuat);
				camera.quaternion.copy(lookQ);
			} else {
				const dist = 20000;
				camera.position.set(
					dist * Math.sin(ry) * Math.cos(rx),
					dist * Math.sin(rx) + 3000,
					dist * Math.cos(ry) * Math.cos(rx)
				);
				camera.lookAt(0, 0, 0);
			}

			renderer.render(scene, camera);
		};
		animate();

		const onResize = () => {
			if (!container) return;
			const nw = container.clientWidth;
			camera.aspect = nw / h;
			camera.updateProjectionMatrix();
			renderer.setSize(nw, h);
		};
		window.addEventListener('resize', onResize);

		onDestroy(() => {
			cancelAnimationFrame(animId);
			el.removeEventListener('mousedown', down);
			window.removeEventListener('mousemove', move);
			window.removeEventListener('mouseup', up);
			el.removeEventListener('touchstart', touchStart);
			window.removeEventListener('touchmove', touchMove);
			window.removeEventListener('touchend', touchEnd);
			window.removeEventListener('resize', onResize);
			renderer.dispose();
			if (container && renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement);
			}
		});
	});
</script>

<div class="space-y-3">
	<div bind:this={container} class="neob-border overflow-hidden" style="cursor: grab;"></div>
	<div class="flex justify-end">
		<button
			class="neob-clickable px-3 py-1 text-xs font-bold {satelliteView
				? 'bg-orange-200'
				: 'bg-neutral-100'}"
			onclick={() => {
				satelliteView = !satelliteView;
				if (satelliteView) satLookQuat.identity();
			}}
		>
			{satelliteView ? 'Vista orbital' : 'Vista satélite'}
		</button>
	</div>
</div>
