document.addEventListener('DOMContentLoaded', () => {
    const directorForm = document.getElementById('director-form');
    const directorsList = document.getElementById('directors-list');
    const directorIdInput = document.getElementById('director-id');
    let currentDirectorId = null;

    const fetchDirectors = async () => {
        const response = await fetch('http://localhost:8080/directors');
        const directors = await response.json();
        directorsList.innerHTML = '';
        directors.forEach(director => {
            const li = document.createElement('li');
            li.innerHTML =`
                <div><strong>Name:</strong> ${director.name}</div>
                <div><strong>Last Name:</strong> ${director.last_name}</div>
                <div>
                    <button class="edit" data-id="${director.id}">Edit</button>
                    <button class="delete" data-id="${director.id}">Delete</button>
                </div>
            `;
            directorsList.appendChild(li);
        });
    };

    const saveDirector = async (director) => {
        const method = currentDirectorId ? 'PUT' : 'POST';
        const url = currentDirectorId ? `http://localhost:8080/directors/${currentDirectorId}` : 'http://localhost:8080/directors';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(director),
        });
        return response.json();
    };

    const deleteDirector = async (id) => {
        const response = await fetch(`http://localhost:8080/directors/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    };

    directorForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(directorForm);
        const director = {};
        formData.forEach((value, key) => {
            director[key] = value;
        });
        director.id = directorIdInput.value || undefined;
        await saveDirector(director);
        await fetchDirectors();
        directorForm.reset();
        directorIdInput.value = '';
        currentDirectorId = null;
    });

    directorsList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit')) {
            const id = e.target.dataset.id;
            const response = await fetch(`http://localhost:8080/directors/${id}`);
            const director = await response.json();
            Object.keys(director).forEach(key => {
                if (directorForm.elements[key]) {
                    directorForm.elements[key].value = director[key];
                }
            });
            directorIdInput.value = director[0].id;
            currentDirectorId = director[0].id;
        }
        if (e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            await deleteDirector(id);
            await fetchDirectors();
        }
    });

    fetchDirectors();
});
