import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
   AutoImport({ imports: [
    'react',
    {
     "react-use-measure": [["default","useMeasure"]], 
     "reat-spring":["Animated","useSpring"],
     "zucker":["sweet"],
    }
  ]}),
   tailwindcss(),
   react()
 ]
})
