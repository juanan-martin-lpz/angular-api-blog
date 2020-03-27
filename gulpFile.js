var gulp = require('gulp');
var exec = require('child_process').spawn;
var nodemon = require('gulp-nodemon');

const { series } = require('gulp');


function api(cb) {
    nodemon({
        script: 'api/bin/www',
        watch: ["api/app.js", "api/routes/","api/config/","api/config/*","api/models/","api/models/*","api/models/*/**", 'api/public/*', 'api/public/*/**'],
        ext: 'js'
    });
}

function wait10(cb) {
    setTimeout(() => {
        cb();
    }, 10000);
}

async function mongodb(cb) {
    await exec('mongod', ['--dbpath E:\\data'], { detached: true, stdio: 'inherit', shell: true });
}

exports.startapi = series(mongodb, wait10, api);
exports.mongodb = mongodb;
exports.api = api;

