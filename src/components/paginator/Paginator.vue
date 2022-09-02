<template>
    <vue-awesome-paginate :total-items="jobCalls.length" :items-per-page="4" :max-pages-shown="10" :current-page="1"
        :on-click="onClickHandler" />
    <span>{{ pagedData }}</span>
</template>
  
  <script>
import { ref } from 'vue'
export default {

    props: {
        jobCalls: { type: Array, required: true }
    },
   
    setup(props) {
        
        const pageItems = ref(4)
        const pagedData = ref([]);
        const onClickHandler = (page) => {
            pagedData.value = [];
            let init = (page * pageItems.value) - pageItems.value
            let end = (page * pageItems.value)
            for (let i = init; i < end; i++) {
                if (props.jobCalls[i] !== null) {

                    pagedData.value.push(props.jobCalls[i])
                } else {

                    break
                }

            }

        }
        return { onClickHandler, pageItems, pagedData }

    }
}
</script>
  
  <style>
  .pagination-container {
      display: flex;
      column-gap: 10px;
  }
  
  .paginate-buttons {
      height: 40px;
      width: 40px;
      border-radius: 20px;
      cursor: pointer;
      background-color: rgb(242, 242, 242);
      border: 1px solid rgb(217, 217, 217);
      color: black;
  }
  
  .paginate-buttons:hover {
      background-color: #d8d8d8;
  }
  
  .active-page {
      background-color: #3498db;
      border: 1px solid #3498db;
      color: white;
  }
  
  .active-page:hover {
      background-color: #2988c8;
  }
  </style>