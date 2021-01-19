
window.onload = function () {
    var calzado = document.querySelector('#calzado');
    var accesorios = document.querySelector('#accesorios');
    var categoria1 = document.querySelector('.categoriasCalzado');
    var categoria2 = document.querySelector('.categoriasAccesorio');
    

    calzado.addEventListener('click', function (e){
        console.log("selecciono calzado");
        categoria2.style.display = "none";
        categoria1.style.display = "flex";
    })
    accesorios.addEventListener('click', function (e){
        console.log("selecciono accesorios");
        categoria2.style.display = "flex";
        categoria1.style.display = "none";
    })



}