fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        data.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h2>${product.name}</h2>
                <p>Price: $${product.price}</p>
                <button class="button" onclick="toggleDetail('${product.name}')">Detail</button>
                <button class="button" onclick="openForm('${product.name}', ${product.price})">Beli</button>
                <div class="product-detail" id="detail-${product.name.replace(/\s/g, '-')}">
                    <p>${product.description}</p>
                </div>
                <div class="form-container" id="form-${product.name.replace(/\s/g, '-')}">
                    <input type="text" placeholder="Nama Anda" id="name-${product.name.replace(/\s/g, '-')}" required>
                    <input type="number" min="1" max="10" placeholder="Jumlah" id="quantity-${product.name.replace(/\s/g, '-')}" required>
                    <button class="button" onclick="buyProduct('${product.name}')">Kirim</button>
                </div>
            `;
            productList.appendChild(productCard);
        });
    });

function toggleDetail(productName) {
    const detailElement = document.getElementById(`detail-${productName.replace(/\s/g, '-')}`);
    detailElement.style.display = detailElement.style.display === 'none' ? 'block' : 'none';
}

function openForm(productName, price) {
    const formElement = document.getElementById(`form-${productName.replace(/\s/g, '-')}`);
    formElement.style.display = formElement.style.display === 'none' ? 'block' : 'none';
}

function buyProduct(productName) {
    const customerName = document.getElementById(`name-${productName.replace(/\s/g, '-')}`).value;
    const quantity = document.getElementById(`quantity-${productName.replace(/\s/g, '-')}`).value;
    const message = `Nama: ${customerName}\nPesanan: ${productName}\nJumlah: ${quantity}`;
    
    // Ganti '628123456789' dengan nomor WhatsApp Anda
    const phoneNumber = '6283168869784'; 
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}