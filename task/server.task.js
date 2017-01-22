var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// 使用默认任务启动Browsersync，监听JS文件
gulp.task('server', function() {
    // 从这个项目的根目录启动服务器
    browserSync.init({
        server: {
            baseDir: ["./dist/", "./"]
        }
    });

    // 添加 browserSync.reload 到任务队列里
    // 所有的浏览器重载后任务完成。
    gulp.watch("./src/**", function() {
        gulp.run('mock', function() {
            browserSync.reload();
        })
    });
});
