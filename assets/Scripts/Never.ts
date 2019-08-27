// import global = require("")
const {ccclass, property} = cc._decorator;

@ccclass
export default class Never extends cc.Component {
    private showClose: boolean = false;
    onLoad () {}

    start () {

    }
    public closeApp(event: any,data: any): boolean {
        console.log("data is ",data,"event is ",event);
        let message: string = "hello";
        let res: boolean = false;
        if(jsb) {
            jsb.reflection.callStaticMethod("org.cocos2dx.javascript/AppActivity","closeApp","(Ljava/lang/String;)V",message);
        }
        return res;
    }
    update (dt) {
    }
}
