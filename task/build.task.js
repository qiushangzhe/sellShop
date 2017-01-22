var gulp = require('gulp');
var path = require('path');
var webpack = require('gulp-webpack');
var child_process = require('child_process');
var webpackConfig = require('../webpack.config.js');
var srcPath = path.resolve(__dirname,'..','app','main.js');
var destPath = path.resolve(__dirname,'..','..','www');
//执行编译任务
gulp.task('build', function() {
    return gulp.src(srcPath)
            .pipe(webpack(webpackConfig))
            .pipe(gulp.dest(destPath));
});
