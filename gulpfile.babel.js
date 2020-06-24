// Gulp 4
import gulp from "gulp"

// HTML
import htmlmin from "gulp-htmlmin"

// CSS
import cssnano from "cssnano"
import postcss from "gulp-postcss"
import autoprefixer from "autoprefixer"

// JavaScript
import babel from "gulp-babel"
import terser from "gulp-terser"
import concat from "gulp-concat"

// Imágenes
import imagemin from "gulp-imagemin"

// Cache bust
import cacheBust from 'gulp-cache-bust'

// Browser Sync
import { } from 'browser-sync'

// Constantes
const cssPluginsProduction = [
    cssnano(),
    autoprefixer()
]
const cssPluginsDevelopment = [
    autoprefixer()
]

// HTML
// Production
gulp.task("html-production", () => {
    return gulp
        .src("./src/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true, // false o borrar para que no minifique
            removeComments: true // false o borrar para dejar comentarios
        }))
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest("./public"))
})
// Development
gulp.task("html-dev", () => {
    return gulp
        .src("./src/*.html")
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest("./public"))
})

// CSS
// Production
gulp.task("css-production", () => {
    return gulp
        .src("./src/css/styles.css")
        .pipe(concat("styles.min.css"))
        .pipe(postcss(cssPluginsProduction))
        .pipe(gulp.dest("./public/css"))
})
// Development
gulp.task("css-dev", () => {
    return gulp
        .src("./src/css/styles.css")
        .pipe(concat("styles.min.css"))
        .pipe(postcss(cssPluginsDevelopment))
        .pipe(gulp.dest("./public/css"))
})

// JavaScript
// Production
gulp.task("scripts-production", () => {
    return gulp
        .src("./src/js/*.js")
        .pipe(concat("scripts.min.js"))
        .pipe(babel())
        .pipe(terser())
        .pipe(gulp.dest("./public/js"))
})
// Development
gulp.task("scripts-dev", () => {
    return gulp
        .src("./src/js/*.js")
        .pipe(concat("scripts.min.js"))
        .pipe(babel())
        .pipe(terser())
        .pipe(gulp.dest("./public/js"))
})

// Images
// Production
gulp.task("images-production", () => {
    return gulp
        .src("src/assets/images/**/*")
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest("public/assets/images"))
})
// Development
gulp.task("images-dev", () => {
    return gulp
        .src("src/assets/images/**/*")
        .pipe(gulp.dest("public/assets/images"))
})

// Watchers
// gulp.task('production', () => {
//     gulp.watch('')
// })