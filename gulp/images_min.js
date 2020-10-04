// Gulp 4
import gulp from 'gulp'

// Imágenes
import imagemin from 'gulp-imagemin'

// Plumber
import plumber from 'gulp-plumber'

/**
 * @param {string} src - carpeta de imágenes a vigilar
 * @param {string} dest - carpeta destino de las imágenes
 */
export const imagesTask = (src, dest) => {
    gulp
        .src(src)
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
        .pipe(gulp.dest(dest))
}

/**
 * @param {string} src - carpeta de imágenes a vigilar
 * @param {string} dest - carpeta destino de las imágenes
 * @example imagesTaskDev("src/assets/", "public/assets/")
 */
export const imagesTaskDev = (src, dest) => {
    gulp
        .src(src)
        .pipe(plumber())
        .pipe(gulp.dest(dest))
}