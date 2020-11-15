require('dotenv').config();
const Discord = require('discord.js');

const FakeDatabase = require('./tests/fakeDatabase');
const Utilities = require('./src/utilities');
const Search = require('./src/search');
const db = new FakeDatabase();
const utilities = new Utilities();
const searchEngine = new Search(db, utilities);

const bot = new Discord.Client();
const TOKEN = process.env.DISCORD_TOKEN;
bot.login(TOKEN);
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});
bot.on('message', message => {
  if(message.author === bot.user) return;

  cards = searchEngine.findCards(message.content);
  cards.forEach(card => {
    if(card){
      message.channel.send(card.toEmbed(utilities));
    }else{
      message.react("❌");
    }
  });

});