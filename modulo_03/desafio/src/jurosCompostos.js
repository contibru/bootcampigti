function CalculateInterest(initialValue, interestPerc, months) {

    class Parcela {

        constructor(parcela, vlrAcumulado, vlrAumento, perAumento) {

            this.parcela = parcela
            this.vlrAcumulado = vlrAcumulado
            this.vlrAumento = vlrAumento
            this.perAumento = perAumento
        }
        
    }
    var finalArray = []
    let valorAcumulado = initialValue
    for (let i = 1; i <= months; i++) {
        
        let parcela = new Parcela()
        
        parcela.parcela = i
        parcela.vlrAcumulado = round(valorAcumulado + ((valorAcumulado * interestPerc) / 100))

        parcela.vlrAumento = round(parcela.vlrAcumulado - initialValue)
        parcela.perAumento = getPercentage(parcela.vlrAumento, initialValue)
            

        finalArray.push(parcela)
        valorAcumulado = parcela.vlrAcumulado
    }

    return finalArray;

}

function getPercentage(part, total) {

    return round(part / total * 100 )
}

function round(value) {
    return +value.toFixed(2);
}


export { CalculateInterest};