const {ccclass, property} = cc._decorator;
import {Const} from "../Global";
import NodePoint from "./NodePoint";
import AStar from "./AStar";
interface Position {
    x: number,
    y: number
}
@ccclass
export default class Map extends cc.Component {
    @property({
        type: cc.Prefab
    })
    mould: cc.Prefab = null;
    @property({
        type: cc.Node
    })
    hero: cc.Node = null;
    // 地图相关的二维数组
    public grid: cc.Node[][] = null;
    // 临时的二维数组存放是否有障碍物的
    private tempArr: number[][] = null;
    // 点击地图的终点坐标
    public targetPosition: cc.Node;
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // 与地图对应的二维数组
        this.tempArr = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,0,2,2,2,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,1,1,1,0,1,1,1,0,0,2,0,0,0,0,0],
            [0,0,0,0,2,2,2,2,0,0,2,0,0,0,0,0,0,0,1,1,1,1,0,0,2,0,0,0,0,0],
            [0,0,0,2,2,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,2,0,0,0,0,0],
            [0,0,0,2,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,0,0,0,2,0,0,0,0,0],
            [0,0,2,2,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0,0,2,0,0,0,0,0],
            [0,0,2,0,0,0,1,0,2,0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,2,0,0,0,0,0],
            [0,0,2,0,0,1,1,0,2,0,0,0,0,0,0,0,1,1,1,0,0,0,0,2,0,0,0,0,0,0],
            [0,0,2,0,0,1,0,0,2,0,0,0,0,1,1,1,0,0,1,1,1,0,0,2,0,0,0,0,0,0],
            [0,0,2,0,0,1,0,0,2,2,0,1,1,2,2,2,2,2,2,2,1,1,1,2,0,0,0,0,0,0],
            [0,0,2,0,0,1,1,0,0,2,0,1,1,1,1,0,0,0,0,2,2,0,1,2,0,0,0,0,0,0],
            [0,0,2,0,0,0,1,0,2,2,0,0,0,0,1,1,1,1,1,1,2,0,1,2,0,0,0,0,0,0],
            [0,0,2,0,0,0,0,1,0,2,2,2,2,2,0,0,0,0,0,0,2,0,1,2,0,0,0,0,0,0],
            [0,0,2,0,0,0,0,0,1,1,1,0,0,2,2,2,2,2,2,2,2,0,1,2,0,0,0,0,0,0],
            [0,0,2,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,2,0,0,0,0,0,0],
            [0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,2,0,0,0,0,0,0],
            [0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,1,0,0,2,2,0,0,0,0,0],
            [0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,1,1,0,0,0,2,2,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,2,0,0,0,0,0,0]
        ];
        // this.node.on("touchstart",this.touchback,this);
    }
    private touchback(event: cc.Touch): void {
        console.log("event is ",event);
        // 获得终点坐标
        // let target = event.target as cc.Node;
        let localPosition: cc.Vec2 = this.node.convertToNodeSpaceAR(event.getLocation());
        console.log("localPosition si ",localPosition);
    }
    // 创建地图二位数组
    start () {
        this.grid = [];
        console.log("Const is ",Const.BLOCKHEIGHT);
        let count = 0;
        for(let i = 0; i < Const.ROWS; i++) {
            this.grid[i] = [];
            for(let j = 0; j < Const.COLUMNS; j++) {
                count++;
                let tempX: number = j * Const.BLOCKWIDTH;
                let tempY: number = (Const.ROWS - 1) * Const.BLOCKWIDTH - i * Const.BLOCKHEIGHT;
                this.grid[i][j] = this.createPrefabItem(this.mould,this.node,tempX,tempY);
                
                this.grid[i][j].getComponent("NodePoint").x = tempX;
                this.grid[i][j].getComponent("NodePoint").y = tempY;
                this.grid[i][j].getComponent("NodePoint").row = i;
                this.grid[i][j].getComponent("NodePoint").column = j;
                this.grid[i][j].name = i + "_" + j;
                // 添加监听事件
                this.grid[i][j].on("touchstart",this.touchGrid,this);
                if(this.tempArr[i][j] === 1 || this.tempArr[i][j] === 2) {
                    console.log("该节点下的脚本组件是：",this.grid[i][j].getComponent("NodePoint").status);
                    // 设置障碍物
                    this.grid[i][j].getComponent("NodePoint").status = 1;
                } else {
                    this.grid[i][j].getComponent("NodePoint").status = 0;
                }
            }
        }
        console.log("count is ",count);
        console.log("grid is ",this.grid);
    }
    private touchGrid(event: cc.Event): void {
        let target = event.target as cc.Node;
        let name: string = target.name;
        let row: number = Number(name.split("_")[0]);
        let column: number = Number(name.split("_")[1]);
        this.targetPosition = target;
        console.log("终点是：",this.targetPosition);
        AStar.getInstance().setStartNode(this.hero);
        AStar.getInstance().setEndNode(this.targetPosition);
        AStar.getInstance().setMap(this);
        // 开始寻路
        AStar.getInstance().findPath();
    }
    /**
     * @param  {cc.Prefab} 需要加工成节点的预制体
     * @param  {cc.Node} 生成节点的父节点
     * @param  {number} x 生成节点的x坐标
     * @param  {number} y 生成节点的y坐标
     * @returns cc
     */
    private createPrefabItem(prefab: cc.Prefab,parent: cc.Node,x: number,y: number): cc.Node {
        let node = cc.instantiate(prefab);
        node.parent = parent;
        node.x = x;
        node.y = y;
        return node;
    }

    // update (dt) {}
}
