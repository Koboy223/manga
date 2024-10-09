// Función para cargar las películas desde un archivo JSON
async function loadMovies() {
    try {
        const response = await fetch('/movies.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el catálogo de películas');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar las películas:', error);
        return [];
    }
}

// Función para buscar películas
function searchMovies(movies, query) {
    query = query.toLowerCase();
    return movies.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.description.toLowerCase().includes(query)
    );
}

// Función para mostrar los resultados
function displayResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Limpiar resultados previos

    if (results.length > 0) {
        results.forEach(movie => {
            const resultItem = document.createElement('div');
            resultItem.className = 'p-4 hover:bg-gray-700 transition-colors duration-300 border-b border-gray-600 flex items-start';
            resultItem.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}" class="w-24 h-36 object-cover mr-4">
                <div>
                    <a href="${movie.page}" class="text-blue-400 font-bold text-lg">${movie.title}</a>
                    <p class="text-gray-300 mt-2">${movie.description}</p>
                </div>
            `;
            searchResults.appendChild(resultItem);
        });
        searchResults.classList.remove('hidden'); // Mostrar resultados si hay
    } else {
        searchResults.innerHTML = '<div class="p-4 text-gray-400">No se encontraron películas.</div>';
        searchResults.classList.remove('hidden'); // Mostrar mensaje de no resultados
    }
}

// Inicialización del buscador
document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const movies = await loadMovies();

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim(); // Trim elimina los espacios innecesarios

        // Si el campo está vacío, oculta el contenedor y no busca
        if (query === '') {
            searchResults.innerHTML = ''; // Limpiar resultados
            searchResults.classList.add('hidden'); // Asegura que el contenedor esté oculto
            return; // No hacer la búsqueda si el campo está vacío
        }

        const results = searchMovies(movies, query);
        displayResults(results);
    });
});
