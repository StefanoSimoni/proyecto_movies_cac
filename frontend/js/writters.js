document.addEventListener('DOMContentLoaded', () => {
    const writterForm = document.getElementById('writter-form');
    const writtersList = document.getElementById('writters-list');
    const writterIdInput = document.getElementById('writter-id');
    let currentWritterId = null;

    const fetchWritters = async () => {
        const response = await fetch('http://localhost:8080/writters');
        const writters = await response.json();
        writtersList.innerHTML = '';
        writters.forEach(writter => {
            const li = document.createElement('li');
            li.innerHTML =`
                <div><strong>Name:</strong> ${writter.name}</div>
                <div><strong>Last Name:</strong> ${writter.last_name}</div>
                <div>
                    <button class="edit" data-id="${writter.id}">Edit</button>
                    <button class="delete" data-id="${writter.id}">Delete</button>
                </div>
            `;
            writtersList.appendChild(li);
        });
    };

    const saveWritter = async (writter) => {
        const method = currentWritterId ? 'PUT' : 'POST';
        const url = currentWritterId ? `http://localhost:8080/writters/${currentWritterId}` : 'http://localhost:8080/writters';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(writter),
        });
        return response.json();
    };

    const deleteWritter = async (id) => {
        const response = await fetch(`http://localhost:8080/writters/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    };

    writterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(writterForm);
        const writter = {};
        formData.forEach((value, key) => {
            writter[key] = value;
        });
        writter.id = writterIdInput.value || undefined;
        await saveWritter(writter);
        await fetchWritters();
        writterForm.reset();
        writterIdInput.value = '';
        currentWritterId = null;
    });

    writtersList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit')) {
            const id = e.target.dataset.id;
            const response = await fetch(`http://localhost:8080/writters/${id}`);
            const writter = await response.json();
            Object.keys(writter).forEach(key => {
                if (writterForm.elements[key]) {
                    writterForm.elements[key].value = writter[key];
                }
            });
            writterIdInput.value = writter[0].id;
            currentWritterId = writter[0].id;
        }
        if (e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            await deleteWritter(id);
            await fetchWritters();
        }
    });

    fetchWritters();
});
