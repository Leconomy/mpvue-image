<template>
	<div class="container">
		<div class="waterfall" scroll-y="true">
			<div class="waterfall-cell" v-for="cell in waterfall" :key="cell.grpmd5">
				<div class="profile" @click="onPreviewImage" :data-id="cell.grpmd5">
					<div class="tit">
						{{ cell.grptitle }}
					</div>
				</div>
				<div class="puzzle" @click="onPreviewImage" :data-id="cell.grpmd5">
					<div class="amount">{{ cell.grpcnt }}张</div>
					<div class="ele" v-for="(img, imgIndex) in cell.images" :key="imgIndex">
						<image :src="img" lazy-load="true"></image>
					</div>
				</div>
				<div class="hot-tags">
	                <div class="tags">
	                	<view class="tag" v-for="(tag, tagIndex) in cell.tag" :key="tagIndex" @click="onJump" data-type="navigateTo" data-page="tag" :data-ch="cell.channel" :data-tag="tag">{{ tag }}</view>
	                </div>
	                <div class="hot"><span>{{ cell.hotrank }}</span></div>
	            </div>
			</div>
		</div>
	</div>
</template>
<style>
	.waterfall {
		width: 100%;
		left: 0;
		position: relative;
		top: 0px;
	}
	.waterfall-cell {
		background-color: #fff;
		margin-top: 6px;
	}
	.amount{
		background: rgba(0,0,0,.44);
	    border-radius: 3px;
	    bottom: 10px;
	    box-sizing: border-box;
	    color: #fff;
	    font-size: 12px;
	    height: 20px;
	    line-height: 20px;
	    padding: 0 6px;
	    position: absolute;
	    right: 10px;
	    text-align: center;
	    z-index: 10;
	}
	.puzzle {
		height: 219px;
		background: #eee url(https://p.ssl.qhimg.com/t017aeee9a8ba993b05.png) center center no-repeat;
		background-size: 36px 32px;
		overflow: hidden;
		position: relative;
	}
	.puzzle .ele {
		background-size: cover;
		background-repeat: no-repeat;
		overflow: hidden;
		position: absolute;
		height: 100%;
	    left: 0;
	    top: 0;
	    width: 100%;
	}
	.puzzle image {
		height: 100%;
		vertical-align: top;
		width: 100%;
	}
	.hot-tags {
		align-items: center;
	    display: flex;
	    height: 40px;
	    overflow: hidden;
	}
	.tags {
		height: 40px;
		margin-left: 10px;
		overflow: hidden;
		width: 210px;
	}
	.tag {
		background: #f3f3f3;
		box-sizing: border-box;
		color: #666;
		display: inline-block;
		font-size: 12px;
		height: 22px;
		line-height: 22px;
		margin-top: 9px;
		margin-left: 5px;
		padding: 0 10px;
	}
	.hot {
		-webkit-box-flex: 1;
		color: #666;
		flex-grow: 1;
		-ms-flex-positive: 1;
		font-size: 12px;
		line-height: 40px;
		margin-right: 15px;
		padding-left: 10px;
		position: relative;
		text-align: right;
	}
	.hot:before{
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAAAAXNSR0IArs4c6QAAAk9JREFUOBF1VE1IVFEU/s4dp8nArBbSJlpFKm2CWgSBWC2KECkCIcqloiQ5/Wi5mkUQUZNomMugpIJZBBFtWkkERUXLFkK6iXCmFk+DJGbe8dz7fG/ufT8DM3PO933nm3POvW+AjBeXSiqDSsDZwuraII8WKzw52Z6oigHZJoSdYL6A9f+vmJlidU6abcJ81CiZezF2vc+piiWpJlv76Im0Pg9FcUqQaoKa1y+j7LP0J3hstmDlTpgwMV0w33ZUzK3ASrfGeHR8govFPTbvmJgFVr0ZMIJ92MoGdcpp9Ql3Dxuo2FS0delgB6regoxxzhZEMeEmQAPCHwkwdZnmHy7o2HRiRqh6bzINgiq9py0DAcifCo8+GKfm3RJBb6DN+GQcdxhGF67cOKUxZcbwMeEI3KThplbG/qDOFFbXzsvO06824Sny+S7p/bdV2gwZZ/UqFJR/uInaEX1Dx65hmr2/BKUuCsM2G8S8G3/WOxV82p8kpYDUMJVKG5qjufI7EJ6l6MS6sVcJ+S9BElXocfmzgxdoCkR1B9MJ0V9t8iNBgF/HMZqe/ik/+zWGy4jbl+WIc29jhJ7eudYRH8cJX+jR3ZqiuQefpKePkTAIhmTr22xMrvxpyQ/YmMQzOm8xYAuuok7vpYWw8BBWvUUeGb8DyssY9ZPClYw2/CBaREf7C502n52Ra5dA/ERubmAcitO+Cd+Ra+3Ro2g6eorNw8Q4I9teTqtrYvQSbYVjoYHGo05CkfnzaawMAH6/0AelszZR/ZL3B/i55zRfjp8QNgF6zcQrUVC0mgAAAABJRU5ErkJggg==) no-repeat;
		background-size: contain;
		content: '';
		display: inline-block;
		height: 11.5px;
		margin: -2px 3px 0 0;
		vertical-align: middle;
		width: 8.5px;
	}
	.profile {
		padding: 10px 15px;
		max-height: 62px;
		overflow: hidden;
	}
	.tit {
		box-sizing: border-box;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		white-space: normal;
		font-size: 17px;
		line-height: 21px;
		max-height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
<script>
	import Config from '../../config';
	import formatWaterfallData from '../../utils/formatWaterfallData';
	export default {
		data: {
			waterfall: [],
			pn: 15,
			tag: '',
			sn: 0,
			channel: '',
		},

		methods: {
			onJump(ev) {
				let dataset = ev.currentTarget.dataset;
				let url = `${Config.pageUrl[dataset.page]}?ch=${dataset.ch}&tag=${dataset.tag || ''}`;
				wx.redirectTo({
					url: url
				});
			},

			requestWaterfall(type = 'up') {
				let self = this;
				let channel = self.channel;
				wx.request({
					url: `${Config.Api.waterfall}&ch=${channel}&tag=${self.tag}&pn=${self.pn}&sn=${self.sn}`,
					success(response) {
						let o = response && response.data;
						if(o && o.error == 0) {
							self.$root.sn = o.sn;
							self.requestWaterfallSuc(o.result, type);
						}
					}
				});
			},
			requestWaterfallSuc(data, type) {
				let self = this;
				let formData = formatWaterfallData(data);
				let waterfall = [];
				// 上拉数据
				if(type === 'up') {
					waterfall = self.$root.waterfall.concat(formData);
				} else {
					waterfall = formData.concat(self.$root.waterfall);
				}
				self.$root.waterfall = waterfall;
			},
			onPreviewImage(ev) {
				let id = ev.currentTarget.dataset.id;
				try {
					let data = wx.getStorageSync(id);
					if(data) {
						this.previewImage(data, id);
					} else {
						this.requestPreviewImage(id);
					}
				} catch(e) {
					this.requestPreviewImage(id);
				}
				
			},
			requestPreviewImage(id, sn = 0, data = []) {
				let self = this;
				let pn = 60;
				wx.showLoading({
					title: '加载中...',
					mask: true
				});
				wx.request({
					url: `${Config.Api.lightbox}&id=${id}&pn=${pn}&sn=${sn}`,
					success(response) {
						let o = response && response.data;

						data = data.concat(o.list || []);
						if(o.lastid >= o.dspcnt) {
							self.formatPreviewImageData(data, id);
						} else {
							self.requestPreviewImage(id, o.sn + pn, data);
						}
						
					},
					fail() {
						if(data.length) {
							self.formatPreviewImageData(data, id);
						}
					}
				})
			},
			formatPreviewImageData(data, id) {
				let urls = [];
				let i = 0;
				let len = data.length;
				for(; i < len; i++) {
					urls.push(data[i]['img']);
				}
				wx.setStorage({
					key: id,
					data: urls
				});
				wx.hideLoading();
				this.previewImage(urls);
			},
			previewImage(data) {
				wx.previewImage({
					urls: data
				});
			}
		},
		onShow() {

		},
		onLoad() {
			this.$root.channel = this.$root.$mp.query.ch || '推荐';
			this.$root.tag = this.$root.$mp.query.tag || '';
			this.$root.sn = 0;
			this.$root.waterfall.length = 0;
			wx.setNavigationBarTitle({
				title: this.$root.tag
			});
			this.requestWaterfall();
		},
		onPageScroll(ev) {

		},
		onReachBottom() {
			this.requestWaterfall();
		},
		onPullDownRefresh() {
			let self = this;
			wx.stopPullDownRefresh({
				success() {
					self.requestWaterfall('down');
				}
			});
			
		}

	}
</script>