import { resolve } from 'path'
import { defineConfig, splitVendorChunkPlugin,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import viteCompression from 'vite-plugin-compression'
//import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import'
const {VITE_APP_AXIOS_BASE} = loadEnv(process.env.MODE, process.cwd());

console.log("🚀🚀🚀",VITE_APP_AXIOS_BASE)
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    splitVendorChunkPlugin(),
    vueSetupExtend(),
    viteCompression({
      threshold: 1024000 // 对大于 1mb 的文件进行压缩
    }),
    // createStyleImportPlugin({
    //   resolves: [
    //     VxeTableResolve()
    //   ],
    //})
  ],

  resolve: {
    alias: {
      //'@': fileURLToPath(new URL('./src', import.meta.url)),
      '@': resolve(__dirname, '/src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
    // 省略后缀名引入
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },
  // 引入第三方的配置,强制预构建插件包
  optimizeDeps: {
    include: ['echarts', 'axios']
  },
  
  server: {
    host: '0.0.0.0',
    port: 8899,
    open: false,
    //cors: true,
    proxy: {
      "/api": {
        target: "http://8.217.217.243:9000",
        changeOrigin: true,
        rewrite: (path) => {
          //console.log(path)
          return path.replace(/^\/api/, "")
        }
      },
      // "/mqtt": {
      //   target: "http://8.217.217.243:15675/ws",
      //   changeOrigin: true,
      //   rewrite: (path) => {
      //     //console.log(path)
      //     return path.replace(/^\/api/, "")
      //   }
      // }
    }
  },
  build: {
    //target: 'modules',
    target: 'es2015', // 浏览器兼容性
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    chunkSizeWarningLimit: 1024, //chunk 大小警告的限制
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为base64编码，设置为0可禁用此项。默认4096（4kb）
    // 构建后是否生成 source map 文件
    //sourcemap: import.meta.env.VITE_DEV,
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        // 生产环境时移除console.log调试代码
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
