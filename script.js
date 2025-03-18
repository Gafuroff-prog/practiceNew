const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

async function malumotniOlish() {
    try {
        const javob = await fetch('https://restcountries.com/v3.1/all');
        
        if (!javob.ok) {
            throw new Error(`Xatolik: ${javob.status}`);
        }

        const countries = await javob.json();
        korsatish(countries);
    } catch (xato) {
        console.error("Xatolik sodir bo'ldi:", xato.message);
    }
}

function korsatish(countries) {
    countriesContainer.innerHTML = '';

    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');

        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <h3>${country.name.common}</h3>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'Noma\'lum'}</p>
        `;

        countriesContainer.appendChild(countryCard);
    });
}

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card');

    countryCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(searchValue) ? '' : 'none';
    });
});

filterSelect.addEventListener('change', () => {
    const filterValue = filterSelect.value;
    const countryCards = document.querySelectorAll('.country-card');

    countryCards.forEach(card => {
        const region = card.querySelector('p:nth-child(4)').textContent.split(': ')[1];
        card.style.display = (filterValue === '' || region === filterValue) ? '' : 'none';
    });
});

malumotniOlish();
