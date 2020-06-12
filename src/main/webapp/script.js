var jstimes = [];
var wasmtimes = []; 
var javatimes = []; 
var limits = [];


function calculate(n){
	limits.push(n);

	var cell = "";
	for(var i= 0; i < limits.length ; i++){
		cell = cell + limits[i] + "<br>";
	}
	document.getElementById("limity").innerHTML = cell;

	calculatePrimesByWasm(n);
	calculatePrimesByJS(n);
	calculatePrimesByJava(n);
}


function calculatePrimesByJava(n){
var xhr = new XMLHttpRequest();
        var path = "http://localhost:8080/primes";
        xhr.open('POST', path, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            javatimes.push(this.responseText);
            var cell = "";
            for (var i = 0; i < javatimes.length; i++) {
                cell = cell + javatimes[i] + " ms<br>";
            }
            document.getElementById("java").innerHTML = cell;
        };
        xhr.send("n=" + n);
}

async function calculatePrimesByWasm(n) {
 	const response = await fetch("calcPrimes.wasm");
        const buffer = await response.arrayBuffer();
        const obj = await WebAssembly.instantiate(buffer);

        const start = Date.now();
        var counter = obj.instance.exports.calcPrimes(n);
        var end = Date.now();
        var time = end - start;
	wasmtimes.push(time);
	
	var cell = "";
	for(var i= 0; i < wasmtimes.length ; i++){
		cell = cell + wasmtimes[i] + " ms<br>";
	}
	document.getElementById("wasm").innerHTML = cell;
}

function calculatePrimesByJS(n){
	var counter = 0;
	const start = Date.now();
	for(var i = 2; i <= n; i++) if(isPrime(i)) counter++;
	var end = Date.now();
	var time = end - start;
	jstimes.push(time);

	var cell = "";
	for(var i= 0; i < jstimes.length ; i++){
		cell = cell + jstimes[i] + " ms<br>";
	}
	document.getElementById("js").innerHTML = cell;
}

function isPrime(x){
	if(x % 2 == 0) return x == 2;
	var sqrt = Math.sqrt(x) + 1;
	for(var i = 3; i < sqrt; i = i + 2)
		if(x % i == 0) return false;
	return true;
}

function clearResults(){
	cell = "";

	jstimes = [];
	javatimes = [];
	wasmtimes = []; 
	limits = [];

	document.getElementById("js").innerHTML = cell;
	document.getElementById("wasm").innerHTML = cell;
	document.getElementById("java").innerHTML = cell;
	document.getElementById("limity").innerHTML = cell;
}
