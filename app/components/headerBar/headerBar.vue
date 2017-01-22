<template>
    <header class="bar bar-nav sell-green">
      <a class="icon icon-left pull-left" href='#/mainPage'></a>
      <h1 class="title">{{title}}</h1>
    </header>
</template>
<script>
    export default {
        props:['titleText'],
        data:function(){
            return {
                title:this.titleText
            }
        }
    }
</script>
<style lang="sass">
    .sell-green{
        a{
            color:#3bc69c;
        }
    }
</style>
