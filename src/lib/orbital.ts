import * as satellite from 'satellite.js';

const R_EARTH = 6371;

export interface SatelliteState {
	position: [number, number, number]; // Three.js scene coords
	altitude: number;
	footprintRadius: number;
	lat: number;
	lon: number;
}

const satrec = satellite.twoline2satrec(
	'1 69911U 26156AU  26229.21992664  .00000797  00000-0  86752-4 0  9991',
	'2 69911  97.7496 128.9351 0002686  35.5298 324.6099 14.90755086  6096'
);

// ECEF (satellite.js) → Three.js: swap Y/Z and negate ECEF Y for handedness
function toThree(ecef: { x: number; y: number; z: number }): [number, number, number] {
	return [ecef.x, ecef.z, -ecef.y];
}

export function getSatelliteAt(date: Date): SatelliteState {
	const pv = satellite.propagate(satrec, date);

	if (typeof pv === 'boolean' || !pv.position) {
		return { position: [0, 0, 0], altitude: 0, footprintRadius: 0, lat: 0, lon: 0 };
	}

	const gmst = satellite.gstime(date);
	const geo = satellite.eciToGeodetic(pv.position, gmst);

	const alt = geo.height;
	const lat = (geo.latitude * 180) / Math.PI;
	const lon = (geo.longitude * 180) / Math.PI;

	// Convert ECI → ECEF (rotate by GMST) → Three.js
	const cosG = Math.cos(gmst);
	const sinG = Math.sin(gmst);
	const ecefX = cosG * pv.position.x + sinG * pv.position.y;
	const ecefY = -sinG * pv.position.x + cosG * pv.position.y;
	const ecefZ = pv.position.z;

	const threePos = toThree({ x: ecefX, y: ecefY, z: ecefZ });

	const r = Math.sqrt(threePos[0] ** 2 + threePos[1] ** 2 + threePos[2] ** 2);
	const footprint = R_EARTH * Math.acos(Math.min(1, R_EARTH / r));

	return {
		position: threePos,
		altitude: alt,
		footprintRadius: footprint,
		lat,
		lon
	};
}

export function propagateOrbit(date: Date, points = 360): [number, number, number][] {
	const period = 86400 / 14.90755086;
	const step = period / points;

	const coords: [number, number, number][] = [];
	for (let i = 0; i <= points; i++) {
		const t = new Date(date.getTime() + i * step * 1000);
		const state = getSatelliteAt(t);
		if (state.altitude > 0) {
			coords.push(state.position);
		}
	}
	return coords;
}
