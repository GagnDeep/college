const r = require('./dataArr_bcom_bikram');

r.forEach(e =>{
    console.log(e.result.reduce((a, b) => {
                    if (!b.total)
                        console.log(b.total)
                    return a + (b.total ? b.total : 0);
                }, 0))
})