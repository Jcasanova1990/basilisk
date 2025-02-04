const gulp = require('gulp');

// Use Nodemon programatically
const nodemon = require('gulp-nodemon-pro');

//will open up our code in a browser window
const browserSync = require('browser-sync').create();

//This is a browserSync method that reloads the page we wangt whenever we make a change to have the page reload
const reload = browserSync.reload;

//This is a NODEJS standard method that lets us call scripts in our package.json or node_modules from our code
var exec = require('child_process').exec;


// This is the brain for our self made development server

gulp.task('default', (cb) => {
	// Compile REACT
	exec('npm run dev:webpack', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
	// SERVE BACKEND
	nodemon({
	 script: 'server.js',
	 env: { 'NODE_ENV': 'development'}
 });
 // SERVE  FRONT END WITH PROXY TO BACKEND
	browserSync.init({
	 proxy: {
		 target: 'http://localhost:8001',
		 ws: true
	 },
	 serveStatic: ['./public']
	});
	// SET UP WATCJERS TO LISTEN TO CHANGES IN FILES
	gulp.watch(['./src/*','./src/**/*.js','./src/components/**/**/*', './src/pages/**/**/*'], gulp.task('js-watch')).on('change', reload);;
	// LISTEN FOR WHEN TO RELOAD PAGES
	gulp
		.watch([
			'./public/js/**/.#*js',
			'./public/index.html'
		])
		.on('change', reload);
		cb()
});



// This is for the development build
gulp.task('webpack', cb => {
	exec('npm run dev:webpack', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});


gulp.task('build', cb => {
	exec('npm run build:webpack', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('js-watch', gulp.task('webpack'), function (done) {
    reload();
    done();
});