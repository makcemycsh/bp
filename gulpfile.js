var gulp         = require('gulp'),
    less         = require('gulp-less'),                    // Плагин для LESS
    path         = require('path'),                         // Вспомогательный плагин для LESS
    prefixer     = require('gulp-autoprefixer'),            // Автопрефиксер
    cssmin       = require('gulp-cssnano'),                 // Минификация CSS
    gcmq         = require('gulp-group-css-media-queries'), // Группировка стилей по медиа запросу
    emq          = require('gulp-extract-media-queries'),   // Делим стили на файлы по медиа запросу
    uglify       = require('gulp-uglify'),                  // Минификация JS
    rigger       = require('gulp-rigger'),                  // Объединение файлов по ссылкам
    concat       = require('gulp-concat'),                  // Склейка файлов
    imagemin     = require('gulp-imagemin'),                // Минимизация изображений
    svgo         = require('gulp-svgmin'),                  // Минификация SVG
    rimraf       = require('rimraf'),                       // Очистка дирректории
    sourcemaps   = require('gulp-sourcemaps'),              // Sourcemaps
    rename       = require('gulp-rename'),                  // Переименвоание файлов
    plumber      = require('gulp-plumber'),                 // Предохранитель для остановки гальпа
    watch        = require('gulp-watch'),                   // Расширение возможностей watch
    connect      = require('gulp-connect');                 // Livereload
    
    
var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        svg: 'dev/svg'
    },
    dev: {
        html: 'dev/html/*.html',
        js: 'dev/js/*.js',
        plug: 'dev/js/plugins/**/*.*',
        css: 'dev/css/[^_]*.less',
        img: 'dev/img/**/*.*',
        fonts: 'dev/fonts/**/*.*',
        svg: 'dev/svg/*.svg',
        json: 'dev/js/*.json'
    },
    watch: {
        html: 'dev/html/**/*.html',
        js: 'dev/js/**/*.js',
        plug: 'dev/js/plugins/**/*.*',
        css: 'dev/css/**/*.*',
        img: 'dev/img/**/*.*',
        fonts: 'dev/fonts/**/*.*',
        svg: 'dev/svg/*.svg',
        json: 'dev/js/*.json'
    },
    clean: './build',
    output: './build'
};
    
// Локальный сервер для разработки
gulp.task('connect', function(){
    connect.server({
        root: [path.output],
        port: 9999,
        livereload: true
    });
});

// билдинг html
gulp.task('html:build', function () {
    gulp.src(path.dev.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(connect.reload())
});

// билдинг js
gulp.task('js:build', function () {
    gulp.src(path.dev.js) 
        //.pipe(rigger()) 
        //.pipe(sourcemaps.init()) 
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js)) 
        .pipe(connect.reload()) 
});

// json
gulp.task('json:build', function() {
    gulp.src(path.dev.json)
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload()) 
});

// плагины
gulp.task('plugins:build', function() {
    gulp.src(path.dev.plug)
        .pipe(gulp.dest(path.build.js))
});

// билдим изображения
gulp.task('img:build', function() {
    gulp.src(path.dev.img)
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload())
});

// билдинг css
gulp.task('css:build', function () {
    gulp.src(path.dev.css)
        //.pipe(concat('style.less'))
        .pipe(rigger())
        .pipe(less())
        .pipe(prefixer({
            browsers: ['last 3 version', "> 1%", "ie 8", "ie 7"]
        }))
        .pipe(gcmq())
        //.pipe(emq())
        //.pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload())
});

// сбор стилей в один файл
gulp.task('css:merg', function () {
    gulp.src('build/css/*.css')
        .pipe(concat('benetton.css'))
        .pipe(gulp.dest('build/css/'));
});

// Сбор и минификация svg
gulp.task('svg', function () {
    gulp.src(path.dev.svg)
        .pipe(svgo())
        .pipe(gulp.dest(path.build.svg));
});

// билдим шрифты
gulp.task('fonts:build', function() {
    gulp.src(path.dev.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// билдим все
gulp.task('build', [
    'html:build',
    'js:build',
    'json:build',
    'plugins:build',
    'css:build',
    'fonts:build',
    'img:build'
]);

// чистим папку билда
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// watch
gulp.task('watch', function(){
    //билдим html в случае изменения
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    //билдим изрображения в случае изменения
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:build');
    });
    //билдим css в случае изменения
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    //билдим js в случае изменения
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    //билдим js в случае изменения
    watch([path.watch.json], function(event, cb) {
        gulp.start('json:build');
    });
    watch([path.watch.plug], function(event, cb) {
        gulp.start('plugins:build');
    });
     //билдим шрифты в случае изменения
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

// действия по умолчанию
gulp.task('default', ['build', 'watch', 'connect']);
