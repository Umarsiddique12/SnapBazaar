document.addEventListener('DOMContentLoaded', () => {
  fetchItems();
});

async function fetchItems() {
  try {
    const response = await fetch('/api/items');
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to load items');

    renderItems(data);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    document.getElementById('itemsList').innerHTML = '<p class="error-msg">Failed to load items.</p>';
  }
}

function renderItems(items) {
  const container = document.getElementById('itemsList');
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = '<p>No items found.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';

    const whatsappLink = item.whatsappNumber
      ? `<a href="https://wa.me/${item.whatsappNumber}" target="_blank" class="whatsapp-link">
          <i class="fab fa-whatsapp"></i> Chat with Seller
         </a>`
      : '<span class="no-contact">No contact info</span>';

    card.innerHTML = `
      <img src="${item.image || 'default.jpg'}" alt="${item.title}" class="item-image" />
      <div class="item-details">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <p><strong>Price:</strong> ₹${item.price}</p>
        <p><strong>Seller:</strong> ${item.sellerName || 'Unknown'}</p>
        ${whatsappLink}
      </div>
    `;

    container.appendChild(card);
  });
}
