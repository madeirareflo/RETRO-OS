import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig(({command})=>({base:command==='build'?'/RETRO-OS/':'/',server:{proxy:{'/api':{target:'http://127.0.0.1:4190',changeOrigin:false}}},plugins:[react()],test:{include:['src/**/*.test.ts']}}));

