const {Client, Intents} = require('discord.js');
const { token } = require('./config.json');

//haciendo el cliente
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});



client.on('ready', () => {
	console.log('Bot ready');
});

client.on('messageCreate', (msg)=>{
	if(msg.channel.id=="963263187468308530" && msg.content.includes('flaca')){
		msg.reply('te digo en 2 sencillos pasos en como hacer que te quiera, paso 1 cuando vayan a verse le miras a los ojos y le dices ya esta aqui tu macho que te sacara de este cerro, paso 2 le das 50 soles a mas y listo problema solucionado')
	}
});

client.login(token);

