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
export default class NewClass extends cc.Component {
    @property({
        type: cc.ProgressBar
    })
    byteProgress: cc.ProgressBar;
    @property({
        type: cc.ProgressBar
    })
    fileProgress: cc.ProgressBar;
    @property({
        type: cc.Label
    })
    fileLabel: cc.Label;
    @property({
        type: cc.Label
    })
    byteLabel: cc.Label;
    
    private fileRate: number = 0;
    private byteRate: number = 0;

    onLoad () {
        if(!cc.sys.isNative) {
            return;
        }
    }

    start () {

    }
    // 检查更新
    checkUpdate(): void {
        // 原生平台
        if(CC_JSB) {
            jsb
        }
    }
    // 立即更新
    updateNow(): void {
        
    }

    update (dt) {
        this.fileRate += dt;
        this.byteRate += dt;
        if(this.fileRate >= 1) {
            this.fileRate = 1;
            this.fileProgress.progress = this.fileRate;
        }
        if(this.byteRate >= 1) {
            this.byteRate = 1;
            this.byteProgress.progress = this.byteRate;
        }
    }
}
