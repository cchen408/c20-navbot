const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
var request = require("request");

bot.login(config.token);

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.username}!`);
});
bot.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type !== "text") return;
  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "npt") {
    var url = "https://www.crypto20.com/status";
    request(url, function(error, response, html) {
      if (!error) {
        //console.log(html);
        let obj = JSON.parse(html);
        console.log("The current nav_per_token is: " + obj.nav_per_token);
        message.reply("The current nav_per_token is: " + obj.nav_per_token);
      }
    });
  }
});
