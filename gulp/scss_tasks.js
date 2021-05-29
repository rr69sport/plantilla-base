// Gulp 4
import gulp from 'gulp'

// SCSS
import scss from 'gulp-dart-sass'

// CSS
import cssnano from 'cssnano'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

// Plumber
import plumber from 'gulp-plumber'

// Browser Sync
import { stream } from 'browser-sync'

// Constantes
const cssPlugins = [
    cssnano({
        core: true,
        zindex: false,
        autoprefixer: {
            add: true,
            browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
        }
    }),
    autoprefixer()
]

/**
 * @param {string} src - archivos a vigilar, puede ser un array de strings
 * @param {string} style - si minifica o no el css
 * @param {string} dest - ruta donde se deja el archivo final
 * @example cssTask('./src/scss/styles.scss', 'compressed', './public/css')
 */
export const cssTask = (src, style, dest) => {
    gulp.src((src))
        .pipe(plumber())
        .pipe(scss({
            outputStyle: style
        }).on('error', scss.logError))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest(dest))
}

/**
 * @param {string} src - archivos a vigilar
 * @param {string} style - estilo de compilación
 * @param {string} dest - destino del archivo final
 * @param {string} watching - (carpeta donde se compila el css)
 * @example cssTaskDev("./src/scss/styles.scss", "expanded", "./public/css", "*.css")
 */
export const cssTaskDev = (src, style, dest, watching) => {
    gulp.src((src))
        .pipe(plumber())
        .pipe(scss({
            outputStyle: style
        }).on('error', scss.logError))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest(dest))
        .pipe(stream({ match: watching }))
}