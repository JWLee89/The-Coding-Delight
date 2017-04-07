function add(num) {
    return function doSum(newNumber) {
        return num + newNumber;
    }
}

var add5 = add(5);
console.log(add5(6));       // 11 
