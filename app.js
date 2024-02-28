const express = require('express');
const app = express();
const port = 4500;

const path = require('path');
app.set('views', path.join(__dirname, 'views'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

const lp = require('./stock_scrap');

const ticker = 'ZOMATO'; // If NSE then use name i.e. 'ZOMATO' and if BSE/BOM then use code i.e. '543320'
const stockExchange = 'NSE'; // If NSE then use 'NSE' and if BSE then use 'BOM'

const url = `https://www.google.com/finance/quote/${ticker}:${stockExchange}?hl=en`;

app.get('/', async (req, res) => {
    try {
        const latestPrice = await lp(url);
        // console.log(latestPrice);
        res.render('home', { latestPrice, ticker, stockExchange })
    } catch (error) {
        console.error('Error:', error.message);
        res.render('error', { error: error.message });
    }
});

app.listen(port, () => {  
    console.log(`App listening at http://localhost:${port}`);
});
