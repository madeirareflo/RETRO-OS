import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig(({command,isPreview})=>({base:command==='build'||isPreview?'/RETRO-OS/':'/',plugins:[react()],test:{include:['src/**/*.test.ts']}}));

