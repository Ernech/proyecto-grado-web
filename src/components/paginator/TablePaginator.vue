<template>
    <div class="paginator-container">
        <div class="page-items-container">
            <label for="items-number">Número de filas</label>
            <input id="items-number" type="number" v-model="pageItems" class="page-items-input" min="1" max="5">

        </div>
        <vue-awesome-paginate :total-items="12" :items-per-page="pageItems" :max-pages-shown="5" :current-page="1"
            :on-click="$emit('onClickHandler')" paginate-buttons-class="btn" active-page-class="btn-active"
            back-button-class="back-btn" next-button-class="next-btn" />
    </div>
</template>
  
<script>
import { ref } from 'vue'
export default {

    // props: {
    //     jobCalls: { type: Array, required: true }
    // },

    setup(props) {

        const pageItems = ref(4)
        const pagedData = ref([]);
        const onClickHandler = (page) => {
            // pagedData.value = [];
            // let init = (page * pageItems.value) - pageItems.value
            // let end = (page * pageItems.value)
            // for (let i = init; i < end; i++) {
            //     if (props.jobCalls[i] !== null) {

            //         pagedData.value.push(props.jobCalls[i])
            //     } else {

            //         break
            //     }

            // }
            console.log(page);

        }
        return { onClickHandler, pageItems, pagedData }

    }
}
</script>
  
<style>
.paginator-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 15px;
}

.btn {
    height: 30px;
    width: 30px;
    border: #ddd solid 1px;
    cursor: pointer;
    border-radius: 5px;
    color: #0B0273;
    background-color: #fff;
}
.btn:hover {
   background-color: rgb(211, 211, 211);
}
.back-btn {
    background-color: #fff;
}

.next-btn {
    background-color: #fff;
}

.btn-active {
    background-color: #0B0273;
    color: white;
}
.page-items-container{
   display: flex;
   flex-direction: row;
   gap: 10px;
   align-self: center;
}
.page-items-container label{
   font-family: 'Nunito';
   font-size: 15px;
   color: #000;
   align-self: center;

}
.page-items-input{
    width: 35px;
    height: 25px;
    border-radius: 5px;
    border: #aaa solid 1px;
   
}
.page-items-input:focus{
    border: #ccc solid 1px;
}
</style>