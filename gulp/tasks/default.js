import gulp from 'gulp';

gulp.task('build', ['server', 'scripts', 'styles']);
gulp.task('default', ['build', 'watch']);
