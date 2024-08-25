// PriorityQueue
class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++) {
                if (element[1] < this.collection[i - 1][1]) {
                    this.collection.splice(i - 1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

// Dijkstra's algorithm implementation
function Dijkstra(graph, start, end) {
    const distances = {};
    const prev = {};
    const pq = new PriorityQueue();

    // Initialize distances and previous nodes
    for (let node in graph) {
        if (node === start) {
            distances[node] = 0;
            pq.enqueue([node, 0]);
        } else {
            distances[node] = Infinity;
        }
        prev[node] = null;
    }

    // Process the priority queue
    while (!pq.isEmpty()) {
        const [currentNode, currentDistance] = pq.dequeue();

        if (currentNode === end) {
            break;
        }

        for (let neighbor in graph[currentNode]) {
            let distance = currentDistance + graph[currentNode][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                prev[neighbor] = currentNode;
                pq.enqueue([neighbor, distance]);
            }
        }
    }

    // Reconstruct the shortest path
    let path = [];
    let currentNode = end;
    while (currentNode) {
        path.unshift(currentNode);
        currentNode = prev[currentNode];
    }

    return { path, distance: distances[end] };
}

// Export
module.exports = { Dijkstra };
