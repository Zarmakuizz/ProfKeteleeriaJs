require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = process.env.DISCORD_TOKEN;

bot.login(TOKEN);
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});
bot.on('message', message => {
  if(message.author === bot.user) return;

  cards = [true, false] // TODO port
  cards.forEach(card => {
    if(card){
      message.channel.send(`Onche onche KOM T MOSH ${message.author.username} :innocent:`)
    }else{
      message.react("❌");
    }
  });

});