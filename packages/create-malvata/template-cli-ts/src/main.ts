import { Command } from 'commander';
import DefaultCommand from './command/default';
import EntranceCommand from './command/entrance_template';
import FormCommand from './command/form';
import NewCommand from './command/new';
import PublishCommand from './command/publish';
import TestCommand from './command/test';
const program = new Command();
program.version('0.0.1');

program
.command('publish')
.description('发布组件')
.action(()=>{
    new PublishCommand();
})


program.command('form')
.description('生成表单样式文件')
.action(()=>{
    new FormCommand();
})

program.parse(process.argv);