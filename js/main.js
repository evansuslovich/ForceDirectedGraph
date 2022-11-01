import data from "/data/fakeData.json" assert { type: "json" };


const nodes = data.nodes; 
const links = data.links; 

console.log(nodes);
console.log(links);




const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };
const SCALE = 50;
const PADDING = 20;

// visualization size with margins in mind
// VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
// VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

const FRAME1 = d3.select("#col1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");


const simulation = d3.forceSimulation()
  .force('charge', d3.forceManyBody().strength(-20))
  .force('center', d3.forceCenter(FRAME_HEIGHT / 2, FRAME_WIDTH / 2))


const nodeElements = FRAME1.append('g')
  .selectAll('circle')
  .data(nodes)
  .enter()
  .append('circle')
  .attr("cx", 100)
  .attr("cy",  100)
  .attr('r', 10)

  const textElements = FRAME1.append('g')
  .selectAll('text')
  .data(nodes)
  .enter().append('text')
  .attr('font-size', 15)
  .attr('dx', 15)
  .attr('dy', 4)


