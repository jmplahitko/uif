import { detect } from 'detect-browser';
import { Platform } from '.';

export default function getPlatform(): Platform {
	const description = detect();

	return {
		name: (description?.type === 'bot' || description?.type === 'react-native')
			? null
			: description?.name ?? null,
		type: description?.type === 'node'
			? 'server'
			: description?.type ?? null,
		version: description?.version ?? null,
		os: description?.os ?? null
	};
}
