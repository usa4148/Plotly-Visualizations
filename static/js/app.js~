const url = "data/samples.json";

function optionChanged(updatedSample) {
  renderChart(updatedSample);
}

// function renderChart(updatedSample) {

//}

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

  });

  



}
init();

