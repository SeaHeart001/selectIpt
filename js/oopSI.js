
var SctIptFunction = function (selectorId) {
    var self = this;
    this.searchArr = [];
    this.msgStr = '';
    this.selectInput = $('#' + selectorId);
    this.selInputEle = this.selectInput.children('[name="inputCls"]');//input
    //this.selInputEle = $('<input name="selinput" type="text" placeholder="请输入或搜索">');//input
    this.itemWrapEle = $('<ul class="itemWrap" name="itemWrap"></ul>');//ul

    this.appendEle = function () {
        //this.selectInput.append(this.selInputEle);
        this.selectInput.append(this.itemWrapEle);
    };

    this.itemOptionEle = function (paramsArr) {
        var _html = '';
        for (var i = 0; i < paramsArr.length; i++) {
            var item = paramsArr[i];
            _html += '<li class="itemOption" name="itemOption">' +
                '<span class="itemName">' + item + '</span><span class="itemFlag">√</span>'
                + '</li>'
        }
        this.itemWrapEle.html(_html);
    };

    this.handleAll = function () {
        var itemEle = $('[name="itemWrap"] li');
        //console.log(lis);
        self.selInputEle.on('click', function (e) {
            e.stopPropagation();
            self.itemWrapEle.slideDown();
        });

        $(document).on('click', function (e) {
            self.itemWrapEle.slideUp();
        });

        itemEle.on('click', function (e) {
            e.stopPropagation();
            var _this = $(this);
            _this.children('.itemFlag').toggleClass('show');
            self.filterMsg();
        });

        self.selInputEle.on('keyup', function () {
            var text = $(this).val();
            var newArr = text.split(',');
            var $itemOption = $('[name="itemOption"]');
            $itemOption.each(function (index, item) {
                var msg = $(item).children('.itemName').text();
                if (newArr.indexOf(msg) == -1) {
                    $(item).children('.itemFlag').removeClass('show');
                } else {
                    $(item).children('.itemFlag').addClass('show');
                }
            });
            self.msgStr = text
        });
    }

    this.filterMsg = function () {
        self.searchArr = [];
        var $itemOption = $('[name="itemOption"]');
        $itemOption.each(function (index, item) {
            if ($(item).children('.itemFlag').hasClass('show')) {
                var msg = $(item).children('.itemName').text();
                if (self.searchArr.indexOf(msg) == -1) {
                    self.searchArr.push(msg);
                }
            }
        });
        self.msgStr = self.searchArr.join(',');
        self.selInputEle.val(self.msgStr);
    }

    //submitFun为提交的方法,两个参数，
    //第一个为input的dom，第二个为清空函数，(一般为函数逻辑成功时)调用即可
    this.submitFun = function (callback) {
        callback(self.selInputEle, self.clear);
    }

    this.clear = function () {
        var itemEle = $('[name="itemWrap"] li');
        itemEle.children('.itemFlag').removeClass('show');
        self.selInputEle.val('');
    }

    this.initMySelete = function (paramsArr) {
        this.appendEle();
        this.itemOptionEle(paramsArr);
        this.handleAll();
    }

}

