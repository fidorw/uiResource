module.exports = {
	entry: './js/uiConfig.js',
	output: {
		path: __dirname + '/dist',
		filename: 'uiConfig.js',
		libraryTarget: 'var',
		library: 'uiConfig',
		libraryExport: 'default'
	}
}
