import fm from 'front-matter';
import fs from 'fs-extra';
import walkSync from 'walk-sync';

import path from 'path'
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt()
const run = async() => {
    let src = './post'
    let des = './blog/post'
    if (fs.existsSync(des)) {
        fs.rmdirSync(des, { recursive: true });
    }
    fs.copySync(src, des);

    let mdfiles = walkSync(des, { includeBasePath: false, globs: ['**/index.md'] });

    let postConfig = [];
    let template = fs.readFileSync(path.resolve('./build/template.html'), 'utf-8')
    for (const iterator of mdfiles) {
        let content = fs.readFileSync(path.join(des, iterator), 'utf-8');
        let front = fm(content);
        console.log(front)
        let result = md.render(front.body);
        let post = Object.assign({
            date: '2000-2-1 00:00:00',
            title: 'untitled',
            content: content
        }, front.attributes, {
            route: "post/" + path.parse(iterator).dir + "/"
        })
        postConfig.push(post)
        let _tmp = template;
        _tmp = _tmp.replace("{{title}}", post.title);
        _tmp = _tmp.replace("{{content}}", result);
        fs.writeFileSync(path.join(des, iterator.replace('.md', '.html')), _tmp);
        fs.rmSync(path.join(des, iterator));
    }

    postConfig = postConfig.sort((a, b) => { return (new Date(b.date)).getTime() - (new Date(a.date)).getTime(); })
    fs.writeFileSync(path.join(des, 'post-config.json'), JSON.stringify(postConfig, null, 2, null))
}
run()