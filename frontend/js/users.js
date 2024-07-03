document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const usersList = document.getElementById('users-list');
    const userIdInput = document.getElementById('user-id');
    let currentUserId = null;

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8080/users');
        const users = await response.json();
        usersList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML =`
                <div><strong>Name:</strong> ${user.name}</div>
                <div><strong>Last Name:</strong> ${user.last_name}</div>
                <div><strong>Email:</strong> ${user.email}</div>
                <div><strong>Password:</strong> ${user.password}</div>
                <div><strong>Is Admin:</strong> ${user.isAdmin}</div>
                <div>
                    <button class="edit" data-id="${user.id}">Edit</button>
                    <button class="delete" data-id="${user.id}">Delete</button>
                </div>
            `;
            usersList.appendChild(li);
        });
    };

    const saveUser = async (user) => {
        console.log('user: ', user);
        const method = currentUserId ? 'PUT' : 'POST';
        const url = currentUserId ? `http://localhost:8080/users/${currentUserId}` : 'http://localhost:8080/auth/register';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        console.log('response: ', response);
        return response.json();
    };

    const deleteUser = async (id) => {
        const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    };

    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(userForm);
        const user = {};
        formData.forEach((value, key) => {
            if (key === 'isAdmin') {
                user[key] = formData.get(key) === 'on' ? 1 : 0;
            } else {
                user[key] = value;
            }
        });
        user.id = userIdInput.value || undefined; // Asegúrate de que el ID esté definido si es una edición
        await saveUser(user);
        await fetchUsers();
        userForm.reset();
        userIdInput.value = '';
    });

    usersList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit')) {
            const id = e.target.dataset.id;
            const response = await fetch(`http://localhost:8080/users/${id}`);
            const user = await response.json();
            Object.keys(user).forEach(key => {
                if (userForm.elements[key]) {
                    userForm.elements[key].value = user[key];
                }
                if (key === 'isAdmin') {
                    userForm.elements[key].checked = user[key] === 1;
                }
            });
            currentUserId = user[0].id;
        }
        if (e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            await deleteUser(id);
            await fetchUsers();
        }
    });

    fetchUsers();
});
