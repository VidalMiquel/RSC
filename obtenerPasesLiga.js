/*
AUTOR: Miquel Vidal Cortés
OBJETIVO: Dado un fichero que contiene un objeto json "partido" el cual está formado por todos los pases dados durante la temporada
          entre los diferentes jugadores, obtener un fichero de salida con la combinación de todas ellas en uno de más reducido.
          Ahora lo que tendremos serán una array de objetos los cuales almazenarán todos los pases que A dio a B durante la temporada.
ACLARACIÓN: el fichero contiene una variable json de tipo array. Los objetos tiene la siguiente 
            forma {"pasador": id, "receptor": id, "conexiones": valor }
SALIDA: fichero json con todos los pases dados durante de liga de A hacia B para cada jugador del equipo.
*/

//Inicializamos una array con todos los jugadores que han dado o recibido como mínimo un pase. Para ello miramos jugadores implicados en
//un pase. 
var jugadores = new Array(20)
var j = 0
//Para cada objeto pase (pasador, receptor, cantidad)
for (i in partido) {
    //Comprovamos si el pasador ya ha sido amacenado
    if(jugadores.indexOf(partido[i].pasador)< 0){
        jugadores[j] = partido[i].pasador
        j++
    }
}

//Como sabes que hay más de un objeto que representa que el jugador A le ha dado un pase al jugador B, el objetivo es unificar
//dichos valores (pesos) bajo un único objeto.
var enlace = 0
var pases = []
var conexiones = 0
//Para cada jugador posible pasador
for(j in jugadores){
    //Para cada jugador posible receptor
    for( k in jugadores){
        //Por cada objeto que representa un pase 
        for (i in partido){
            //Si el jugador pasador es el jugador posible de pasador
            if(jugadores[j] == partido[i].pasador){
                //Si el jugador receptor es el acutal posible receptor
                if(jugadores[k] == partido[i].receptor){
                    //Aumentamos el numero de pases que ha dado i a j
                    conexiones+= partido[i].conexion              
                }

            }
            
        }
        //Comporvamos que el jugador pasador es diferente al receptor y que almenos se ha dado un pase de i hacia j
        if(jugadores[j] != jugadores[k] && conexiones != 0){
            //Almaenamos los datos en una variable
            let s = {pasador : jugadores[j] , receptor : jugadores[k], conexion: conexiones }
            //Guardamos dicha varibale en una array de objetos
            pases+=JSON.stringify(s)
            pases+=","
            conexiones = 0
        }
       
    }
}


console.log(pases)
