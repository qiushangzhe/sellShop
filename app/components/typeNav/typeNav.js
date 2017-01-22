export default {
    created: function() {
        this.init();
    },
    data:function(){
        return {
            num: 0,
            childTyle:0,
            navData:[
                {title:'全部'},
                {title:'闲置数码'},
                {title:'鞋服家居'},
                {title:'二手教辅'},
                {title:'其他'}
            ]
        }
    },
    methods:{
        init:function(){

        },
        chooseType:function(num){
            this.num = num;
            this.$router.push({ path: 'mainPage', query: { type: num }})
        },
        searchShop:function(){
            this.$router.push({ path: 'searchPage'});
        },
        childTypeClick:function(num){
            this.childTyle = num;
        }
    }
}
