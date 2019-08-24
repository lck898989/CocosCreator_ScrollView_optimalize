
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
    @property({
        type: cc.Asset
    })
    manifesetUrl: cc.Asset = null;
    @property({
        type: cc.Label
    })
    oupPut: cc.Label = null;
    private fileRate: number = 0;
    private byteRate: number = 0;
    

    private am: any;
    private storagePath: string;
    onLoad () {
        if(!cc.sys.isNative) {
            return;
        }
    }
    
    start () {
        if(cc.sys.isNative) {
            console.log("is native plateform");
            try {
                console.log("Jsb is ",jsb);
                this.storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "blackjace-remote-asset";
                console.log("storegePaht is ",this.storagePath);
                this.am = new jsb.AssetsManager("",this.storagePath);
                console.log("am is ",this.am);
                // this.am.setVerifyCallback((path,asset) => {
                //     console.log("path is ",path);
                //     console.log("asset is ",asset);
                // })
            } catch(e) {
                console.log("e is ",e);
            }
        }
        
    }
    // 检查更新
    checkUpdate(): void {
        // 原生平台
        if(CC_JSB) {
            this.oupPut.string = "enter native plateform";
            this.oupPut.string = "am's state is " + this.am.getState();
            console.log("state is ",this.am.getState());
            console.log("jsb's state is ",jsb.AssetsManager.State.UNINITED);
            if(this.am.getState() === jsb.AssetsManager.State.UNINITED) {

                let url = this.manifesetUrl.nativeUrl;
                console.log("Url is ",url);
                this.oupPut.string = "url is " + url;
                console.log("loader's md5Pipe is ",cc.loader.md5Pipe);
                if(cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                    console.log("after transfrom url is ",url);
                }
                this.oupPut.string = "url is " + url;
                this.am.loadLocalManifest(url);
                if(!this.am.getLocalManifest() || !this.am.getLocalManifest().isLoaded()) {
                    this.oupPut.string = "can not loaded manifest file";
                    return;
                }
                this.oupPut.string = "checking....";
                this.am.setEventCallback(this.checkCallback.bind(this));
                this.am.checkUpdate();
            } else {
                this.oupPut.string = "up to date";
            }
        }
    }
    // 检查更新的回调函数
    private checkCallback(event: any): void {
        let self = this;
        console.log("code is ",event.getEventCode());
        this.oupPut.string = "===>>>> checking over";
        switch(event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.oupPut.string = "No local manifest file found,hot update skipped";
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.oupPut.string = "Fail to download manifest file";
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.oupPut.string = "Alread up to date with the latest remote version";
                self.node.active = false;
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.oupPut.string = "NEW version found,please try to update";
                break;
            default:
                return;    

        }
        this.am.setEventCallback(null);
    }   
    // 立即更新
    updateNow(): void {
        if(this.am) {
            // 绑定事件
            this.am.setEventCallback(this.updateCallback.bind(this));
            if(this.am.getState() === jsb.AssetsManager.State.UNINITED) {
                let url = this.manifesetUrl.nativeUrl;
                if(cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                this.am.loadLocalManifest(url);
            }
            this.am.update();
        }
    }
    // 更新回调函数
    private updateCallback(event: any): void {
        let needRestart: boolean = false;
        switch(event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.oupPut.string = "no local manifest file found";
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.fileProgress.progress = event.getPercentByFile();
                this.fileLabel.string = event.getDownloadedFiles() + " / " + event.getTotalFiles();
                let rate = event.getDownloadedFiles() / event.getTotalFiles();
                if(rate >= 1) {
                    this.node.active = false;
                    // cc.director.loadScene("New");
                }
                let message = event.getMessage();
                if(message) {
                    this.oupPut.string = "Update file: " + message;
                }
                break;
            case jsb.EventAssetsManager.ERROR.DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.oupPut.string = "fail to download manifest file";
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.oupPut.string = "already up to date";
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.oupPut.string = "update finished";
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.oupPut.string = "update file failed";
                needRestart = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this.oupPut.string = "on updating occure error";
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.oupPut.string = event.getMessage();
                break;
            default:
                break;    
        }
        // 需要重新启动         
        if(needRestart) {
            this.am.setEventCallback(null);
            // 得到manifest的搜索路径
            let searchPaths = jsb.fileUtils.getSearchPaths();
            console.log("searchPath si ",searchPaths);
            let newPaths = this.am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths,newPaths);
            console.log("searchPaths is ",searchPaths);
            console.log("newPaths is ",newPaths);
            cc.sys.localStorage.setItem("HotUpdateSearchPaths",JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
            // 重启游戏
            cc.game.restart();
        }
    }
    update (dt) {
        
    }
}
