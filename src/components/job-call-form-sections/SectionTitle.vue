<template>
    <div class="section-title">
        <p>{{ title }}</p>
        <hr>
    </div>
</template>
<script>

export default {
    props: {
        title: { type: String, required: true }
    }
}
</script>
<style scoped>
.section-title {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 0px;
    margin-top: 25px;
}

.section-title p {
    font-family: 'Inter', sans-serif;
    align-self: flex-start;
    font-size: 18px;
    margin-bottom: 0px;
    font-weight: bold;
}

hr {
    border: 0;
    clear: both;
    width: 100%;
    background-color: #000;
    height: 1px;


}
</style>