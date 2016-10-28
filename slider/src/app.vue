<style lang="stylus">
    img
        display inline-block
        float left
</style>

<template lang="jade">
    div#app__container
        slider(
            :item-width="sliderItemWidth",:item-height="sliderItemHeight", :item-space="sliderItemSpace", :space="sliderInnerSpace", :count="sliderItemCount",:auto-play="true", :hasArrow="true"
        )
            each val in [1,2,3,4,5]
                img(
                    src= "./assets/img#{val}", :width="sliderItemWidth", :height="sliderItemHeight", :style="{margin: sliderItemSpace + 'px'}"
                )
</template>

<script>
    import Slider from './components/slider';
    export default {
        data() {
            return {
                sliderItemWidth: 420,
                sliderItemHeight: 300,
                sliderItemSpace: 20,
                sliderItemCount: 5,
                sliderInnerSpace: 50
            };
        },
        components: {
            Slider
        }
    };
</script>
