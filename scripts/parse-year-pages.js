const fs = require('fs')
const mkdirp = require('mkdirp')
const cheerio = require('cheerio')
const inputDir = 'output/year-pages';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function parseLi(sel) {
    const a = sel.find('a');
    const NumATags = a.length;
    const nameIndex = (NumATags===3)? 1:0;

    const name = a.eq(nameIndex).attr('title');
    const link = a.eq(nameIndex).attr('href');
    const year_of_birth = a.eq(-1).attr('title');
    let date_of_death;
    if(nameIndex){
        date_of_death = a.eq(0).attr('title');
    } else{
        date_of_death = sel.parent().parent().find('a').eq(0).attr('title')
    }
    console.log({name, link, year_of_birth, date_of_death});
    // return {
    //     name: name,
    //     link:link
    //     year_of_birth: year_of_birth,
    //     date_of_death: date_of_death
    // }
}

function extractPeople(file) {
    const html = fs.readFileSync(`${inputDir}/${file}`, 'utf-8')
    const $ = cheerio.load(html);
    const parent = $(`#${months[0]}_2`).parent();
    const ul = parent.nextAll('ul').eq(0);
    console.log(ul.length);
    ul.find('li').each((i, el)=>parseLi($(el)))

}

function init() {
    const files = fs.readdirSync(inputDir)
        .filter(d=>d.includes('.html'))
    files.slice(0,1).map(extractPeople);
}
init()