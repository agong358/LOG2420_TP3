function resetSelect() {
    var selections = document.getElementsByTagName("select");
    for (var i = 0; i < selections.length; i++) {
        // l'option selectionnee sera la premiere option
        selections[i].selectedIndex = 0;
    }
    // alert("bitch");
}

function serializeSelect(form) {
    var selections = form.getElementsByTagName("select");
    var obj = {};
    for (var i = 0; i < selections.length; i++) {
        var element = selections[i];
        var elementName = element.name;
        var elementValue = element.value;

        if(name)
            obj[name] = value;
    }

    alert(JSON.stringify(obj));
    // return JSON.stringify(obj);
}
   
document.addEventListener("DOMContentLoaded", function() { 
    (function(){
        // var form = document.getElementById("test");
        // // var form = document.getElementsByTagName("test");
        // var output = document.getElementById("output");

        // form.addEventListener("submit", function(e) {
        //             e.preventDefault();
        //             var json = serializeSelect(this);
        //             output.innerHTML = json;
        //         });

        // for (var i = 0; i < form.length; i++) {
        //     form[i].addEventListener("submit", function(e) {
        //         e.preventDefault();
        //         var json = serialize(this);
        //         output.innerHTML = json;
        //     });
        // }

        var button = document.getElementById("reset");
        button.addEventListener("click", resetSelect);

        // var tabs = document.getElementsByClassName("tab_button");
        
      

    })();

        
    });




