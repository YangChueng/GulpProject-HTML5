var gulp = require('gulp'),
    connect = require('gulp-connect'),
    del = require('del'),
    gulpif = require('gulp-if'),
    gulpSequence = require('gulp-sequence'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat');
var nano = require('gulp-cssnano'),
    postcss = require("gulp-postcss"),
    sprites = require('postcss-sprites').default,
    autoprefixer = require('autoprefixer'),
    cssgrace = require('cssgrace');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');
var minifyHtml = require('gulp-minify-html');
var usemin = require('gulp-usemin'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify');

var browserSync = require('browser-sync');
var SRC_DIR = './';
var condition = true;

gulp.task('connect', function() {
    connect.server({
        root: '',
        port: 8888,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src(SRC_DIR+'/**/*.html')
        .pipe(connect.reload());
});

gulp.task('javascript', function() {
    gulp.src(SRC_DIR+'/scripts/**/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch([SRC_DIR+'/**/*.html'], ['html']);
    gulp.watch([SRC_DIR+'/scripts/**/*.js'], ['javascript']);
});

gulp.task('min-js', function() {
    return gulp.src(SRC_DIR + '/scripts/dev/**/*.js')
        .pipe(uglify({
            mangle: false,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'license' //保留所有注释
        }))
        .pipe(gulp.dest(SRC_DIR + '/scripts/build/'));
});


gulp.task("rev-min-css", function() {
    return gulp.src([SRC_DIR + '/styles/dev/**/*.css'])
        .pipe(concat('all.min.css'))
        .pipe(nano({
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(gulp.dest(SRC_DIR + '/styles/build'));
});


gulp.task('browser-sync', function() {
    browserSync({
        files: "**",
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('pc', gulpSequence(
    'browser-sync'
));


gulp.task('default', ['pc'], function() {

});
