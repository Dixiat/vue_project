<style lang="stylus">
    #slider__container
        position relative
        margin 0 auto

    #slider__viewport
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        margin auto
        overflow hidden

    #slider__content
        position relative


</style>

<template lang="jade">
    #slider__container(
        :style="{width: width + 'px', height: height + 'px'}"
        @mouseover="_pause"
        @mouseout="_play"
    )
        #slider__viewport(:style="{width: viewportWidth + 'px', height: height + 'px'}")
            #slider__content(
                :style="{ width: contentWidth + 'px',\
                          height: height + 'px',\
                          transition: 'transform ' + slideSpeed + 's',\
                          transform: 'translateX(' +  slideDistance + 'px)'}"
            )
                slot
        slider-arrow(
            v-if="hasArrow", :width="width", :height="height", @slide="_sliderControl($event)"
        )
        slider-dots(:count="count", :current-target="currentTarget")
</template>

<script>
    import SliderArrow from './slider-arrow';
    import SliderDots from './slider-dots';
    export default {
        props: {
            itemWidth: { type: Number, default: 500 },
            itemHeight: { type: Number, default: 400 },
            itemSpace: { type: Number, default: 30},
            space: { type: Number,default: 50},
            count: { type: Number},
            hasArrow: {type: Boolean, default: true},
            hasDots: {type: Boolean, default: false},
            autoPlay: {type: Boolean, default: false},
            canPause: { type: Boolean, default: true},
            speed: {type: Number, default: 1.3},
            delay: {type: Number, default: 2}
        },
        data() {
            return {
                sliderArrowWidth: 64,
                nowIndex: 1,
                currentTarget: 1,
                clearedFlag: 0,
                couldSlide: false
            };
        },
        computed: {
            width() { return this.itemWidth + (this.space + (this.hasArrow ? this.sliderArrowWidth: 0)) * 2; },
            height() { return this.itemHeight + this.itemSpace * 2; },
            viewportWidth() { return this.itemWidth + this.itemSpace * 2; },
            contentWidth() { return (this.itemWidth + this.itemSpace * 2) * this.count; },
            slideDistance() { return -(this.itemWidth + this.itemSpace * 2) * (this.nowIndex - 1); },
            slideSpeed() { return this.couldSlide && this.speed || 0;}
        },

        mounted() {
            this._initSlider();
            this._play();
        },

        methods: {
            _slide(obj) {
                let index = typeof obj == 'object' ? obj.index : obj || 0;
                if(index) {
                    this.nowIndex = (this.nowIndex + index) % this.count || 5;
                }
            },
            _play() {
                if(this.autoPlay) {
                    this.timer = setInterval(() => {
                        this._sliderControl({ callback: 'appendChild', index: 1});
                        }, this.delay * 1000);
                }
            },
            _pause() {
                this.timer && clearInterval(this.timer);
            },
            _sliderItemControl(obj) {
                let callback = obj && obj.callback || 'appendChild',
                    num = obj && obj.num || 1;

                let sliderContent = document.querySelector('#slider__content'),
                    firstItem = sliderContent && sliderContent.firstChild,
                    lastItem = sliderContent && sliderContent.lastChild;

                if(callback.indexOf('append') > -1) sliderContent.appendChild(firstItem);
                else sliderContent.insertBefore(lastItem, firstItem);
            },
            _sliderControl(obj) {
                let index = typeof obj == 'object' ? obj.index : obj || 0,
                    resetIndex = index > 0 ? 1 : 3,
                    currentTarget = this.currentTarget,
                    callback = index > 0 ? 'appendChild' : 'insertBefore',
                    num = Math.abs(index),
                    operate = { callback: callback, num: num};

                this._sliderItemControl(operate);
                this.couldSlide = false;
                this.nowIndex = resetIndex;
                setTimeout(() => {
                    this.couldSlide = true;
                    this.nowIndex += index;
                });

                currentTarget += index;
                this.currentTarget = currentTarget % this.count || this.count;

            },
            _initSlider() {
                let operate = { callback: 'insertBefore', num: 1};
                this._sliderItemControl(operate);
                this._slide(1);
                this.couldSlide = true;
            }
        },
        components: {
            SliderArrow,
            SliderDots
        }
    };
</script>
