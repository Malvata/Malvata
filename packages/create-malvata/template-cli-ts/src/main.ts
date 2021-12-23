import { Command } from 'commander';
import FormCommand from './command/form';
import PublishCommand from './command/publish';
const program = new Command();
program.version('0.0.1');

program
.command('publish')
.description('publish')
.action(()=>{
    new PublishCommand();
})


program.command('form')
.description('form')
.action(()=>{
    new FormCommand();
})

program.parse(process.argv);