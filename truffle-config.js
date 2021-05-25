const path = require('path');

module.exports = {
	contracts_build_directory: path.join(__dirname, '/src/contracts'),
	networks: {
		develop: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '*'
		}
	}
};
