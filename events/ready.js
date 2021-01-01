const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;

module.exports = client => {
 setInterval(function() {
}, 8000);
client.user.setPresence({
        game: {
            name: `Mücahid Dinç | ?komutlar`,
            type: 'WATCHING'   //Watching = izliyor , Listennig = dinliyor , playing = oynuyor
        },
        status: 'BOTUN DURUMU'
    })
    console.log(`MD Kayit`);
}

//Mücahid tarafından ÇALMAYINIZ!