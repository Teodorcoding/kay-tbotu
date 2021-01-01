const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  var toplam = db.fetch(`toplamKayit_${message.author.id}`)
  const genelrol = message.guild.roles.find(r => r.id === "KAYITLI ROLÜ ID"); //Kayıtlı rolün ID si
  const kız = message.guild.roles.find(r => r.id === "KIZ ROLÜ ID"); // Kız rolü ID si
  const misafir = message.guild.roles.find(r => r.id === "MİSAFİR ROLÜ ID"); // Misafir rolü ID si
  const log = message.guild.channels.find(c => c.id === "LOG ID"); //Log kanal ID si
  const tag = "TAG"; //sunucudaki tagınız yoksa boş bırakın
  if(!message.member.roles.array().filter(r => r.id === "KAYIT SORUMLUSU ID")[0]) { //Yetkili rolün ID si
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
    c.addRole(kız)
    c.removeRole(misafir)
    c.setNickname(`${tag} ${nick} | ${yas}`)
    db.add(`bayanKayit_${message.author.id}`, 1)
    db.add(`toplamKayit_${message.author.id}`, 1)
    const embed = new Discord.RichEmbed()
    .setAuthor("Kız Kayıt Yapıldı")
    .addField(`💎 Kaydı yapılan\n`, `${c.user.tag}`)
    .addField(`💎 Kaydı yapan\n`, `${message.author.tag}`)
    .addField(`💎 Yeni isim\n`, `${tag} ${nick} , ${yas}`)
    .addField(`💎 Toplam Kayıt\n`, toplam || 0)
    .setFooter("Mücahid Dinç")
    .setColor("#ffcbdb")
    log.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k"],
  permLevel: 0
};
exports.help = {
  name: "k",
  description: "k",
  usage: "k"
};

