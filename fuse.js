const { FuseBox, CopyPlugin } = require("fuse-box");
const argv = require('yargs').argv;

const isWatch = argv.variant === 'watch';

const fuse = FuseBox.init({
  homeDir: "src",
  target: "browser@es6",
  output: "dist/$name.js",
});

const app = fuse.bundle("main").instructions("> [main.ts]");
isWatch && app.watch();
fuse.bundle("background").instructions("> background.ts");
fuse.run();
