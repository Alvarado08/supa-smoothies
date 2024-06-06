import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const cherryPickedKeys = ["REACT_APP_SUPABASE_URL", "REACT_APP_ANON_KEY"];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    base: "/supa-smoothies/",
    plugins: [react()],
  };
});
