
const {ccclass, property} = cc._decorator;
// 挂载到可以移动的节点
@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property(cc.Node)
    target: cc.Node
    @property(cc.Node)
    control1: cc.Node
    @property(cc.Node)
    control2: cc.Node
    @property
    duration: number = 2

    public oldPosition: cc.Vec2 = null;
    start () {
        this.oldPosition = this.node.position;
    }
    // 播放事件
    private play(): void {
        let array: cc.Vec2[] = [this.control1.position,this.control2.position,this.target.position];
        /**
         * 
         * 贝塞尔曲线三个参数的意义(最少两个参数)
         * @parame1: 第一个控制点
         * @parame2: 第二个控制点
         * @param3: 终点坐标
         * 
         *  */ 
         this.node.runAction(cc.bezierTo(this.duration,array));
    }
    private reset(): void {
        this.node.position = this.oldPosition;
    }
    update (dt) {

    }
}
