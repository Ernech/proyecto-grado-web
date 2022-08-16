<template>

    <router-link :to="to" class="link" :class="{selected:isSelected}">
    <fa :icon="icon"/>         
        {{ router }}
    </router-link>
</template>
<script>
import router from '../../routes/recruiter-router'
import {computed} from 'vue';
export default {
    props: {
        router: { type: String, required: true },
        to: { type: String, required: true },
        icon: { type: String, required: true }
    },
    setup(props) {
      const isSelected= computed(()=>router.to===props.to)
      return {isSelected}
    }
}
</script>
<style scoped>
.link {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffffff;
    text-decoration: none;
    font-size: 15px;
    gap: 10px;
    padding: 5px;
    
}

.link:hover {
     background-color: #0d018b; 
   
    
}
.link.Selected{
   background-color: #0a0265; 
}

.sidebar-icon {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
}
</style>