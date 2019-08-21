const {ccclass, property} = cc._decorator;
@ccclass
export default class Progress extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    private progressComponent: cc.ProgressBar = null;
    private sceneLoaded: boolean = false;
    private loadRate: number = 0;
    @property({
        type: cc.Node
    })
    neverNode: cc.Node = null;
    onLoad () {
        
    }

    start () {
        // 绑定常驻节点
        if(this.neverNode) {
            cc.game.addPersistRootNode(this.neverNode);
        }
        this.progressComponent = this.node.getComponent(cc.ProgressBar);
        cc.director.preloadScene("ThreeD",this.sceneLoadProgress.bind(this),null);
        console.log("渲染引擎是：",cc.renderer.renderEngine);
    }
    sceneLoadProgress(completed: number,total: number,item: any): void {
        console.log("completed is ",completed);
        console.log("total is ",total);
        this.loadRate = completed / total;
        console.log("============>>>loadRate is ",this.loadRate);
        if(this.loadRate <= 1 && this.progressComponent) {
            this.progressComponent.progress = this.loadRate;
            this.node.getChildByName("lizi").x = this.loadRate * this.progressComponent.node.width;
            if(this.loadRate === 1) {
                if(!this.sceneLoaded) {
                    // cc.director.loadScene("ThreeD");
                    this.sceneLoaded = true;
                }
            }
        }
    }
    update (dt) {
        console.log("loadRate is ",this.loadRate);
    }
}
