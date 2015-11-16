/**************************************************
 * Sass, Jekyll, and Browser Sync
 * 
 * DESCRIPTION
 *  This Gulp file is the basis of my front-end 
 *  development environment. It handles browser 
 *  syncronization, Sass and SCSS processsing and 
 *  Jekyll compilation.
 *
 * REQUIRED
 *  NodeJS and Gulp must be installed, and you must 
 *  have the files: package.json, _config.yml
 *
 * USAGE
 *  Run gulp from the command line with this file in 
 *  the project's root directory.
 *  (If errors occur when trying to run gulp, make 
 *  sure dependancies in package.json are up to date.)
 * 
 * NOTES
 *  Sass/SCSS files are located in assets/_scss, which
 *  are complied to CSS and placed in assets/css.
 * 
 *  David Leger
 *  www.davidleger.me
 *
 **************************************************/

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};




/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});




/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});




/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});




/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/_scss/main.scss')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/_scss/**', ['sass']);
    gulp.watch('assets/js/**', ['jekyll-rebuild']);
    gulp.watch('assets/img/**', ['jekyll-rebuild']);
    gulp.watch(['index.html', '_layouts/*.html', '_includes/*'], ['jekyll-rebuild']);
});




/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
