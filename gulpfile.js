import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { copy } from "./gulp/tasks/copy.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";

import { server } from "./gulp/tasks/server.js";
import { cleanDist } from "./gulp/tasks/cleanDist.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

global.app = {
  path,
  gulp,
  plugins,
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build")
};

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

const dev = gulp.series(cleanDist, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(cleanDist, mainTasks);
const deployZip = gulp.series(build, zip);
const deployFTP = gulp.series(build, ftp);

gulp.task("default", dev);

export { dev, build, svgSprive, deployZip, deployFTP };
