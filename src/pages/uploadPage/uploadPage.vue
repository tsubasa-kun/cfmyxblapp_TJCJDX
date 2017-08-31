<template>
    <div class="content">
        <div v-if="imgUrl" class="img-div" @click="choseUpload">
            <img :src="imgUrl">
        </div>
        <div v-else class="upload-btn" @click="choseUpload">
            <i class="iconfont icon-jiahao01 upload-icon"></i>
        </div>
        <div class="info-div">
            <div class="info-content">
                <span>学号：{{ XH }}</span>
                <!--<span>姓名：</span>-->
                <!--<span>院系：</span>-->
            </div>
        </div>
        <mt-button type="primary" size="large" class="submit-btn" @click="doSubmit">完成</mt-button>

        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<style scoped>
    .content {
        padding-top: 50PX;
    }

    .img-div {
        border: solid 1PX #e8e8e8;
        width: 140PX;
        height: 180PX;
        position: relative;
        margin: auto;
    }

    .img-div img {
        width: 140PX;
        height: 180PX;
    }

    .upload-btn {
        border: solid 1PX #e8e8e8;
        width: 140PX;
        height: 180PX;
        position: relative;
        margin: auto;
    }

    .upload-icon {
        font-size: 60PX;
        color: #e8e8e8;
        position: absolute;
        top: 60PX;
        left: 40PX;
    }

    .info-div {
        padding-top: 10PX;
    }

    .info-content {
        width: 140PX;
        margin: auto;
    }

    .info-content span {
        display: block;
        font-size: 16PX;
        margin-top: 6PX;
    }

    .submit-btn {
        margin-top: 50PX;
    }
</style>

<script type="text/javascript">
    import {Toast} from 'bh-mint-ui2';
    import {Indicator, Button, Actionsheet} from 'mint-ui';
    import Api from '../../api';
    export default {
        data() {
            return {
                XH: this.$route.query.XH,
                imgUrl: '',
                actions: [{name: '拍照', method: this.takePhoto},
                    {name: '从相册中选择', method: this.selectPhoto}],
                sheetVisible: false,
                token: '',
            }
        },
        components: {
            [Button.name]: Button,
            [Actionsheet.name]: Actionsheet
        },
        methods: {
            choseUpload: function () {
                this.sheetVisible = true;
            },
            selectPhoto: function () {
                SDK.takePhoto((ret) => {
                    let retData;
                    if (ret instanceof Array) {
                        retData = ret[0];
                    } else {
                        retData = ret;
                    }
                    this.upLoadPhoto(retData.url);
                }, 1);
            },
            takePhoto: function () {
                SDK.takeCamera(false, (ret) => {
                    let retData;
                    if (ret instanceof Array) {
                        retData = ret[0];
                    } else {
                        retData = ret;
                    }
                    this.upLoadPhoto(retData.url);
                }, 1);
            },
            upLoadPhoto: function (url) {
                Indicator.open();
                SDK.uploadImgsToEmap({host: WEBPACK_CONIFG_HOST, urls: [url]})
                    .then(resp => {
                        if (resp.status == 200 || resp.success == true) {
                            this.token = resp.token;
                            this.imgUrl = this.getFileBtToken(resp.token);
                            Toast('图片上传成功');
                        } else {
                            Toast(resp.msg || '图片上传失败');
                        }
                        Indicator.close();
                    }, error => {
                        Indicator.close();
                        Toast('图片上传失败');
                    })
                    .catch( msg => {
                        Toast('访问出错');
                    });
            },
            doSubmit: function () {
                Indicator.open();
                this.$http.get(Api.SAVE_PHOTO_INFO + '?XH=' + this.XH + '&ZPID=' + this.token)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        Indicator.close();
                        if (res.status === '200') {
                            Toast('操作成功');
                            this.$router.go(-1);
                        } else {
                            Toast('操作失败');
                        }
                    })
                    .catch((message) => {
                        Indicator.close();
                        Toast('访问出错');
                    });
            },
            getFileBtToken: function(token)
            {
                return WEBPACK_CONIFG_HOST + '/sys/emapcomponent/file/getFileByToken/' + token + '.do';
            }
        }
    }
</script>