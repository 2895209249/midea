const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const jsmin = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


// 1. 压缩html
// cnpm i gulp-htmlmin -D
gulp.task('htmlmin', function() {
    return gulp
        .src('./src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/html'));
});


// 2. 压缩css文件
// cnpm i gulp-cssmin -D
gulp.task('cssmin', function() {
    return gulp.src('./src/style/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/style'));
});

// 3. 压缩JS文件
// cnpm i gulp-uglify -D
gulp.task('jsmin', function() {
    return gulp
        .src(['./src/js/*.js', '!src/js/*.min.js','!src/js/lib/*.js','!src/js/*.slider.js','!src/js/main.*.js'])
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js'));  
});

// 4. 压缩图片
// cnpm i gulp-imagemin -D
gulp.task('imagemin', function() {
    return gulp
        .src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

// 5. 合并文件
// 为什么要合并文件？
// 减少HTTP请求次数
// cnpm i gulp-concat -D

// 先合并 再压缩
gulp.task('concat', function() {
    return gulp
        .src(['./src/js/index.js', './src/js/jquery.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'));
});


// 6. 制作精灵图(雪碧图)
// cnpm i gulp.spritesmith -D
gulp.task('sprite', function() {
    var spriteData = gulp.src('src/img/*').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('src/img'));
});

// less编译
// cnpm i gulp-less -D
gulp.task('less', function() {
    return gulp.src('./src/style/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./src/style'));
});

// 7. 监听文件
gulp.task('watchless', function() {
    // 监听所有的less文件
    // 如果有修改 就执行 less 这个 task
    gulp.watch('./src/style/*.less', gulp.series('less'));
});

// 自动构建
gulp.task('dev', function() {
    gulp.watch(['./src/style/*.less', './src/html/*.html', './src/js/*.js'], gulp.series('htmlmin', 'concat', 'less', 'cssmin'));
});