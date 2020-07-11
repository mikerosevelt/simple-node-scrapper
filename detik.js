const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

axios.get('https://detik.com/').then(
	(response) => {
		if (response.status === 200) {
			const html = response.data;
			const $ = cheerio.load(html);
			let detikList = [];
			$('.container').each(function (i, elem) {
				detikList[i] = {
					judul: $(this).find('h2').text().trim,
					url: $(this).find('a').attr('href'),
					published: $(this).find('.labdate').text().trim(),
				};
			});
			const detikListTrim = detikList.filter((n) => n != undefined);
			fs.writeFile(
				'data/detiklist.json',
				JSON.stringify(detikListTrim, null, 4),
				(err) => {
					console.log('Write scrapping is success');
				}
			);
		}
	},
	(error) => {
		console.log(error);
	}
);
