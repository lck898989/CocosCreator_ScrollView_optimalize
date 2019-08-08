const {ccclass, property} = cc._decorator;

@ccclass
export default class Hero extends cc.Component {
    private path: cc.Node[];
    // 英雄所处的行和列
    public row: number = 17;
    public column: number = 4;

    onLoad () {

    }

    start () {

    }

    // update (dt) {}
}
