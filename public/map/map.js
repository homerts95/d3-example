
const svg = d3.select("svg");

  const projection = d3.geoMercator();

  const pathGenerator = d3.geoPath().projection(projection);


  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json", function (data) {
    const countries = topojson.feature(data, data.objects.countries);
    const path = svg.selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', pathGenerator);
  });