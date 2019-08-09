const {ccclass, property} = cc._decorator;
@ccclass
export default class Progress extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    private progressComponent: cc.ProgressBar = null;
    private sceneLoaded: boolean = false;
    private loadRate: number = 0;
    onLoad () {
        cc.director.preloadScene("ThreeD",this.sceneLoadProgress.bind(this),null);
        this.progressComponent = this.node.getComponent(cc.ProgressBar);
        let url = "https://bpic.588ku.com/back_list_pic/19/04/12/ab9fa91d8e07981e8e42deba66d15e12.jpg";
        cc.loader.load(url,(completed,total,item) => {
            console.log("completed is ",completed);
            console.log("total is ",total);
        },(err,texture) => {
            console.log("textures is ",texture);
        })
    }

    start () {

    }
    sceneLoadProgress(completed: number,total: number,item: any): void {
        console.log("completed is ",completed);
        console.log("total is ",total);
        this.loadRate = completed / total;
        console.log("============>>>loadRate is ",this.loadRate);
        if(this.loadRate <= 1) {
            this.progressComponent.progress = this.loadRate;
            this.node.getChildByName("lizi").x = this.loadRate * this.progressComponent.node.width;
            if(this.loadRate === 1) {
                if(!this.sceneLoaded) {
                    cc.director.loadScene("ThreeD");
                    this.sceneLoaded = true;
                }
            }
        }
    }
    update (dt) {
        console.log("loadRate is ",this.loadRate);
        
        // this.progressComponent.progress += dt;
        // if(this.progressComponent.progress >= 1) {
        //     this.progressComponent.progress = 1;
        // }
        // if(this.progressComponent.progress <= 1) {
        //     this.node.getChildByName("lizi").x = this.node.width * this.progressComponent.progress;
        //     if(this.progressComponent.progress === 1) {
        //         // this.node.removeChild(this.node.getChildByName("lizi"));
        //         if(!this.sceneLoaded) {
        //             cc.director.loadScene("ThreeD");
        //             this.sceneLoaded = true;
        //         }
        //     }
        // }
    }
}
