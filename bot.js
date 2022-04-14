const {Client, Intents} = require('discord.js');
//const { token } = require('./config.json');
//const { pastas } = require('./pastas.json');
require('dotenv').config();
const tokenenv = process.env.TOKEN;
const {Matrix3} = require('./gauss.js');

//haciendo el cliente
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});



client.on('ready', () => {
	console.log('Bot ready');
});

client.on('messageCreate', (msg)=>{
	if(msg.author.bot){return}
	if(msg.channel.id=="963263187468308530" || msg.channel.id=="955847068331679765" ){
		const {pastas} = require('./pastas.json')
		find: {
		for(const pasta in pastas){
			if (msg.content.includes(pastas[pasta].text)){
				msg.reply(pastas[pasta].copypasta);
				break find;
			}
		}
			if (msg.content.includes("!matriz")){
				let elements = msg.content.slice(8).split(" ");
				let mat = new Matrix3(elements);
				msg.reply(solveMatrix(mat));
			}
		}
		
	}
});

client.login(tokenenv);

function stringMat(matr){
	let a = matr.array
	return `${a[0][0]}	${a[0][1]}	${a[0][2]}	|${a[0][3]}\n${a[1][0]}	${a[1][1]}	${a[1][2]}	|${a[1][3]}\n${a[2][0]}	${a[2][1]}	${a[2][2]}	|${a[2][3]}\n`
}

function solveMatrix(mat){
	let response = "Resolución de la matriz por método de Gauss\n";
	response+=stringMat(mat);
	let solution = mat.triangulize();
	response+="La tercera fila se multiplica por " + solution[1][0]+ ", después se resta de la segunda fila.\n"
	response+=stringMat(solution[0][0]);
	response+=`La segunda fila se multiplica por ${solution[1][1]}, después se resta de la primera fila. \n`
	response+=stringMat(solution[0][1]);
	response+=`La tercera fila se multiplica por ${solution[1][2]}, después se resta de la segunda fila.\n`
	response+=stringMat(solution[0][2]);
	response+="Matriz triangulizada :D\n";
	let tmat = solution[0][2].array;
	response+="Ahora toca resolver las ecuaciones, supongamos que las variables son x, y, z.\n"	
	let z = tmat[2][3]/tmat[2][2];
	response+=`${tmat[2][2]}(z) = ${tmat[2][3]} --> z=${z}.\n`
	let y = (tmat[1][3]-tmat[1][2]*z)/tmat[1][1];
	response+=`${tmat[1][1]}(y)+${tmat[1][2]}(${z}) = ${tmat[1][3]} -->  y=${y}\n`
	let x = (tmat[0][3]-tmat[0][2]*z-tmat[0][1]*y)/tmat[0][0];
	response+=`${tmat[0][0]}(x)+${tmat[0][1]}(${y})+${tmat[0][2]}(${z}) = ${tmat[0][3]} -->  x=${x}\n`
	response+=`Por lo tanto las respuestas en orden son: (${x}|${y}|${z}).\n`
	return response;
}
