const csv = require('csvtojson');
let emailDic = {};
let t = {};

csv().fromFile('m17.csv').then((jsonObj)=>{
    jsonObj.forEach((data) => {
        emailDic[data.Name] = data.Email;

        if(data.SupervisorID === ''){
        
        } else {
            // console.log(typeof t[data.SupervisorID])
            if(typeof t[data.SupervisorID] !== 'object'){
                t[data.SupervisorID] = new Array();
            }

            t[data.SupervisorID].push(data.Name);
        }
        
    })
    console.log(loopObj(t));
}).catch((error)=>{
    console.log(error)
});

function loopObj(obj){
    for (var prop in obj) {
        res = prop + ': ' + loopArray(obj[prop])
        console.log('\n' + res);
    }
}

function loopArray(arr){
    let res = ''
    arr.forEach(d => {
        if(d in t){ //contain this key
            res += emailDic[d] + ', ' + loopArray(t[d]);
        } else {
            res += emailDic[d] + ', ';
        }
    })

    return res;
}
