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

// Constantes
const cssPlugins = [
    cssnano(),
    autoprefixer()
]

gulp.task("html", () => {
    return gulp
        .src("./src/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true, // false o borrar para que no minifique
            removeComments: true // false o borrar para dejar comentarios
        }))
        .pipe(gulp.dest("./public"))
})

gulp.task("css", () => {
    return gulp
        .src("./src/css/styles.css")
        .pipe(concat("styles.min.css"))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest("./public/css"))
})

gulp.task("scripts", () => {
    return gulp
        .src("./src/js/*.js")
        .pipe(concat("scripts.min.js"))
        .pipe(babel())
        .pipe(terser())
        .pipe(gulp.dest("./public/js"))
})

gulp.task("images", () => {
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