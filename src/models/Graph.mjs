import LinkedList from "./LinkendList.mjs";

export default class Graph {
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() { }

    addV(value) {
        this.#matrizAdyacencia.push(new LinkedList());
        this.#map.set(value, this.#matrizAdyacencia.length - 1);
    }

    addConexion(start, end, weight = 1) {
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#matrizAdyacencia[this.#map.get(start)].push(end, weight);
            return true;
        }
        return false;
    }

    bfs(callback) {
        let queue = []
        let list = []
        const entries = [...structuredClone(this.#map)];
        for (let i = 0; i < this.#matrizAdyacencia.length; i++)
            list[i] = false

        let [key] = entries[0]
        queue.push(key)

        while (queue.length > 0) {
            let val = queue.shift()
            callback(val)
            list[this.#map.get(val)] = true
            for (let i = 0; i < this.#matrizAdyacencia[this.#map.get(val)].length; i++) {
                if (this.#matrizAdyacencia[this.#map.get(val)][i]) {
                    let [key] = entries[i]
                    if (!list[this.#map.get(key)] && !queue.includes(key))
                        queue.push(key)
                }
            }
        }
    }


    dfs(callback) {
        let stack = [];
        let list = [];
        // Hacemos una copia estructurada del mapa de adyacencias para evitar modificar el original
        const entries = [...structuredClone(this.#map)];

        // Inicializamos la lista para hacer seguimiento de los nodos visitados
        for (let i = 0; i < this.#matrizAdyacencia.length; i++)
            list[i] = false;

        // Tomamos la clave del primer nodo de la estructura de entrada
        let [key] = entries[0];
        // Agregamos el primer nodo a la pila
        stack.push(key);
        // Comenzamos el bucle que se ejecuta mientras haya elementos en la pila
        while (stack.length > 0) {
            let val = stack.pop();  // Sacamos el último elemento de la pila agreado 
            if (!list[this.#map.get(val)]) {
                callback(val);//pasamos el valor del nodo actual
                list[this.#map.get(val)] = true;// Marcamos el nodo como visitado para no volver a agregarlo a la pila
                let neighbors = [...this.#matrizAdyacencia[this.#map.get(val)].iterator()];// Obtenemos los vecinos del nodo actual
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    let neighbor = neighbors[i];
                    // Si el vecino no ha sido visitado, lo agregamos a la pila
                    if (!list[this.#map.get(neighbor.name)])
                        stack.push(neighbor.name);
                }
            }
        }
    }


    dijkstra(start, callback) {
        const inifinito = 1e6; 
        const n = this.#matrizAdyacencia.length; // Número de vértices en el grafo
        const D = Array(n).fill(inifinito); // Inicializar todas las distancias con infinito
        const visitados = Array(n).fill(false); // Arreglo booleano para marcar los nodos visitados
        const startIndex = this.#map.get(start); // Obtener el índice del vértice inicial
        D[startIndex] = 0; // La distancia al vértice inicial es 0
        let seguir = true; // Bandera para continuar o detener el ciclo while

        while (seguir) { // Mientras la bandera seguir sea verdadera
            let u = -1; // Inicializar u como un valor inválido
            let minDist = inifinito; // Inicializar la distancia mínima con infinito

            for (let i = 0; i < n; i++) { // Buscar el vértice no visitado con la distancia mínima
                if (!visitados[i] && D[i] < minDist) { // Si el vértice no ha sido visitado y tiene una distancia menor que minDist
                    u = i; // Actualizar u con el índice del vértice
                    minDist = D[i]; // Actualizar minDist con la distancia del vértice
                    console.log(minDist);
                }
            }

            if (u === -1) { // Si no se encontró un vértice válido, terminar el ciclo
                seguir = false; // Romper el ciclo while
            }

            visitados[u] = true; // marca el vértice u como visitado
            let neighbors = this.#matrizAdyacencia[u].iterator(); // Obtener los vecinos del vértice u
            for (let neighbor of neighbors) { // Iterar sobre los vecinos del vértice u
                const v = this.#map.get(neighbor.name);
                const newDist = D[u] + neighbor.distance; 
                // busca la nueva distancia al vecino
                if (newDist < D[v]) { // si la nueva distancia es menor que la distancia conocida
                    D[v] = newDist; // Actualizar la distancia conocida
                    console.log(newDist);
                }
            }

            if (callback) { // quiza no deba estar
                callback(D);
            }
        }

        return D; 
    }




}



