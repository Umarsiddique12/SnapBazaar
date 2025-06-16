const myItemsList = document.getElementById('myItemsList');

async function fetchMyItems() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('http://localhost:5000/api/items/my', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const items = await res.json();
    if (!res.ok) throw new Error(items.msg || 'Failed to fetch your items');

    renderMyItems(items);
  } catch (err) {
    myItemsList.innerHTML = `<p class="error-msg">${err.message}</p>`;
  }
}

function renderMyItems(items) {
  if (items.length === 0) {
    myItemsList.innerHTML = '<p>You have not added any items yet.</p>';
    return;
  }

  myItemsList.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.id = `item-${item._id}`;

    card.innerHTML = `
      <img src="${item.image || 'images/default-item.png'}" alt="${item.title}" />
      <div class="item-info">
        <h3>${item.title}</h3>
        <p class="description">${item.description}</p>
        <p class="price">₹${item.price}</p>
        <button class="delete-btn" data-id="${item._id}">Delete</button>
      </div>
    `;

    myItemsList.appendChild(card);
  });
}

if (myItemsList) {
  fetchMyItems();
}
myItemsList.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const itemId = event.target.getAttribute('data-id');
    if (!itemId) return;

    const confirmed = confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert('Item deleted successfully');
        const itemCard = document.getElementById(`item-${itemId}`);
        if (itemCard) itemCard.remove();
      } else {
        alert(data.msg || 'Failed to delete item');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Server error while deleting item');
    }
  }
});
