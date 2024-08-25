const { Dijkstra } = require('./dijkstra');
const { Graph } = require('./graph');



const graph = new Graph({
    S: { A: 7, B: 6, D: 16 },
    A: { S: 7, C: 10, D: 5 },
    B: { S: 6, E: 3 },
    C: { A: 10, D: 4, F: 3 },
    D: { A: 5, C: 4, S: 16, G: 8 },
    E: { B: 3, H: 4, G: 6 },
    F: { C: 3, T: 2 },
    G: { D: 8, E: 6, T: 8 },
    H: { E: 4, G: 10 },
    T: { F: 2, G: 8 }
});

console.log(graph);

const result = Dijkstra(graph, 'S', 'T');
console.log(`Shortest path from S to T: \n${result.path.join(' -> ')}`);
console.log(`Total distance: ${result.distance}`);