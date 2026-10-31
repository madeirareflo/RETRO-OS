import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig(({command})=>({base:command==='build'?'/RETRO-OS/':'/',server:{proxy:{'/api':'http://127.0.0.1:4190'}},plugins:[react()],test:{include:['src/**/*.test.ts']}}));
