import products from './products.js';

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const product = products.find(p => p.id === productId);
const container = document.getElementById('product-detail');

if (!product) {
  container.innerHTML = `<p class="text-red-600">未找到相关产品</p>`;
} else {
  const imageBase = product.image.replace(/\.jpg$/, '');
  const images = Array.from({ length: 9 }, (_, i) =>
    i === 0 ? `${imageBase}.jpg` : `${imageBase}-${i + 1}.jpg`
  );

  let currentIndex = 0;

  const thumbnails = images.map((src, idx) => `
    <img src="${src}" alt="${product.name} ${idx + 1}"
         class="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded cursor-pointer border border-gray-200 hover:border-blue-400 transition"
         onclick="openGallery(${idx})" onerror="this.style.display='none'" />
  `).join('');

  container.innerHTML = `
    <h1 class="text-2xl font-bold mb-4">${product.name}</h1>
    <div class="relative mb-4 max-w-xl mx-auto h-[320px] sm:h-[360px] md:h-[400px] flex items-center justify-center bg-gray-50 rounded overflow-hidden">
      <img id="main-image" src="${images[0]}" alt="Main" class="max-h-full max-w-full object-contain transition-all duration-300" />
      <button id="prev-btn" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 px-2 py-1 rounded-l">←</button>
      <button id="next-btn" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 px-2 py-1 rounded-r">→</button>
    </div>
    <div class="flex flex-wrap sm:flex-nowrap sm:overflow-x-auto gap-2 mb-6 justify-center">
      ${thumbnails}
    </div>
    <ul class="text-sm text-gray-800 space-y-1 mb-6">
      <li><strong>CPU:</strong> ${product.cpu}</li>
      <li><strong>RAM:</strong> ${product.ram}</li>
      <li><strong>Storage:</strong> ${product.storage}</li>
      <li><strong>Display:</strong> ${product.display}</li>
      <li><strong>价格:</strong> <span class="text-blue-600 font-semibold">${product.price}</span></li>
    </ul>
    <div class="mt-6">
      <p class="text-sm text-gray-500 mb-2">Liên hệ để mua máy / ご購入希望の方はこちらから：</p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="https://m.me/YOUR_FB_USERNAME" target="_blank"
           class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm text-center">
          Facebook Messenger
        </a>
        <a href="https://zalo.me/YOUR_ZALO_ID" target="_blank"
           class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm text-center">
          Zalo
        </a>
      </div>
    </div>
  `;

  window.openGallery = (index) => {
    const mainImage = document.getElementById('main-image');
    mainImage.src = images[index];
    currentIndex = index;
  };

  const updateImage = (index) => {
    document.getElementById('main-image').src = images[index];
  };

  document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
  });
}