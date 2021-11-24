module.exports = {
	// src: path.join(__dirname, 'fixtures'),
	// entry: '/api/*',
	rules: [
		{
			method: 'POST',
			test: '**/album',
			filename: 'mocked.json',
			headers: {
				'Content-Type': 'application/json'
			}
		},
	],
}