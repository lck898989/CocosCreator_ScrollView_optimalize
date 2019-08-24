const {ccclass, property} = cc._decorator;
const SexType = cc.Enum({
    UNKNOW: 0,
    MAN: 1,
    WOMAN: 2
})
import {Global} from "../Global";
@ccclass
export default class NewClass extends cc.Component {
    private time: number = 0;
    onLoad () {

    }

    start () {
        
    }
    // 跳转下一个场景
    public goNextScene(data,event): void {
        console.log("data is ",data);
        console.log("event is ",event);
        cc.director.loadScene("TestNodePool");
    }
    update (dt) {
        this.time += dt;
        

    }
}
