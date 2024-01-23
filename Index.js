const axios = require('axios');
const cheerio = require('cheerio');

const express = require('express');
const app = express ();

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
    if(response.status ===200) {
    const html = response.data
    const $ = cheerio.load(html)

    const pageTitle = $('title').text()

    const links = [];
    const imgs = [];
    const paragraphs = [];

    $('a').each((index, element) => {
    const link = $(element).attr('href')
    links.push(link)
    })

    $('img').each((index, element) => {
        const img = $(element).attr('src')
        imgs.push(img)
    })
    $('p').each((index, element) => {
        paragraphs.push($(element).text().trim());
      });


    res.send(`
    <h1>${pageTitle}</h1>
   
    <h2>Imágenes</h2>
    <ul>
    ${imgs.map(img => `<li>${img}</li>`).join('')}
    </ul>

    <h2>Texto</h2>
    <ul>
    ${paragraphs.map(paragraphs => `<li>${paragraphs}</li>`).join('')}
    </ul>

    <h2>Enlaces</h2>
    <ul>
    ${links.map(link => `<li>${link}</li>`).join('')}
    </ul>
    `) }
    })
})



app.listen(3000,() => {
    console.log('Express esta escuchando en el puerto http://localhost:3000')
})
