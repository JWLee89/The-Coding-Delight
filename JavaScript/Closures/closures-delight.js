var randomDataGenerator = (function() {

        // Private methods --------------
        var logInit = function logInit() {
            console.log("Data handler has been initialized;");
        };

        var logTime = function logTime() {
            console.log(new Date());
        };

        // Generator function made from applying concepts in lecture
        var randomNumberProcessor = function randomNumberProcessor(algorithm) {
            return function getRandomNumber(min, max) {
                return algorithm(min, max);
            };
        };

        // Compose randomNumberProcessor and generateRandomInt. Generate a random number (no decimal place).
        var generateRandomInt = randomNumberProcessor(function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        });

        var generateRandomDouble = randomNumberProcessor(function (min, max) {
            return  Math.random() * (max - min) + min;
        });

        // End of private methods --------------


        // Public methods
        function init() {
            logInit();
            logTime();
        }

        function getRandomInt(min, max) {
            return generateRandomInt(min, max);
        }

        function getRandomDouble(min, max) {
            return generateRandomDouble(min, max);
        }

        var PUBLIC_API = {
            init: init,
            getRandomDouble: getRandomInt,
            getRandomInt: getRandomDouble
        };
        return PUBLIC_API;
    })();

    randomDataGenerator.init();                                  // initialize
    var numericData = randomDataGenerator.getRandomInt(2,4);     // Get random data by calling PUBLIC_API method
    console.log(numericData);                                    // Get a random number between 2 and 4 (no decimals)

    var decimalData = randomDataGenerator.getRandomDouble(2,4);
    console.log(decimalData);
