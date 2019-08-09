// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Progress extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    private progressComponent: cc.ProgressBar = null;
    onLoad () {
        this.progressComponent = this.node.getComponent(cc.ProgressBar);
        let url = "https://bpic.588ku.com/back_list_pic/19/04/12/ab9fa91d8e07981e8e42deba66d15e12.jpg";
        cc.loader.load(url,(completed,total,item) => {
            console.log("completed si ",completed);
            console.log("total si ",total);
        },(err,texture) => {
            console.log("textures is ",texture);
        })

    }

    start () {

    }

    update (dt) {
        this.progressComponent.progress += dt;
        if(this.progressComponent.progress >= 1) {
            this.progressComponent.progress = 1;
        }
        if(this.progressComponent.progress <= 1) {
            this.node.getChildByName("lizi").x = this.node.width * this.progressComponent.progress;
            if(this.progressComponent.progress === 1) {
                // this.node.removeChild(this.node.getChildByName("lizi"));
                
                console.log(cc.director.loadScene("Test1"));
            }
        }
        // console.log(this.node.getChildByName("bar").x);

    }
}
