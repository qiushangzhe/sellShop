import Footer from '../../components/footerBar/footerBar.vue';
import TypeNav from '../../components/typeNav/typeNav.vue';
import ShopCard from '../../components/shopCard/shopCard.vue';
export default {
    created: function() {
        this.init();
        console.log('页面创建了');
    },
    data: function() {
        return {
            hello: '大家好这里是主页',
            shopList: []
        }
    },
    methods: {
        init: function() {
            this.$http.get('static/data/shoplist.json').then(function(res){
                res = res.data;
                if(res.error.code == 0){
                    console.log(res.data.shopList);
                    this.shopList = res.data.shopList;
                }
            },function(err){
                console.log(err);
            });
        }
    },
    components: {
        'footerBar': Footer,
        'typeNav': TypeNav,
        'shopCard': ShopCard
    }
}
