
import Actions from "./Actions";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Draw extends cc.Component {
    
    @property([Actions])
    actions: Actions[] = []
    @property(cc.Node)
    actionNode: cc.Node
    @property
    duration: number = 2
    @property
    params: any = this.getBezierParams()
    // 获取到贝塞尔曲线的参数
    private getBezierParams(): any {
        let params = [];
        this.actions.forEach((actinItem) => {
            if(!actinItem) {
                return;
            }
            let param = [actinItem.node.position,
                        actinItem.control1.position,
                        actinItem.control2.position,
                        actinItem.target.position];
            params.push(param);
        })
        return params;
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private graphics: cc.Graphics;
    start () {
        let self = this;
        // this.node.on(cc.Node.EventType.POSITION_CHANGED)
        this.graphics = this.node.getComponent(cc.Graphics);
        if(this.graphics) {
            console.log("actions is ",this.actions);
            // 绘制线段及贝塞尔曲线
            this.actions.map((actionItem) => {
                self.drawLine(actionItem);
                let arr: cc.Node[] = [actionItem.node,actionItem.control1,actionItem.control2,actionItem.target];
                arr.forEach((nodeItem: cc.Node) => {
                    nodeItem.on("position-changed",this.drawLineByChange,this);
                })
            })
        }
    }
    back(): void {
        cc.director.loadScene("TestNodePool");
    }
    // 根据变化绘制线段和贝塞尔曲线
    private drawLineByChange(e: cc.Event): void {
        // let position: cc.Vec2 = e.getLocation();
        this.graphics.clear();
        let self = this;
        this.actions.map((actionItem) => {
            self.drawLine(actionItem);
            // let arr: cc.Node[] = [actionItem.node,actionItem.control1,actionItem.control2,actionItem.target];
        })
    }
    // 绘制线段
    private drawLine(actionItem: Actions): void {
        console.log("actionItem is ",actionItem);
        console.log("============开始画线============");
        // 将画笔移动到起始节点的位置 并将画笔的颜色设置为红色7
        this.graphics.strokeColor = cc.Color.RED;
        this.graphics.moveTo(actionItem.node.x,actionItem.node.y);
        this.graphics.lineTo(actionItem.control1.x,actionItem.control1.y);
        this.graphics.stroke();

        this.graphics.strokeColor = cc.Color.RED;
        this.graphics.moveTo(actionItem.target.x,actionItem.target.y);
        this.graphics.lineTo(actionItem.control2.x,actionItem.control2.y);
        this.graphics.stroke();
        console.log("============结束画线============");
        // 绘制贝塞尔曲线
        this.drawBezire(actionItem);

    }
    private drawBezire(actionItem: Actions): void {
        if(actionItem) {
            this.graphics.moveTo(actionItem.node.x,actionItem.node.y);
            this.graphics.strokeColor = cc.Color.YELLOW;
            this.graphics.bezierCurveTo(actionItem.control1.x,actionItem.control1.y,actionItem.control2.x,actionItem.control2.y,actionItem.target.x,actionItem.target.y);
            this.graphics.stroke();
        } else {
            return;
        }
    }

    // update (dt) {}
}
