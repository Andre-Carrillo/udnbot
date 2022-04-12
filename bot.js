const {Client, Intents} = require('discord.js');
const { token } = require('./config.json');
const { pastas } = require('./pastas.json');

//haciendo el cliente
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});



client.on('ready', () => {
	console.log('Bot ready');
});

client.on('messageCreate', (msg)=>{
	if(msg.channel.id=="963263187468308530"){
		for(const pasta in pastas){
			if (msg.content === pastas[pasta].text){
				msg.reply(pastas[pasta].copypasta);
			}
		}
	}
});

client.login(token);

