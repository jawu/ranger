# rangerer
js script for dynamically bind input range elements to a range array.

The given input range element gets min, max, step, list and value attributes from the range array.
Datalist element is automatically generated.
The user can only select a value from the range array.

## How to range:
Just include the js file and call Rangerer.range(inputSelector, rangeArray, outputSelector);

Selectors are css selectors. outputSelector is optional if you want to show the value somewhere.
```javascript
<script type="text/javascript" src="rangerer.js"></script>

<input type="range" id="demo" />
<div id="output">Here goes the value</div>

<script type="text/javascript">
	Rangerer.range("#demo", [0, 10, 50, 100], "#output");
</script>
```
