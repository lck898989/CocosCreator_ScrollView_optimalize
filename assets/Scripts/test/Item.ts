const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    public itemId: number = 0;
    @property({
        type: cc.Label
    })
    scoreLabel: cc.Label = null;
    @property({
        type: cc.Label
    })
    levelLabel: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }
    setItemId(itemId: number): void {
        this.itemId = itemId;
    }
    setScore(scoreString: string): void {
        this.scoreLabel.string = scoreString;
    }
    setLevel(levelString: string): void {
        this.levelLabel.string = levelString;
    }
    setAvatar(url: string): void {
        let self = this;
        console.log("url is ",url);
        if(url) {
            cc.loader.loadRes(url,cc.SpriteFrame,(err,data) => {
                self.node.getChildByName("avatar").getComponent(cc.Sprite).spriteFrame = data;
            })
        }
    }
    start () {

    }

    update (dt) {

    }
}
