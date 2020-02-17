
var allButtons = document.getElementsByClassName("num");
var text = document.getElementById("output");
var enter = document.getElementById("=");
var above = document.getElementById("above");
var clear = document.getElementById("clear");
var ops = document.getElementsByClassName("op");

for (var i = 0; i < ops.length; i++){
    var op = ops[i];
    op.addEventListener( "click",
        function() {
            text.value += this.id;
        });
}

clear.addEventListener("click",
    function() {
        text.value = ""
    });

text.addEventListener("keypress",
    function(e) {
        if(e.key === 'Enter'){
            var out = " =";
            try{
                var ans = eval(text.value);
                above.textContent = text.value + out;
                text.value = ans;
            }
            catch{
                text.value = "ERROR";
            }
        }
    });

enter.addEventListener("click",
    function() {
        var out = " =";
        try{
            var ans = eval(text.value);
            above.textContent = text.value + out;
            text.value = ans;
        }
        catch{
            text.value = "ERROR";
        }
    }
);
for (var i = 0; i < allButtons.length; i++) {
    var button = allButtons[i];
    var num = button.id;
    button.addEventListener( "click", 
    function() { text.value += this.id;
    }
    );
}