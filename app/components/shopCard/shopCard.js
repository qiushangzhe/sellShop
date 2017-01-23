var buffer = {
    shopName: '', //名称
    shoperName: '', //卖家名
    shoperHeader: '', //卖家头像
    originalCost: 0, //原价
    nowCost: 0, //现价
    sex: 0, //性别 1男 0女
    publishData: 'x月x日',
    shopPic: ['', ''], //商品图片url地址
    shopIntroduct: '', //商品介绍
    watchNumber: 0, //商品浏览次数
    goodTime: 0 //点赞数
    
}
export default {
    created: function() {
        this.init();
    },
    props: {
        shopObjData: {
            type: Object
        }
    },
    data: function() {
        return {
            shopObj: this.shopObjData
        }
    },
    methods: {
        init: function() {

        }
    }
}
