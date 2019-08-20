// import global = require("")
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
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
        console.log("=======");
        if(window["global"] && window["global"].close && !this.showClose) {
            console.log("关闭");
            this.showClose = true;
            // let closeNode: cc.Node = this.node.getChildByName("close");
            // closeNode.active = true;
            this.node.getChildByName("close").active = true;
        }
    }
}
