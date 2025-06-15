const itemsList = document.getElementById('itemsList');

async function fetchItems() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('http://localhost:5000/api/items', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const items = await res.json();
    if (!res.ok) throw new Error(items.msg || 'Failed to fetch items');

    renderItems(items);
  } catch (err) {
    itemsList.innerHTML = `<p class="error-msg">${err.message}</p>`;
  }
}

function renderItems(items) {
  if (items.length === 0) {
    itemsList.innerHTML = '<p>No items available.</p>';
    return;
  }

  itemsList.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <img src="${item.image || 'images/default-item.png'}" alt="${item.title}" />
      <div class="item-info">
        <h3>${item.title}</h3>
        <p class="description">${item.description}</p>
        <p class="price">₹${item.price}</p>
      </div>
    `;

    itemsList.appendChild(card);
  });
}

if (itemsList) {
  fetchItems();
}
