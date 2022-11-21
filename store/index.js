const fs = require('fs');
const path = require('path');

const route = path.join(__dirname, 'webSites.json');
const data = JSON.parse(fs.readFileSync(route, "utf-8"));

function lastId() {
    if (data.length == 0) return 1;
    console.log(data)
    let preId = 0;
    data.forEach(({ short_url }) => {
        if (short_url > preId)
            preId = short_url;
    });
    return preId + 1;
}


exports.read = data;
exports.write = (register) => {
    let url = {
        ...register,
        short_url: lastId(),
    }
    data.push(url);
    fs.writeFileSync(route, JSON.stringify(data), "utf-8");

    return url;
}

