// Gulp 4
import gulp from 'gulp'

// PUG
import pug from 'gulp-pug'

// Plumber
import plumber from 'gulp-plumber'

// Cache bust
import cacheBust from 'gulp-cache-bust'

/**
 * @param {string} src - archivos a vigilar, puede ser un array de strings
 * @param {boolean} dev - en qué modo se está trabajando
 * @param {string} dest - ruta donde se deja el archivo final
 * @example pugTask("./src/views/pages/*.pug", false, "./public")
 */
export const pugTask = (src, dev, dest) => {
    gulp
        .src(src)
        .pipe(plumber())
        .pipe(pug({
            pretty: dev ? true : false
        }))
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest(dest))
}