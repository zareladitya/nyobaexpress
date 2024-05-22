const fs = require('fs')

const dirPath = './data'
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

const dataPath = './data/tickets.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadTickets = () => {
    const fileBuffer = fs.readFileSync('data/tickets.json', 'utf-8');
    const tickets = JSON.parse(fileBuffer);
    return tickets;
}



module.exports = { loadTickets }