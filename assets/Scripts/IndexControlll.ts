const {ccclass, property} = cc._decorator;

@ccclass
export default class IndexControll extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property({
        type: cc.Node
    })
    back: cc.Node = null;
    @property({
        type: cc.Node
    })
    neverNode: cc.Node = null;
    onLoad () {
        this.back.on("touchstart",this.tapBack.bind(this));
    }
    tapBack() {
        let self = this;
        self.neverNode.active = false;
    }
    start () {

    }
    goTest(): void {
        cc.director.loadScene("Test1");
    }
    goMain(): void {
        cc.director.loadScene("main");
    }
    go3D(): void {
        cc.director.loadScene("ThreeD");
    }
    goNew(): void {
        cc.director.loadScene("New");
    }
    update (dt) {
        
    }
}
