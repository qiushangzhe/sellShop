var gulp = require('gulp');
var path = require('path');
var webpack = require('gulp-webpack');
var webpackConfig = require('../webpack.config.js');
var srcPath = path.resolve(__dirname,'..','app','main.js');
var destPath = path.resolve(__dirname,'..','dist/');

//执行编译任务
gulp.task('webpack', function() {
    return gulp.src(srcPath)
            .pipe(webpack(webpackConfig))
            .pipe(gulp.dest(destPath));
});
