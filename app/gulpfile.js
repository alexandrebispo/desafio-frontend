const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const concat  = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const { gifsicle, jpegtran, optipng, svgo } = require('gulp-imagemin');
const gls = require('gulp-live-server');

function compressedSass(cb) {
	return src('./public/assets/css/sass/style.scss')
	.pipe(concat('style.min.css'))
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(dest('./public/assets/css'));
}

function compressedJs(cb) {
	return src('./public/assets/js/src/*.js')
	.pipe(babel({
            presets: ['@babel/env']
    }))
	.pipe(uglify())
	.pipe(concat('script.min.js'))
	.pipe(dest('./public/assets/js'));
}

function compressedImg(cb) {
	return src('./public/assets/img/origin/*')
		.pipe(imagemin([
			gifsicle({interlaced: true}),
			jpegtran({progressive: true}),
			optipng({optimizationLevel: 5}),
			svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
     .pipe(dest('./public/assets/img'));
}

function watchServer() {
	watch('./public/assets/css/sass/*.scss', compressedSass());
	watch('./public/assets/js/src/*.js', compressedJs());
	watch('./public/assets/img/*', compressedImg());
}

function serverLocal() {
	var server = gls.static('./public', 8888);
    server.start();

	watch(['./public/assets/css/sass/*.scss', './public/assets/js/src/*.js'], function() {
      server.notify.apply(server, watchServer());
    });    
}

exports.default = series(compressedSass, compressedJs, compressedImg, serverLocal);
