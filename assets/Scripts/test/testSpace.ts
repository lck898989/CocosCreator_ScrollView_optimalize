const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    testP: cc.Node = null;
    onLoad () {
        let worldPosition: cc.Vec2 = this.testP.parent.convertToWorldSpaceAR(this.testP.position);
        let tempPosition: cc.Vec2 = this.testP.convertToWorldSpaceAR(this.testP.position);
        console.log("tempPosition is ",tempPosition);
        let resPostion: cc.Vec2 = this.node.convertToNodeSpaceAR(worldPosition);
        console.log("worldPositioin is ",worldPosition);
        console.log("resPosition is ",resPostion);
    }

    start () {

    }

    update (dt) {

    }
}
