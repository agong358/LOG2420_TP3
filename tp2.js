/**
 * Displays the elements inside the id tags corresponding to the selected item 
 * in the navigation bar, and hides the elements in the other id tag. 
 * 
 * Example : if user selects "Inputs" from the navigation bar, everything 
 * belonging to id="inputs" will display, and everything belonging to 
 * id="output" will be hidden).
 * @param {String} show Elements to be displayed
 * @param {String} hide Elements to be hidden
 */
function panel(show, hide) {
  document.getElementById(show).style.display = "block";
  document.getElementById(hide).style.display = "none";
}

var isReset = true; //condition to show a reset table or not
var count = 1;  // Counter for switchOutput()
fetchTable("table");    // Sets the initial json table with fetch (see function below)

function randomizeTable(table, reset) {
  if (reset)  //if want reset, return actual table
    return (table);

  //if input changed, return randomized table value fixed to 2 decimals.
  return ((table * Math.random()).toFixed(2));  
}
/* Waits until the HTML document has been completely loaded and parsed 
before executing the following functions */
document.addEventListener("DOMContentLoaded", function() { 
  (function() {
    var inputElements = document.getElementsByClassName("inputs");
    console.log(inputElements)
      for (var i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener("change", function() {
          fetchTable("table");
        });
      }
    })();
});

/**
 * Fetches the JSON data and displays it as a HTML table at elementID.
 * @param {String} elementID ID of the place to display the JSON data
 */
function fetchTable(elementID) {
  // Fetch request for the URL for the json
  fetch('http://localhost:8080/JSON/output2.json')  
  .then(response => {
    return response.json();
  })

  .then(data => {
    let consumerSegment = data['consumer.segment'];
    let estimatedUsage = data['estimated.usage'];

    // Stores the different types in an array
    let types = [ 'Population','Volume.Baseline.Recontract', 'ARPU.Baseline.Recontract',
                  'Volume.Scenario.Recontract','ARPU.Scenario.Recontract',
                  'Volume.Baseline.NewCustomers','ARPU.Baseline.NewCustomers',
                  'Volume.Scenario.NewCustomers','ARPU.Scenario.NewCustomers'];
    let titles = ['','Population','Volume','ARPU','Volume','ARPU','Volume','ARPU','Volume','ARPU'];
    
    // Creates an HTML table to store the json data
    var table = "";

    // ES6 template literal
    table += `
    <table> 
      <tr>
        <th></th>
        <th></th>
        <th class='mainhead' colspan='4'><u>RECONTRACT</u></th>
        <th class='mainhead' colspan='4'><u>NEW CUSTOMERS</u></th></tr>
        <tr><th></th><th></th><th class='mainhead' colspan='2'>BASELINE</th>
        <th class='mainhead' colspan='2'>SCENARIO</th>
        <th class='mainhead' colspan='2'>BASELINE</th>
        <th class='mainhead' colspan='2'>SCENARIO</th>
        
        <tr>
    `;

    // Adds the titles on top 
    for (var i = 0; i < titles.length; i++) {
      table += "<th><i>" + titles[i] + "</i></th>";
    }

    // Adds the "Consumer Segment" header
    table += "</tr><tr><th>Consumer Segment</th></tr>";
    
    // Adds all the data into the table
    for (var i = 0; i < consumerSegment.length; i++) {
      table += "<tr><td>" + consumerSegment[i]["Consumer.Segment"] + "</td>";

      // Adds the data of the types array in differents columns from the same row
      for (var j = 0; j < types.length; j++){

        // Converts Population and Volume decimal data into percentage
        if (types[j] == 'Population' || types[j] == 'Volume.Baseline.Recontract' 
            || types[j] == 'Volume.Scenario.Recontract' 
            || types[j] == 'Volume.Baseline.NewCustomers' 
            || types[j] == 'Volume.Scenario.NewCustomers') {
              table += "<td>" + (randomizeTable(consumerSegment[i][types[j]], isReset) * 100).toFixed(2) + "% </td>";
        }

        else          
          table += "<td>" + randomizeTable(consumerSegment[i][types[j]], isReset)+ "</td>";
      }

      // Closing the row
      table += "</tr>";  
    }
    
    // Adds a blank row for alignment and spacing
    table += "<tr class='blank_row'> </tr>";

    table += "<tr><th> Estimated Mobile Data Usage<t/h></tr>";

    for (var i = 0; i < estimatedUsage.length; i++) {
      table += "<tr><td>" + estimatedUsage[i]["Estimated.mobile.data.usage"] + "</td>";

      for (var j = 0; j < types.length; j++){
        /* ATTENTION! Some volumes in the JSON data are 0.7 but in the picture
        given as guide, it is 7% instead 70%.*/

        // Converts Population and Volume decimal data into percentage 
        if (types[j] == 'Population' || types[j] == 'Volume.Baseline.Recontract' 
            || types[j] == 'Volume.Scenario.Recontract' 
            || types[j] == 'Volume.Baseline.NewCustomers' 
            || types[j] == 'Volume.Scenario.NewCustomers') {
            
              table += "<td>" + (randomizeTable(estimatedUsage[i][types[j]], isReset) * 100).toFixed(2) + "% </td>";
        }
        else         
          table += "<td>" + randomizeTable(estimatedUsage[i][types[j]], isReset)  + "</td>";
      }
      table += "</tr>";
    }
    
    // Closing the table
    table += "</table>";  

    // Displays the JSON table as output
    document.getElementById(elementID).innerHTML = table; 
    isReset = false;  //table values will be different
  })
  
  // Displays the error
  .catch(err => {
    document.getElementById(elementID).innerHTML = err;  
  })
}

