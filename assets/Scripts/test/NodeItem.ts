const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeItem extends cc.Component {

    onLoad () {
        // this.node.selected = false;s
        // this.node.on("touchend",this.onSelect,this.node);
    }
    unuse(): void {
        // this.node.off("touchend",this.onSelect,this.node);
        console.log("该对象被回收");
    }
    reuse(): void {
        // this.node.on()
        console.log("该对象被重新使用，重新使用的时候一定要重置它的坐标");
        console.log("该对象的y坐标为：",this.node.x);
    }
    start () {

    }

    update (dt) {

    }
}
