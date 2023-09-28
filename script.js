const stationGraph = {
    "A": {"B" : 4, "H": 8},
    "B": {"A" : 4, "C": 8, "H": 11},
    "C": {"B" : 8, "D": 7, "E": 4 ,"H": 2},
    "D": {"C" : 7, "E": 9, "E": 14},
    "E": {"C" : 8, "D": 1, "E": 10, "F": 2},
    "F": {"E" : 4, "E": 1, "E": 1, "G": 2},
    "G": {"F" : 2, "H": 1, "H": 6},
    "H": {"A" : 8, "B": 1, "G": 1, "C": 7},
    "I": {"C" : 2, "G": 6, "H": 7}
  };
  

const stationData = {
    "A": "Dilshad Garden",
    "B": "Shahdara",
    "C": "Kashmere Gate",
    "D": "Rajiv Chowk",
    "E": "Central Secretariat",
    "F": "Jahangirpuri",
    "G": "Vishwa Vidyalaya",
    "H": "Vidhan Sabha",
    "I": "Rajiv Chowk"

};

const mapping = new Map();
for (const [code, station] of Object.entries(stationData)) {
    mapping.set(code, station);
}


let startStation = document.getElementById("startStation");
let endStation = document.getElementById("endStation");
// set start stations
for (var [key, value] of mapping) {
    var optionElement = document.createElement("option");
    optionElement.value = key;
    optionElement.textContent = value;
    startStation.appendChild(optionElement);
}
// set end stations
for (var [key, value] of mapping) {
    var optionElement = document.createElement("option");
    optionElement.value = key;
    optionElement.textContent = value;
    endStation.appendChild(optionElement);
}


// Dijkstra's algorithm to find the shortest path
function dijkstra(graph, start, end) {
    const shortestDistances = {};
    const predecessors = {};
    const unvisitedNodes = Object.keys(graph);

    unvisitedNodes.forEach(node => {
        shortestDistances[node] = Infinity;
    });

    shortestDistances[start] = 0;

    while (unvisitedNodes.length > 0) {
        let currentNode = null;

        unvisitedNodes.forEach(node => {
            if (currentNode === null || shortestDistances[node] < shortestDistances[currentNode]) {
                currentNode = node;
            }
        });

        const neighbors = graph[currentNode];

        for (const neighbor in neighbors) {
            const distance = neighbors[neighbor];
            const tentativeDistance = shortestDistances[currentNode] + distance;

            if (tentativeDistance < shortestDistances[neighbor]) {
                shortestDistances[neighbor] = tentativeDistance;
                predecessors[neighbor] = currentNode;
            }
        }

        unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1);
    }

    const path = [];
    let current = end;

    while (current !== start) {
        path.unshift(current);
        current = predecessors[current];
    }

    path.unshift(start);
    let displayPath=[];
    for(let i of path)
         displayPath.push(mapping.get(i));

    return {
        path,
        displayPath,
        distance: shortestDistances[end],
    };
}

function findShortestPath() {
    const result = dijkstra(stationGraph, startStation.value, endStation.value);
    const resultDiv = document.getElementById("shortestPathResult");
    resultDiv.innerHTML = `<b>Shortest Path: </b>  <br>  ${result.displayPath.join( "&#8594" )}<br><b>Distance: </b> ${result.distance} KM`;
}