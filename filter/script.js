filterSelection("all");

function filterSelection(c){
    var x, i;
    x = document.getElementsByClassName("column");
    if ( c == "all"){
        for (i = 0; i< x.length; i++){
            x[i].style.display = "block";
        }
    }else {
        for(i = 0; i< x.length; i++) {
            x[i].style.display = "none";
        }
    var selected = document.getElementsByClassName(c);
    for (i = 0; i<selected.length; i++){
        selected[i].style.display = "block";
    }
}
}
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i< arr2.length; i++){
        if(arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function w3RemoveClass(element,name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i<arr2.length; i++){
        while(arr1.indexOf(arr2[i])>-1){
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

//add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i< btns.length; i++){
    btns[i].addEventListener("click", function(){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
    });
}