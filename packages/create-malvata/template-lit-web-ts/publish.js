const fs = require('fs-extra')
const axios = require('axios');
const walk = require('walk-sync');
var PACKAGE = require('./package.json');
var pversion = PACKAGE.version;
var OSS = require('ali-oss');
var path = require('path')
const baseUrl = 'https://xxx/'
    //检查线上版本
    //对比当前版本
    //提示是否升级版本
    //上传文件夹
const remoteFile = 'https://xxxx/index.html'
axios.get('https://xxxxx/index.html', {})
    .then(async function(response) {
        let content = response.data;
        let version = content.split('main.bundle.')[1].split('.js')[0];
        console.log(version)
        if (pversion !== version) {
            console.log('检查通过，上传...');
            await uploadFolder('./dist', {
                dir: 'pages/',
                name: "web"
            })
            console.log('完成')
        } else {
            console.log('版本已存在')
        }
    })
    .catch(function(error) {
        console.log(error);
    })
    .then(function() {
        // always executed
    });

async function uploadFolder(dir, option) {
    let oss = await asyncCreateClientWithSTS();
    let files = await walk(dir, { includeBasePath: false, globs: ["**/*.*"] })
    for (const iterator of files) {
        let res = await multipartUpload(oss, path.join(dir, iterator), {
            name: path.join(option.name, iterator),
            dir: option.dir
        })
    }
}

async function multipartUpload(oss, file, option) {
    if (oss == undefined) {
        console.error("未初始化oss")
        return
    }
    let { name, dir, progress } = option;
    try {

        let objectKey = path.join(dir, name);
        let result = await oss.multipartUpload(objectKey, file, {
                progress: function(p, checkpoint) {
                    progress && progress(p)
                }
            })
            //
        return {
            ...result,
            url: baseUrl + result.name
        };

    } catch (e) {
        console.error(e);
    }
}

async function asyncCreateClientWithSTS() {
    let res = await axios.get("xxx", {
        baseURL: 'https://xxx/'
    })
    let tmp = `"code": 200,
        "data": {
            "access_key_id": "xx",
            "access_key_secret": "xxfRg",
            "bucket_endpoint": "oss-xxyuncs.com",
            "bucket_name": "imoxxedia",
            "expiration": "2021-06-01T05:26:01Z",
            "security_token": "CAIxxluBUM="
        },
        "message": "success"
        `
    let config = res.data.data;
    try {
        let client = new OSS({
            endpoint: config.bucket_endpoint,
            accessKeyId: config.access_key_id,
            accessKeySecret: config.access_key_secret,
            bucket: config.bucket_name,
            stsToken: config.security_token,
            timeout: "600s",
            secure: true,
            refreshSTSToken: async() => {
                let res = await axios.get("xxx", {
                    baseURL: 'xxx'
                })
                let config = res.data.data;
                return { accessKeyId: config.access_key_id, accessKeySecret: config.access_key_secret, stsToken: config.security_token };
            }
        });
        return client;

    } catch (error) {
        console.error(error)
    }


}