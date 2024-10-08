const gulp = require('gulp');
const sass = require('gulp-sass') (require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglifly = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript(){
    return gulp.src('./source/script/*.js')
    .pipe(uglifly())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/script'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init()) 
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'))
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/script/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens));
}

// function funcaoPadrao (callback) {
//     console.log("executando via gulp");
//     callback();
// }

// function dizOi (callback) {
//     console.log("Diz Oi");
//     dizTchau();
//     callback();
// }

// function dizTchau () {
//     console.log("Diz Tchau");
// }

// exports.default = gulp.series(funcaoPadrao, dizOi);
// exports.dizOi = dizOi;
// exports.sass = compilaSass
// exports.watch = function() {
//     gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
// }

// exports.javascript = comprimeJavaScript;
// exports.images = comprimeImagens;