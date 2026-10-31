import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig(({command})=>({base:command==='build'?'/RETRO-OS/':'/',plugins:[react()],test:{include:['src/**/*.test.ts']}}));
