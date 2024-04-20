import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const altitudeAtom = atom(0);
export const darkModeAtom = atomWithStorage('darkMode', false);
