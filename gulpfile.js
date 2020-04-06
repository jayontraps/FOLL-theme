"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cp = require("child_process");
const cssnano = require("cssnano");
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

var src = 'src/';
var dest = 'build/';

// BrowserSync
function browserSync(done) {
  browsersync.init({
    // server: {
    //   baseDir: "./build"
    // },
    // port: 8888
    proxy: "localhost:8888"
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./_site/assets/"]);
}

// CSS task
function css() {
  return gulp
    .src("sass/screen.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }))
    // .pipe(gulp.dest(dest + "css"))
    // .pipe(rename({ suffix: ".min" }))
    // .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(dest))
    .pipe(browsersync.stream());
}

    // gulp.task('minify-css', () => {
    //     return gulp.src('styles/*.css')
    //         .pipe(cleanCSS({compatibility: 'ie8'}))
    //         .pipe(gulp.dest('dist'));
    // });

// Lint scripts
function scriptsLint() {
  return gulp
    .src([src + 'js/*.js', "./gulpfile.js"])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(['js/vendor/jquery.bxslider.js', 'js/vendor/bootstrap.min.js', 'js/functions.js', 'js/main-plugins-init.js', 'js/main.js'])
      .pipe(plumber())
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest(dest + 'js/'))
      .pipe(browsersync.stream())
  );
}

// Watch files
function watchFiles() {
  gulp.watch('sass/**/*.scss', gulp.series(css, browserSyncReload));
  gulp.watch('js/*.js', gulp.series(scripts, browserSyncReload));
}

// define complex tasks
const js = gulp.series(scripts);
const build = gulp.series(clean, gulp.parallel(css, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;