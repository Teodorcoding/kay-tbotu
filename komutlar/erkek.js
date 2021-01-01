const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
var toplam = db.fetch(`toplamKayit_${message.author.id}`)
 
 const genelrol = message.guild.roles.find(r => r.id === "KAYITLI ROLÜ ID"); //Kayıtlı rolü ID si
  const erkek = message.guild.roles.find(r => r.id === "ERKEK ROLÜ ID"); //Erkek rolü ID si
  const misafir = message.guild.roles.find(r => r.id === "MİSAFİR ROLÜ ID");  //misafir rolü ID si
  const log = message.guild.channels.find(c => c.id === "LOG KANALI ID"); //Log kanalı ID si
  const tag = "TAG"; //Sunucudaki tagınız eğer yoksa boş bırakın
  if(!message.member.roles.array().filter(r => r.id === "KAYIT SORUMLUSU ID")[0]) {  //Kayıt Sorumlusu rolün ID si
    return message.channel.send("**Bu İşlemi Gerçekleştirmek İçin Kayıt Sorumlusu Olman Gerekli!**");
  } else {
    let member = message.mentions.users.first() || client.users.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const c = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Bir isim girin.")
      if(!yas) return message.channel.send("Bir yaş girin.")
    c.addRole(genelrol)
    c.addRole(erkek)
    c.removeRole(misafir)
    c.setNickname(`${tag} ${nick} | ${yas}`)
    db.add(`erkekKayit_${message.author.id}`, 1)
    db.add(`toplamKayit_${message.author.id}`, 1)
    const embed = new Discord.RichEmbed()
    .setAuthor("Erkek Kayıt Yapıldı")
    .addField(`💎 Kaydı yapılan\n`, `${c.user.tag}`)
    .addField(`💎 Kaydı yapan\n`, `${message.author.tag}`)
    .addField(`💎 Yeni isim\n`, `${tag} ${nick} , ${yas}`)
    .addField(`💎 Toplam Kayıt\n`, toplam || 0)
    .setFooter("Mücahid Dinç")
    .setColor("#1955a8")
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 0
};
exports.help = {
  name: "e",
  description: "e",
  usage: "e"
};
