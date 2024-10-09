  // Verifica si el usuario ha elegido no mostrar el popup
  if (localStorage.getItem('noShowPopup') === 'true') {
    document.getElementById('popup').style.display = 'none';
}

// Cierra el popup
function closePopup() {
    // Si la casilla está marcada, guarda la preferencia del usuario
    if (document.getElementById('noShowCheckbox').checked) {
        localStorage.setItem('noShowPopup', 'true'); // Guarda la preferencia del usuario
        showMiniPopup(); // Muestra el mini popup
    }
    document.getElementById('popup').style.display = 'none';
}

// Muestra la mini ventana emergente por 3 segundos
function showMiniPopup() {
    const miniPopup = document.getElementById('miniPopup');
    miniPopup.style.display = 'block'; // Muestra el mini popup
    setTimeout(() => {
        miniPopup.style.display = 'none'; // Lo oculta después de 3 segundos
    }, 5000); // 3000 ms = 3 segundos
}