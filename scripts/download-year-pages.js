const fs = require('fs')
const wiki = require('wikijs').default;
const mkdirp = require('mkdirp')

const year =["2015", "2016", "2017", "2018"];
const outputDir = './output/year-pages';

function download(year) {
    wiki()
        .page(year)
        .then(page => page.html())
        .then((html)=>{
            fs.writeFileSync(`${outputDir}/${year}.html`, html)
        });
}
mkdirp(outputDir);
year.forEach(download)