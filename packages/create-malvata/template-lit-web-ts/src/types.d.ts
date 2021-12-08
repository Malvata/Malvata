declare class XyDialog{
    static alert(config);

    static success(config)

    static error(config)

    static warning(config)

    static confirm(config)

    static prompt(config)
    static open:boolean;
}
declare class XyMessage{
    static show(config:any);
    static info(text, duration?, onclose?);
    static loading(str:string, duration?, onclose?);
    static error(text, duration?, onclose?);
}
declare const version:string;

