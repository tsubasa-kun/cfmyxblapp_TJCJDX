/**
 * WEBPACK_CONIFG_HOST的值，在webpack.config.js中更改
 * 开发环境时 = "http://amptest.wisedu.com/xsfwfw/"
 * 发布环境时 = location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"
 */

export default {
    getWechatSign: 'http://res.wisedu.com:9090/checkSign',
    SAVE_PHOTO_INFO: WEBPACK_CONIFG_HOST + '/sys/xszyxbapp_tjufe/MobileService/saveZpId.do'
}
