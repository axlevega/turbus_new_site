'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import panini        from 'panini';
import rimraf        from 'rimraf';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import ftp           from 'vinyl-ftp';

// Load all Gulp plugins into one variable
const $ = plugins();

function makeid() {
  return (Math.random() + 1).toString(36).substring(7);
}

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

//Additional actions
const dist = 'dist';
const src = 'src';
const assets = ['src/assets/**/*','!src/assets/{img,js,scss,cstm-css,cstm-js}/**/*'];
sass.compiler = require('node-sass');

// Build the "dist" folder by running all of the below tasks
// Sass must be run later so UnCSS can search for used classes in the others assets.
gulp.task('build',
 gulp.series(clean, gulp.parallel(pages, javascript, images, copy, customCss, customJs), gulp.parallel(sass, removeNeedless), replaceCssAndJs));

 // Build the site, run the server, and watch for file changes
gulp.task('default',
gulp.series('build', server, watch));


// Deploy project on beget server (account Alaska, site: layouts.starta-dev.ru)
function deployOnServer (done) {
 
  var conn = ftp.create( {
      host:     'alaska.beget.tech',
      user:     'alaska_layouts',
      password: 'bqMK9mz%',
      parallel: 10
  } );

  var globs = [
      'dist/**'
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance
  function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  let directory = escapeRegExp(__dirname);
  directory = directory.substring(directory.lastIndexOf("\\") + 1, directory.length);
  return gulp.src( globs, { base: '.', buffer: false } )
      .pipe( conn.newer('/' + directory)) // only upload newer files
      .pipe( conn.dest('/' + directory));

};

gulp.task( 'deploy', gulp.series('build', deployOnServer));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(dist, done);
}

function removeNeedless(done) {
  rimraf(dist + '/assets/scss', done);
  rimraf(dist + '/assets/cstm-css', done);
  rimraf(dist + '/assets/cstm-js', done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
  return gulp.src(assets)
    .pipe(gulp.dest(dist + '/assets'));
}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src(src + '/pages/**/*.{html,hbs,handlebars}')
    .pipe($.plumber())
    .pipe(panini({
      root: src + '/pages/',
      layouts: src + '/layouts/',
      partials: src + '/partials/',
      helpers: src + '/helpers/',
      data: src + '/data/',
    }))
    .pipe(gulp.dest(dist))
}

function replaceCssAndJs() {
  return gulp.src(dist + '/**/*.{html,hbs,handlebars}')
  .pipe($.if(PRODUCTION, gulp.src(['rev/**/*.json', 'dist/**/*.html'])))
  .pipe($.if(PRODUCTION, $.revCollector({
    replaceReved: true,
  })))
  .pipe($.if(PRODUCTION, gulp.dest(dist)))
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  codeValidation();
  done();
}

// HTML and SCSS linters
function codeValidation(){
  gulp.src("./dist/**/*.html")
    .pipe($.htmlhint({
      "tagname-lowercase": ["clipPath"],
      "attr-lowercase": true,
      "attr-value-double-quotes": true,
      "attr-value-not-empty": false,
      "attr-no-duplication": true,
      "doctype-first": true,
      "tag-pair": true,
      "empty-tag-not-self-closed": false,
      "spec-char-escape": false,
      "id-unique": true,
      "src-not-empty": true,
      "title-require": true,
      "alt-require": false,
      "doctype-html5": true,
      "id-class-value": false,
      "style-disabled": true,
      "inline-style-disabled": false,
      "inline-script-disabled": false,
      "space-tab-mixed-disabled": false,
      "id-class-ad-disabled": true,
      "href-abs-or-rel": false,
      "attr-unsafe-chars": false,
      "head-script-disabled": true
    }))
    .pipe($.htmlhint.reporter());
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src(src + '/assets/scss/app.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.if(PRODUCTION, $.purifycss([dist + '/assets/js/**/*.js', dist + '/**/*.html'])))
    .pipe($.if(PRODUCTION, $.autoprefixer(['> 1%'])))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: '*' })))
    .pipe($.if(PRODUCTION, $.rev()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(dist + '/assets/css'))
    .pipe($.if(PRODUCTION, $.rev.manifest()))
    .pipe($.if(PRODUCTION, gulp.dest('rev/css')))
    .pipe(browser.reload({ stream: true }));
}

// Compile custom css into one file
// In production, the CSS is compressed

function customCss() {
  return gulp.src(src + '/assets/cstm-css/**/*.css')
              .pipe($.sourcemaps.init())
              .pipe($.concat('cstm-css.css'))
              .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
              .pipe(gulp.dest(dist + '/assets/css'));
}

function customJs() {
  return gulp.src(src + '/assets/cstm-js/**/*.js')
              .pipe($.sourcemaps.init())
              .pipe($.concat('cstm-js.js'))
              .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
              .pipe(gulp.dest(dist + '/assets/js'));
}


let webpackConfig = {
  mode: (PRODUCTION ? 'production' : 'development'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ "@babel/preset-env" ],
            compact: false
          }
        }
      }
    ]
  },
  devtool: !PRODUCTION && 'source-map'
}


// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(src + '/assets/js/app.js')
    .pipe($.plumber())
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe($.if(PRODUCTION, $.terser().on('error', e => { console.log(e); })
    ))
    .pipe($.if(PRODUCTION, $.rev()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(dist + '/assets/js'))
    .pipe($.if(PRODUCTION, $.rev.manifest()))
    .pipe($.if(PRODUCTION, gulp.dest('rev/js')))
}


// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src(src + '/assets/img/**/*')
    .pipe($.plumber())
    .pipe($.if(PRODUCTION, $.imagemin([
      $.imagemin.mozjpeg({quality: 90, progressive: true }),
      $.imagemin.optipng({optimizationLevel: 5}),
    ])))
    .pipe(gulp.dest(dist + '/assets/img'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: dist, port: 80
  }, done);
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(assets, copy);
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials,helpers,data}/**/*.html').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('all', sass);
  gulp.watch('src/assets/cstm-css/**/*.css').on('all', customCss);
  gulp.watch('src/assets/cstm-js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
}