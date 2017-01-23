var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// 使用默认任务启动Browsersync，监听JS文件
gulp.task('server',['webpack'], function() {
    // 从这个项目的根目录启动服务器
    browserSync.init({
        server: {
            baseDir: ["./dist/","./"]
        }
    });

    // 添加 browserSync.reload 到任务队列里
    // 所有的浏览器重载后任务完成。
    gulp.watch("./app/**", function() {
        gulp.run('webpack',function(){
            browserSync.reload();
        });
    });
});
