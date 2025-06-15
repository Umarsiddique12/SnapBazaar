const addItemForm = document.getElementById('addItemForm');
const addItemError = document.getElementById('addItemError');
const addItemSuccess = document.getElementById('addItemSuccess');

if (addItemForm) {
  addItemForm.addEventListener('submit', async e => {
    e.preventDefault();
    addItemError.textContent = '';
    addItemSuccess.textContent = '';

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    const formData = new FormData(addItemForm);

    try {
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to add item');

      addItemSuccess.textContent = 'Item added successfully!';
      addItemForm.reset();
    } catch (err) {
      addItemError.textContent = err.message;
    }
  });
}
