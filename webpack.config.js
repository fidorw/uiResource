module.exports = {
	entry: './js/uiResource.js',
	output: {
		path: __dirname + '/dist',
		filename: 'uiResource.js',
		libraryTarget: 'var',
		library: 'uiResource',
		libraryExport: 'default'
	}
}
