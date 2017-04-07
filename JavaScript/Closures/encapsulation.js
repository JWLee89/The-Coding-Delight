function house(price) {
    // We don't want users to change the price.
    // But we want them to be able to see and retrieve it.
    return {
        getPrice: function getPrice() {
            return price;
        }
    }
}

var myHome = house(250000);
console.log(myHome.getPrice());
