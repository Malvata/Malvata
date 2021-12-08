import path from 'path';
import fs from 'fs-extra'
import { Util } from '../util';
export default class BaseCommand{
    constructor(args?:any){
        this.exec(args)
    }

    exec(args?:any){}
}