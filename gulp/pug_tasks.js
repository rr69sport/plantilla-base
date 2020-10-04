// Gulp 4
import gulp from 'gulp'

// PUG
import pug from 'gulp-pug'

// Plumber
import plumber from 'gulp-plumber'

// Cache bust
import cacheBust from 'gulp-cache-bust'

const pugTask = (src, dev, dest) => {
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
export default pugTask