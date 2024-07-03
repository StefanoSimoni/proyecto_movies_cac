document.addEventListener('DOMContentLoaded', () => {
    const moviesGenderForm = document.getElementById('movies_gender-form');
    const moviesGendersList = document.getElementById('movies_genders-list');
    const idMoviesInput = document.getElementById('id_movies');
    const idGendersInput = document.getElementById('id_genders');

    const fetchMoviesGenders = async () => {
        const response = await fetch('http://localhost:8080/movies_genders');
        const moviesGenders = await response.json();

        moviesGendersList.innerHTML = '';
        
        for (const moviesGender of moviesGenders) {
            const movieResponse = await fetch(`http://localhost:8080/movies/${moviesGender.id_movies}`);
            const movie = await movieResponse.json();
            
            const genderResponse = await fetch(`http://localhost:8080/genders/${moviesGender.id_genders}`);
            const gender = await genderResponse.json();
            
            const li = document.createElement('li');
            li.innerHTML =`
                <div><strong>Movie:</strong> ${movie[0].title}</div>
                <div><strong>Gender:</strong> ${gender[0].gender}</div>
                <div>
                    <button class="delete" data-id-movies="${moviesGender.id_movies}" data-id-genders="${moviesGender.id_genders}">Delete</button>
                </div>
            `;
            moviesGendersList.appendChild(li);
        }
    };

    const saveMoviesGender = async (moviesGender) => {
        const response = await fetch('http://localhost:8080/movies_genders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moviesGender),
        });
        return response.json();
    };

    const deleteMoviesGender = async (id_movies, id_genders) => {
        const response = await fetch(`http://localhost:8080/movies_genders/${id_movies}/${id_genders}`, {
            method: 'DELETE',
        });
        return response.json();
    };

    moviesGenderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(moviesGenderForm);
        const moviesGender = {};
        formData.forEach((value, key) => {
            moviesGender[key] = value;
        });
        await saveMoviesGender(moviesGender);
        await fetchMoviesGenders();
        moviesGenderForm.reset();
    });

    moviesGendersList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete')) {
            const id_movies = e.target.dataset.idMovies;
            const id_genders = e.target.dataset.idGenders;
            await deleteMoviesGender(id_movies, id_genders);
            await fetchMoviesGenders();
        }
    });

    fetchMoviesGenders();
});
