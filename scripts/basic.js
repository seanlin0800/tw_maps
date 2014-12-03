(function () {

  var width = 600,
      height = 800;

  var projection = d3.geo.mercator()
      .center([120.979531, 23.978567])
      .scale(5000);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select('#container').append('svg')
      .attr('width', width)
      .attr('height', height);

  var g = svg.append('g').attr('transform', 'translate(0,0)');

  var zoom = d3.behavior.zoom()
      .scaleExtent([1, 5])
      .on('zoom', function () {
        g.attr(
          'transform',
          'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')'
        );
      });

  svg.call(zoom).call(zoom.event);

  var color = d3.scale.category20();

  d3.json('json/twCounty2010.topo.json', function (error, json) {
    topo = topojson.feature(json, json.objects.layer1);
    g.selectAll('path')
        .data(topo.features)
      .enter().append('path')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('fill', function (d, i) {
          return color(i);
        })
        .attr('d', path);
  });

}());