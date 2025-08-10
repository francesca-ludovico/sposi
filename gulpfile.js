'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const debug = require('gulp-debug').default;

// Compile scss to css
function styles() {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ basename: 'styles.min' }))
        .pipe(gulp.dest('./css'));
}

// Watch changes in scss files
function watchStyles() {
    gulp.watch('./sass/**/*.scss', styles);
}

// Minify js
function scripts() {
    return gulp.src('./js/scripts.js')
        .pipe(debug({ title: 'Found files:' }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify()) 
        .pipe(rename({ basename: 'scripts.min' }))
        .pipe(gulp.dest('./js'));
}

// Default task
exports.default = gulp.series(styles, scripts);

// Export tasks so they can be run individually
exports.styles = styles;
exports.watchStyles = watchStyles;
exports.scripts = scripts;
