// Obtener elementos
const modalr = document.getElementById("myModalR");
const closeButtonr = document.getElementById("closeButtonr"); // Usar el ID directamente
const overlayR = document.getElementById('modalOverlay');

// Función para realizar el cálculo y mostrar el modal
function calcularYMostrarResultado() {
  // Obtener los valores de los inputs
  let factorInsulina = parseFloat(document.getElementById("factorInsulina").value);
  let glucemiaCapilarI = parseFloat(document.getElementById("glucemiaCapilarI").value);
  let glucemiaCapilarO = parseFloat(document.getElementById("glucemiaCapilarO").value);
  let insulinaRest = parseFloat(document.getElementById("insulinaRest").value);
  let ratioInsulina = parseFloat(document.getElementById("ratioInsulina").value);
  let totalcarbohidratos = parseFloat(document.getElementById("totalcarbohidratos").innerText.match(/\d+/)[0]); // Extraer valor numérico
  const errorMessage = document.getElementById('error-message');
  
  // Verifica que todos los valores necesarios estén disponibles
  if (!isNaN(factorInsulina) && !isNaN(glucemiaCapilarI) && !isNaN(glucemiaCapilarO) && !isNaN(insulinaRest) && !isNaN(ratioInsulina) && !isNaN(totalcarbohidratos)&&(glucemiaCapilarI>glucemiaCapilarO)) {
    // Realizar el cálculo de bolo de insulina
    let resultado = (ratioInsulina * (totalcarbohidratos) / 10) + ((glucemiaCapilarI - glucemiaCapilarO) / factorInsulina) - insulinaRest;
    
    // Mostrar el resultado en el modal
    document.getElementById("resultado").innerText =  + resultado.toFixed(2) + " U";
    errorMessage.textContent = "";

    // Abrir el modal
    abrirModalr();
  } 

  else if ((glucemiaCapilarI)<=(glucemiaCapilarO)){
    errorMessage.textContent = "*La glucemia final no puede ser mayor que la inicial";
  }
  
  else {
    alert("Por favor, completa todos los campos correctamente antes de enviar.");
  }
}

// Función para abrir el modal de resultados
function abrirModalr() {
  modalr.style.display = "block";
  overlayR.style.display = 'block';
}

// Cerrar el modal al hacer clic en el botón de cierre
closeButtonr.addEventListener("click", () => {
  modalr.style.display = "none";
  overlayR.style.display = "none";
});