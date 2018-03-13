<style>
    page{
        background-color: #f2f2f2;
    }
	.container {
        height: 100%;
        box-sizing: border-box;
        color: #000;
    }
    .flex-col{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .flex-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>
<script>
    import StaticData from './staticData';
    import Config from './config.js';
	export default {
        config: {
            window: {

            }
        },
		beforeCreate() {
            let self = this;
			wx.request({
                url: Config.Api.channel,
                success(response) {
                    let o = response && response.data;
                    if(o && o.onlinelist) {
                        StaticData.channelList = o.onlinelist;
                    }
                }
            });
		}
	}
</script>