import Footer from '../../components/footerBar/footerBar.vue';
import TypeNav from '../../components/typeNav/typeNav.vue';
import ShopCard from '../../components/shopCard/shopCard.vue';
var imgList = [
    require('../../../static/img/header.jpg'),
    require('../../../static/img/waterCup.png')
]
export default {
    created: function() {
        console.log('页面创建了');
    },
    data:function(){
        return {
            hello:'大家好这里是主页',
            testList:[
                {
                    shopName:'一个水杯',//名称
                    shoperName:'邱上哲',//卖家名
                    shoperHeader:imgList[0],//卖家头像
                    originalCost:100,//原价
                    nowCost:74,//现价
                    sex:0,//性别 1男 0女
                    publishData:'7月2日',
                    shopPic:[imgList[1]],//商品图片url地址
                    shopIntroduct:'这是一个可爱的水杯，可以喝水，可以保温，可以防身，18k镀金保温杯。',//商品介绍
                    watchNumber:12,//商品浏览次数
                    goodTime:3//点赞数
                }
            ]
        }
    },
    components:{
        'footerBar':Footer,
        'typeNav':TypeNav,
        'shopCard':ShopCard
    }
}
