const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    @property({
        type: cc.ScrollView
    })
    scroll: cc.ScrollView = null;
    @property({
        type: cc.Prefab
    })
    itemPrefab: cc.Prefab = null;
    @property
    totalCount: number = 0;
    @property
    spacing: number = 20;
    @property
    spawnCount: number = 6;
    // 缓冲区的上边界
    private topY: number = 0;
    // 缓冲区的下边界
    private bottomY: number = 0;
    // 最后的y坐标值
    private lastY: number = 0;
    // 滑动列表的可滑动区域
    private content: cc.Node = null;
    // 盛放已经生成的节点
    private items: Array<cc.Node> = [];
    // 控制时间
    private timeFrame: number = 0;
    // 时间间隔
    private timeInterval: number = 0.2;
    private maxY: number = 0;
    // 开始累加的数字
    private startAdd: number = this.spawnCount;
    // 开始往下追加的开始值
    private startAppend: number = 0;
    onLoad () {
        this.content = this.scroll.content;
        console.log("content is ",this.content);
        console.log("content's parent is ",this.content.parent);
        this.content.height = this.totalCount * this.itemPrefab.data.height + this.totalCount * this.spacing + this.spacing;
        this.topY = 0;
        this.bottomY = -this.content.height;
        for(let i = 0; i < this.spawnCount; i++) {
            let tempNode: cc.Node = cc.instantiate(this.itemPrefab);
            tempNode.getChildByName("score").getComponent(cc.Label).string = i.toString();
            tempNode.getComponent("Item").setItemId(i);
            tempNode.x = 0;
            tempNode.y = -i * (tempNode.height + this.spacing) - this.spacing;
            if(i === this.spawnCount - 1) {
                this.maxY = tempNode.y;
            }
            console.log("tempNode is ",tempNode);
            this.content.addChild(tempNode);
            this.items.push(tempNode);
        }
    }

    start () {

    }

    update (dt) {
        this.timeFrame += dt;
        // 帧时间小于0.2不执行update提高性能
        if(this.timeFrame < this.timeInterval) {
            return;
        }
        this.timeFrame = 0;
        let isDown: boolean = this.scroll.content.y > this.lastY;
        let offset: number = -this.spawnCount * (this.itemPrefab.data.height + this.spacing);
        // 检查每一个节点的y坐标如果超出上边界就讲该节点放到后面去替换预制体中的贴图或者标签文字
        for(let i = 0; i < this.items.length; i++) {
            // 获得每个节点的坐标
            let item: cc.Node = this.items[i];
            // item.y 是一直不变的一个值滚动的是content
            // console.log("item.parent.y is ",item.parent.y);
            let itemWorldPosition: cc.Vec2 = item.parent.convertToWorldSpaceAR(item.position);
            let itemNodePosition: cc.Vec2 = this.scroll.node.convertToNodeSpaceAR(itemWorldPosition);
            if((itemNodePosition.y > (this.scroll.node.height / 2 + item.height + this.spacing)) && isDown) {
                // 向下滑动并且该节点的坐标超出上边界就应该将该节点移动到节点队列的最末尾并更新末尾节点的相关属性
                item.y = item.y + offset;
                // 更新最后一个节点的属性
                item.getComponent("Item").setItemId(item.getComponent("Item").itemId + this.items.length);
                // item.getComponent(cc.Label).string = num.toString();
                item.getComponent("Item").setScore("" + item.getComponent("Item").itemId);
                if(i % 2 === 0) {
                    item.getComponent("Item").setAvatar("1.jpg");
                } else {
                    item.getComponent("Item").setAvatar("2.jpg");
                }
            } else if((itemNodePosition.y < -(this.scroll.node.height / 2 + item.height + this.spacing )) && !isDown){
                if(item.getComponent("Item").itemId - this.items.length >= 0) {
                    console.log("有节点超出了下边界",i);
                    item.y -= offset;
                    item.getComponent("Item").setItemId(item.getComponent("Item").itemId - this.items.length);
                    item.getComponent("Item").setScore("" + item.getComponent("Item").itemId);
                }
            }
        }
        this.lastY = this.scroll.content.y;
    }
}
