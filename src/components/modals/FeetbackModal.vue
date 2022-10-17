<template>
    <div>
        <div class="modal-overlay">
            <div class="modal">
                <h3 class="title">{{title}}</h3>
                <p>{{message}}</p>
              
                    <button class="back-button" @click="$emit('close-modal')">Cerrar</button>
               
            </div>

        </div>
    </div>
</template>
<script>
export default{
    props:{
        title:{type:String,required:true},
        message:{type:String,required:true}
    },
}


</script>
<style lang="scss" scoped>
@import '../../styles/buttons.scss';

.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000da;
    margin-left: 360px;

}

.modal {
    margin: 0px;
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 30%;
    width: 30%;
    padding: 30px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    gap: 20px;

}
.modal p {
   font-family: 'Inter', sans-serif ;
   font-size: 15px;

}

.title {
    font-family: 'Oswald', sans-serif;
    font-style: normal;
    font-size: 30px;
    color: #064D90;
    margin: 0px;
  

}


</style>