import { searchCharacters } from './rickAndMorty.js';
import { updateWeather } from './weather.js';

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initCharacterSearch() {
    const input = document.getElementById('characterName'); 
    const btn = document.getElementById('btnCargar');
    
    if (input) {
        const debouncedSearch = debounce(() => searchCharacters(input.value), 3000);
        
        input.addEventListener('input', debouncedSearch);
        
        if (btn) {
            btn.addEventListener('click', () => searchCharacters(input.value));
        }
        // Carga inicial
        searchCharacters('');
    }
}

function initWeather() {
    // Coincide con los IDs de tu sección lateral (Módulo de Clima)
    const input = document.getElementById('inputCiudad');
    const btn = document.getElementById('btnBuscar');

    if (btn && input) {
        btn.addEventListener('click', () => updateWeather(input.value));
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') btn.click();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCharacterSearch();
    initWeather();
});