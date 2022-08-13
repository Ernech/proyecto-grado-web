<template lang="">
  <router-link :to="to" class="link" :class="{active:isActive}">
    <i class="sidebar-icon" :class="icon"></i>
    <b>name</b>
  </router-link>
</template>
<script>
export default {
    props:{
        name:{type:String,required:true},
        to:{type:String,required:true},
        icon:{type:String,required:true}
    }
}
</script>
<style scoped>
    .link{
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        font-weight: 400;
        user-select: none;

        margin: 0.1em 0;
        padding: 0.4em;
       height: 1.5em;
       
       color: #ffffff;
       text-decoration: none;

    }
    .link.active{
        background-color: #ffffff;
        opacity: 0.2;
    }
    .sidebar-icon{
        flex-shrink: 0;
        width: 25px;
        margin-right: 10px;
    }
</style>