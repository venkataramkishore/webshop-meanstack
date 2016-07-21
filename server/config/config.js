var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {

	development:{
		db:'mongodb://localhost:27017/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production:{
		db:'mongodb://multivision:multivision@ds051863.mongolab.com:51863/multivision',
		rootPath:rootPath,
		port: process.env.PORT || 80
	}
};