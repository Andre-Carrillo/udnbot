const {Client, Intents} = require('discord.js');
//const { token } = require('./config.json');
const { pastas, v_r } = require('./pastas.json');
require('dotenv').config();
const tokenenv = process.env.TOKEN;
const {Matrix3} = require('./gauss.js');
const {Parabola} = require('./parabolas.js')

//haciendo el cliente
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});



client.on('ready', () => {
	console.log('Bot ready');
});

client.on('messageCreate', (msg)=>{
	if(msg.author.bot){return}
	if(msg.channel.id=="963263187468308530" || msg.channel.id=="955847068331679765" || msg.channel.id=="956909801433096222"){
		find: {
		for(const pasta in pastas){
			if (msg.content.includes(pastas[pasta].text)){
				msg.reply(pastas[pasta].copypasta);
				break find;
			}
		}
			if (msg.content.startsWith("!matriz")){
				let elements = msg.content.slice(8).split(" ");
				let mat = new Matrix3(elements);
				msg.reply(solveMatrix(mat));
			}else if(msg.content.startsWith("!verdad_reto")){
				if(Math.random()<0.5){
					msg.reply(v_r.verdad[Math.floor(Math.random()*v_r.verdad.length)])		
				}else{
					msg.reply(v_r.reto[Math.floor(Math.random()*v_r.reto.length)])
				}
			}else if(msg.content.startsWith("!gay")){
				let nombre = msg.content.slice(4)
				msg.reply(`${nombre} es ${Math.round(Math.random()*100)}% gay`)
			}else if(msg.content.startsWith("!recta")){
				console.log("recta command activated...");
				let numbers, response;
				console.log(msg.content.slice(7))
				switch (msg.content.slice(7, 9)){
					case "pp":
						numbers = msg.content.slice(9).trim().split(" ");
						console.log(numbers)
						response=`Resolución para hallar la ecuación de la recta con los puntos (${numbers[0]}, ${numbers[1]}), (${numbers[2]}, ${numbers[3]}).\n`;
						let median = (+numbers[1] - +numbers[3])/(+numbers[0] - +numbers[2]);
						response+=`Ahora hallaremos la pendiente de la recta que pasa por estos dos puntos. Esto se hace con la ecuación m=(X1-X2)/(Y1-Y2) --> m=${median}.\n`;
						response+=`Lo siguiente es hallar la ecuación de la recta mediante la siguiente ecuación: Y-Y1 = m(X-X1). Reemplazando tenemos Y-${numbers[1]} = ${median}(X-(${numbers[0]})).\nResolviendo esto tenemos que la ecuación de la recta es: Y = ${median}(X) + (${-median*numbers[0] + +numbers[1]}).\n`;
						msg.reply(response);
						break;
					case "mp":
						numbers = msg.content.slice(9).trim().split(" ");
						console.log(numbers);
						response = `Resolución para hallar la ecuación de la recta con pendiente ${numbers[0]} y que pasa por el punto (${numbers[1]}, ${numbers[2]}).\n`
						response+= `Se usa la ecuación Y-Y1 = m(X-X1).\nReemplazando: Y-${numbers[2]}=${numbers[0]}(X-(${numbers[1]})).\nDespejando Y sale la ecuación Y = ${numbers[0]}X + (${-1*numbers[0]*numbers[1] + +numbers[2]}).\n`;
						msg.reply(response);
						break;
				}
			}else if(msg.content.startsWith('!parabola')){
				msg.reply(solvePar(msg.content.slice(9).trim()))
			}
		}
		
	}
});

client.login(tokenenv);

function solvePar(string){
	let par = new Parabola(string)
	let response = "Información sobre la parábola determinada por: "+string+'\n';
	response+= `Despejando para y sale: (${par.info.a})x^2 +(${par.info.b})x+(${par.info.c})=y.\n`;
	response+=`La fórmula para el parámetro es 1/4a. Aplicando esta fórmula, el parámetro sale: ${par.info.p}.\n`;
	response+=`El vértice de una parábola (h, k) estará en el punto (-b/2a, f(-b/2a)). -b/2a = h = ${par.info.h}.\n`;
	response+=`Entonces evaluando este elemento en la formula de la parábola, obtenemos k=${par.info.k}.\n`;
	response+=`El vértice de la parábola está en (${par.info.h}, ${par.info.k}).\n`;
	return response;
}

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
