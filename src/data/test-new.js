let fs = require('fs');

let results = {
    sem3: require('./dataArr_bcom_bikram'),

}
let studentInfo = require('./data_bcom_bikram');

let execptions = [
    'Drug Abuse:Problem Mgt.& Prevention (Qualified)'
]

let data = {
        full: {},
        partial: {}
    },
    resultsObj = {};

Object.keys(results).forEach(element => {
    if (!resultsObj[element])
        resultsObj[element] = {}

    results[element].forEach(e => resultsObj[element][e.RollNo.replace(/\s/g, '')] = e)
})

studentInfo.forEach(el => {
    if (el && el.rollno) {
        let rollno = el.rollno.replace(/\s/g, '')
        data.full[rollno] = { ...el,
            result: function() {
                let obj = {};
                Object.keys(resultsObj).forEach(e => {
                    obj[e] = {
                        resultData: resultsObj[e][rollno].result,
                        resultState: resultsObj[e][rollno].pass,
                        total: getTotal(resultsObj[e][rollno].result)
                    }
                })
                return obj
            }()
        }
        data.partial[rollno] = {
            name: el.name,
            rollno: el.rollno,
            result: function() {
                let obj = {};
                Object.keys(resultsObj).forEach(e => {
                    obj[e] = {
                        resultState: resultsObj[e][rollno].pass,
                        total: getTotal(resultsObj[e][rollno].result)
                    }
                })
                return obj
            }()
        }
    }
})

function getTotal(arr) {
    return arr.reduce((a, c) => {
        // c = execptions.indexOf(c.subject) === -1 ? (c.internal ? c.internal : 0) +
        //     (c.external ? c.external : 0) : 0
        return a + (c.total?c.total:0)
    }, 0)
}

fs.writeFile('./studentDataInJson-single-course.json', JSON.stringify(data), function(err) {
    if (err) throw err;
})
