var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat')
var replace = require('gulp-replace')
//http://www.cnblogs.com/code/articles/4103070.html
//https://github.com/basecss/jshint-doc-cn/blob/master/options.md
var jshint = require('gulp-jshint')
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

function replaceUrls(array, hash) {
    for (var i = 0, href; href = array[i]; i++) {
        for (var key in hash) {
            if (href.indexOf(key) !== -1) {
                array[i] = href.replace(key, hash[key])
                delete hash[key]
                continue
            }
        }
    }
}

gulp.task('combo', function () {
//https://github.com/isaacs/node-glob
//http://www.linuxjournal.com/content/bash-extended-globbing
    return gulp.src('./src/**/*.js', function (a, b) {
        var compatibleFiles = b.filter(function (f) {
            return !/\$\$|noop|modern|next|observe|touch/.test(f)
        })

        var version = 1.46 //当前版本号
        var now = new Date  //构建日期
        var date = now.getFullYear() + "." + (now.getMonth() + 1) + "." + now.getDate()

        gulp.src(compatibleFiles)
                .pipe(concat('avalon.js'))
                .pipe(replace(/version:\s+([\d\.]+)/, function (a, b) {
                    return "version: " + version
                }))
                .pipe(replace(/!!/, function (a, b) {
                    return  "avalon.js " + version + " built in " + date + "\n support IE6+ and other browsers"
                }))
                .pipe(gulp.dest('./'))
                .pipe(jshint())
                .pipe(jshint.reporter('default'))
                .pipe(gulp.dest('../avalon.test/src/'))


     
    })



})
gulp.task('default', ['combo'], function () {
    console.log('合并完毕')
});