<template>
    <div class="userAvatar">
        <div class="avatar" v-if="currentUser.avatar?.iAvatar" @mouseover="setAvatarbtn = true">
            <img :src="`${currentUser.avatar?.iAvatar}`" alt="">
        </div>
        <div class="avatar" v-if="currentUser.avatar?.rAvatar" v-html="multiavatar(currentUser.avatar?.rAvatar)"
            @mouseover="setAvatarbtn = true">
        </div>
        <Transition name="setAvatar">
            <div class="setAvatar" v-show="setAvatarbtn" @click="toSetIAvatar" @mouseleave="leaveSAB">
                <i
                    :class="{ 'el-icon-setting': setAvatarbtn && !avatarBox, 'el-icon-close': avatarBox && !isLoading, 'el-icon-loading': isLoading, 'icon': true }"></i>
            </div>
        </Transition>
        <div class="avatarBox" v-show="avatarBox">
            <i class="el-icon-caret-left"></i>
            <div class="rAvatarBox">
                <div :class="{ 'select': rAvatar.isSelect, 'rAvatar': true }" v-for="(rAvatar, index) in rAvatarSeq"
                    :key="index" v-html="multiavatar(rAvatar.rId)" @click="selectAvatar(index)">
                </div>
                <div class="handlerBtn refresh" @click="refreshRAvatar"
                    :style="{ '--angle': `${angle}deg`, '--rotateTime': `${rotateTime}ms` }"><i class="el-icon-refresh"></i>
                </div>
                <div class="handlerBtn" @click="uploadAvatar('r')"><i class="el-icon-upload2"></i></div>
            </div>
            <div class="iAvatarBox">
                <div class="cropperBox">
                    <div class="cropper">
                        <VueCropper ref="cropper" :img="cropperOption.img" :autoCropWidth="cropperOption.autoCropWidth"
                            :autoCropHeight="cropperOption.autoCropHeight" :output-size="cropperOption.size"
                            :output-type="cropperOption.outputType" :info="cropperOption.info" :full="cropperOption.full"
                            :can-move="cropperOption.canMove" :can-move-box="cropperOption.canMoveBox"
                            :original="cropperOption.original" :auto-crop="cropperOption.autoCrop"
                            :fixed="cropperOption.fixed" :fixed-number="cropperOption.fixedNumber"
                            :center-box="cropperOption.centerBox" :info-true="cropperOption.infoTrue"
                            :fixed-box="cropperOption.fixedBox" @realTime="realTime" />
                    </div>
                    <div class="cropperBtn">
                        <div class="larger btn" @click="zoomCropper(1)"><i class="el-icon-zoom-in"></i></div>
                        <div class="reduce btn" @click="zoomCropper(-1)"><i class="el-icon-zoom-out"></i></div>
                        <div class="rotateLeft btn" @click="rotateLeft"><i class="el-icon-refresh-left"></i></div>
                        <div class="rotateRight btn" @click="rotateRight">
                            <i class="el-icon-refresh-right"></i>
                        </div>
                    </div>
                </div>
                <div class="setIAvatar">
                    <div class="selectIAvatar">
                        <div class="selectRBtn" v-show="!preview.url" @click="toSelectImg($event)">
                            <i class="el-icon-plus"></i>
                            <input type="file" accept="image/*" ref="fileInput" class="selectInput"
                                @change="getIAvatar($event)" />
                        </div>
                        <div class="previewImg">
                            <img :src="preview.url" :style="{ ...preview.img, 'zoom': 0.6 }" class="preview"
                                v-show="preview.url" alt="">
                        </div>
                        <div class="selectSBtn" @click="toSelectImg()">
                            <span class="tip">{{ preview.url ? '重新选择' : '选择图片' }}</span>
                        </div>
                    </div>
                    <!-- 提交按钮 -->
                    <div class="submitBtn" @click="uploadAvatar('i')">
                        <i class="el-icon-upload"></i>
                        <span class="submitTip">确认更换</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import multiavatar from '@multiavatar/multiavatar'
import { throttle } from 'lodash'
import { VueCropper } from 'vue-cropper'
import { mapState } from 'vuex'

