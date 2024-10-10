import type { AppConfig } from "@remix-run/dev";

const config: AppConfig = {
  serverDependenciesToBundle: [/@pdftron\/pdfjs-express/],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "build/index.js",
  publicPath: "/build/",
  // Add any other config options here
};

export default config;
