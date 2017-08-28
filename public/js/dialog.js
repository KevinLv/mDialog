
    function Dialog(config){
        var _this_ = this;
        /*配置文件*/
        this.config = {
            /*弹出信息*/
            message:'你输入的信息有误',
            /*弹出框图标*/
            type:'',
            /*弹出框按钮组*/
            buttons:[{
                /*颜色*/
                type:"netColor",
                /*按钮文字*/
                text:"确定",
                // 点击按钮操作回调函数
                callback:null,
            },{
                type:"gray",
                text:"取消",
                callback:null,
            }],
            /*弹出框持续一段时间自动隐藏*/
            delay:null,
            /*弹框动画效果*/
            effect:true,
            /*点击遮罩层是否可以关闭弹框*/
            maskClick:true
        }

        if (config && $.isPlainObject(config)) {
            $.extend(this.config, config);
            /*console.log(this.config);*/
        }else{
            this.isConfig = true;
        }

        this.body = $('body');
        this.mask = $('<div class="dialog-mask">');
        this.container = $('<div class="dialog-container">');
        this.Header = $('<div class="dialog-header"></div>');
        this.content = $('<div class="dialog-content">');
        this.footer = $('<div class="dialog-footer">');
        this.creat();
    };

    Dialog.prototype = {
        animateFun: function() {
            var _this_ = this
            this.container.css({
                '-webkit-transform': 'scale(0,0)',
                '-moz-transform': 'scale(0,0)',
                'transform': 'scale(0,0)'
            });
            window.setTimeout(function() {
                _this_.container.css({
                    '-webkit-transform': 'scale(1,1)',
                    '-moz-transform': 'scale(1,1)',
                    'transform': 'scale(1,1)'
                });
            }, 100)
        },
        creat:function(){
            var _this_ = this,
            config = this.config,
            body = this.body,
            mask = this.mask,
            Header = this.Header,
            container = this.container,
            content = this.content,
            footer = this.footer;

            if(this.isConfig){
                console.log(config)
                mask.appendTo(body);
                container.appendTo(mask);
                content.text(this.config.message).appendTo(container);
            }else{
                if(config.type != ""){
                    Header.addClass(config.type).appendTo(container);
                }else{
                    Header.remove();
                }
                if(config.message){
                    content.html(config.message).appendTo(container);
                }
                if(config.buttons){
                    _this_.creatButtons(footer,config.buttons);
                    footer.appendTo(container);
                }
                if(config.delay && config.delay != 0){
                    window.setTimeout(function(){
                        _this_.close();
                    }, config.delay);
                }
                if(config.effect){
                    _this_.animateFun();
                }
                if(config.maskClick){
                    mask.on('click', function() {
                        event.stopPropagation();
                        _this_.close();
                    });
                    /*阻止container冒泡事件*/
                    container.on('click', function(event) {
                        event.stopPropagation();
                    });
                }
                container.appendTo(mask);
                mask.appendTo(body);
            };
        },

        /*自动创建按钮组*/
        creatButtons: function(footer,buttons) {
            var _this_ = this;
            $(buttons).each(function(i,el) {
                /*console.log(buttons[i]);*/
                var buttonType = this.type?this.type:"";
                var buttonText = this.text?this.text:"";
                var callback = this.callback?this.callback:"";
                /*创建按钮*/
                var button = $('<button class='+'"'+ buttonType +'"'+'>'+ buttonText +'</button>')
                if (callback) {
                    button.on('click', function(event) {
                        event.stopPropagation();
                        callback();
                    });
                }else{
                     button.on('click', function(event) {
                        event.stopPropagation();
                        _this_.close();
                    });
                 }

                button.appendTo(footer);
            });
        },
        /*自动隐藏弹出框方法*/
        close:function(){
            var mask = this.mask;
            mask.remove();
        }
    };
