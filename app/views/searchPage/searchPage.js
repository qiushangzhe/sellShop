import Footer from '../../components/footerBar/footerBar.vue'
import Header from '../../components/headerBar/headerBar.vue'
export default {
    created: function() {

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
        'headerBar':Header
    }
}
