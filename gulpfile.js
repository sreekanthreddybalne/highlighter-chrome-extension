var gulp = require('gulp');
var ts = require('gulp-typescript');
var exec = require('child_process').exec;
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var tsify = require("tsify");
var realpathify = require('realpathify')
var spawn = require('child_process').spawn;

gulp.task('ng-build', function(cb) {
    console.log('running ng build...');
    exec('ng build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
        return true;
    });
});

gulp.task('functions', function(cb) {
    process.chdir('functions/');
    exec('npm run build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
        return true;
    });
});

// gulp.task('functions', function(cb) {
//     console.log('running npm run build on functions...');
//     exec('ng build', function (err, stdout, stderr) {
//         console.log(stdout);
//         console.log(stderr);
//         cb(err);
//         return true;
//     });
// });

gulp.task('content-script', function() {

    return browserify({
            basedir: '.',
            debug: true,
            entries: ['content-script/boot.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .plugin(realpathify)
        .transform(babelify, {extensions: ['.js', '.ts'], presets: ['@babel/preset-env']})
        .bundle()
        .pipe(source('content-script.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', gulp.series('ng-build', 'content-script', 'functions'));
