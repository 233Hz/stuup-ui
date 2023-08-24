// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/Work/Project/stuup-ui/node_modules/.pnpm/vite@4.4.7_@types+node@20.4.5_sass@1.64.1/node_modules/vite/dist/node/index.js";
import path from "path";
import { createSvgIconsPlugin } from "file:///D:/Work/Project/stuup-ui/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-svg-icons@2.0.1_vite@4.4.7/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///D:/Work/Project/stuup-ui/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-mock@2.9.8_mockjs@1.1.0_vite@4.4.7/node_modules/vite-plugin-mock/dist/index.js";
import vue from "file:///D:/Work/Project/stuup-ui/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.7_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import unocss from "file:///D:/Work/Project/stuup-ui/node_modules/.pnpm/unocss@0.53.6_postcss@8.4.27_vite@4.4.7/node_modules/unocss/dist/vite.mjs";
import vueJsx from "file:///D:/Work/Project/stuup-ui/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.4.7_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueSetupExtend from "file:///D:/Work/Project/stuup-ui/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-vue-setup-extend@0.4.0_vite@4.4.7/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        localEnabled: command === "serve"
      }),
      unocss(),
      vueSetupExtend()
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
        // 相对路径别名配置，使用 @ 代替 src
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:math";@import "./src/styles/bem.scss";`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: env.VITE_PROP,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXFByb2plY3RcXFxcc3R1dXAtdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcUHJvamVjdFxcXFxzdHV1cC11aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9Qcm9qZWN0L3N0dXVwLXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBDb25maWdFbnYsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB2dWVTZXR1cEV4dGVuZCBmcm9tICd2aXRlLXBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogZW52LlZJVEVfUFVCTElDX1BBVEgsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxyXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxyXG4gICAgICB9KSxcclxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XHJcbiAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnLFxyXG4gICAgICB9KSxcclxuICAgICAgdW5vY3NzKCksXHJcbiAgICAgIHZ1ZVNldHVwRXh0ZW5kKCksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKCcuL3NyYycpLCAvLyBcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdTUyMkJcdTU0MERcdTkxNERcdTdGNkVcdUZGMENcdTRGN0ZcdTc1MjggQCBcdTRFRTNcdTY2RkYgc3JjXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJzYXNzOm1hdGhcIjtAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL2JlbS5zY3NzXCI7YCxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIHBvcnQ6IGVudi5WSVRFX1BST1AsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgW2Vudi5WSVRFX0FQUF9CQVNFX0FQSV06IHtcclxuICAgICAgICAgIC8vXHU4M0I3XHU1M0Q2XHU2NTcwXHU2MzZFXHU3Njg0XHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXHU4QkJFXHU3RjZFXHJcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX1NFUlZFLFxyXG4gICAgICAgICAgLy9cdTk3MDBcdTg5ODFcdTRFRTNcdTc0MDZcdThERThcdTU3REZcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIC8vXHU4REVGXHU1Rjg0XHU5MUNEXHU1MTk5XHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUSxTQUFTLGNBQXlCLGVBQWU7QUFDblQsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sb0JBQW9CO0FBRzNCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxTQUFPO0FBQUEsSUFDTCxNQUFNLElBQUk7QUFBQSxJQUNWLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLHFCQUFxQjtBQUFBLFFBQ25CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQSxRQUMxRCxVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUEsTUFDRCxjQUFjO0FBQUEsUUFDWixjQUFjLFlBQVk7QUFBQSxNQUM1QixDQUFDO0FBQUEsTUFDRCxPQUFPO0FBQUEsTUFDUCxlQUFlO0FBQUEsSUFDakI7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLE9BQU87QUFBQTtBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTSxJQUFJO0FBQUEsTUFDVixPQUFPO0FBQUEsUUFDTCxDQUFDLElBQUksaUJBQWlCLEdBQUc7QUFBQTtBQUFBLFVBRXZCLFFBQVEsSUFBSTtBQUFBO0FBQUEsVUFFWixjQUFjO0FBQUE7QUFBQSxVQUVkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQzlDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
