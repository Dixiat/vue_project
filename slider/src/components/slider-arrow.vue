<style lang="stylus">
    arrow-width = arrow-height = 64px

    #arrow__wrapper
        position absolute

    .arrow
        width arrow-width
        height arrow-height
        display block
        opacity .9
        transition opacity 0.3s
        position absolute
        top "calc(50% - %s / 2)" %arrow-height
        cursor pointer
    .arrow:hover,.arrow:focus
        opacity 1
    .arrow:active
        opacity .8

    #arrow__left
        background url(../assets/arrow_left.png)
        left 0

    #arrow__right
        background url(../assets/arrow_right.png)
        right 0

</style>

<template lang="jade">
    #arrow__wrapper(:style="{ width: width + 'px', height: height + 'px'}")
        #arrow__left.arrow(@click="slideToLeft")
        #arrow__right.arrow(@click="slideToRight")
</template>

<script>
    export default {
        props: {
            width: Number,
            height: Number
        },
        methods: {
            slideToLeft() {
                this.$emit('slide', {index: -1});
            },
            slideToRight() {
                this.$emit('slide', {index: 1});
            }
        }
    }
</script>
