import chalk from "chalk"

export class Util{
    static exitProcess(err:string){
        console.log(chalk.white.bgRed(err));
        process.exit(1)
    }
    static log(str:string){
        console.log(chalk.green.bgMagenta(str));
    }
    /**
     * 根据文件夹名字返回组件名和预制体名
     * @param folder 文件夹名字
     */
    static genNames(folder:string){
        let names = folder.split('_');
        return{
            name:folder,
            component_name:names.map(e=>e.slice(0,1).toUpperCase() +e.slice(1)).join("")
        }
    }
}