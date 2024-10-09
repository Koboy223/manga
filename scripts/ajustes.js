// Función para cargar los ajustes guardados
function cargarAjustes() {
    const ajustes = JSON.parse(localStorage.getItem('ajustes')) || {};
    return {
        idioma: ajustes.idioma || 'es',
        fuente: ajustes.fuente || 'sans',
        tamanoFuente: ajustes.tamanoFuente || 16,
        tema: ajustes.tema || 'dark',
        colorAccento: ajustes.colorAccento || 'blue'
    };
}

// Función para guardar los ajustes
function guardarAjustes(ajustes) {
    localStorage.setItem('ajustes', JSON.stringify(ajustes));
}

// Función para aplicar los ajustes
function aplicarAjustes(ajustes) {
    // Aplicar idioma
    document.documentElement.lang = ajustes.idioma;

    // Aplicar fuente
    document.body.className = `font-${ajustes.fuente}`;

    // Aplicar tamaño de fuente
    document.body.style.fontSize = `${ajustes.tamanoFuente}px`;

    // Aplicar tema
    if (ajustes.tema === 'light') {
        document.body.classList.remove('bg-gray-900', 'text-white');
        document.body.classList.add('bg-gray-100', 'text-black');
    } else {
        document.body.classList.remove('bg-gray-100', 'text-black');
        document.body.classList.add('bg-gray-900', 'text-white');
    }

    // Aplicar color de acento
    document.documentElement.style.setProperty('--color-accent', ajustes.colorAccento);
}

// Inicializar ajustes
const ajustes = cargarAjustes();
aplicarAjustes(ajustes);

// Manejar cambios en los ajustes (solo en la página de ajustes)
if (window.location.pathname.includes('ajustes.html')) {
    document.getElementById('language').value = ajustes.idioma;
    document.getElementById('font').value = ajustes.fuente;
    document.getElementById('fontSize').value = ajustes.tamanoFuente;
    document.getElementById('fontSizeValue').textContent = `${ajustes.tamanoFuente}px`;
    document.getElementById('theme').value = ajustes.tema;
    document.getElementById('accentColor').value = ajustes.colorAccento;

    document.querySelectorAll('select, input').forEach(elemento => {
        elemento.addEventListener('change', function() {
            const nuevoAjustes = {
                idioma: document.getElementById('language').value,
                fuente: document.getElementById('font').value,
                tamanoFuente: parseInt(document.getElementById('fontSize').value),
                tema: document.getElementById('theme').value,
                colorAccento: document.getElementById('accentColor').value
            };
            guardarAjustes(nuevoAjustes);
            aplicarAjustes(nuevoAjustes);
        });
    });

    // Actualizar el valor mostrado del tamaño de fuente
    document.getElementById('fontSize').addEventListener('input', function() {
        document.getElementById('fontSizeValue').textContent = `${this.value}px`;
    });
}