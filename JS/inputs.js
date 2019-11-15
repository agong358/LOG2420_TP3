function resetSelect() {
    var selections = document.getElementsByTagName("select");
    for (var i = 0; i < selections.length; i++) {
        // l'option selectionnee sera la premiere option
        selections[i].selectedIndex = 0;
    }
}

   
document.addEventListener("DOMContentLoaded", function() { 
    (function(){
        var button = document.getElementById("reset");
        button.addEventListener("click", resetSelect);
    })();

        
    });




