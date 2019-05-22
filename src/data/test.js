let fs = require('fs');

let result_sem1_bca = require('./results-sem1'),
    result_sem2_bca = require('./results-sem2'),
    studentInfo_bca = require('./student-info'),
    result_sem2_bcom = require('./results-sem2-bcom'),
    studentInfo_bcom = require('./data-bcomMohindra'),
    result_sem3_bcom_rajinder = require('./dataArrBcomRajinder'),
    studentInfo_bcom_rajinder = require('./dataBcomRajinder');
    


let data = {
        bca: {
            full: {},
            partial: {}
        },
        bcom: {
            full: {},
            partial: {}
        },
        bcom_rajinder: {
            full: {},
            partial: {}
        }
    },
    result1 = {},
    result2 = {},
    result2_bcom = {},
    result2_bcom_rajinder = {};

result_sem1_bca.forEach(e => result1[e.RollNo.replace(/\s/g, '')] = e)
result_sem2_bca.forEach(e => result2[e.RollNo.replace(/\s/g, '')] = e)
result_sem2_bcom.forEach(e => result2_bcom[e.RollNo.replace(/\s/g, '')] = e)
result_sem3_bcom_rajinder.forEach(e => result2_bcom_rajinder[e.RollNo.replace(/\s/g, '')] = e)


let execptions = [
    'Drug Abuse:Problem Mgt.& Prevention (Qualified)'
]

studentInfo_bca.forEach(el => {
    if (el && el.rollno) {
        let rollno = el.rollno.replace(/\s/g, '')
        data.bca.full[rollno] = { ...el,
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
        data.bca.partial[rollno] = {
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
        console.log(data.bca.partial)
    }
})


studentInfo_bcom.forEach(el => {
    if (el && el.rollno) {
        let rollno = el.rollno.replace(/\s/g, '')
        data.bcom.full[rollno] = { ...el,
            result: {
                sem2: {
                    resultData: result2_bcom[rollno].result,
                    resultState: result2_bcom[rollno].pass,
                    total: getTotal(result2_bcom[rollno].result)
                }
            }
        }
        data.bcom.partial[rollno] = {
            name: el.name,
            rollno: rollno,
            result: {
                sem2: {
                    resultState: result2_bcom[rollno].pass,
                    total: getTotal(result2_bcom[rollno].result)
                }
            }
        }
        console.log(data.bcom.partial)
    }
})


studentInfo_bcom_rajinder.forEach(el => {
    if (el && el.rollno) {
        let rollno = el.rollno.replace(/\s/g, '')
        data.bcom_rajinder.full[rollno] = { ...el,
            result: {
                sem3: {
                    resultData: result2_bcom_rajinder[rollno].result,
                    resultState: result2_bcom_rajinder[rollno].pass,
                    total: getTotal(result2_bcom_rajinder[rollno].result)
                }
            }
        }
        data.bcom_rajinder.partial[rollno] = {
            name: el.name,
            rollno: rollno,
            result: {
                sem3: {
                    resultState: result2_bcom_rajinder[rollno].pass,
                    total: getTotal(result2_bcom_rajinder[rollno].result)
                }
            }
        }
        console.log(data.bcom_rajinder.partial)
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
fs.writeFile('./studentDataInJson.json', JSON.stringify(data), function(err) {
    if (err) throw err;
})

// console.log(data['10013'].image)
