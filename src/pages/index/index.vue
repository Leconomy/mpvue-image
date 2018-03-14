<template>
	<div class="container">
		<div class="list flex-row" :style="channelLeft">
			<div class="item" v-for="item in channelList" :key="item" :style="margin">
				<view @click="onJump" data-page="index" data-type="redirectTo" :data-ch="item">{{ item }}</view>
			</div>
		</div>
		<div class="sidebar" @click="onToggleChannelList">频道列表</div>
		<waterfall :channel="channel"></waterfall>
	</div>
</template>
<style>
	.list {
		background-color: #fff;
		flex-wrap: wrap;
		left: 100%;
		padding-bottom: 10px;
		position: fixed;
		top: 0;
		transition: left .4s;
		justify-content: flex-start;
		width: 100%;
		z-index: 2;
	}
	.item {
		border: 1px dashed #ddd;
	    box-sizing: border-box;
	    color: #000;
	    font-size: 14px;
	    height: 40px;
	    margin: 5px;
	    line-height: 40px;
	    overflow: hidden;
	    position: relative;
	    text-align: center;
	    width: 80px;
	}
	.sidebar {
		background: #19b955;
		box-sizing: border-box;
		color: #fff;
		font-size: 14px;
		height: 100px;
		right: 0;
		padding-top: 12px;
		position: fixed;
		text-align: center;
		top: 20px;
		width: 20px; 
		z-index: 10;
	}
</style>
<script>
	import '@/components/waterfall.css';
	import Waterfall from '@/components/Waterfall.vue';
	import Config from '@/config';
	import StaticData from '@/staticData';
	import formatWaterfallData from '@/utils/formatWaterfallData';
	export default {
		components: {
			waterfall: Waterfall
		},
		data: {
			margin: '',
			channel: '推荐',
			channelList: [],
			channelLeft: 'left: 100%',
			channelListShow: false
		},

		methods: {
			onToggleChannelList(ev) {
				let self = this;
				if(ev === 'scroll') {
					self.$root.channelLeft = 'left: 100%';
					self.$root.channelListShow = false;
					return;
				}
				if(!self.channelListShow) {
					self.$root.channelLeft = 'left: 0';
				} else {
					self.$root.channelLeft = 'left: 100%';
				}
				self.$root.channelListShow = !self.$root.channelListShow;
			},
			setMargin() {
				let self = this;
				let query = wx.createSelectorQuery();

				query.select('.list').boundingClientRect(rect => {
					let h = rect.height;
					wx.getSystemInfo({

	                    success(rec) {
	                    	let margin = (rec.windowWidth - 320) / 5;

							self.$root.margin = `margin:${margin}px 0 0 ${margin}px`;
	                    }

                	});
					
				}).exec();
			}
		},
		onShow() {
			setTimeout(_=> {
				this.setMargin();
				this.$root.channelList = StaticData.channelList;
			}, 500);
		},
		onLoad() {
			this.$root.channel = this.$root.$mp.query.ch || '推荐';
			wx.setNavigationBarTitle({
				title: this.$root.channel
			});
		},
		onPageScroll(ev) {
			this.onToggleChannelList('scroll');
		},
		

	}
</script>