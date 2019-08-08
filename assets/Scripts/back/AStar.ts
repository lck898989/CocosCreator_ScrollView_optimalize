import Map from "./Map";
import { Const } from "../Global";
import Hero from "./Hero";
import NodePoint from "./NodePoint";
export default class AStar {
    // A* 算法实例
    private static __instance: AStar = null;
    // 开放列表和封闭列表
    private openList: cc.Node[] = [];
    private closedList: cc.Node[] = [];
    // 网格数据对象
    private map: Map;
    // 结束节点
    private endNode: cc.Node;
    // 开始节点
    private startNode: cc.Node;
    // 找到的路径节点数组
    private path: cc.Node[];
    // 佛洛依德路径数组
    private floydPath: cc.Node[];
    // 是否结束寻路
    public isEnd: boolean = false;
    // 启发函数方法
    private qifa: Function = this.inspire;
    // 直线行走代价权值
    private straightCost: number = 1;
    // 对角线代价权值
    private diagCost: number = Math.SQRT2;
    constructor() {     
    }
    public setMap(map: Map): void {
        this.map = map;
    }
    public getMap(): Map {
        return this.map;
    }
    public setStartNode(startNode: cc.Node): void {
        this.startNode = startNode;
    }
    public getStartNode(): cc.Node {
        return this.startNode;
    }
    public setEndNode(endNode: cc.Node): void {
        this.endNode = endNode;
    }
    public getEndNode(): cc.Node {
        return this.endNode;
    }
    // 单例模式获取A*算法
    public static getInstance(): AStar {
        if(!this.__instance) {
            this.__instance = new AStar();
            return this.__instance;
        }
        return this.__instance;
    }
    // 启发函数
    private inspire(node: cc.Node): number {
        let dx = Math.abs(node.x - this.endNode.x);
        let dy = Math.abs(node.y - this.endNode.y);
        let diag = Math.min(dx,dy);
        let res: number = dx + dy;
        return 1.4 * diag + this.straightCost * (res - 2 * diag);
    }
    public findPathMethod(): boolean {
        // 将当前节点加入到开放列表
        this.openList = [];
        this.closedList = [];
        let heroComponent: Hero = this.map.hero.getComponent("Hero");
        // 从开始节点的左上角到右下角九宫格中计算每个对象的f,g,h值
        console.log("英雄的位置是：",this.map.hero.x,this.map.hero.y);
        console.log("英雄的位置是：",this.map.hero.getComponent("Hero").row,this.map.hero.getComponent("Hero").column);
        let currentRow: number = this.map.hero.getComponent("Hero").row;
        let currentColumn: number = this.map.hero.getComponent("Hero").column;
        this.map.grid[currentRow][currentColumn].getComponent("NodePoint").g = 1;
        this.map.grid[currentRow][currentColumn].getComponent("NodePoint").h = this.qifa(this.map.grid[currentRow][currentColumn]);
        this.map.grid[currentRow][currentColumn].getComponent("NodePoint").f = this.map.grid[currentRow][currentColumn].getComponent("NodePoint").g + this.map.grid[currentRow][currentColumn].getComponent("NodePoint").h;
        this.openList.push(this.map.grid[currentRow][currentColumn]);
        return this.findPath();
    }
    // 寻找路径
    public findPath(): boolean {
        // 九宫格中心节点
        let node: cc.Node;
        while(!this.isEnd) {
            // 获得九宫格总的中心节点
           node = this.openList[0];
           // 当前处于开发列表中的哪一个
           let currentNum = 0;
           // 获取英雄绑定的Hero组件
           for(let i = 0; i < this.openList.length; i++) {
                if(this.openList[i].getComponent("NodePoint").f < node.getComponent("NodePoint").f) {
                    node = this.openList[i];
                    currentNum = i;
                }
           }
           this.openList[currentNum] = this.openList[this.openList.length - 1];
           this.openList.pop();
           // 将九宫格中心节点放入到封闭节点中
           this.closedList.push(node);
           let nodeComponent: NodePoint = node.getComponent("NodePoint");
           // 每次开始寻路的开始行和列确保始终在九宫格内部
           let startY: number = nodeComponent.row - 1 < 0 ? 0 : nodeComponent.row - 1;
           let endY: number = nodeComponent.row + 1 > Const.ROWS ? Const.ROWS : nodeComponent.row + 1;
           let startX: number = nodeComponent.column - 1 < 0 ? 0 : nodeComponent.column - 1;
           let endX: number = nodeComponent.column + 1 > Const.COLUMNS ? Const.COLUMNS : nodeComponent.column + 1;
           // 将该英雄所在位置的节点加入到封闭列表其他不是该节点加入到开放列表
           this.closedList.push(this.map.grid[nodeComponent.row][nodeComponent.column]);  
           for(let i = startY; i < endY; i++) {
               for(let j = startX; j < endX; j++) {
                   let nodeItem: cc.Node = this.map.grid[i][j];
                   // 当前节点或者是左下角是障碍物不能通行
                   if(j === nodeComponent.row && i === nodeComponent.column || this.map.grid[j][i].getComponent("NodePoint").status || this.map.grid[i][j].getComponent("NodePoint").status) {
                       // 如果遍历到英雄的位置跳过
                       continue;
                   }
                   // 计算节点的f,g,h的值
                   nodeItem.getComponent("NodePoint").g = 1;
                   nodeItem.getComponent("NodePoint").h = this.qifa(nodeItem);
                   nodeItem.getComponent("NodePoint").f = nodeItem.getComponent("NodePoint").g + nodeItem.getComponent("NodePoint").h;
   
               }
           }
        }
        
    }
}