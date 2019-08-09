const {ccclass, property} = cc._decorator;

@ccclass
export default class nodepoolCtr extends cc.Component {
    @property({
        type: cc.Prefab
    })
    enemyPrefab: cc.Prefab = null;
    // @property({
    //     type: cc.Node
    // })
    // poolRoot: cc.Node = null;
    private pool: cc.NodePool = null;
    onLoad () {
        this.pool = new cc.NodePool("NodeItem");
        let count: number = 10;
        for(let i = 0; i < count; i++) {
            let enemyItem: cc.Node = cc.instantiate(this.enemyPrefab);
            // 放入对象池待使用
            this.pool.put(enemyItem);
            enemyItem.addComponent("NodeItem");
        }
    }
    async start () {
        let self = this;
        for(let i = 0; i < 100; i++) {
           await new Promise((resolve,reject) => {
                setTimeout(() => {
                    console.log("一秒时间到");
                    resolve();
                },500);
            })
            console.log("pool's size is ",self.pool.size());
            console.log("i is ",i);
            if(self.pool.size() > 0) {
                let nodeItem: cc.Node = self.pool.get();
                // 重置该节点的坐标
                nodeItem.x = 0;
                nodeItem.y = 0;
                self.node.addComponent(cc.ParticleSystem);
                self.node.addComponent(cc.MotionStreak);
                

                // 设置拖尾效果和粒子效果
                self.node.getComponent(cc.ParticleSystem).file = ""
                self.node.addChild(nodeItem);
                // 向屏幕外运动
                cc.tween(nodeItem).to(2,{
                    x: -700,
                    y: 0
                },{progress: null,easing: "easeInOut"}).call(() => {
                    self.pool.put(nodeItem);
                }).start();
            }
        }
    }
    update (dt) {
        // for(let i = 0; i < )
    }
}
