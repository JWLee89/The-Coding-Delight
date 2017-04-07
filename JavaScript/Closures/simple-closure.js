function regularFunction(age) {
    var name = "Jay";
    function closure() {
        var gargbageText = " Full stop.";
        return name + ". Age: " + age + gargbageText;
    }
    return closure;
}

var closures = regularFunction(15);   // returns a function that returns name;
console.log(closures());        
