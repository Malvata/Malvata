import chalk from "chalk"

export class Util{
    static exitProcess(err:string){
        console.log(chalk.white.bgRed(err));
        process.exit(1)
    }
    static log(str:string){
        console.log(chalk.green.bgMagenta(str));
    }
}