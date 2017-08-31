<template>
    <div class="content">
        <div class="scan-btn-bg" @click="doScan">
            <i class="iconfont icon-erweima scan-icon"></i>
        </div>
        <div class="scan-label">
            <h4>二维码扫描</h4>
        </div>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        text-align: center;
        padding-top: 100PX;
    }

    .scan-btn-bg {
        border-radius: 50%;
        width: 200PX;
        height: 200PX;
        background-color: #0a6bb7;
        position: relative;
        margin: auto;
    }

    .scan-icon {
        font-size: 100PX;
        color: white;
        position: absolute;
        top: 50PX;
        left: 50PX;
    }

    .scan-label {
        margin-top: 20PX;
    }
</style>

<script type="text/javascript">
    export default {
        data(){
            return {
                page: 'about'
            }
        },
        components: {},
        methods: {
            scanQRCode: function (callback) {
                SDK.scan(
                    function (ret) {
                        console.log("扫描结果" + ret);
                        callback(ret);
                    },
                    false
                );
            },
            scanCallBack: function (ret) {
                if (ret) {
                    this.$router.push({path: '/uploadPage', query: {XH: ret}});
                } else {
                    this.$router.push('/noInfoPage');
                }
            },
            doScan: function () {
                this.scanQRCode(this.scanCallBack);
            }
        }
    }
</script>
