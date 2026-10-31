import {privateGamesPlugin} from './scripts/private-games-server.mjs';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig(({command,isPreview})=>({base:command==='build'||isPreview?'/RETRO-OS/':'/',plugins:[react(),privateGamesPlugin()],test:{include:['src/**/*.test.ts','src/**/*.test.mjs']}}));

