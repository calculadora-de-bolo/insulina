const modal = document.getElementById('modalAlimentos');
const overlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

 function abrirModal() {
  modal.style.display = 'block';
  overlay.style.display = 'block';
  document.body.classList.add('modal-open');
    
  }

