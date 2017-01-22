import Footer from '../../components/footerBar/footerBar.vue'
import TypeNav from '../../components/typeNav/typeNav.vue'
export default {
    created: function() {
        console.log('页面创建了');
    },
    data:function(){
        return {
            hello:'大家好这里是主页',
            testList:[
                '苹果','橘子','鸭梨','西红柿'
            ]
        }
    },
    components:{
        'footerBar':Footer,
        'typeNav':TypeNav
    }
}
