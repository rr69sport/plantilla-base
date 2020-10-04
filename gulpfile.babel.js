// Gulp 4
import gulp from 'gulp'

// Pug
import { init as server, reload } from 'browser-sync'
import pugTask from './gulp/pug_tasks'

// Css
import { cssTask, cssTaskDev } from './gulp/scss_tasks'

// Javascript
import jsTask from './gulp/javascript_task'

// Images
import { imagesTask, imagesTaskDev } from './gulp/images_min'

// Browser Sync

// PUG - production
gulp.task('pug-production', async () => {
    pugTask('./src/views/pages/*.pug', false, './public')
})

// PUG - docs folder
gulp.task('pug-docs', async () => {
    pugTask('./src/views/pages/*.pug', false, './docs')
})

// PUG - dev mode
gulp.task('pug-dev', async () => {
    pugTask('./src/views/pages/*.pug', true, './public')
})

// SCSS - production
gulp.task('scss-production', async () => {
    cssTask('./src/scss/styles.scss', 'compressed', './public/css')
})

// SCSS - docs folder
gulp.task('scss-docs', async () => {
    cssTask('./src/scss/styles.scss', 'compressed', './docs/css')
})

// SCSS - dev mode
gulp.task('scss-dev', async () => {
    cssTaskDev('./src/scss/styles.scss', 'expanded', './public/css', '**/*.css')
})

// JavaScript - dev mode
gulp.task('scripts-dev', async () => {
    jsTask(['./src/js/scripts.js'], 'scripts.min.js', './public/js')
})

// javascript - docs folder and production
gulp.task('scripts-docs', async () => {
    jsTask(['./src/js/scripts.js'], 'scripts.min.js', './docs/js')
})

// Images - dev mode
gulp.task('images-dev', async () => {
    imagesTaskDev('src/assets/**/*', 'public/assets/')
})

// Images - production
gulp.task('images-production', async () => {
    imagesTask('src/assets/**/*', 'public/assets/')
})

// Images - docs folder
gulp.task('images-docs', async () => {
    imagesTask('src/assets/**/*', 'docs/assets/')
})

// Watchers
// Production
gulp.task('production',
    gulp.series(
        gulp.parallel(['pug-production', 'scss-production', 'scripts-dev', 'images-production'])
    ))
// Docs folder
gulp.task('docs',
    gulp.series(
        gulp.parallel(['pug-docs', 'scss-docs', 'scripts-docs', 'images-docs'])
    ))
// Development
gulp.task('dev', () => {
    server({
        server: './public'
    })
    gulp.watch('./src/views/**/*.pug', gulp.series('pug-dev')).on('change', reload)
    gulp.watch('./src/scss/**/*.scss', gulp.series('scss-dev'))
    gulp.watch(['./src/js/*.js', './src/js/**/*.js'], gulp.series('scripts-dev')).on('change', reload)
    gulp.watch('./src/assets/**/*', gulp.series('images-dev'))
})