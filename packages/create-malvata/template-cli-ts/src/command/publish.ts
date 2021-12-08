import fs from 'fs-extra'
import UuidUtils from '../lib/uuidUtils';
import BaseCommand from "./base";
import { execSync } from 'child_process';
import path from 'path';
import os from 'os';
import compressing from 'compressing'
import Api from '../api';
import compareVersions from 'compare-versions';
import { Util } from '../util';

export default class PublishCommand extends BaseCommand {
    //检查本地ipa文件

    async exec() {
        super.exec()

        console.log(Util.log('发布组件'));
       
    }
    

}
