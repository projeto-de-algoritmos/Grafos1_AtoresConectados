class Graph {

  constructor(vertex) {
    this.vertex = vertex;
    this.edges = new Map();
  }

  addVertex(v) {
    this.edges.set(v, []);
  }

  addEdge(v, w) {
    this.edges.get(v).push(w);
  }

  getVertexKeys() {
    return this.edges.keys();
  }

  getVertexValues(v) {
    return this.edges.get(v);
  }

  print() {
    for (const vertex of this.getVertexKeys()) { // [A, B, C, D, E, F]  
      const edges = this.getVertexValues(vertex); // [B, D, E]
      var linkedEdges = '';
      for (const edge of edges) {
        linkedEdges += `${edge} `;
      }

      console.log(vertex + ' -> ' + linkedEdges);
    }
  }
}

const main = () => {
  var graph = new Graph(6);
  var vertex = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (const vert of vertex) {
    graph.addVertex(vert);
  }
  graph.addEdge('A', 'B');
  graph.addEdge('A', 'D');
  graph.addEdge('A', 'E');
  graph.addEdge('B', 'C');
  graph.addEdge('D', 'E');
  graph.addEdge('E', 'F');
  graph.addEdge('E', 'C');
  graph.addEdge('C', 'F');
  graph.print();
}

main()
