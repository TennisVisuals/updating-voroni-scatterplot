var container = d3.select('#scatterPlot');
var legend = d3.select('#scatterPlot_legend');
d3.select('#title').text('Life expectancy versus GDP per Capita');
d3.select('title').text('Scatterplot with Voronoi');

sp = scatterPlot();
sp.options({
   id    : 'first',

   data: {
      identifier:    'Country',
      abbreviation:  'CountryCode',
      group:         'Region',
      sub_group:     'Continent',
      r_scale:       'GDP',
      x:             'GDP_perCapita',
      y:             'lifeExpectancy'
   },

   axes  : {
      x: { 
         label: 'GDP per capita [US $] - Note the logarithmic scale',
         ticks:      2,
         scale:      'log',
         nice:       false,
         tickFormat: '$',
         domain:     [100,2e5]
      },
      y: { 
         label:      'Life expectancy'
      } 
   },

   legend: { 
      dom_element: legend,
      title:   'REGION',
      text:    'click to select all sets with same set score',
      bubble: {
         title:   'GDP (Billion $)',
         prefix: '$ ',
         suffix: ' B',
         sizes:  [ 1e11, 3e12, 1e13 ]
      }
   }
})

sp.events({
   element: { click: null }
});

sp.colors({
   "Africa | North & East":      "#EFB605", 
   "Africa | South & West":      "#E58903", 
   "America | North & Central":  "#E01A25", 
   "America | South":            "#C20049", 
   "Asia | East & Central":      "#991C71", 
   "Asia | South & West":        "#66489F",
   "Europe | North & West":      "#2074A0",
   "Europe | South & East":      "#10A66E",
   "Oceania": "#7EB852"
});

function init(err, data) {
   sp.data(data);
   container.call(sp);
   sp.update();
}

d3.json('./countries.json', init)
