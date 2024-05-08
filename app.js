const form = document.querySelector('#searchForm');
const resultContainer = document.querySelector('#results');

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: {q: searchTerm}}
    results.innerHTML = '';
    const res = await axios.get('https://api.tvmaze.com/search/shows', config);
    addShows(res.data);
    form.elements.query.value = '';
})

const addShows = (shows) => {
    shows.forEach(result => {
        const show = result.show;

        // Create the column div outside to ensure it's always added even if there's no image.
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-md-4', 'mb-4');

        if (show.image) {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const img = document.createElement('img');
            img.src = show.image.medium;
            img.classList.add('card-img-top');
            cardDiv.append(img);  // Append image to the card

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const title = document.createElement('h5');
            title.innerText = show.name;
            title.classList.add('card-title');
            cardBody.append(title);

            if (show.genres.length > 0) {
                const genres = document.createElement('p');
                genres.textContent = `Genres: ${show.genres.join(', ')}`;
                genres.classList.add('card-text');
                cardBody.append(genres);
            }

            if (show.rating.average) {
                const rating = document.createElement('p');
                rating.textContent = `Rating: ${show.rating.average}`;
                rating.classList.add('card-text');
                cardBody.append(rating);
            }

            if (show.summary) {
                const summary = document.createElement('p');
                summary.innerHTML = show.summary;
                summary.classList.add('card-text');
                cardBody.append(summary);
            }

            if (show.officialSite) {
                const link = document.createElement('a');
                link.href = show.officialSite;
                link.textContent = 'Visit Official Site';
                link.className = 'btn btn-primary mt-2';
                link.target = '_blank';
                cardBody.append(link);
            }

            cardDiv.append(cardBody);
            colDiv.append(cardDiv);
        } else {
            // If there's no image, still create a card with just text content.
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const title = document.createElement('h5');
            title.innerText = show.name;
            title.classList.add('card-title');
            cardBody.append(title);

            cardDiv.append(cardBody);
            colDiv.append(cardDiv);
        }

        results.append(colDiv);
    });
};
