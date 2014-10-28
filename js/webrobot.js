/**
 * Created by wei.wang on 14-10-28.
 */
(function(){
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
        bigonece:"bigoneceanimate",
        /*眯眼*/
        squinteye:"squinteye",
        /*星星眼*/
        starteye:"starteye"
    }

    var WebRobot = function(host,opt){
        var self = this;

        self._aniName = _animationCss;
        /* Dom */
        self._rootDom = $(_template);
        self._bodyDom = null;
        self._headDom = null;
        self._leftEyeDom = null;
        self._rightEyeDom = null;
        self._leftHandDom = null;
        self._rightHandDom = null;

        var _f = {
            initDom:function(){
                self._bodyDom = self._rootDom.find("#body");
                self._headDom = self._rootDom.find("#head");
                self._leftEyeDom = self._rootDom.find("#lefteye");
                self._rightEyeDom = self._rootDom.find("#righteye");
                self._leftHandDom = self._rootDom.find("#lefthand");
                self._rightHandDom = self._rootDom.find("#righthand");
            },
            init:function(){
                this.initDom();
                if(host)
                    $(host).append(self._rootDom);
                else
                    $("body").append(self._rootDom);
            }
        }
        _f.init();
    }
    WebRobot.prototype = {
        setDefaultCss : function(){
            var self = this;
            self.setBodyDefault();
            self.setHeadDefault();
            self.setEyesDefault();
            self.setHandDefault();
        },
        setBodyDefault:function(){
            var self = this;
            self._bodyDom.removeClass().addClass("robot-body body-shadow");
        },
        setHeadDefault:function(){
            var self = this;
            self._headDom.removeClass().addClass("robot-head head-shadow");
        },
        setEyesDefault:function(){
            var self = this;
            self._leftEyeDom.removeClass().addClass("left-eye eye");
            self._rightEyeDom.removeClass().addClass("right-eye eye");
        },
        setHandDefault:function(){
            var self = this;
            self._leftHandDom.removeClass().addClass("left-hand robot-hand");
            self._rightHandDom.removeClass().addClass("right-hand robot-hand");
        },
        blinkEye:function(flag){
            var self = this;
            self.setEyesDefault();
            if(flag === false)
                return;
            self._leftEyeDom.addClass(_animationCss.blinkeye);
            self._rightEyeDom.addClass(_animationCss.blinkeye);
        },
        squintEye:function(flag){
            var self = this;
            self.setEyesDefault();
            if(flag === false)
                return;
            self._leftEyeDom.addClass(_animationCss.squinteye);
            self._rightEyeDom.addClass(_animationCss.squinteye);
        },
        startEye:function(flag){
            var self = this;
            self.setEyesDefault();
            if(flag === false)
                return;
            self._leftEyeDom.addClass(_animationCss.starteye);
            self._rightEyeDom.addClass(_animationCss.starteye);
        },
        retractedHead:function(flag){
            var self = this;
            self.setHeadDefault();
            if(flag === false)
                return;
            self._headDom.addClass(_animationCss.retractedhead);
        },
        raiseHead:function(flag){
            var self = this;
            self.retractedHead();
            if(flag === false)
                return;
            self._headDom.addClass(_animationCss.raisehead);
        },
        heightToRaiseHead:function(flag){
            var self = this;
            self.setHeadDefault();
            if(flag === false)
                return;
            self._headDom.addClass(_animationCss.raiseheadtoheight);
        },
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
        waveHand:function(flag){
            var self = this;
            self.setHandDefault();
            if(flag === false)
                return;
            self._leftHandDom.addClass(_animationCss.wavehand);
            self._rightHandDom.addClass(_animationCss.wavehand);
        }
    }

    window.WebRobot = WebRobot;
})();