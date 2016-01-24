 var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    webserver = require('gulp-webserver');

// run init tasks
gulp.task('default', ['dependencies', 'js', 'html', 'css']);

// run development task
gulp.task('dev', ['watch', 'serve']);

// serve the build dir
gulp.task('serve', function () {
  gulp.src('build')
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {
  gulp.watch('app/**/*.js', ['js']);
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/**/*.css', ['css']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/es6-shim/es6-shim.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.dev.js'
  ])
    .pipe(gulp.dest('build/resources/lib/'));
});

// transpile & move js
gulp.task('js', function () {
  return gulp.src('app/**/**/*.ts')
    .pipe(rename({
      extname: ''
    }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('build'));
});

// move html
gulp.task('html', function () {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('css', function () {
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('build'))
});
