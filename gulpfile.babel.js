import gulp from 'gulp'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import terser from 'gulp-terser'

gulp.task('scripts', () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(babel())
        .pipe(terser())
        .pipe(gulp.dest('./public/js'))
})