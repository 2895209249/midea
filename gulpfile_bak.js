const gulp = require('gulp');
const rename = require('gulp-rename');

// 部署任务
// gulp.task(taskname,callback);
gulp.task('default', function() {
    return new Promise((resolve, reject) => {
        console.log('这里是第一个任务');
        resolve();
    })
});

gulp.task('sayhi', function() {
    return new Promise((resolve, reject) => {
        console.log('hi');
        resolve();
    })
});



// gulp.src()  源  
// gulp.pipe() 管道   运送内容
// gulp.dest() 目的地


gulp.task('copyhtml', function() {
    return gulp.src('./src/html/index.html')
        .pipe(gulp.dest('./dist/html'));
});

gulp.task('copyjs', function() {
    // 选怎多个路径使用 数组
    // ! 表示 不选择
    // 统一后缀名 可以使用 *.后缀名
    return gulp.src(['./src/js/*.js', '!src/js/jquery.min.js'])
        .pipe(gulp.dest('dist/js'));
});

gulp.task('renamejs', function() {
    return gulp.src('./src/js/index.js')
        .pipe(rename('hello.js'))
        .pipe(gulp.dest('./dist/js'));
});