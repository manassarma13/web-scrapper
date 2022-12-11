const PORT = 8000,
	axios = require('axios'),
	cheerio = require('cheerio'),
	express = require('express'),

	app = express(),
	url = "https://astu.ac.in/";

app.get('/', function(req, res){
	res.json('web-scrapper loading beep beep boop boop. Go to http://localhost:8000/result')
})

app.get('/result', (req, res) =>{
	axios(url).then(response => {
		const html = response.data || {},
			$ = cheerio.load(html),
			dataArray = [];

		$('.notification', html).each(function () {
			const title = $(this).text();
			const url = $(this).find('a').attr('href')
			articles.push({
				title,
				url
			});
		});
		res.json(dataArray);
	}).catch(err => {
		console.log(err);
	});

})

app.listen(PORT, () => {
	console.log(`server running on port: ${PORT} yo`)
})