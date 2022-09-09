import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import rename from "gulp-rename";
import gulpSass from "gulp-sass";
import webpcss from "gulp-webpcss";
import dartSass from "sass";

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../imgwwww/"))
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp"
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserList: ["last 3 versions"],
          cascade: true
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};
