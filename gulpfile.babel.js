// Gulp 4
import gulp from "gulp"

// PUG
import pug from 'gulp-pug'

// SCSS
import scss from "gulp-sass"

// CSS
import cssnano from "cssnano"
import postcss from "gulp-postcss"
import autoprefixer from "autoprefixer"

// JavaScript
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'

// Imágenes
import imagemin from "gulp-imagemin"

// Cache bust
import cacheBust from 'gulp-cache-bust'

// Plumber
import plumber from 'gulp-plumber'

// Browser Sync
import { init as server, stream, reload } from 'browser-sync'

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

// HTML
// Production
gulp.task("pug-production", () => {
    return gulp
        .src("./src/views/pages/*.pug")
        .pipe(plumber())
        .pipe(pug())
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest("./public"))
})
// Development
gulp.task("pug-dev", () => {
    return gulp
        .src("./src/views/pages/*.pug")
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest("./public"))
})
// Docs folder
gulp.task("pug-docs", () => {
    return gulp
        .src("./src/views/pages/*.pug")
        .pipe(plumber())
        .pipe(pug())
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest("./docs"))
})

// SCSS
// Production
gulp.task('scss-production', () => {
    return gulp.src(('./src/scss/styles.scss'))
        .pipe(plumber())
        .pipe(scss({
            outputStyle: "compressed"
        }))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css'))
})
// Development
gulp.task('scss-dev', () => {
    return gulp.src(('./src/scss/styles.scss'))
        .pipe(plumber())
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css'))
        .pipe(stream({ match: "**/*.css" }))
})
// Docs folder
gulp.task('scss-docs', () => {
    return gulp.src(('./src/scss/styles.scss'))
        .pipe(plumber())
        .pipe(scss({
            outputStyle: "compressed"
        }))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./docs/css'))
})

// JavaScript
// // Development
gulp.task("scripts-dev", () => {
    return (
        browserify({
            entries: ['./src/js/scripts.js'],
            transform: [babelify]
        })
            .bundle()
            .pipe(plumber())
            .pipe(source('scripts.min.js'))
            .pipe(gulp.dest("./public/js"))
    )
})
// // Docs folder
gulp.task("scripts-docs", () => {
    return (
        browserify({
            entries: ['./src/js/scripts.js'],
            transform: [babelify]
        })
            .bundle()
            .pipe(plumber())
            .pipe(source('scripts.min.js'))
            .pipe(gulp.dest("./docs/js"))
    )
})

// Images
// Production
gulp.task("images-production", () => {
    return gulp
        .src("src/assets/**/*")
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
        .pipe(gulp.dest("public/assets/"))
})
// Development
gulp.task("images-dev", () => {
    return gulp
        .src("src/assets/**/*")
        .pipe(plumber())
        .pipe(gulp.dest("public/assets/"))
})
// Docs folder
gulp.task("images-docs", () => {
    return gulp
        .src("src/assets/**/*")
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
        .pipe(gulp.dest("docs/assets/"))
})

// Watchers
// Production
gulp.task('production',
    gulp.series(
        gulp.parallel([
            'pug-production',
            'scss-production',
            'scripts-dev',
            'images-production']
        )
    )
)
// Docs folder
gulp.task('docs',
    gulp.series(
        gulp.parallel([
            'pug-docs',
            'scss-docs',
            'scripts-docs',
            'images-docs']
        )
    )
)
// Development
gulp.task('dev', () => {
    server({
        server: './public'
    })
    gulp.watch('./src/views/**/*.pug', gulp.series('pug-dev')).on('change', reload)
    gulp.watch('./src/scss/**/*.scss', gulp.series('scss-dev'))
    gulp.watch(["./src/js/*.js", "./src/js/**/*.js"], gulp.series('scripts-dev')).on('change', reload)
    gulp.watch('./src/assets/**/*', gulp.series('images-dev'))
})