(function(window){
    'use strict';
    function define_rangerer() {
        var Rangerer = {};
        var version = "0.01";

        Rangerer.version = function() {
            console.log("Rangerer Version " + version);
        };

        Rangerer.range = function(elementSelector, rangeArray, outputSelector) {
            var element = document.querySelector(elementSelector);
            if (element === null) {
                console.log("Rangerer wasn't able to find the given element '" + elementSelector + "' :(");
            }else {
                if (!(element.nodeName === "INPUT") || !(element.getAttribute("type").toLowerCase() === "range")) {
                    console.log("The given element is not an input element of type range!")
                }else {
                    var ranArr = [];
                    for (var i = 0; i < rangeArray.length; i++) {
                        ranArr[i] = parseInt(rangeArray[i]);
                    }
                    ranArr.sort(function(a, b){return a-b});
                    element.value = ranArr[0];
                    element.setAttribute('min', ranArr[0]);
                    element.setAttribute('max', ranArr[ranArr.length - 1]);
                    element.setAttribute('step', "1");
                    var datalist = document.createElement('datalist');
                    datalist.id = element.id + "-datalist";
                    for (var i = 0; i < ranArr.length; i++) {
                        datalist.innerHTML +="<option value=" + ranArr[i] + "></option>";
                    }
                    element.parentNode.insertBefore(datalist, element.nextSibling);
                    element.setAttribute('list', datalist.id);

                    if (outputSelector !== undefined) {
                        var output = document.querySelector(outputSelector);
                        if (output === null) {
                            console.log("Rangerer wasn't able to find the given output element '" + outputSelector + "' -> output will be dismissed.");
                        }
                    }

                    element.addEventListener('change', function(e) {
                        var nearestIndex = 0;
                        var smallestDistance = Number.POSITIVE_INFINITY;
                        for (var i = 0; i < ranArr.length; i++) {
                            if (Math.abs(element.value-ranArr[i]) < smallestDistance) {
                                nearestIndex = i;
                                smallestDistance = Math.abs(element.value-ranArr[i]);
                            }
                        }
                        element.value = ranArr[nearestIndex];
                        if ((outputSelector !== undefined) && (output !== null)) {
                            output.innerHTML = element.value;
                        }
                    });
                }
            }
        };
        return Rangerer;
    }
    if (typeof(Rangerer) === 'undefined'){
        window.Rangerer = define_rangerer();
    }
})(window);