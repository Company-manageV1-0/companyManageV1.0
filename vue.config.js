module.exports = {
	devServer:{
	open:true,
	port:8080,
	host:'127.0.0.1',
	//设置代理
	// proxy:{
	// 	'api':{
	// 		target:'',
	// 		changeOraigin:true,
	// 		pathRewrite:{
	// 			'^api':''
	// 			}

	// 		}
	// 	}
	},
	publicPath: './',
	outputDir:'dist',
	assetsDir:'static'	
}