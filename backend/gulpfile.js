const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

gulp.task('serve', function () {
  const options = {
    script: 'index.js',
    delayTime: 1,
    legacyWatch: true,
    watch: ['*.js', 'app/*.js', 'app/*/*.js']
  }
  return nodemon(options).on('restart', function (enc) {
    console.log('Restarting...')
  })
})
