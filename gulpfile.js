var gulp = require('gulp');
var concat = require('gulp-concat');
var fs = require('fs');
var replace = require('gulp-regex-replace');
var map = require('map-stream');
var babel = require('gulp-babel');

replaceJS = function(data){
  console.log(data);
}

gulp.task('default', ['babelify'], function () {
  console.log('default');
});


gulp.task('babelify', function(){
  console.log("babelify");
  return gulp.src('src/components/raw.js')
             .pipe(babel({
               presets: ['es2015']
             }))
             .pipe(gulp.dest('dist'));
});

gulp.task('yinify', function(){
  return gulp.src('src/components/**/*.html')
             .pipe(map(function(data, cb){
               var contents = data.contents.toString('utf8');
               var hasJS = contents.indexOf("<script>");
               if(hasJS != -1){
                 var es5 = contents.substring(contents.lastIndexOf("<script>")+8, contents.lastIndexOf("</script>"));
                 console.log(es5);
                 cb(null, es5);
               } else {
                 cb(null, null);
               }
             }))
             .pipe(babel({
               presets: ['es2015']
             }))
             .pipe(gulp.dest('dist'));
});


