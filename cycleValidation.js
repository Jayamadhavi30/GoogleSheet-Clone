// Storage 
let collectedGraphComponent = [];
let graphComponentMatrix = [];



// True -> cyclic, False -> Not cyclic
function isGraphCylic(graphComponentMatrix) {
    // Dependency -> visited, dfsVisited (2D array)
    let visited = []; // Node visit trace
    let dfsVisited = []; // Stack visit trace

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j] === false) {
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsVisited);
                // Found cycle so return immediately, no need to explore more path
                if (response == true) return [i, j];
            }
        }
    }
    
    return null;
}


function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    // A1 -> [ [0, 1], [1, 0], [5, 10], .....  ]
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [nbrr, nbrc] = graphComponentMatrix[srcr][srcc][children];
        if (visited[nbrr][nbrc] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);
            if (response === true) return true; // Found cycle so return immediately, no need to explore more path
        }
        else if (visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            // Found cycle so return immediately, no need to explore more path
            return true;
        }
    }

    dfsVisited[srcr][srcc] = false;
    return false;
}