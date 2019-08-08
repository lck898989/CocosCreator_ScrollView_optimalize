const {ccclass, property} = cc._decorator;

@ccclass
export default class WebSocketLegton extends cc.Component {
    private ws: WebSocket = null;
    // LIFE-CYCLE CALLBACKS:
    private url: string = "";
    // 心跳检测值
    private lastHeartBeat: number = 0;
    private overTime: number = 0;
    private heartCheck: {timeout: number,timeoutObj: number,reset: Function,start: Function};
    onLoad () {
        this.init(this.url);
    }
    init(url: string): void {
        let self = this;
        this.url = url;
        if(!this.ws) {
            this.ws = new WebSocket(this.url);
        } else {

        }
        // 心跳检测
        self.heartCheck = {
            timeout: 8000,
            timeoutObj: null,
            reset: function() {
                clearTimeout(this.timeoutObj);
                return this;
            },
            start: function() {
                this.timeoutObj = setTimeout(() => {
                    self.ws.send("1");
                },this.timeout)
            }
        }
        this.lastHeartBeat = new Date().getTime();
        this.overTime = 8000;

        this.ws.onclose = function() {
            self.reconnect();
        }
        this.ws.onerror = function() {
            self.reconnect();
        }
        this.ws.onopen = function() {
            // 开启心跳检测
            self.heartCheck.reset().start();
        }
        
    }
    reconnect(): void {
        let self = this;
        setTimeout(() => {
            self.ws = new WebSocket(self.url);
            self.ws.onclose = function() {
                self.reconnect();
            }
            self.ws.onerror = function() {
                self.reconnect();
            }
        },2000);
    }
    start () {

    }

    update (dt) {

    }
}
