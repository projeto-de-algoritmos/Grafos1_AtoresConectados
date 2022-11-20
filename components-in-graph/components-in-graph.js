// https://www.hackerrank.com/challenges/components-in-graph 
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'componentsInGraph' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY gb as parameter.
 */

function componentsInGraph(gb) {

  const graphSize = gb.length;
  const allSizeComponents = new Array(graphSize).fill(0)
  const adjList = new Map()

  const DFS = (src, visited, componentId) => {
    let stack = [];
    stack.push(src);

    while (stack.length) {
      const currentNode = stack.pop() // Current node removed from stack

      if (!visited[currentNode]) {
        visited[currentNode] = true; // Mark current node as visited
        allSizeComponents[componentId] += 1; // summing the size of the connected component
      }

      for (const adjNode of adjList.get(currentNode)) { // for each adjacent node of the current node
        if (!visited[adjNode]) {
          stack.push(adjNode)
        }
      }
    }
  }

  for (let i = 0; i < graphSize; ++i) {
    const v = gb[i][0]
    const w = gb[i][1]

    if (!adjList.get(v)) adjList.set(v, [])
    if (!adjList.get(w)) adjList.set(w, [])

    // considering an undirected graph
    adjList.get(v).push(w)
    adjList.get(w).push(v)
  }



  const visited = new Array(graphSize).fill(false);  // mark all as not visited
  let componentId = 0 // variable that works as component id

  for (const node of adjList.keys()) { // for each known node
    if (!visited[node]) {
      DFS(node, visited, componentId); // discovery connected component size

      componentId++; // next connected component
    }
  }

  const onlySizesGreaterThan1 = allSizeComponents.filter(size => size > 1);
  if (!onlySizesGreaterThan1.length) return []

  return [Math.min(...onlySizesGreaterThan1), Math.max(...onlySizesGreaterThan1)]
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  let gb = Array(n);

  for (let i = 0; i < n; i++) {
    gb[i] = readLine().replace(/\s+$/g, '').split(' ').map(gbTemp => parseInt(gbTemp, 10));
  }

  const result = componentsInGraph(gb);

  ws.write(result.join(' ') + '\n');

  ws.end();
}
