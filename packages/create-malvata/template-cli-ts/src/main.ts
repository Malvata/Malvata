import { Command } from 'commander';
import FormCommand from './command/form';
import PublishCommand from './command/publish';
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