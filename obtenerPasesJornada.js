/* 
AUTOR:Miquel Vidal Cortés
OBJETIVO: Conjunto de código utilizado para obtener los datos necesarios para la red final.
ACLARACIONES: Para filtar partimos de una array de objetos llamado partido el cual contiene toda la información sobre un encuntro.
              Destacar que es un objeto json.
SALIDA: fichero json que contiene una array de objetos. El formato de los objetos es {"pasador":id, "receptor":id. "conexion": valor}.
        cada uno de dichos objetos represena los pases de A hacia B de todos lo jugadores durante una jornada.

*/

//Obtención del número de jugadores implicados en un partido
//Contavilizamos el número de titulares
let titulares = 0
for (i in partido[0].tactics.lineup) {
    titulares++
}

//Obtención de los jugadores que han entrado des de el banquillo.
//Type id indica el tipo de acción que está sucediendo, en este caso una substitución.
for (j in partido) {
    if (partido[j].type.id == 19 && (partido[j].team.name == "Arsenal")) {
        //Visualizamos el nombre y el identificador del jugador que entra al campo.
        nombre = partido[j].substitution.replacement.name
        id = partido[j].substitution.replacement.id
        titulares++
    }
}
//Una vez sabemos el núermo de jugadores implicados, creamos una array con dicho tamaño. Esta array, nos permitirá filtrar los pases dados
//por el Arsenal durante un partido.
var jugadores = new Array(titulares)
var i = 0
for (i in partido[0].tactics.lineup) {
    //Cada posición de la array contiene el identificador del jugador.
    //Caso de los titulares.
    jugadores[i] = partido[0].tactics.lineup[i].player.id
    i++
}
for (j in partido) {
    if ((partido[j].type.id == 19 && (partido[j].team.name == "Arsenal"))) {
        //Comprovamos que el jugador a introducir no ha sido almacenado anteriormente.
        if ((jugadores.indexOf(partido[j].substitution.replacement.id)) < 0) {
            //Cada posición de la array contiene el identificador del jugador.
            //Caso de los titulares.
            jugadores[i] = partido[0].tactics.lineup[i].player.id
            jugadores[i] = partido[j].substitution.replacement.id
            i++
        }

    }

}

//Ahora, y con el objetivo de tener lo mas clarificado el fichero de salida donde almacenaremos los datos,
//realizamos una serie de comprovaciones. 
let pases = []
//Contabilizar pases de jugador A hacia B
var conexiones = 0
//Para cada jugador que ha participado.
for (i in jugadores) {
    //Para cada jugador pretendiente a posible receptor del pase
    for (k in jugadores) {
        //Para cada objeto de la array
        for (j in partido) {
            //Comprovamos que es d etipo pase y ha sido realizado por el Arsenal
            if (partido[j].type.id == 30 && (partido[j].team.name == "Arsenal")) {
                //Comprovamos si el pasador es el jugador tratado actualmente
                if (partido[j].player.id == jugadores[i]) {
                    //Comporvamos si existe receptor
                    if (partido[j].pass.recipient) {
                        //Si el receptor es el jugador pretendible, aumentamos el numero de pases realizados de i hacia j
                        if (partido[j].pass.recipient.id == jugadores[k])
                            conexiones++

                    }
                }
            }

        }
        //En el caso de que se haya comporvado todos los objetos pase y haya habido como mínimo uno de i hacia j, lo añadimos a una
        //variable de tipo json. Esto está creando un fichero json, que finalemente será convertido a csv.
        if (conexiones != 0) {
            let s = { pasador: jugadores[i], receptor: jugadores[k], conexion: conexiones }

            pases += JSON.stringify(s)
            pases += ","
            conexiones = 0
        }

    }
}


