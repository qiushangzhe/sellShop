export default {
    created: function() {
        this.init();
    },
    props: ['activeNum'],
    data:function(){
        return {
            num:this.activeNum,
            navData:[
                {title:'首页',icon:'icon-home',link:'#/mainPage'},
                {title:'发布',icon:'icon-star',link:'#/sellPage'},
                {title:'我',icon:'icon-me',link:'#/userPage'}
            ]
        }
    },
    methods:{
        init:function(){

        }
    }
}
