import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./social-e2e',outputDir:'social-test-results',workers:1,timeout:40000,use:{baseURL:'http://127.0.0.1:4191',channel:'msedge',viewport:{width:1366,height:900}},webServer:[{command:'node server/social.mjs',url:'http://127.0.0.1:4190/api/health',reuseExistingServer:false},{command:'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4191 --strictPort',url:'http://127.0.0.1:4191',reuseExistingServer:false}]});

