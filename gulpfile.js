var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");//压缩html
var cssmini = require("gulp-minify-css");
var rev = require("gulp-rev");
var revCollecta = require("gulp-rev-collector");
var concat = require("gulp-concat");
var linker = require("gulp-linker");
var imagemini = require("gulp-imagemin");
gulp.task("copy",function(){
    return gulp.src("src/**/*").pipe(gulp.dest("dist/"))
})
gulp.task("copy-icon",function(){
    return gulp.src(["src/scss/icon/!*.css","src/scss/icon/*"]).pipe(gulp.dest("dist/css"))
})
gulp.task("sass",function(){
    return gulp.src("src/scss/*.scss").pipe(sass({outputStyle:'compressed'})).pipe(gulp.dest("dist/css"))
})
gulp.task("htmlmin",function () {
    var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
})
gulp.task("rev",function(){
    gulp.src("src/scss/**/*.css")
        .pipe(cssmini())
        .pipe(rev())
        .pipe(gulp.dest("dist/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("src/rev"));
})
gulp.task("revCollecta",function(){
    gulp.src(["src/rev/*.json","dist/html/*.html"])
        .pipe(revCollecta())
        .pipe(gulp.dest("dist/html"))
})

gulp.task("concat",function(){
    gulp.src("src/js/*.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("src/rev"))
})
gulp.task("imagemini",function(){
    gulp.src("src/images/*")
        .pipe(imagemini())
        .pipe(gulp.dest("dist/images"))
})