'use client';
import {Provider} from 'jotai';
import {ReactNode, useEffect} from 'react';
import {useAtom} from 'jotai/index';
import {darkModeAtom} from '@/store';

export function Providers({children}: { children: ReactNode }) {
	const [darkMode, setDarkMode] = useAtom(darkModeAtom);
	useEffect(() => {
		darkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
	}, [darkMode]);

	return (
		<Provider>{children}</Provider>
	);
}