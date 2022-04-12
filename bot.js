const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

//haciendo el cliente
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
	console.log('Bot ready');
});

client.login(token);
