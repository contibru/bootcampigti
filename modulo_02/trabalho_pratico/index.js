import {
	promises as fs
} from 'fs'
import * as readline from "readline";
init()

async function init() {

	var i = 0;
	const estados = JSON.parse(await fs.readFile('C:/desenv/personal/bootcamp_igti/modulo_02/trabalho_pratico/Estados.json', 'UTF-8'))
	const cidades = JSON.parse(await fs.readFile('C:/desenv/personal/bootcamp_igti/modulo_02/trabalho_pratico/Cidades.json', 'UTF-8'))

	// Ordenas os estados pelo ID.
	estados.sort((a, b) => {
		return parseInt(a.ID) - parseInt(b.ID)
	});

	// Ordena as cidades pelo ID do estado e nome da cidades.
	cidades.sort((a, b) => {
		return parseInt(a.Estado) - parseInt(b.Estado) || a.Nome.length - b.Nome.length || a.Nome.localeCompare(b.Nome);
	});

	await fs.writeFile("C:/desenv/personal/bootcamp_igti/modulo_02/trabalho_pratico/Cidades_ordenado.json", JSON.stringify(cidades))
	GenerateJsonFromCities(estados, cidades);

	// const rl = readline.createInterface({
	// 	input: process.stdin,
	// 	output: process.stdout
	// })

	// rl.question("Informe uma sigla para contar as cidades: ", async stateAcronym => {
	// 	console.log(await CountCitiesFromState(stateAcronym))
	// 	rl.close()
	// })
}

// Questão 02.
async function CountCitiesFromState(stateAcronym) {
	return JSON.parse(await fs.readFile(`${stateAcronym}.json`)).length;
}

// Questão 01.
async function GenerateJsonFromCities(estados, cidades) {
	var arrayCidades = [];
	var i = 0

	for (let i = 0; i < estados.length; i++) {
		const estado = estados[i];

		for (let j = 0; j < cidades.length; j++) {
			const cidade = cidades[j];
			if (estado.ID === cidade.Estado) {
				arrayCidades.push(cidade)
			} else if (arrayCidades.length > 0) {
				break;
			}

		}
		await fs.writeFile("C:/desenv/personal/bootcamp_igti/modulo_02/trabalho_pratico/" + estado.Sigla + ".json", JSON.stringify(arrayCidades));
		arrayCidades = [];

	}


}