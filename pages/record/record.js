var app = getApp(), utils = require("../../utils/util");

Page({
    /**
   * 页面的初始数据
   */
    data: {
        recordList: [],
        //记录列表
        userid: 0,
        examine: 0
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {},
    getRecord: function getRecord() {
        var that = this;
        wx.showLoading({
            title: "加载中"
        });
        wx.login({
            success: function success(code) {
                utils.getRequest("/getRecord?code=" + code.code).then(function(res) {
                    console.log(res);
                    wx.hideLoading();
                    if (res.data.code == 200) {
                        that.setData({
                            recordList: res.data.recordList,
                            userid: res.data.user_id,
                            examine: res.data.examine
                        });
                    } else {
                        wx.showModal({
                            title: "提示",
                            content: res.data.msg,
                            showCancel: !1,
                            confirmText: "重试",
                            success: function success() {
                                that.getClassDatas();
                            }
                        });
                    }
                }).catch(function(res) {
                    wx.hideLoading();
                    console.log(res);
                    wx.showModal({
                        title: "提示",
                        content: "网络请求超时",
                        confirmText: "重试",
                        success: function success() {
                            that.getClassDatas();
                        }
                    });
                });
            }
        });
    },
    copyUser: function copyUser() {
        var that = this;
        wx.setClipboardData({
            data: that.data.userid,
            success: function success(a) {
                wx.showToast({
                    title: "复制成功",
                    duration: 1200
                });
            }
        });
    },
    copykm: function copykm(t) {
        console.log(t);
        var id = t.currentTarget.dataset.key, km = this.data.recordList[id].key_secret;
        wx.setClipboardData({
            data: km,
            success: function success(a) {
                wx.showToast({
                    title: "复制成功",
                    duration: 1200
                });
            }
        });
    },
    copyUsetip: function copyUsetip(t) {
        console.log(t);
        var id = t.currentTarget.dataset.key, usetip = this.data.recordList[id].usetip;
        wx.setClipboardData({
            data: usetip,
            success: function success(a) {
                wx.showToast({
                    title: "复制成功",
                    duration: 1200
                });
            }
        });
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function onReady() {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {
        this.getRecord();
    },
    /**
   * 生命周期函数--监听页面隐藏
   */
    onHide: function onHide() {},
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function onUnload() {},
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function onPullDownRefresh() {},
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function onReachBottom() {},
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function onShareAppMessage() {}
});