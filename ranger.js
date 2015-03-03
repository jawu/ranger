(function(window){
    'use strict';
    function define_ranger() {
        var Ranger = {};
        var version = "0.02";

        Ranger.version = function() {
            console.log("Ranger Version " + version);
        };

        Ranger.bind = function(elementSelector, rangeArray, outputSelector) {
            // check the element
            var element = document.querySelector(elementSelector);
            if (element === null) {
                console.log("Ranger wasn't able to find the given element '" + elementSelector + "' :(");
                return;
            }
            if (!(element.nodeName === "INPUT") || !(element.getAttribute("type").toLowerCase() === "range")) {
                console.log("The given element is not an input element of type range!");
                return;
            }
            // process the range array
            var ranArr = [];
            for (var i = 0; i < rangeArray.length; i++) {
                ranArr[i] = parseFloat(rangeArray[i]);
            }
            ranArr.sort(function(a, b){return a-b});
            // add attributes to the element
            element.setAttribute('min', ranArr[0]);
            element.setAttribute('max', ranArr[ranArr.length - 1]);
            element.setAttribute('step', "0.01");
            var datalist = document.createElement('datalist');
            datalist.id = element.id + "-datalist";
            for (var i = 0; i < ranArr.length; i++) {
                datalist.innerHTML +="<option value=" + ranArr[i] + "></option>";
            }
            element.parentNode.insertBefore(datalist, element.nextSibling);
            element.setAttribute('list', datalist.id);
            element.value = ranArr[0];
            // check output element
            if (outputSelector !== undefined) {
                var output = document.querySelector(outputSelector);
                if (output === null) {
                    console.log("Ranger wasn't able to find the given output element '" + outputSelector + "' -> output will be dismissed.");
                }else {
                    output.innerHTML = element.value;
                }
            }

            // add change handler and force element to nearest value from range array
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
                //set output
                if ((outputSelector !== undefined) && (output !== null)) {
                    output.innerHTML = element.value;
                }
            });
        };
        return Ranger;
    }
    if (typeof(Ranger) === 'undefined'){
        window.Ranger = define_ranger();
    }
})(window);