export class Global {
    private static __instance: Global = null;
    constructor() {
        
    }
    public name: string = "";
    public age: number = 0;
    public sex: number = 0;
    // 单例模式获取Global对象
    public static getInstance(): Global {
        if(!this.__instance) {
            this.__instance = new Global();
        }
        return this.__instance;
    }
    public setname(name: string): void {
        this.name = name;
    }
    public getName(): string {
        return this.name;
    }
}
export class Const {
    // 暴露静态属性方格的大小
    public static BLOCKWIDTH: number = 32;
    public static BLOCKHEIGHT: number = 32;

    public static COLUMNS: number = 30;
    public static ROWS: number = 20;
    

}