export default {
    name: 'Avatar',
    components: { VueCropper },
    data() {
        return {
            // 设置头像按钮
            setAvatarbtn: false,
            // 刷新按钮旋转角度
            angle: 0,
            // 旋转时间
            rotateTime: 0,
            // 设置头像的盒子
            avatarBox: false,
            // 随机头像序列数组
            rAvatarSeq: [],
            // 预览
            preview: {},
            // 剪裁图片组件配置
            cropperOption: {
                img: '', // 裁剪图片的地址
                info: false, // 裁剪框的大小信息
                outputSize: 1, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: 160, // 默认生成截图框宽度
                autoCropHeight: 160, // 默认生成截图框高度
                fixedBox: true, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [1, 1], // 截图框的宽高比例
                full: true, // 是否输出原图比例的截图
                canMoveBox: false, // 截图框能否拖动
                original: true, // 上传图片按照原始比例渲染
                centerBox: true, // 截图框是否被限制在图片里面
                infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            // 随机头像数量
            rAvatarNum: 26,
            // 正在上传中
            isLoading: false,
        }
    },

    computed: {
        ...mapState({ currentUser: (state) => state.user.currentUser || {} }),
    },

    watch: {
        avatarBox(newVal) {
            if (!newVal) {
                this.cropperOption.img = ''
                this.preview = {}
                this.$refs.fileInput.value = ''
                this.$emit('setBoxHeight', '239px')
            } else {
                this.$emit('setBoxHeight', '320px')
            }
        }
    },

    methods: {
        multiavatar,
        // 显示随机头像
        toSetIAvatar() {
            const { avatarBox, isLoading } = this
            // 如果现在没有显示
            if (!avatarBox) {
                // 先清空数组
                this.rAvatarSeq = []
                for (let i = 0; i < this.rAvatarNum; i++) {
                    const rId = Math.random().toString(36).slice(-Math.floor(Math.random() * 4) + 5)
                    this.rAvatarSeq.push({
                        rId: rId,
                        isSelect: false
                    })
                }
                this.avatarBox = true
            } else if (avatarBox && !isLoading) {
                this.avatarBox = false
            }
        },
        // 鼠标离开设置头像的按钮
        leaveSAB() {
            // 如果头像选择栏已经关闭
            if (!this.avatarBox) {
                // 设置头像的按钮隐藏
                this.setAvatarbtn = false
            }
        },
        // 刷新随机头像
        refreshRAvatar: throttle(async function () {
            this.angle = -360
            this.rotateTime = 600

            this.rAvatarSeq = await new Promise((resolve, rejects) => {
                setTimeout(() => {
                    // 清空数组
                    let rAvatarSeq = []
                    for (let i = 0; i < this.rAvatarNum; i++) {
                        const rId = Math.random().toString(36).slice(-Math.floor(Math.random() * 4) + 5)
                        rAvatarSeq.push({
                            rId: rId,
                            isSelect: false
                        })
                    }
                    resolve(rAvatarSeq)
                }, 600)
            })

            this.angle = 360
            this.rotateTime = 0
        }, 600),
        // 选中头像
        selectAvatar(index) {
            const { rAvatarSeq, preview } = this
            // 如果已经上传自定义头像
            if (preview.url) {
                this.preview = {}
                this.cropperOption.img = ''
            }
            // 将已经选中的改为未选中
            rAvatarSeq.forEach((item, index) => {
                if (item.isSelect) {
                    this.$set(this.rAvatarSeq, index, {
                        rId: rAvatarSeq[index].rId,
                        isSelect: false
                    })
                }
            })
            const rId = rAvatarSeq[index].rId
            // 将点击的改为选中
            this.$set(this.rAvatarSeq, index, {
                rId: rId,
                isSelect: true
            })
        },
        // 关闭随机头像选择栏
        closeRAvatarBox() {
            this.avatarBox = false
            this.setAvatarbtn = false
            this.$refs.fileInput.value = ''
        },
        // 确认选择随机头像
        sureRAvatar() {
            const { rAvatarSeq } = this
            const rAvatar = rAvatarSeq.filter((item, index) => item.isSelect)[0]
            if (rAvatar) {
                // 关闭
                this.closeRAvatarBox()
            } else {
                this.$message({
                    message: '你还未选择随机头像，请先选择随机头像。',
                    type: 'warning',
                    center: true
                })
            }
        },
        // 获取头像
        getIAvatar(e) {
            const file = e.target.files[0]
            const that = this
            const reader = new FileReader()
            const { rAvatarSeq } = this
            // 如果已经选择随机头像，改为未选择
            rAvatarSeq.forEach((item, index) => {
                if (item.isSelect) {
                    this.$set(this.rAvatarSeq, index, {
                        rId: rAvatarSeq[index].rId,
                        isSelect: false
                    })
                }
            })
            // 读取文件的路径
            reader.readAsDataURL(file)
            reader.onload = () => {
                that.cropperOption.img = reader.result
            }
        },
        // 实时预览
        realTime(data) {
            this.preview = data
        },
        // 点击选择图片的按钮
        toSelectImg() {
            this.$refs.fileInput.click()
        },
        // 缩放剪裁图片大小
        zoomCropper(zoom) {
            this.$refs.cropper.changeScale(zoom)
        },
        // 向左旋转
        rotateLeft() {
            this.$refs.cropper.rotateLeft()
        },
        // 向右旋转
        rotateRight() {
            this.$refs.cropper.rotateRight()
        },
        // 上传头像
        async uploadAvatar(type) {
            const { rAvatarSeq, cropperOption } = this
            let rAvatar = '', iAvatar = '', result
            if (type == 'r') {
                const sRAvatar = rAvatarSeq.filter((item) => item.isSelect)[0]
                if (!sRAvatar) {
                    this.$message({
                        message: '你还没有选择随机头像，请先选择头像！',
                        type: 'warning',
                        center: true
                    })
                    return
                }
                rAvatar = sRAvatar.rId
                this.isLoading = true
                result = await this.$store.dispatch('updateAvatar', { rAvatar, iAvatar })
            } else if (type == 'i') {
                if (!cropperOption.img) {
                    this.$message({
                        message: '你还没有上传自定义头像，请先上传头像！',
                        type: 'warning',
                        center: true
                    })
                    return
                }
                this.isLoading = true
                result = await new Promise((resolve, rejects) => {
                    this.$refs.cropper.getCropData(async (data) => {
                        iAvatar = data.substring(data.indexOf(',') + 1)
                        const result = await this.$store.dispatch('updateAvatar', { rAvatar, iAvatar })
                        resolve(result)
                    })
                })
            }
            if (result) {
                this.$message({
                    message: '更新头像成功！',
                    type: 'success',
                    center: true
                })
                this.avatarBox = false
                this.setAvatarbtn = false
            } else {
                this.$message({
                    message: '更新头像失败！',
                    type: 'error',
                    center: true
                })
            }
            this.isLoading = false
        }
    }
}
</script>

<style scoped lang="less">
.userAvatar {
    position: relative;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid #e9e7ef;

    .avatar {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 9;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .avatarBox {
        position: absolute;
        display: grid;
        grid-template-columns: 1.5fr 1.1fr;
        grid-gap: 0 16px;
        left: calc(100% + 16px);
        top: 0;
        width: 939px;
        height: 288px;
        padding: 12px;
        background-color: rgba(0, 0, 0, .6);
        box-sizing: border-box;
        z-index: 0;
        border-radius: 16px;

        >i {
            position: absolute;
            left: -24px;
            top: 32px;
            color: rgba(0, 0, 0, .6);
            font-size: 36px;
            font-weight: bold;
        }

        .rAvatarBox {
            display: grid;
            grid-template-columns: repeat(7, auto);
            grid-gap: 6px;
            padding: 6px;
            justify-items: center;
            align-items: center;
            box-sizing: border-box;
            height: 100%;
            border-radius: 16px;
            background-color: #fff;

            .rAvatar {
                width: 50px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                box-sizing: border-box;
                transition: all 200ms ease-in;

                &.select {
                    transform: scale(1.5);
                    animation: select 999ms ease-in infinite;

                    @keyframes select {
                        0% {
                            box-shadow: 0 0 3px 1px #2980b9;
                        }

                        50% {
                            box-shadow: 0 0 6px 3px #2980b9;
                        }

                        100% {
                            box-shadow: 0 0 3px 1px #2980b9;
                        }
                    }
                }

                &:hover {
                    transform: scale(1.5);
                    transition: all 200ms ease-in;
                }
            }

            .handlerBtn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 52px;
                height: 52px;
                border: 1px solid #2980b9;
                border-radius: 50%;
                transition: all 300ms ease;

                // 刷新按钮
                &.refresh {
                    transform: rotate(var(--angle));
                    transition: all var(--rotateTime) linear;
                }

                i {
                    font-size: 32px;
                    color: #2980b9;
                    font-weight: bolder;
                    transition: all 200ms ease;
                }

                &:hover {
                    background-color: #2980b9;

                    i {
                        color: #fff;
                    }
                }
            }

        }

        .iAvatarBox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 16px;
            box-sizing: border-box;
            border-radius: 16px;
            background-color: #fff;

            .cropperBox {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                width: 186px;
                height: 100%;

                .cropper {
                    width: 186px;
                    height: 186px;
                    border: 1px solid #2980b9;
                }

                .cropperBtn {
                    display: flex;
                    justify-content: space-between;
                    align-items: end;
                    width: 100%;
                    height: 36px;

                    .btn {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 32px;
                        height: 32px;
                        background-color: rgba(41, 128, 185, .6);
                        border-radius: 50%;
                        color: #fff;
                    }
                }
            }

            .setIAvatar {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                overflow: hidden;
                height: 100%;
                margin-left: 16px;

                // 头像预览
                .selectIAvatar {
                    position: relative;
                    width: 96px;
                    height: 96px;
                    background-color: #fff;
                    border-radius: 50%;
                    border: 1px solid #2980b9;

                    // 选择图片的圆形按钮
                    .selectRBtn {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100%;

                        i {
                            color: #2980b9;
                            font-size: 36px;
                        }

                        .selectInput {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                            cursor: pointer;
                            z-index: -1;
                        }
                    }

                    // 预览图片
                    .previewImg {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        overflow: hidden;

                        .preview {
                            width: 100%;
                            height: 100%;
                        }
                    }


                    // 选择图片的方形按钮
                    .selectSBtn {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        bottom: -36px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 72px;
                        height: 26px;
                        background-color: #2980b9;
                        border-radius: 6px;
                        cursor: pointer;
                        color: #fff;

                        .tip {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                            z-index: 9;
                            font-size: 14px;
                            transition: all 199ms ease-in;
                        }

                        &:hover {
                            background-color: #fff;
                            border: 1px solid #2980b9;
                            color: #2980b9;
                        }

                        .selectInput {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 82px;
                            height: 32px;
                            opacity: 0;
                            cursor: pointer;
                            z-index: -1;
                        }
                    }
                }

                // 提交上传
                .submitBtn {
                    display: grid;
                    grid-template-columns: auto auto;
                    grid-gap: 6px;
                    align-items: center;
                    width: 102px;
                    height: 32px;
                    background-color: #fff;
                    border: 1px solid #2980b9;
                    border-radius: 6px;
                    color: #2980b9;
                    transition: all 199ms ease-in;

                    &:hover {
                        color: #fff;
                        background-color: #2980b9;
                    }

                    i {
                        font-size: 19px;
                        justify-self: end;
                    }

                    .submitTip {
                        font-size: 14px;
                        justify-self: start;
                    }
                }
            }
        }
    }

    .setAvatar {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .5);
        cursor: pointer;
        font-size: 36px;
        color: #fff;
        font-weight: bold;
        border-radius: 50%;
        z-index: 9;
    }

    .setAvatar-enter,
    .setAvatar-leave-to {
        background-color: rgba(0, 0, 0, 0);
        color: rgba(255, 255, 255, 0);
    }

    .setAvatar-enter-to,
    .setAvatar-leave {
        background-color: rgba(0, 0, 0, .6);
        color: rgba(255, 255, 255, .8);
    }

    .setAvatar-enter-active {
        transition: all 200ms ease-in;
    }
}
</style>
