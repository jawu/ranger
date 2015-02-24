# rangerer
js script for dynamically bind input range elements to a range array.

The given input range element gets min, max, step, list and start value from the range array.
Datalist element is automatically generated.
The user can only select a value from the range array.

## How to range:
```javascript
<input type="range" id="input-id" />
<div id="output-id">Here goes the value</div>

<script type="text/javascript">
	Rangerer.range("#input-id", [1, 2, 3, 50, 100], "#output-id");
</script>
```
Output selector is optional.
