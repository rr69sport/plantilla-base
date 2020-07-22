// Gulp 4
import gulp from "gulp"

// HTML
import htmlmin from "gulp-htmlmin"

// SCSS
import scss from "gulp-sass"

// JavaScript
import babel from "gulp-babel"
import terser from "gulp-terser"
import concat from "gulp-concat"

// Imágenes
import imagemin from "gulp-imagemin"

// Cache bust
import cacheBust from 'gulp-cache-bust'

// Plumber
import plumber from 'gulp-plumber'

// Browser Sync
import { init as server, stream, reload } from 'browser-sync'

// HTML
// Production
gulp.task("html-production", () => {
    return gulp
        .src("./src/*.html")
        .pipe(plumber())
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
        .pipe(plumber())
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest("./public"))
})

// SCSS
// Production
gulp.task('scss-production', () => {
    return gulp.src(('./src/scss/styles.scss'))
        .pipe(scss({
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest('./public/css'))
})
// Development
gulp.task('scss-dev', () => {
    return gulp.src(('./src/scss/styles.scss'))
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(gulp.dest('./public/css'))
})

// JavaScript
// Production
gulp.task("scripts-production", () => {
    return gulp
        .src("./src/js/*.js")
        .pipe(plumber())
        .pipe(concat("scripts.min.js"))
        .pipe(babel())
        .pipe(terser())
        .pipe(gulp.dest("./public/js"))
})
// Development
gulp.task("scripts-dev", () => {
    return gulp
        .src("./src/js/*.js")
        .pipe(plumber())
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
        .pipe(plumber())
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
        .pipe(plumber())
        .pipe(gulp.dest("public/assets/images"))
})

// Watchers
// Production
gulp.task('production',
    gulp.series(
        gulp.parallel([
            'html-production',
            'scss-production',
            'scripts-production',
            'images-production']
        )
    )
)
// Development
gulp.task('dev', () => {
    server({
        server: './public'
    })
    gulp.watch('./src/*.html', gulp.series('html-dev')).on('change', reload)
    gulp.watch('./src/scss/**/*.scss', gulp.series('scss-dev'))
    gulp.watch('./src/js/*.js', gulp.series('scripts-dev')).on('change', reload)
    gulp.watch('./src/images/**/*', gulp.series('images-dev'))
})