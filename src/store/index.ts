import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const altitudeAtom = atom(0);
export const wingspanAtom = atom(0);
export const wingAreaAtom = atom(0);
export const cdAtom = atom(0);
export const clAtom = atom(0);
export const chordAtom = atom(0);
export const velocityAtom = atom(0);
export const densityAtom = atom(0);
export const darkModeAtom = atomWithStorage('darkMode', false);
