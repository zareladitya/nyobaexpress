const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const tickets = require('../data/tickets.json'); // Adjust the path to your JSON file

tickets.forEach(ticket => {
    for (let i = 0; i < ticket.amount; i++) {
        const uniqueId = `${ticket.id}-${i + 1}`;
        const qrCodePath = path.join(__dirname, `../public/qrcodes/${uniqueId}.png`);
        QRCode.toFile(qrCodePath, uniqueId, function (err) {
            if (err) throw err;
            console.log(`QR Code for ${ticket.name} (${uniqueId}) generated!`);
        });
    }
});
