import walk from 'walk-sync';
import { Util } from '../util';
import BaseCommand from './base';
import xlsx from 'node-xlsx';
import path from 'path';
import fs from 'fs-extra'

export default class FormCommand extends BaseCommand {
    async exec() {
        Util.log('生成表单样式');
    }
}

