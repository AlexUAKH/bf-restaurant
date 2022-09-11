import webpack from "webpack-stream";

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourceMap: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(
      webpack({
        mode: app.isDev ? "development" : "production",
        output: {
          filename: "main.min.js"
        }
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};
