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

    card.innerHTML = `
      <img src="${item.image || 'images/default-item.png'}" alt="${item.title}" />
      <div class="item-info">
        <h3>${item.title}</h3>
        <p class="description">${item.description}</p>
        <p class="price">₹${item.price}</p>
      </div>
    `;

    myItemsList.appendChild(card);
  });
}

if (myItemsList) {
  fetchMyItems();
}
