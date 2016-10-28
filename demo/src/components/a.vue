<style scoped>
    .container {
        border: 1px solid #00f;
    }
    .red {
        color: #f00;
    }
</style>

<template>
    <div class="container">
        <h1 class="red">{{msg}}</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Hello from Component A!'
            }
        }
    }
</script>
