const util = require("util");

class Graph {
    constructor(initialGraph = {}) {
        this.graph = {};
        if (this.isValidGraph(initialGraph)) {
            this.graph = initialGraph;
        } else {
            throw new Error("Invalid graph structure");
        }
    }

    isValidGraph(graph) {
        for (const node in graph) {
            if (!Object.hasOwnProperty.call(graph, node)) {
                throw new Error(
                    `Node '${node}' is not a valid property of the graph object.`,
                );
            }
            if (typeof graph[node] !== "object") {
                throw new Error(
                    `Node '${node}' must be an object representing its connections.`,
                );
            }
            // if (Object.keys(graph[node]).length === 0) {
            //     throw new Error(`Node '${node}' must have at least one connection.`);
            // }
            for (const neighbor in graph[node]) {
                if (!Object.hasOwnProperty.call(graph[node], neighbor)) {
                    throw new Error(
                        `Neighbor '${neighbor}' is not a valid property of node '${node}'.`,
                    );
                }
                const weight = graph[node][neighbor];
                if (typeof weight !== "number" || isNaN(weight)) {
                    throw new Error(
                        `Weight of edge between '${node}' and '${neighbor}' must be a number.`,
                    );
                }
                if (weight <= 0) {
                    throw new Error(
                        `Weight of edge between '${node}' and '${neighbor}' must be a positive number.`,
                    );
                }
                if (node === neighbor) {
                    throw new Error(
                        `Node '${node}' cannot be connected to itself.`,
                    );
                }
                if (!Object.hasOwnProperty.call(graph, neighbor)) {
                    throw new Error(
                        `Neighbor '${neighbor}' is not a valid property of the graph object.`,
                    );
                }
                if (typeof graph[neighbor] !== "object") {
                    throw new Error(
                        `Neighbor '${neighbor}' must be an object representing its connections.`,
                    );
                }
                if (Object.keys(graph[neighbor]).length === 0) {
                    throw new Error(
                        `Neighbor '${neighbor}' must have at least one connection.`,
                    );
                }
                /*
                // for direct weights, check if the weight is the same for both directions.
                if (graph[neighbor][node] === undefined) {
                    throw new Error(`Edge between '${node}' and '${neighbor}' is not bidirectional.`);
                }
                if (graph[neighbor][node] !== weight) {
                    throw new Error(`Weight of edge between '${node}' and '${neighbor}' is not consistent.`);
                }
                */
            }
        }
        return true;
    }

    addEdge(node1, node2, weight = 1, directed = false) {
        if (weight <= 0) {
            throw new Error("Weight must be a positive number");
        }

        if (!this.graph[node1]) {
            this.graph[node1] = {};
        }
        if (!this.graph[node2]) {
            this.graph[node2] = {};
        }

        // Check for existing edge and prevent overwriting
        if (
            this.graph[node1][node2] !== undefined ||
            this.graph[node2][node1] !== undefined
        ) {
            throw new Error("Edge already exists");
        }

        // Add edge (undirected or directed)
        this.graph[node1][node2] = weight;
        if (!directed) {
            this.graph[node2][node1] = weight;
        }
    }

    updateEdge(node1, node2, newWeight) {
        if (newWeight <= 0) {
            throw new Error("Weight must be a positive number");
        }
        if (!this.graph[node1] || !this.graph[node2]) {
            throw new Error("One or both nodes do not exist");
        }
        if (this.graph[node1][node2] === undefined) {
            throw new Error("Edge does not exist");
        }

        this.graph[node1][node2] = newWeight;
        this.graph[node2][node1] = newWeight;
    }

    removeEdge(node1, node2) {
        if (!this.graph[node1] || !this.graph[node2]) {
            throw new Error("One or both nodes do not exist");
        }
        if (this.graph[node1][node2] === undefined) {
            throw new Error("Edge does not exist");
        }

        delete this.graph[node1][node2];
        delete this.graph[node2][node1];
    }

    removeNode(node) {
        if (!this.graph[node]) {
            throw new Error("Node does not exist");
        }

        for (const neighbor in this.graph[node]) {
            delete this.graph[neighbor][node];
        }
        delete this.graph[node];
    }

    getNode(node) {
        if (!this.graph[node]) {
            throw new Error("Node does not exist");
        }
        return this.graph[node];
    }

    getEdge(node1, node2) {
        if (!this.graph[node1] || !this.graph[node2]) {
            throw new Error("One or both nodes do not exist");
        }
        if (this.graph[node1][node2] === undefined) {
            throw new Error("Edge does not exist");
        }
        return this.graph[node1][node2];
    }

    getGraph() {
        return this.graph;
    }

    [util.inspect.custom](depth, options) {
        return this.graph;
    }

    toJSON() {
        return JSON.stringify(this.graph, null, 2);
    }
}

// Export the Graph class
module.exports = { Graph };

/*
// Example usage:
const myGraph = new Graph();
myGraph.addEdge("A", "B", 5); // Undirected edge with weight 5
myGraph.addEdge("B", "C", 3, true); // Directed edge from B to C with weight 3
console.log(myGraph.getGraph());
*/
