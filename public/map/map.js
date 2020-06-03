
const svg = d3.select("svg");

  const projection = d3.geoMercator();
  const pathGenerator = d3.geoPath().projection(projection);
  var data = d3.map();
  d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  // Insert your data here!! 
  // .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
  .await(renderMap);

function renderMap(error, topo) {

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      .attr('class', 'country')
      .attr('d', pathGenerator);
    }