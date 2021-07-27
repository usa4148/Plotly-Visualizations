//
// Plotly Visualizations
// DS Bootcamp
// Dan C   7/26/2021
//
const url = "data/samples.json";

function optionChanged(updatedSample) {
  renderChart(updatedSample);
  renderMeta(updatedSample);
  renderBChart(updatedSample);
}

function renderMeta(updatedSample) {
  d3.json(url).then((data) => {
    var meta = data.metadata;   
    var filteredMeta = meta.filter(i => i.id == updatedSample);
    var chosenMeta = filteredMeta[0];
    var output = d3.select("#sample-metadata");
    output.html("");
    Object.entries(chosenMeta).forEach(([key, value]) => {
      output.append("h6").text(`${key}: ${value}`);
    });
  });
}

function renderChart(updatedSample) {
  // Pull samples data out of sample.json
  // Filter for our option
  d3.json(url).then((data) => {
    var setts = data.samples;   
    var filteredSets = setts.filter(i => i.id == updatedSample);   
    var chosenOne = filteredSets[0];   
    var xdata= chosenOne.sample_values;
    var ydata = chosenOne.otu_ids;
    var otulabels =  chosenOne.otu_labels;

 //
 //  First the Bar Chart
 //

  xdata= xdata.slice(0,10).reverse();           // Reverse the data for the upside down chart
  ydata= ydata.slice(0,10).reverse();           // These numbers need
  var ytext = ydata.toString();                 // to be rendered as text
  otulabels = otulabels.slice(0,10).reverse();	
  console.log('OTU Labels',otulabels) 

  var trace1 = {
    x: xdata,
    y: ytext,
    text: otulabels,
    type: "bar",
    orientation: "h",
    marker: {color: "chartreuse"}
  };

  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = { 
    title: "Top 10 Bacteria Cultures Found",
    margin: {
      l: 150,   
      r: 100,
      t: 25,
      b: 80
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
    var defaultSample = samples[0];
    renderChart(defaultSample);
    renderMeta(defaultSample);
    renderBChart(defaultSample);
  });
}


function renderBChart(updatedSample) {
  // Pull samples data out of sample.json
  // Filter for our option
  d3.json(url).then((data) => {
    var setts = data.samples;   
    var filteredSets = setts.filter(i => i.id == updatedSample);   
    var chosenOne = filteredSets[0];   
    var bubbleydata = chosenOne.sample_values;   
    var bubblexdata = chosenOne.otu_ids;
    var bubblelables = chosenOne.otu_labels;
    
  //
  // The Bubble Chart
  // 
  var trace2 = {
     x: bubblexdata, 
     y: bubbleydata, 
     text: bubblelables,
     mode: 'markers',
     marker: {
       size: bubbleydata,   
       color: bubblexdata,  
     }
  };

  var bubbleData = [trace2];

  var bubbleLayout = {
    title: 'Bacteria Cultures Per Sample',
    showlegend: false,
    xaxis: {
      title: 'OTU ID'
    },
    height: 600,
    width: 1000
  };

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });
}

init();  // Start the page by rendering the default selection

//
