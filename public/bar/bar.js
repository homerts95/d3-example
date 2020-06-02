const height = 250
const width = 300
const margin = 30

const container = d3.select('#bar_chart')
              .append("svg")
              .attr("width", width + margin)
              .attr("height", height + margin);

d3.csv("../data/sample_10.csv",
  function(data, i) {
    return {
      age : data.Age,
      gender : data.Gender
    };
  })
  .then(data => {
    const plotData = []
    data.forEach(a => {
      if (!plotData.some(d => d.gender === a.gender)){
        const obj = {};
        obj['gender'] = a.gender;
        obj['value'] = 1;
        plotData.push(obj);
      } else {
        const objIndex = plotData.findIndex((obj => obj.gender === a.gender));
        plotData[objIndex]['value'] = plotData[objIndex]['value'] + 1;
      }
    });

     const xScale = d3.scaleBand().domain(plotData.map((d) => d.gender)).rangeRound([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(plotData, d => d.value)+ 1]).range([height, 0]);

    container.append("g") 
              .attr("transform", "translate(0,250)")
              .call(d3.axisBottom(xScale));

    container.selectAll('.bar')
            .data(plotData)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('width', xScale.bandwidth())
            .attr('height', data => height - yScale(data.value))
            .attr('x', data => xScale(data.gender))
            .attr('y', data => yScale(data.value))
            .style("fill", "#69b3a2")
            .style("opacity", 0.5)
    container.append("text")
              .attr("x", width/2 )
              .attr("y",  height + margin)
              .style("text-anchor", "middle")
              .text("Gender");
  });