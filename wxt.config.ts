import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  webExt: {
    disabled: true,
  },
  manifest: {
    permissions: ['storage', 'tabs', 'cookies'],
    host_permissions: ['https://x.com/*'],
    
  },
});
