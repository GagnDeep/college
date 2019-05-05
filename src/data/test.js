let fs = require('fs');

let result_sem1 = require('./results-sem1'),
    result_sem2 = require('./results-sem2'),
    studentInfo = require('./student-info');


let data = {
        full: {},
        partial: {}
    },
    result1 = {},
    result2 = {};

result_sem1.forEach(e => result1[e.RollNo.replace(/\s/g, '')] = e)
result_sem2.forEach(e => result2[e.RollNo.replace(/\s/g, '')] = e)


let execptions = [
    'Drug Abuse:Problem Mgt.& Prevention (Qualified)'
]

studentInfo.forEach(el => {
    if (el && el.rollno) {
        let rollno = el.rollno.replace(/\s/g, '')
        data.full[rollno] = { ...el,
            result: {
                sem1: {
                    resultData: result1[rollno].result,
                    resultState: result1[rollno].pass,
                    total: getTotal(result1[rollno].result)
                },
                sem2: {
                    resultData: result2[rollno].result,
                    resultState: result2[rollno].pass,
                    total: getTotal(result2[rollno].result)
                }
            }
        }
        data.partial[rollno] = {
            name: el.name,
            rollno: rollno,
            result: {
                sem1: {
                    resultState: result1[rollno].pass,
                    total: getTotal(result1[rollno].result)
                },
                sem2: {
                    resultState: result2[rollno].pass,
                    total: getTotal(result2[rollno].result)
                }
            }
        }
        console.log(data.partial)
    }
})

function getTotal(arr) {
    return arr.reduce((a, c) => {
        c = execptions.indexOf(c.subject) === -1 ? (c.internal ? c.internal : 0) +
            (c.external ? c.external : 0) : 0
        return a + c
    }, 0)
}

// let str = "modules.exports = [" + JSON.stringify(data)+'];';

// fs.writeFile('./studentDataForNode.js', str, function(err){
//       if(err) throw err;
// })

// let str2 = "let arr = [" + JSON.stringify(data)+']; export default arr;';

// fs.writeFile('./studentDataForES6.js', str2, function(err){
//       if(err) throw err;
// })
fs.writeFile('./studentDataInJson.json', JSON.stringify(data), function(err){
      if(err) throw err;
})

// console.log(data['10013'].image)
