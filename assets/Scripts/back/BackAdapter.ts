const {ccclass, property} = cc._decorator;
// 背景图片适配
@ccclass
export default class BackAdapter extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 找到图片与canvas宽高比的最小值
        cc.size
        let minValue: number = Math.min(this.node.width / cc.view.getCanvasSize().width,this.node.height / cc.view.getCanvasSize().height);
        let realWidth: number = minValue * this.node.width;
        let realHeight: number = minValue * this.node.height;
        this.node.width = realWidth;
        this.node.height = realHeight;
        // 找到最大值
        let maxValue: number = Math.max(this.node.width / cc.view.getCanvasSize().width,this.node.height / cc.view.getCanvasSize().height);
        this.node.scale = maxValue;
    }

    start () {

    }

    // update (dt) {}
}
