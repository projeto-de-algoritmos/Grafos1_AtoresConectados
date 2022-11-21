// https://www.beecrowd.com.br/judge/pt/problems/view/1082
var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const numberOfCases = lines[0];
const prettierInput = []

lines.shift(); // remove the first line
for (let inputLine = 0; inputLine < lines.length; ++inputLine) {
  const [v, e] = lines[inputLine].split(' ');
  const edges = []

  for (let i = 1; i <= e; ++i) {
    const [v, w] = lines[inputLine + i].split(' ');
    edges.push([v.charCodeAt(0) - 97, w.charCodeAt(0) - 97]); // char to int transformation
  }

  prettierInput.push({
    qtdNodes: Number(v),
    qtdEdges: Number(e),
    edges
  })
  inputLine += Number(e)
}

let numberOfNodes, adj, visited;

const clearAdjMatrix = () => {
  adj = new Array(numberOfNodes).fill(0).map(() => new Array(numberOfNodes).fill(0)); // adjacency matrix n x n
}

const printConnectedComponentFound = () => {
  console.log('');
  for (let it = 0; it < numberOfNodes; it++) {
    if (visited[it] === 1) { // visited but not discovered
      process.stdout.write(`${String.fromCharCode(97 + it)},`);
      visited[it] = 0; // mark as visited and part of one connected component
    }
  }
}

const recursiveDFS = (src) => {
  visited[src] = 1;

  for (let w = 0; w < numberOfNodes; w++) {
    const hasEdgeAndNotVisited = adj[src][w] === 1 && visited[w] === -1;
    if (hasEdgeAndNotVisited) recursiveDFS(w);
  }
}

const findConnectedComponents = () => {
  visited = new Array(numberOfNodes).fill(-1); // mark all nodes as not visited
  let componentes = 0

  for (let it = 0; it < numberOfNodes; ++it) {
    if (visited[it] === -1) {
      componentes++;
      recursiveDFS(it); // find new connected components
      printConnectedComponentFound(visited); // print the connected components
    }
  }

  console.log(`\n${componentes} connected components\n`);
}


for (let caseNumber = 1; caseNumber <= numberOfCases; ++caseNumber) {
  process.stdout.write(`Case #${caseNumber}:`);
  const { qtdNodes, edges } = prettierInput[caseNumber - 1];

  numberOfNodes = qtdNodes;
  clearAdjMatrix();

  edges.forEach((edge) => {
    const [v, w] = edge;

    // considering an undirected graph
    adj[v][w] = 1;
    adj[w][v] = 1;
  })

  findConnectedComponents();
}