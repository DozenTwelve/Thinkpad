import products from './products.js';

const container = document.getElementById('product-list');

container.classList.add('bg-gray-100', 'min-h-screen', 'p-6');

const header = document.createElement('div');
header.className = 'mb-8 text-center';
header.innerHTML = `
  <h1 class="text-3xl font-bold mb-1">Tôi sẽ giúp bạn chọn ThinkPad 💻</h1>
  <p class="text-sm text-gray-600">Máy tính xách tay Nhật Bản cũ được chọn lọc với hiệu suất chi phí cao, được cá nhân lựa chọn và giới thiệu</p>
`;
container.before(header);

products.forEach((p) => {
  const card = document.createElement('div');
  card.className =
    'bg-white rounded-xl shadow-md overflow-hidden md:flex max-w-3xl mx-auto';

  card.innerHTML = `
    <img class="w-full md:w-1/3 object-cover" src="${p.image}" alt="${p.name}" />
    <div class="p-6 md:w-2/3">
      <h2 class="text-xl font-bold mb-2 text-gray-800">${p.name}</h2>
      <p class="text-sm text-gray-600 mb-2">${p.note}</p>
      <ul class="text-sm text-gray-700 mb-2 space-y-1">
        <li><strong>CPU:</strong> ${p.cpu}</li>
        <li><strong>RAM:</strong> ${p.ram}</li>
        <li><strong>Storage:</strong> ${p.storage}</li>
        <li><strong>Display:</strong> ${p.display}</li>
        <li><strong>OS:</strong> ${p.os}</li>
        <li><strong>Graphics:</strong> ${p.graphics}</li>
        <li><strong>Ports:</strong> ${p.ports}</li>
        <li><strong>Features:</strong> ${p.features.join(', ')}</li>
        <li><strong>状态:</strong> ${p.condition}</li>
        <li><strong>附属品:</strong> ${p.accessories}</li>
      </ul>
      <div class="flex justify-between items-center mt-4">
        <span class="text-lg font-semibold text-blue-600">${p.price}</span>
        <a href="product.html?id=${p.id}" class="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Xem thông số chi tiết
        </a>
      </div>
    </div>
  `;

  container.appendChild(card);
});