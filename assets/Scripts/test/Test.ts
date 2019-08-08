const {ccclass, property} = cc._decorator;
const SexType = cc.Enum({
    UNKNOW: 0,
    MAN: 1,
    WOMAN: 2
})
import {Global} from "../Global";
@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Sprite)
    back: cc.Sprite = null;

    @property({
        type: cc.Label,
        displayName: "标题",
        tooltip: "显示游戏的标题"
    })
    label: cc.Label = null;
    @property
    text: string = 'hello';
    @property({
        type: cc.Integer,
        displayName: "血量",
        slide: true,
        min: 0,
        max: 10,
        tooltip: "人物当前血量"
    })
    blood = 10;
    @property({
        type: cc.Enum(SexType),
        displayName: "性别"
    })
    sex = SexType.UNKNOW;
    // 事件回调
    @property({
        type: cc.Component.EventHandler,
        displayName: "双杀",
    })
    call = new cc.Component.EventHandler();
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {
        // gg.goTarget(3,3);
        let global: Global = Global.getInstance();
        global.setname("lck");
        console.log("global's name is ",global.getName());
    }

    // update (dt) {}
}
