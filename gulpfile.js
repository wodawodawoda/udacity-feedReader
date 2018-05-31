/*eslint-env node*/

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Static Server + watching scss/html files
gulp.task('serve', ['copy-html', 'copy-tests', 'copy-images', 'css', 'scripts'], function () {

	browserSync.init({
		server: './dist'
	});

	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('js/**/*.js', ['lint']);
	gulp.watch('js/**/*.js', ['scripts']).on('change', browserSync.reload)
	gulp.watch('./index.html', ['copy-html']).on('change', browserSync.reload);
	gulp.watch('jasmine/spec/*.js', ['copy-tests']).on('change', browserSync.reload);

});

// Scripts
gulp.task('scripts', function() {
	gulp.src('js/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src('js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('app.js'))
		.pipe(uglify())  // uglify does not understand es6 => Babel needed above this plugin
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('dist/js'));
});

// HTML files
gulp.task('copy-html', function() {
	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'));
});

// Images
gulp.task('copy-images', function() {
	gulp.src('img/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./dist/img'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	gulp.src('sass/*.sass')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

// Compile CSS & auto-inject into browsers
gulp.task('css', function () {
  gulp.src('css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Linter
gulp.task('lint', function () {
	return gulp.src(['js/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

// Testing
gulp.task('tests', function () {
	gulp.src('jasmine/spec/extraSpec.js')
		.pipe(jasmine({
			integration: true,
			vendor: 'js/**/*.js'
		}));
});

gulp.task('copy-tests', function() {
  gulp.src('jasmine/**/*')
    .pipe(gulp.dest('./dist/jasmine'));
});

gulp.task('default', ['serve']);
