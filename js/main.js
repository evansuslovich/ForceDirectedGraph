import fakeData from "/data/data.json" assert { type: "json" };







const id = fakeData.nodes[0]

const acoustincness = id.acousticness;
const danceability = id.danceability;
const energy = id.energy;
const instrumentalness = id.instrumentalness;
const liveness = id.liveness;
const speechiness = id.speechiness;
const valence = id.valence;

// removed tempo becasue it's not from 0 - 1 

let features = ["Acousticness", "Danceability", "Energy", "Instrumentalness", "Liveness", "Speechiness", "Valence"];
let information = [acoustincness, danceability, energy, instrumentalness, liveness, speechiness, valence]; 


let data = [];

let point = {}; 
point["Acousticness"] = information[0] * 10;
point["Danceability"] = information[1] * 10;
point["Energy"] = information[2] * 10;
point["Instrumentalness"] = information[3] * 10;
point["Liveness"] = information[4] * 10;
point["Speechiness"] = information[5] * 10;
point["Valence"] = information[6] * 10;

data.push(point);

console.log(data)


const svg = d3.select("#col1")
.append("svg")
.attr("width", 650)
.attr("height", 650);


let radialScale = d3.scaleLinear()
.domain([0, 10])
.range([0, 250]);
let ticks = [2,4,6,8,10];




ticks.forEach(t =>
  svg.append("circle")
  .attr("cx", 300)
  .attr("cy", 300)
  .attr("fill", "none")
  .attr("stroke", "gray")
  .attr("r", radialScale(t))
  );
  
  ticks.forEach(t =>
    svg.append("text")
    .attr("x", 305)
    .attr("y", 300 - radialScale(t))
    .text((t / 10).toString())
    );
    
    
    function angleToCoordinate(angle, value) {
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { "x": 300 + x, "y": 300 - y };
    }
    
    for (let i = 0; i < features.length; i++) {
      let ft_name = features[i];
      let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
      let line_coordinate = angleToCoordinate(angle, 10);
      let label_coordinate = angleToCoordinate(angle, 10.5);
      
      //draw axis line
      svg.append("line")
      .attr("x1", 300)
      .attr("y1", 300)
      .attr("x2", line_coordinate.x)
      .attr("y2", line_coordinate.y)
      .attr("stroke", "black");
      
      //draw axis label
      svg.append("text")
      .attr("x", label_coordinate.x)
      .attr("y", label_coordinate.y)
      .text(ft_name);
    }
    
    let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);
    let colors = ["blue"];
    
    
    function getPathCoordinates(data_point) {
      let coordinates = [];
      for (let i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
      }
      return coordinates;
    }
    
    for (let i = 0; i < data.length; i++) {
      let d = data[i];
      let color = colors[i];
      let coordinates = getPathCoordinates(d);
      
      //draw the path element
      svg.append("path")
      .datum(coordinates)
      .attr("d", line)
      .attr("stroke-width", 1)
      .attr("stroke", color)
      .attr("fill", color)
      .attr("stroke-opacity", 1)
      .attr("opacity", .7);
    }