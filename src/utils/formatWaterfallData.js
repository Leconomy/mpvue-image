export default function(data) {
	let rtnArr = [];
	if(!data || !data.length) {
		return rtnArr;
	}
	let i = 0;
	let len = data.length;
	for(; i < len; i++) {
		let item = data[i];
		let img = item.img.replace(/(qh(?:im|ms)g[^.]*\.com\/)(?:[^/]+\/)*(.+)/, `$1dmfd/375_219_/$2`);
		rtnArr.push({
			src: item.src,
			images: [img],
			grpmd5: item.grpmd5,
			grpcnt: item.grpcnt,
			hotrank: item.hotrank,
			channel: item.channel,
			grptitle: item.grptitle,
			tag: item.tag.split(','),
		});

	}
	return rtnArr;
};