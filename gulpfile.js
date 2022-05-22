var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var del = require("del");
var gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");

// Task which would transpile typescript to javascript
gulp.task("typescript", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build"));
});

// Task which would delete the old dist directory if present
gulp.task("build-clean", function () {
    return del(["./build"]);
});

// Task which would just create a copy of the current views directory in dist directory
gulp.task("views", function () {
    return gulp.src("./src/views/**/*.ejs").pipe(gulp.dest("./build/views"));
});

// Task which would just create a copy of the current static assets directory in dist directory
gulp.task("assets", function () {
    return gulp.src("./src/public/**/*").pipe(gulp.dest("./build/public"));
});

gulp.task("scripts", function () {
    return browserify("./scripts/scripts.js")
        .bundle()
        .pipe(source("scripts.js"))
        .pipe(gulp.dest("./build/"));
});

gulp.task("build", function () {
    return browserify({
        entries: ["./src/scripts/scripts.js"],
    })
        .transform(babelify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build"));
});

gulp.task("sass", function () {
    return gulp
        .src("./src/styles/style.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./build/public/css"));
});

// The default task which runs at start of the gulpfile.js
gulp.task(
    "default",
    gulp.series(
        "build-clean",
        "typescript",
        "views",
        "assets",
        "scripts",
        "sass"
    ),
    () => {
        console.log("Done");
    }
);
