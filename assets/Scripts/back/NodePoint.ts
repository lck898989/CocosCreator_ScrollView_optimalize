const {ccclass, property} = cc._decorator;

@ccclass
export default class NodePoint extends cc.Component {
    // 该格子是不是障碍物：障碍物为1，非障碍物为0
    public status: number = 0;
    // 所处的行列
    public row: number = 0;
    public column: number = 0;
    // 格子的坐标
    public x: number = 0;
    public y: number = 0;
    // 
    public f: number = 0;
    // 默认为1
    public g: number = 1;
    // 估价值
    public h: number = 0;
    // 父节点
    public parent: NodePoint;
    // 到指定点的距离
    public distance: number = 0;
    onLoad () {

    }

    start () {

    }
    // 获取到目标点的距离
    public getDistanceTo(targetNode: NodePoint): number {
        let disX: number = Math.abs(targetNode.x - this.node.x);
        let disY: number = Math.abs(targetNode.y - this.node.y);
        this.distance = Math.sqrt(disX * disX + disY * disY);
        return this.distance;
    }
    // update (dt) {}
}
