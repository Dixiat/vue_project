<style lang="stylus">
	dots-color = rgba( 0, 0, 0, .3)

	#dots__wrapper
		width auto
		height 15px
		margin 0 auto
		padding 0
		position absolute
		bottom 0
		left 0
		right 0
		text-align center
		display block
    li
		display inline-block
		width 10px
		height 10px
		border 2px solid dots-color
		border-radius 10px
		margin 0 5px
		transition background 0.3s
		cursor pointer
	li[targeted]
		background dots-color
		background-origin content-box
</style>

<template lang="jade">
	ul#dots__wrapper
		li(v-for="n in count", :data-target="n", @click="slideToTarget($event)", :targeted="currentTarget == n")
</template>

<script>
    export default {
        props: {
            count: { type: Number},
            currentTarget: { type: Number, default: 1}
        },
        methods: {
        	slideToTarget(event) {
        		let target = event && event.target && event.target.getAttribute('data-target'),
        			index = target - this.currentTarget;
        		this.$emit('slide', {index: index});
        	}
        }
    }
</script>