const API = 'https://m.image.so.com/';
export default {
	Api: {
		channel: `${API}api/channel_state.json`,
		waterfall: `${API}i?a=tagResultView`,
		lightbox: `${API}i?a=getDetailImgsByGid`
	},
	pageUrl: {
		index: '/pages/index/index',
		tag: '/pages/tag/tag'
	}
};