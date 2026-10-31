import {createContext} from 'react';
import type {Theme} from './contracts';
/** Presentation only: no persistence migration or game engine coupling. */
export const SystemThemeContext=createContext<Theme>('mix');
