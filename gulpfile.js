const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Paths
const paths = {
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  }
};

// Compile SCSS
function compileSass() {
  return gulp.src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.scss.dest)) 
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest)); 
}

// Watch files
function watchFiles() {
  gulp.watch(paths.scss.src, compileSass);
}

// Tasks
exports.sass = compileSass;
exports.watch = gulp.series(compileSass, watchFiles);
exports.default = gulp.series(compileSass, watchFiles);