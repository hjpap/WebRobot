/**
 * Created by wei.wang on 14-10-28.
 */
(function(){
    /* Event */
    var hasTouch = ('ontouchstart' in window) && window.navigator.platform!="Win32" ;
    var EventName = {
        RESIZE_EVENT:'onorientationchange' in window ?'orientationchange':'resize',
        START_EVENT: hasTouch?'touchstart':"mousedown",
        MOVE_EVENT:hasTouch?'touchmove':'mousemove',
        END_EVENT:hasTouch?'touchend':'mouseup',
        CANCEL_EVENT:hasTouch?'touchcancel':'mouseup',
        OVER_EVENT:'mouseover',
        LEAVE_EVENT:'mouseleave'
    }
    var _template = '<div class="webrobot">\
                        <div id="body" class="robot-body body-shadow">\
                            <div id="head" class="robot-head head-shadow">\
                                <div id="lefteye" class="left-eye eye">\
                                    <div class="robot-eyeball"></div>\
                                    <div class="robot-eyeball2"></div>\
                                </div>\
                                <div id="righteye" class="right-eye eye">\
                                    <div class="robot-eyeball"></div>\
                                    <div class="robot-eyeball2"></div>\
                                </div>\
                            </div>\
                            <div id="lefthand" class="left-hand robot-hand"></div>\
                            <div id="righthand" class="right-hand robot-hand"></div>\
                        </div>\
                        <div id="messagebox" class="messagebox"><div id="msgtext" class="msgtxt">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div><div id="msgclose" class="msgclose"></div></div>\
                    </div>';

    var _animationCss = {
        /*眨眼*/
        blinkeye:"blinkeyeanimate",
        /*摆手*/
        wavehand:"wavehandanimate",
        /*缩头*/
        retractedhead:"retractedheadanimate",
        /*抬头*/
        raisehead:"raiseheadanimate",
        /*抬高头*/
        raiseheadheight:"raiseheadheightanimate",
        /*抬高头到抬头*/
        raiseheadtoheight:"raiseheadtoheightanimate",
        /*身体大一下*/
        bigbody:"biganimate",
        /*身体恢复大小*/
        bigtodefaultbody:"bigtodefaulanimate",
        /*眯眼*/
        squinteye:"squinteye",
        /*星星眼*/
        starteye:"starteye",
        /*显示消息框*/
        showmsg:"showmsg"
    }

    var WebRobot = function(host,opt){
        var self = this;

        self._aniName = _animationCss;
        self._opt = {};
        for(var i in opt){
            self._opt[i] = opt[i];
        }

        /* Dom */
        self._rootDom = $(_template);
        self._bodyDom = null;
        self._headDom = null;
        self._leftEyeDom = null;
        self._rightEyeDom = null;
        self._leftHandDom = null;
        self._rightHandDom = null;
        self._messageBoxDom = null;

        var _f = {
            initDom:function(){
                self._bodyDom = self._rootDom.find("#body");
                self._headDom = self._rootDom.find("#head");
                self._leftEyeDom = self._rootDom.find("#lefteye");
                self._rightEyeDom = self._rootDom.find("#righteye");
                self._leftHandDom = self._rootDom.find("#lefthand");
                self._rightHandDom = self._rootDom.find("#righthand");
                self._messageBoxDom = self._rootDom.find("#messagebox");
            },
            init:function(){
                this.initDom();
                if(host)
                    $(host).append(self._rootDom);
                else
                    $("body").append(self._rootDom);
            }
        }

        var _e = {
            bodyEvent:function(){
                self.mouseDown = false;
                var moveFun;
                /* body mouse start */
                self._bodyDom.bind(EventName.START_EVENT,function(e){
                    self.mouseDown = true;
                    self._rootDom.css("left", e.pageX-5);
                    self._rootDom.css("top", e.pageY-2);

                    /*  mouse move */
                    $(document).bind(EventName.MOVE_EVENT,moveFun = function(e){
                        if(self.mouseDown){
                            self._rootDom.css("left", e.pageX-5);
                            self._rootDom.css("top", e.pageY-2);
                            if(self.bodyMouseMoveHandle){
                                self.bodyMouseMoveHandle(e);
                            }
                        }
                    });
                    $(document).bind(EventName.END_EVENT,moveEndFun = function(){
                        self.mouseDown = false;
                        $("body").unbind(EventName.MOVE_EVENT,moveFun);
                        $("body").unbind(EventName.MOVE_EVENT,moveEndFun);
                        if(self.bodyMouseUpHandle){
                            self.bodyMouseUpHandle(e);
                        }
                    });
                    if(self.bodyMouseDownHandle){
                        self.bodyMouseDownHandle(e);
                    }
                });

                /* body mouse end */
                self._bodyDom.bind(EventName.END_EVENT,function(e){
                    if(self.bodyMouseUpHandle){
                        self.bodyMouseUpHandle(e);
                    }
                });
                /* body mouse over */
                self._bodyDom.bind(EventName.OVER_EVENT,function(e){
                    if(self.bodyMouseOverHandle){
                        self.bodyMouseOverHandle(e);
                    }
                });
                /* body mouse leave */
                self._bodyDom.bind(EventName.LEAVE_EVENT,function(e){
                    if(self.bodyMouseLeaveHandle){
                        self.bodyMouseLeaveHandle(e);
                    }
                });
            },
            msgEvent:function(){
                self._messageBoxDom.find("#msgclose").bind(EventName.END_EVENT,function(e){
                   self.showMsg();
                });
            },
            init:function(){
                this.bodyEvent();
                this.msgEvent();
            }
        }
        _f.init();
        _e.init();
    }
    WebRobot.prototype = {
        /* robot default state */
        defaultRobotState:null,
        /* action */
        /*
         *初始化robot
         * */
        setDefaultCss : function(){
            var self = this;
            self.setBodyDefault();
            self.setHeadDefault();
            self.setEyesDefault();
            self.setHandDefault();
        },
        /*
        *初始化body
        * */
        setBodyDefault:function(){
            var self = this;
            self._bodyDom.removeClass().addClass("robot-body body-shadow");
        },
        /*
         *初始化head
         * */
        setHeadDefault:function(){
            var self = this;
            self._headDom.removeClass().addClass("robot-head head-shadow");
        },
        /*
         *初始化eyes
         * */
        setEyesDefault:function(){
            var self = this;
            self._leftEyeDom.removeClass().addClass("left-eye eye");
            self._rightEyeDom.removeClass().addClass("right-eye eye");
        },
        /*
         *初始化hand
         * */
        setHandDefault:function(){
            var self = this;
            self._leftHandDom.removeClass().addClass("left-hand robot-hand");
            self._rightHandDom.removeClass().addClass("right-hand robot-hand");
        },
        /*
         *眨眼
         * */
        blinkEye:function(flag){
            var self = this;
            self.setEyesDefault();
            if(flag === false)
                return;
            self._leftEyeDom.addClass(_animationCss.blinkeye);
            self._rightEyeDom.addClass(_animationCss.blinkeye);
        },
        /*
         *眯眼
         * */
        squintEye:function(flag){
            var self = this;
            self.setEyesDefault();
            if(flag === false)
                return;
            self._leftEyeDom.addClass(_animationCss.squinteye);
            self._rightEyeDom.addClass(_animationCss.squinteye);
        },
        /*
         *迷糊眼
         * */
        startEye:function(flag){
            var self = this;
            self.setEyesDefault();
            if(flag === false)
                return;
            self._leftEyeDom.addClass(_animationCss.starteye);
            self._rightEyeDom.addClass(_animationCss.starteye);
        },
        /*
         *缩头
         * */
        retractedHead:function(flag){
            var self = this;
            self.setHeadDefault();
            if(flag === false)
                return;
            self._headDom.addClass(_animationCss.retractedhead);
        },
        /*
         *抬头
         * */
        raiseHead:function(flag){
            var self = this;
            self.retractedHead();
            if(flag === false)
                return;
            self._headDom.addClass(_animationCss.raisehead);
        },
        /*
         *头从很高的状态复原到抬头状态
         * */
        heightToRaiseHead:function(flag){
            var self = this;
            self.setHeadDefault();
            if(flag === false)
                return;
            self._headDom.addClass(_animationCss.raiseheadtoheight);
        },
        /*
         *抬高头状态
         * */
        raiseHeightHead:function(flag){
            var self = this;
            if(flag === "raise"){
                self.heightToRaiseHead();
                return;
            }
            self.retractedHead();
            if(flag === false)
                return;
            self._headDom.addClass(_animationCss.raiseheadheight);
        },
        /*
         *摇摆手
         * */
        waveHand:function(flag){
            var self = this;
            self.setHandDefault();
            if(flag === false)
                return;
            self._leftHandDom.addClass(_animationCss.wavehand);
            self._rightHandDom.addClass(_animationCss.wavehand);
        },
        /*
         *身体变大
         * */
        bigBody:function(flag){
            var self = this;
            self.setBodyDefault();
            if(flag === false)
                return;
            self._bodyDom.addClass(_animationCss.bigbody);
        },
        /*
         *复原身体状态
         * */
        bigBodyToDefault:function(flag){
            var self = this;
            self.setBodyDefault();
            if(flag === false)
                return;
            self._bodyDom.addClass(_animationCss.bigtodefaultbody);
        },
        /*
         *显示消息框 - 带内容 - 说话
         * */
        say:function(msg){
            var self = this;
            self._messageBoxDom.find("#msgtext").text(msg);
            self.showMsg(true);
        },
        /* emotion */
        /*
         *着急地
         * */
        fretfully:function(flag){
            var self = this;
            if(self.defaultRobotState)
                self.defaultRobotState();
            else
                self.setDefaultCss();
            if(flag === false)
                return;
            self.waveHand();
            self.raiseHeightHead();
            self.startEye();
        },
        /* customer event handle */
        bodyMouseDownHandle:null,
        bodyMouseUpHandle:null,
        bodyMouseMoveHandle:null,
        bodyMouseOverHandle:null,
        bodyMouseLeaveHandle:null,
        /*
         *显示消息框
         * */
        showMsg:function(flag){
            var self = this;
            if(!flag){
                if(self._messageBoxDom.hasClass(_animationCss.showmsg))
                    self._messageBoxDom.removeClass(_animationCss.showmsg);
                else
                    self._messageBoxDom.addClass(_animationCss.showmsg);
            }else if(flag == true){
                self._messageBoxDom.addClass(_animationCss.showmsg);
            }else{
                self._messageBoxDom.removeClass(_animationCss.showmsg);
            }
        }
    }

    window.WebRobot = WebRobot;
})();
