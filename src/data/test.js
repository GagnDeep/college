
let fs = require('fs');

let result_sem1 = require('./results-sem1'),
    result_sem2 = require('./results-sem2'),
    studentInfo = require('./student-info');


let data = {},
    result1 = {},
    result2 = {};

result_sem1.forEach(e => result1[e.RollNo.replace(/\s/g, '')] = e)
result_sem2.forEach(e => result2[e.RollNo.replace(/\s/g, '')] = e)

studentInfo.forEach(el => {
    if (el && el.rollno) {
        let rollno = el.rollno.replace(/\s/g, '')
        data[rollno] = {...el, result: {
            sem1: {
                resultData: result1[rollno].result,
                resultState: result1[rollno].pass
            },
            sem2: {
                resultData: result2[rollno].result,
                resultState: result2[rollno].pass
            }
        }}
        // console.log(rollno, result1[rollno].result)
    }
})

// let str = "modules.exports = [" + JSON.stringify(data)+'];';

// fs.writeFile('./studentDataForNode.js', str, function(err){
//       if(err) throw err;
// })

// let str2 = "let arr = [" + JSON.stringify(data)+']; export default arr;';

// fs.writeFile('./studentDataForES6.js', str2, function(err){
//       if(err) throw err;
// })
// fs.writeFile('./studentDataInJson.json', JSON.stringify(data), function(err){
//       if(err) throw err;
// })

console.log(data['10013'].image)
