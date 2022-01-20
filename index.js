const csv = require('csv-parser')
const fs = require('fs')
const results = []

// check if canada.txt or usa.txt exist, delete them
try {
    if(fs.existsSync('canada.txt')) {
        fs.unlinkSync('canada.txt')
        console.log('canada.txt deleted...')
    }
    if(fs.existsSync('usa.txt')) {
        fs.unlinkSync('usa.txt')
        console.log('usa.txt deleted...')
    }
} catch(err) {
    console.log(err)
}

// assign values to canada.txt and usa.txt
fs.writeFileSync('canada.txt', 'country,year,population\n')
fs.writeFileSync('usa.txt', 'country,year,population\n')

// read csv
fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log('csv file read...');
    for(const val of results) {
        if(val['country'] == 'Canada') {
            fs.appendFileSync('canada.txt', `${val['country']},${val['year']},${val['population']}\n`)
        }
        if(val['country'] == 'United States') {
            fs.appendFileSync('usa.txt', `${val['country']},${val['year']},${val['population']}\n`)
        }
    }
    console.log('data written to usa.txt & canada.txt...')
  });



