const jsonURL = 'js/todosalimentos.json';
let alimentos = [];
let carbohidratos = 0;
let sumaCarbohidratos = 0;
let totalCarbohidratosGuardados = 0;

// Cargar el JSON de alimentos
fetch(jsonURL)
    .then(response => response.json())
    .then(data => {
        alimentos = data;
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

// Función para actualizar sugerencias en el datalist a partir de la tercera letra
function actualizarSugerencias() {
    const listaSugerencias = document.getElementById('lista-sugerencias');
    listaSugerencias.innerHTML = '';  // Limpiar el datalist

    const textoBusqueda = document.getElementById('buscador').value.toLowerCase();
   

    // Solo mostrar sugerencias si el usuario ha ingresado al menos 3 letras
    if (textoBusqueda.length >= 3) {
        const opcionesFiltradas = alimentos
            .filter(alimento => alimento.Alimento.toLowerCase().includes(textoBusqueda))
            .slice(0, 20);  // Limitar a un máximo de 20 opciones
    
        // Agregar las opciones filtradas al datalist
        opcionesFiltradas.forEach(opcion => {
            const optionElement = document.createElement('option');
            optionElement.value = opcion.Alimento;
            listaSugerencias.appendChild(optionElement);   
        });
    }
}

function buscarYMostrarAlimento() {
    const query = document.getElementById('buscador').value.trim().toLowerCase();
    const alimentoEncontrado = alimentos.find(alimento => 
        alimento.Alimento.toLowerCase() === query
    );

    if (alimentoEncontrado) {
        carbohidratos = alimentoEncontrado['Hidratos de carbono (g)'];
        const gramos = alimentoEncontrado['Peso neto (g)'];
        const gramosIngeridos = document.getElementById('gramos_ingeridos').value;
        
        function calcularCarbohidratos(carbohidratos, gramos, gramosIngeridos) {
            return (gramosIngeridos * carbohidratos) / gramos;
        }

        let carbohidratosTotales = calcularCarbohidratos(carbohidratos, gramos, gramosIngeridos);
        sumaCarbohidratos += carbohidratosTotales;

        console.log(`Carbohidratos acumulados: ${sumaCarbohidratos}g`);
        document.getElementById('totalcarbohidratos').textContent = ` ${sumaCarbohidratos.toFixed(2)}g`;
        document.getElementById('carbohidratos_tot').textContent = ` ${sumaCarbohidratos.toFixed(2)}g`;
       /* const lista = document.getElementById('alimentos-lista');
        const nuevoElemento = document.createElement('li');

        nuevoElemento.textContent = `${alimentoEncontrado}: ${gramosIngeridos}`;
        lista.appendChild(nuevoElemento); /*se agrega  el elemento a la lista */

    } else {
        console.log('Alimento no encontrado');
    }
    document.getElementById('buscador').value = "";
    document.getElementById('gramos_ingeridos').value = "";
}

function guardarTotalCarbohidratos() {
    totalCarbohidratosGuardados = sumaCarbohidratos;
    console.log(`Total de carbohidratos guardado: ${totalCarbohidratosGuardados}g`);
 
    const modal = document.getElementById('modalAlimentos');
    const overlay = document.getElementById('modalOverlay');
  
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.classList.remove('modal-open');
  
}

function obtenerValorRatioInsulina() {
    const input = document.getElementById("ratioInsulina").value;
    
    // Validar si es una fracción (por ejemplo, "1/2")
    if (input.includes("/")) {
      const partes = input.split("/");
      const numerador = parseFloat(partes[0]);
      const denominador = parseFloat(partes[1]);
      
      if (denominador !== 0) {
        return numerador / denominador; // Devuelve el valor decimal de la fracción
      } else {
        alert("El denominador no puede ser cero.");
        return null;
      }
    }
  
    // Si no es una fracción, tratarlo como número decimal
    return parseFloat(input);
  }

