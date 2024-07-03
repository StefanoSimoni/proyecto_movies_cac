document.addEventListener('DOMContentLoaded', () => {
    const genderForm = document.getElementById('gender-form');
    const gendersList = document.getElementById('genders-list');
    const genderIdInput = document.getElementById('gender-id');
    let currentGenderId = null;

    const fetchGenders = async () => {
        const response = await fetch('http://localhost:8080/genders');
        const genders = await response.json();
        gendersList.innerHTML = '';
        genders.forEach(gender => {
            const li = document.createElement('li');
            li.innerHTML =`
                <div><strong>Gender:</strong> ${gender.gender}</div>
                <div>
                    <button class="edit" data-id="${gender.id}">Edit</button>
                    <button class="delete" data-id="${gender.id}">Delete</button>
                </div>
            `;
            gendersList.appendChild(li);
        });
    };

    const saveGender = async (gender) => {
        const method = currentGenderId ? 'PUT' : 'POST';
        const url = currentGenderId ? `http://localhost:8080/genders/${currentGenderId}` : 'http://localhost:8080/genders';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gender),
        });
        return response.json();
    };

    const deleteGender = async (id) => {
        const response = await fetch(`http://localhost:8080/genders/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    };

    genderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(genderForm);
        const gender = {};
        formData.forEach((value, key) => {
            gender[key] = value;
        });
        gender.id = genderIdInput.value || undefined;
        await saveGender(gender);
        await fetchGenders();
        genderForm.reset();
        genderIdInput.value = '';
        currentGenderId = null;
    });

    gendersList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit')) {
            const id = e.target.dataset.id;
            const response = await fetch(`http://localhost:8080/genders/${id}`);
            const gender = await response.json();
            Object.keys(gender).forEach(key => {
                if (genderForm.elements[key]) {
                    genderForm.elements[key].value = gender[key];
                }
            });
            genderIdInput.value = gender[0].id;
            currentGenderId = gender[0].id;
        }
        if (e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            await deleteGender(id);
            await fetchGenders();
        }
    });

    fetchGenders();
});
