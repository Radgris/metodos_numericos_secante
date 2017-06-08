var xim = 0
var xi = 0
var n = 0
var iter = 1
var EP = undefined

function run() {
    extract()
    setN()
    setStartingTable()
    console.log(xim, xi, n, iter, EP)
    iterate(iter)
}
//extrae la informacion del HTML y lo asigna a sus variables
function extract() {
    xim = document.getElementById("xim").value
    xi = document.getElementById("xi").value
    n = document.getElementById("n").value
}
//define el ES en el HTML, auxiliado por la funcion ES
function setN() {
    n = ES(n)
    document.getElementById("es").innerHTML = n
}
//define el valor de ES, el valor que se tiene que cumplir al evaluar el Error Porcentual
function ES(number) {
    n = .5 * (Math.pow(10, 2 - n));
    return n
}
//agega la primera fila a la tabla(ya que la primera no tiene EP es un caso especial)
function setStartingTable() {
    pushRow(0, xim, fx(xim), "NA")
    pushRow(1, xi, fx(xi), errorP(xi, xim))
}
//evalua F(x)
function fx(x) {
    x = x * Math.log(x) - 10
    return x
}
//evalua la siguiente Xi en base a la xi actual y la Xi anterior
function xn(xi, xim) {
    xi = xi - ((fx(xi) * (xi - xim)) / (fx(xi) - (fx(xim))));
    return xi
}
//evalua el error porcentual (EP)
function errorP(xi, xim) {
    EP = (Math.abs(xi - xim) / Math.abs(xi)) * 100
    return EP
}
//agrega una nueva fila a la tabla de HTML
function pushRow(iteration, xi, fx, ep) {
    table = document.getElementById("Table")
    row = table.insertRow(iteration + 1)
    cellIteration = row.insertCell(0)
    cellIteration.innerHTML = iteration
    cellXi = row.insertCell(1)
    cellXi.innerHTML = xi
    cellFx = row.insertCell(2)
    cellFx.innerHTML = fx
    cellEp = row.insertCell(3)
    cellEp.innerHTML = ep
}
//itera con las otras funciones algrebaicas, el iterados comienca en 2 para evitarla primera y segunda columna ( casos especiales)
function iterate(iter) {
    while (EP == undefined || n < EP) {
        var iter = iter + 1
        console.log("interating", iter)
        var aux = xi
        xi = xn(xi, xim)
        xim = aux
        errorP(xi, xim)
        console.log(iter, xi, fx(xi), EP)
        pushRow(iter, xi, fx(xi), EP)
    }
}