// var gulp = require('gulp');
// var json = require('comment-json');
// var path = require('path');
// var replace = require('gulp-replace');
// var color = require('colors');
// var fs = require('fs');
// var environment = 'serve';
// //api 文件
// var apiPath = path.resolve(__dirname, '..', 'assets', 'api.json');
// var filePath = path.resolve(__dirname, '..', 'dist', 'bundle.js');
// //打包后的js文件
//
// apiConfigStr = fs.readFileSync(apiPath).toString();
// apiList = json.parse(apiConfigStr, null, true);
//
//
// if (!apiList) console.error("api列表读取文件出错");
//
// gulp.task('mock', ['webpack'], function() {
//     var file = String(fs.readFileSync(filePath));
//     if (!file) console.error("读取文件出错");
//     gulp.src(filePath)
//         .pipe(replace(/{{(.+Api)}}/g, function(match, apiName) {
//             console.log(apiName);
//             console.log(apiList[apiName][environment]);
//             return apiList[apiName][environment];
//         }))
//         .pipe(gulp.dest('dist'));
// });
//
//
// gulp.task('dev', function() {
//     environment = 'dev';
//     gulp.run('mock');
// });
//
// gulp.task('test', function() {
//     environment = 'test';
//     gulp.run('mock');
// });
//
// gulp.task('prod', function() {
//     environment = 'prod';
//     gulp.run('mock');
// });
