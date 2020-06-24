const fs = require('fs');
function writeJSON(data) {
    fs.writeFileSync('data.json', JSON.stringify(data))
    break;
}
module.exports = writeJSON