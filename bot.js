const {Client, Intents} = require('discord.js');
//const { token } = require('./config.json');
const { pastas } = require('./pastas.json');
require('dotenv').config();
const tokenenv = process.env.TOKEN;

//haciendo el cliente
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});



client.on('ready', () => {
	console.log('Bot ready');
});

client.on('messageCreate', (msg)=>{
	if(msg.author.bot){return}
	if(msg.channel.id=="963263187468308530" || msg.channel.id=="955847068331679765" ){
		for(const pasta in pastas){
			if (msg.content.includes(pastas[pasta].text)){
				msg.reply(pastas[pasta].copypasta);
			}
		}
	}
});

client.login(tokenenv);

