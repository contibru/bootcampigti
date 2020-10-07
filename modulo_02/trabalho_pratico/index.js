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
	await GenerateJsonFromCities(estados, cidades);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})

	rl.question("Informe uma sigla para contar as cidades: ", async stateAcronym => {
		console.log(await CountCitiesFromState(stateAcronym))
		rl.close()
	})

	await LogStatesCities(estados);
	LogCitiesWithBiggestNames(estados, cidades)
	LogCitiesWithTiniestNames(estados, cidades)

	LogCitieWithBiggestName(cidades, estados);
	LogCitieWithTiniestName(cidades, estados);


}

function LogCitieWithTiniestName(cidades, estados) {
	cidades.sort((a, b) => {
		return a.Nome.length - b.Nome.length || a.Nome.localeCompare(b.Nome);
	});

	var estadoComMaiorCidade = estados.find(el => {
		return el.ID === cidades[0].Estado
	});

	console.log(`${cidades[0].Nome} - ${estadoComMaiorCidade.Sigla}`);
}

function LogCitieWithBiggestName(cidades, estados) {
	cidades.sort((a, b) => {
		return b.Nome.length - a.Nome.length || a.Nome.localeCompare(b.Nome)
	});

	var estadoComMaiorCidade = estados.find(el => {
		return el.ID === cidades[0].Estado;
	});

	console.log(`${cidades[0].Nome} - ${estadoComMaiorCidade.Sigla}`);
}

function LogCitiesWithBiggestNames(estados, cidades) {
	var citiesWithBiggestName = [];
	for (let i = 0; i < estados.length; i++) {
		const estado = estados[i];

		let citiesFromState = cidades.filter(cidade => {
			return cidade.Estado === estado.ID;
		});
		citiesFromState.sort((a, b) => {
			return b.Nome.length - a.Nome.length || a.Nome.localeCompare(b.Nome)
		});
		citiesWithBiggestName.push(`${citiesFromState[0].Nome} - ${estado.Sigla}`);
	}
	console.log(citiesWithBiggestName);
}

function LogCitiesWithTiniestNames(estados, cidades) {
	var citiesWithBiggestName = [];
	for (let i = 0; i < estados.length; i++) {
		const estado = estados[i];

		let citiesFromState = cidades.filter(cidade => {
			return cidade.Estado === estado.ID;
		});
		citiesFromState.sort((a, b) => {
			return a.Nome.length - b.Nome.length || a.Nome.localeCompare(b.Nome);
		});
		citiesWithBiggestName.push(`${citiesFromState[0].Nome} - ${estado.Sigla}`);
	}
	console.log(citiesWithBiggestName);
}

// Questão 03 e 04.
async function LogStatesCities(estados) {
	var estadosCount = [];
	for (let i = 0; i < estados.length; i++) {
		const estado = estados[i];
		let totCities = await CountCitiesFromState(estado.Sigla);
		estadosCount.push({
			Sigla: estado.Sigla,
			TotalCidades: totCities
		});
	}

	estadosCount.sort((a, b) => {
		return b.TotalCidades - a.TotalCidades;
	});
	console.log(estadosCount.slice(0, 5).map((element => {
		return `${element.Sigla} - ${element.TotalCidades}`;
	})));

	console.log(estadosCount.reverse().slice(0, 5).map((element => {
		return `${element.Sigla} - ${element.TotalCidades}`;
	})).reverse());

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