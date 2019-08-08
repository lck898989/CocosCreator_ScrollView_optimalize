const {ccclass, property} = cc._decorator;
// 可以拖动的类
@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // this.node.on("touchmove",this.moving,this);
        this.node.on("touchmove",this.moving,this);
    }
    private moving(e: cc.Touch): void {
        console.log("location is ",e.getLocation());
        this.node.position = this.node.parent.convertToNodeSpaceAR(e.getLocation());
    }
    update (dt) {
        
    }
}
