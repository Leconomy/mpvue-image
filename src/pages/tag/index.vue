<template>
	<div class="container">
		<waterfall :channel="channel"></waterfall>
	</div>
</template>
<style>
	
</style>
<script>
	import Config from '@/config';
	import Waterfall from '@/components/Waterfall.vue';
	import formatWaterfallData from '@/utils/formatWaterfallData';
	export default {
		components: {
			waterfall: Waterfall
		},
		data: {
			tag: '',
			channel: ''
		},
		onLoad() {
			this.$root.channel = this.$root.$mp.query.ch || '推荐';
			this.$root.tag = this.$root.$mp.query.tag || '';
			wx.setNavigationBarTitle({
				title: this.$root.tag
			});
		}

	}
</script>