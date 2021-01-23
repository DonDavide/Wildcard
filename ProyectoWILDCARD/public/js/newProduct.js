
window.onload = function () {

    var formulario = document.querySelector('#formulario')

    var nombreProducto = document.querySelector('#nombre')
    

    var calzado = document.querySelector('#calzado');
    var accesorios = document.querySelector('#accesorios');
    var categoriaCalzado = document.querySelector('.categoriasCalzado');
    var categoriasAccesorio = document.querySelector('.categoriasAccesorio');

    var categoria1 = document.querySelectorAll('.categoria1');
    var categoria2 = document.querySelectorAll('.categoria2');

    var talles = document.querySelectorAll('#talles');
    var colores = document.querySelectorAll('#colores');

    var precio = document.querySelector('input#precio');
    var descuento = document.querySelector('input#descuento');
    var descripcion = document.querySelector('input#descripcion');

    var isChecked = [];
    var isCheckedTalles = [];
    var isCheckedColores = [];

    var selectMarca = document.querySelector('#marca')

    calzado.addEventListener('click', function (e){
        console.log("selecciono calzado");
        categoriasAccesorio.style.display = "none";
        categoriaCalzado.style.display = "flex";

    })
    accesorios.addEventListener('click', function (e){
        console.log("selecciono accesorios");
        categoriasAccesorio.style.display = "flex";
        categoriaCalzado.style.display = "none";

    })
    
    formulario.addEventListener('submit', function(event){
        event.preventDefault();
        categoria1.forEach(producto => {
            if(producto.getAttribute('ckecked')){
                console.log("esta seleccionado");
            }
            
        });
        if(nombreProducto.value == ""){
            event.preventDefault();
                var nameError = document.querySelector('#nameError');
                nameError.innerHTML = "<li>" + "El campo Nombre no puede estar vacio." + "</li>"
        }else if (nombreProducto.value > 15){
            event.preventDefault();
            var nameError = document.querySelector('#nameError');
            nameError.innerHTML = "<li>" + "El nombre no puede superar los 15 caracteres." + "</li>"
        }else if (nombreProducto.value < 3){
            event.preventDefault();
            var nameError = document.querySelector('#nameError');
            nameError.innerHTML = "<li>" + "El nombre no puede ser menor a 3 caracteres." + "</li>"}
            else{
                var nameError = document.querySelector('#nameError');
                nameError.innerHTML = "" 
            }

        //CHECK CATEGORIAS

        for(i =0; i < categoria1.length; i++){//COMPROBAR SI ESTA SELECCIONADO EN CATEGORIA 1
            if(categoria1[i].checked){
                console.log('esta marcado en categoria 1');
                isChecked.push(1) //SI ESTA SELECCIONADO SE AGREGA A PUSH EL 1
            }
        }
        for(i =0; i < categoria2.length; i++){//COMPROBAR SI ESTA SELECCIONADO EN CATEGORIA 2
            if(categoria2[i].checked){
                console.log('esta marcado en categoria 2');
                isChecked.push(1) //SI ESTA SELECCIONADO SE AGREGA A PUSH EL 1
            }
        }
        if(isChecked.length==0){//SE PREGUNTA SI EL LARGO ES IGUAL A CERO
            event.preventDefault();
            var categoriaError = document.querySelector('#categoriaError');
            categoriaError.innerHTML = "<li>" + "Seleccione una categoria." + "</li>";

        }
        else{
            var categoriaError = document.querySelector('#categoriaError');
            categoriaError.innerHTML = "";}
        console.log(isChecked);

         //SELECT MARCA

         if(selectMarca.value == ""){
            event.preventDefault();
            var marcaError = document.querySelector('#marcaError');
            marcaError.innerHTML = "<li>" + "Seleccione una marca." + "</li>";
        }
        else{
            var marcaError = document.querySelector('#marcaError');
            marcaError.innerHTML = "";
        }

        //TALLES
        for(i =0; i < talles.length; i++){//COMPROBAR SI ESTA SELECCIONADO EN TALLES
            if(talles[i].checked){
                console.log('esta marcado en talles');
                isCheckedTalles.push(1) //SI ESTA SELECCIONADO SE AGREGA A PUSH EL 1
                console.log(isCheckedTalles);
            }
        }
        if (isCheckedTalles.length==0){
            event.preventDefault();
            var tallesError = document.querySelector('#tallesError');
            tallesError.innerHTML = "<li>" + "Seleccione un talle como minimo." + "</li>";
        }else{
            var tallesError = document.querySelector('#tallesError');
            tallesError.innerHTML = "";  
        }

        //COLORES
        for(i =0; i < colores.length; i++){//COMPROBAR SI ESTA SELECCIONADO EN COLORES
            if(colores[i].checked){
                console.log('esta marcado en talles');
                isCheckedColores.push(1) //SI ESTA SELECCIONADO SE AGREGA A PUSH EL 1
                console.log(isCheckedColores);
            }
        }
        if (isCheckedColores.length==0){
            event.preventDefault();
            var coloresError = document.querySelector('#coloresError');
            coloresError.innerHTML = "<li>" + "Seleccione un color como minimo." + "</li>";
        }else{
            var coloresError = document.querySelector('#coloresError');
            coloresError.innerHTML = ""; 
        }
   
        //PRECIO
        if(precio.value ==''){
            event.preventDefault();
                var precioError = document.querySelector('#precioError');
                precioError.innerHTML = "<li>" + "El campo Precio no puede estar vacio." + "</li>"
        }else {
            console.log('el precio esta escrito  ' + precio.value);
            var precioError = document.querySelector('#precioError');
                precioError.innerHTML = ""
                
        }

        //DESCUENTO
        if(descuento.value ==''){
            event.preventDefault();
                var descuentoError = document.querySelector('#descuentoError');
                descuentoError.innerHTML = "<li>" + "El campo descuento no puede estar vacio." + "</li>"
        }else {
            var descuentoError = document.querySelector('#descuentoError');
            descuentoError.innerHTML = "";
                
        }
        //DESCRIPCION
        if(descripcion.value ==''){
            event.preventDefault();
                var descripcionError = document.querySelector('#descripcionError');
                descripcionError.innerHTML = "<li>" + "El campo descripcion no puede estar vacio." + "</li>"
        }else if(descripcion.value.length>51){
            event.preventDefault();
                var descripcionError = document.querySelector('#descripcionError');
                descripcionError.innerHTML = "<li>" + "El campo descripcion no puede superar los 50 caracteres." + "</li>"
        }else {
            var descripcionError = document.querySelector('#descripcionError');
            descripcionError.innerHTML = ""
                
        }
    })

       


}