module.exports = {
	plugins: {
		'postcss-pxtorem': {
			rootValue({ file }) {
				return file.indexOf('vant') !== -1 ? 37.5 : 75
			},
			propList: ['*'] // 要处理的属性列表，* 代表所有属性
		}
	}
}