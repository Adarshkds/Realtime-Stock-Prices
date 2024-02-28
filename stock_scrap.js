const axios = require('axios');
const cheerio = require('cheerio');

function lp(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                const $ = cheerio.load(response.data);
                const class1 = "YMlKec.fxKbKc";
                const latestPrice = parseFloat($(`.${class1}`).text().trim().substring(1).replace(",", ""));
                resolve(latestPrice);
            })
            .catch(error => {
                console.error('Error in axios:', error.message);
                reject(error);
            });
    });
}

module.exports = lp;

