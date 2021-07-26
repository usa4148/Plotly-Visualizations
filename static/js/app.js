//
// Plotly Visualizations
// DS Bootcamp
// Dan C   7/26/2021
//
const url = "data/samples.json";

function optionChanged(updatedSample) {
  renderChart(updatedSample);
  renderMeta(updatedSample);
}

function renderMeta(updatedSample) {
  d3.json(url).then((data) => {
    var meta = data.metadata;
    console.log(meta);
    var filteredMeta = meta.filter(i => i.id == updatedSample);
    console.log(filteredMeta);
    var chosenMeta = filteredMeta[0];
    console.log(chosenMeta);
    var output = d3.select("#sample-metadata");
    output.html("");
    Object.entries(chosenMeta).forEach(([key, value]) => {
      output.append("li").text(`${key}: ${value}`);
    });
  });
}

function renderChart(updatedSample) {
  // Pull samples data out of sample.json
  // Filter for our option
  d3.json(url).then((data) => {
    var setts = data.samples;
    console.log(setts);
    var filteredSets = setts.filter(i => (i.id == updatedSample));
    console.log(filteredSets);
    var chosenOne = filteredSets[0];
    console.log(filteredSets[0]);
    var xdata= chosenOne.sample_values;
    console.log(xdata);
    var ydata = chosenOne.otu_ids;
    console.log(ydata);
    var otulabels = chosenOne.otu_labels; 
    console.log(otulabels);   
 // });

  xdata= xdata.slice(0,10);
  ydata= ydata.slice(0,10);
  otulabels = otulabels.slice(0,10);	  

  var trace1 = {
    x: xdata,
    y: ydata,
    text: otulabels,
    type: "bar",
    orientation: "h"
  };

  // data

  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = { 
    title: "Top 10 Bacteria Cultures Found",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", chartData, layout);
  });
}

function init() {

  var dropdown = d3.select("#selDataset");
// Fetch the JSON data and build table //console log it
//function dataTable(dataTable) {
  d3.json(url).then((data) => {
    var samples = data.names;
    samples.forEach((sample) => {
      dropdown.append("option").text(sample).property("value",sample);
    });
    console.log(data);
    //return data;


    var defaultSample = samples[0];
    console.log(defaultSample)

    renderChart(defaultSample);
    renderMeta(defaultSample);
  });

  



}
init();

