gulp = require("gulp");//相当于script引入jQuery。angularjs的操作

//gulp.task("default",function(){
//    console.log("编写启动任务default");
//});
//
//gulp.task("mytask",function(){
//    console.log("编写启动任务mytask");
//});
///////合并、压缩项目中所有的js文件///////
contjs = require("gulp-concat");//合并js
yasuojs = require("gulp-uglify");//压缩js
gulp.task("mgjs",function(){
    gulp.src("./modules/**/*.js")//管理文件的范围
        .pipe(contjs("main.js"))//合并，指定合并后的文件名称
        .pipe(gulp.dest("./dest/js"));//指定输出到的目标文件夹中，如果没有回自动创建
});

gulp.task("minjs",function(){
    gulp.src("./modules/**/*.js")//管理文件的范围
        .pipe(yasuojs())//压缩js，将所有代码写成一行，将函数及形参用字母去表示
        .pipe(contjs("main.min.js"))//合并，指定合并后的文件名称
        .pipe(gulp.dest("./dest/js"));//指定输出到的目标文件夹中，如果没有回自动创建
});
///////合并、压缩项目中所有的css文件///////
contcss = require("gulp-concat");//合并css
minicss = require("gulp-minify-css");//压缩css
gulp.task("mgcss",function(){
    gulp.src("./assets/css/**/*.css")
        .pipe(contcss("main.css"))
        .pipe(gulp.dest("./dest/css"))
});
gulp.task("mincss",function(){
    gulp.src("./assets/css/**/*.css")
        .pipe(minicss())
        .pipe(contcss("main.min.css"))
        .pipe(gulp.dest("./dest/css"))
});

///////合并、压缩项目中所有的图片///////
miniimg = require("gulp-imagemin");//压缩img
gulp.task("minimg",function(){
    gulp.src("./assets/image/**/*.*")
        .pipe(miniimg())
        .pipe(gulp.dest("./dest/img"))
});
gulp.task("minicon",function(){
    gulp.src("./assets/icons/**/*.*")
        .pipe(miniimg())
        .pipe(gulp.dest("./dest/icons"))
});

/////////////////为所有的文件范围及任务添加监视，一旦有改变马上触发任务//////////////////
gulp.task("default",["mgjs","minjs","mgcss","mincss"],function(){
    //监控的路径不要加./，否则监控不到文件创建与删除
    //gulp.watch不监听空文件夹
    gulp.watch("modules/**/*.js",["mgjs","minjs"]);
    gulp.watch("assets/**/*.css",["mgcss","mincss"]);
});