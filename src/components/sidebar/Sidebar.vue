<template>
    <div>
        <div class="sidebar">
            <div class="slidebar__user-info">
                <div class="user-into__first-letter">
                    <span>E</span>
                </div>
                <p>Ernesto Vilela Montero</p>
                <p>ernesto.vilela@ucb.edu.bo</p>
            </div>
            <!-- <span>
                <font-awesome-icon icon="fa-light fa-unlock" class="sidebar-icon" />
            </span> -->
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.sidebar {
    color: white;
    background-color: #0B0273;

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    display: flex;
    flex-direction: column;
    width: 365px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    
}
.slidebar__user-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.slidebar__user-info p{
   margin:0px;
   font-size: 15px;
}
.user-into__first-letter{
    width: 164px;
    height: 164px;
    background-color: #ffffff;
    border-radius: 100px;
    display: flex;
     justify-content: center;
   align-items: center;
}
.user-into__first-letter span{
    color: #0B0273;
    font-size: 70px;
  
    }
.sidebar-icon {
    width: 50px;
    height: 50px;
}
</style>