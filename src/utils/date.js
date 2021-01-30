let currentDate = new Date().toISOString();
let currentDate2 = new Date();

const createTimeStamp = (dbTime) => {
    //console.log('db',JSON.stringify(dbTime))
    let dbTimeStamp = new Date(dbTime)
    console.log("current",currentDate2)

    console.log("timestamp",dbTimeStamp)
let diffMs = (currentDate2- dbTimeStamp); // milliseconds between now & dbTimeStamp
let diffMs2 = diffMs
let days = Math.floor(diffMs2/1000/60/60/24)
diffMs2 -= days*1000*60*60*24

let hours = Math.floor(diffMs2/1000/60/60)
diffMs2 -= hours*1000*60*60

let minutes = Math.floor(diffMs2/1000/60)
diffMs2 -= minutes*1000*60

let seconds = Math.floor(diffMs2/1000)


    console.log('difference = ' + 
    days + ' day/s ' + 
    hours + ' hour/s ' + 
    minutes + ' minute/s ' + 
    seconds + ' second/s ');

    let date = currentDate.substring(0,10);
    let time = currentDate.substring(11,19);
    let num = time.replace(':',"")
    console.log("new Date",`${date} ${time}`)

    return `${date} ${time}`;
}

module.exports = createTimeStamp;