
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
        manifest: 
         {name:"Interval Timer",
          short_name:"Interval Timer",
          icons:[
            {"src":"/android-chrome-192x192.png",
            "sizes":"192x192","type":"image/png"},
            {"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],
            theme_color:"#ffffff",background_color:"#ffffff",display:"standalone"
  
      },
    }),
  ],
});
