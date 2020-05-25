const DUMMY_DATA = [
    { gender: 'MAN', value: 1000},
    { gender: 'WOMAN' , value: 500}
];

const height = 250
const width = 300
const margin = 30

const xScale = d3.scaleBand().domain(DUMMY_DATA.map((d) => d.gender)).rangeRound([0, 300]).padding(0.1);
const yScale = d3.scaleLinear().domain([0, 1100]).range([250, 0]);

const container = d3.select('#bar_chart')
              .append("svg")
              .attr("width", width + 100)
              .attr("height", height + margin);
    
            container.append("g") 
              .attr("transform", "translate(0,250)")
              .call(d3.axisBottom(xScale));

            // container.append("g")
            //   .attr("transform", "translate(35,0)")
            //   .call(d3.axisLeft(yScale));

const bar = container
              .selectAll('.bar')
              .data(DUMMY_DATA)
              .enter()
              .append('rect')
              .classed('bar', true)
              .attr('width', xScale.bandwidth())
              .attr('height', data => height - yScale(data.value))
              .attr('x', data => xScale(data.gender))
              .attr('y', data => yScale(data.value))
              .style("fill", "#69b3a2")
              .style("opacity", 0.5)
            container.append("text")      // text label for the x axis
              .attr("x", width/2 )
              .attr("y",  height + margin)
              .style("text-anchor", "middle")
              .text("Gender");