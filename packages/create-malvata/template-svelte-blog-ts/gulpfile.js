import gulp from 'gulp';
import vite from 'vite';
import fs from 'fs-extra'
import walkSync from 'walk-sync'
import path from 'path'
import rm from 'rimraf'
gulp.task('entry', async(done) => {
    done();
})

function copyPost() {
    let exclude = ['**/index.html', "**/.DS_Store"]
    let basepath = './blog/post'
    let files = walkSync(basepath, { includeBasePath: false, ignore: exclude, directories: false })
    for (const iterator of files) {
        console.log(iterator)
        fs.copySync(path.join(basepath, iterator), path.join('./dist/blog/post', iterator))
    }
}

gulp.task('post', async(done) => {

    let blogDir = './blog/post'
    let bloghtml = walkSync(blogDir, { includeBasePath: true, globs: ['**/index.html'] });
    let blogInputs = {}
    let count = 0
    for (const iterator of bloghtml) {
        blogInputs[count++] = iterator
    }
    let config = {
        build: {
            rollupOptions: {
                input: Object.assign({
                    main: path.resolve('./', 'index.html'),
                    about: path.resolve('./', 'about/index.html'),
                    blog: path.resolve('./', 'blog/index.html'),
                    tags: path.resolve('./', 'tags/index.html'),
                    search: path.resolve('./', 'search/index.html'),
                    _404: path.resolve('./', '404.html'),
                }, blogInputs)
            }
        }
    }
    await vite.build(config)
    copyPost()
    done();
})
gulp.task('rm', (done) => {
    rm('./dist', () => {
        done();
    })
})
gulp.task('default', gulp.series('rm', 'entry', 'post'))