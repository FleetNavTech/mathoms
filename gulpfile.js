var gulp = require('gulp'),
    sass = require('gulp-sass');
    notify = require("gulp-notify") ,
    bower = require('gulp-bower'),
    gulpFilter = require('gulp-filter'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    plumber = require('gulp-plumber');

var config = {
    css: {
        sassPath: './public/resources/scss/styles/',
        sassImportsPath: './public/resources/scss/imports/',
         bowerDir: './bower_components/' ,
        cssDestPath: './public/resources/css/'
    },
    js: {
        jsDestBasePath: './public/resources/js/',
        jsAppPath: 'app/',
        jsVendorPath: 'vendor/',
        jqueryPath: './bower_components/jquery/dist/',
        bootstrapPath: './bower_components/bootstrap-sass-official/assets/javascripts/'
    }
}

var onError = function(err) {
    console.log(err);
};

/**
 * This task basically runs bower install but 
 * by including in the gulpfile other contributors only have to run gulp bower 
 * and have them all setup and ready.
 */
gulp.task('bower', function() { 
    return bower() .pipe(gulp.dest(config.css.bowerDir)) 
});

/**
 * Pull all minified but expanded stylesheets from the sass folder
 * into styles.css
 */
gulp.task('css-dev', function() { 
    return gulp.src(config.css.sassPath + '*.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: [ config.css.sassImportsPath, config.css.bowerDir + 'bootstrap-sass-official/assets/stylesheets/'],
            errLogToConsole: true
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(config.css.cssDestPath));
});

//LOOKING TO HAVE ONE STYLE.CSS file that imports all the other files from maybe an
//imports folder??

/**
 * Pull all minified but compressed stylesheets from the sass folder
 * into styles.css
 */
gulp.task('css-prod', function() { 
    return gulp.src(config.css.sassPath + '*.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: [ config.css.sassImportsPath, config.css.bowerDir + 'bootstrap-sass-official/assets/stylesheets/'],
            errLogToConsole: true
        }))
        .pipe(minifyCss({
            processImport: false,
            benchmark: true,
            keepSpecialComments: 0
        }))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(config.css.cssDestPath));
});

/**
 * Pull all js from js/app and concat into
 * single file in js/
 */
gulp.task('js-dev', function() {
    return gulp.src([config.js.jqueryPath + 'jquery.min.js', config.js.bootstrapPath + 'bootstrap.min.js', config.js.jsDestBasePath + config.js.jsAppPath + '*.js'])
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.js.jsDestBasePath));
});

/**
 * Pull all js from js/app and concat & uglify into
 * single file in js/
 */
gulp.task('js-prod', function() {
    var filter = gulpFilter(['*', '!jquery.min.js', '!bootstrap.min.js'], {restore:true});
    var js = gulp.src([config.js.jqueryPath + 'jquery.min.js', config.js.bootstrapPath + 'bootstrap.min.js', config.js.jsDestBasePath + config.js.jsAppPath + '*.js'])
        .pipe(plumber())
        .pipe(filter)
        .pipe(uglify())
        .pipe(filter.restore)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(config.js.jsDestBasePath));

    return js;
});

/**
 * Watch all sass and js/app files and recompile on change
 */
gulp.task('watch', function() { 
    gulp.watch(config.css.sassPath + '**/*.scss',{ interval: 500 }, ['css-dev', 'css-prod']); 
    gulp.watch(config.css.sassImportsPath + '**/*.scss',{ interval: 500 }, ['css-dev', 'css-prod']); 
    gulp.watch(config.js.jsDestBasePath + config.js.jsAppPath + '*.js',{ interval: 500 }, ['js-dev', 'js-prod']);
});

/**
 * Default task to run. Runs all above tasks.
 */
gulp.task('default', ['bower', 'icons', 'css-dev', 'css-prod', 'js-dev', 'js-prod']);

/**
* CUSTOM HELPER
*/

function _buildJSDependencies () {

}

function _buildCSSDependencies () {
    
}
