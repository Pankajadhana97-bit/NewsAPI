const PORT = process.env.PORT || 4000 ;
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();

const newspapers = [
	{
		name :'thehindu',
		address: 'https://www.thehindu.com/',
		base : ''
	},
	{
		name: 'hindustan times',
		address: 'https://www.hindustantimes.com/',
		base: 'https://www.hindustantimes.com'
	},
	{
		name: 'indian express',
		address: 'https://indianexpress.com/',
		base: ''
	},
	{
		name: 'Economic Times',
		address: 'https://economictimes.indiatimes.com/',
		base: 'https://economictimes.indiatimes.com'
	},
	{
		name: 'Dawn',
		address: 'https://www.dawn.com/',
		base : ''
	}
]

const tags = [ "market","markets","Market","Markets","MARKET","MARKETS","bussiness"]

newspapers.forEach(newspaper =>{
	axios.get(newspaper.address).then(response =>{

		const html = response.data;
		const $ = cheerio.load(html);
		//what it will do it will figure out the news based on the tags provided by us 
		tags.forEach(tag =>{
			$('a:contains(tag)', html).each(function () {
				const title = $(this).text();
				const url = $(this).attr('href');
				article.push({ title, url: newspaper.base + url, source: newspaper.name });
			})
		})

	}).catch(err => console.log(err));
})

const article = [];
app.get('/',(req,res)=>{
		 res.json(article);
})
app.listen(PORT,()=>console.log(`listening on port ${PORT}`));