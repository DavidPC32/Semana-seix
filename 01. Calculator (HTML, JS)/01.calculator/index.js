var numero1 = document.getElementById("numero1");
var numero2 = document.getElementById("numero2");
var resultado = document.getElementById("resultado");
var operacion = document.getElementById("operacion");
var calcular = document.getElementById("calcular");


calcular.addEventListener("click", function() {
    if(numero1.value == "" || numero2.value == "") {
        alert("Por favor, ingrese ambos numeros.");
        return;
    }
    var num1 = parseFloat(numero1.value);
    var num2 = parseFloat(numero2.value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, ingrese numeros validos.");
        return;
    }

    if (operacion.value == "+") {
        resultado.value = num1 + num2;
    }
    else if (operacion.value == "-") {
        resultado.value = num1 - num2;
    } 
    else if (operacion.value == "/") {
        if (numero2 == 0) {
            alert("No se puede dividir entre cero.");
            return;
        }
        resultado.value = num1 / num2;
    }
    else if (operacion.value == "*") {
        resultado.value = num1 * num2;
    }
    else if (operacion.value == "%") {
        resultado.value = num1 % num2;
    }
        
});
    

