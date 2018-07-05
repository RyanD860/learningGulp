const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
/*
TOP LEVEL FUNCTIONS
gulp.task = Define tasks
gulp.src = Point to files to use
gulp.dest = Points to folder to output
gulp.watch = Watch files and folders for changes
*/

// Copy all html files
gulp.task("copyHtml", function() {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

// Logs message
gulp.task("default", ["copyHtml", "imageMin", "sass", "scripts"]);

// Optimize Images
gulp.task("imageMin", () =>
  gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
);

// Optimize JS
gulp.task("jsMin", () => {
  gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

//Compile Sass
gulp.task("sass", () => {
  gulp
    .src("src/sass/*.scss")
    .pipe(sass().on("err", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

//Concats JS files
gulp.task("scripts", () => {
  gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task("watch", () => {
  gulp.watch("src/js/*.js", ["scripts"]);
  gulp.watch("src/images/*", ["imageMin"]);
  gulp.watch("src/sass/*.scss", ["sass"]);
  gulp.watch("src/*.html", ["copyHtml"]);
});
