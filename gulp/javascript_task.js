// Gulp 4
import gulp from "gulp"

// JavaScript
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'

// Plumber
import plumber from 'gulp-plumber'

/**
 * 
 * @param {string} src - archivos a vigilar
 * @param {string} nameFile - nombre del archivo compilado
 * @param {string} dest - destino del archivo final
 * @example jsTask(['./src/js/scripts.js'], "scripts.min.js", "./public/js")
 */
export const jsTask = (src, nameFile, dest) => {
    browserify({
        entries: src,
        transform: [babelify]
    })
        .plugin('tinyify')
        .bundle()
        .pipe(plumber())
        .pipe(source(nameFile))
        .pipe(gulp.dest(dest))
}