let newDate = new Date().toISOString();

const createTimeStamp = () => {
    let date = newDate.substring(0,10);
    let time = newDate.substring(11,19);
    console.log("new Date",`${date} ${time}`)
    return `${date} ${time}`;
}

module.exports = createTimeStamp;