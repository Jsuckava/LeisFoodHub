document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('.addC');
    const qtyInput = document.querySelector('.DecAdd .quantity');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsElems = document.querySelectorAll('#total-items');
    const subtotalElems = document.querySelectorAll('#subtotal');
    const cartModal = document.getElementById('modalWrapper1');
    const closeModal = document.getElementById('close-modal1');
    const checkoutModalWrapper = document.getElementById('checkoutModalWrapper');
    const checkoutSummaryText = document.getElementById('checkoutSummaryText');
    const confirmCheckoutBtn = document.getElementById('confirmCheckoutBtn');
    const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');

    const productName = document.querySelector('.product-name')?.textContent.trim() || document.querySelector('h2')?.textContent.trim();
    const price = parseFloat(document.querySelector('.Price span')?.textContent.trim().replace(/[^\d.]/g, '') || '0');
    const productImg = document.querySelector('section img')?.src || '';

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

    const updateCartDisplay = () => {
        cartItemsContainer.innerHTML = '';
        let totalQty = 0, totalPrice = 0;
        const cartEmptyMessage = document.querySelector('.cart-empty-message');
        
        cart.forEach(item => {
            const itemSection = document.createElement('section');
            itemSection.className = 'cart-item';
            itemSection.innerHTML = `
                <h3 class="cart-item-title">${item.name}</h3>
                <section class="cart-item-details" style="display: flex; align-items: center;">
                    <span class="cart-item-qty" style="margin-right: 10px;">Quantity: ${item.qty}</span>
                    <span class="cart-item-total" style="margin-right: 10px;">Total: ₱${(item.qty * item.price).toFixed(2)}</span>
                    <button class="decrease-btn" data-name="${item.name}" style="background:blue;">-</button>
                    <button class="increase-btn" data-name="${item.name}" style="background: #28a745;">+</button>
                    <button class="remove-btn" data-name="${item.name}"style="background:red;"><h1>remove</h1></button>
                </section>
            `;
            cartItemsContainer.appendChild(itemSection);
            totalQty += item.qty;
            totalPrice += item.qty * item.price;
        });

        cartEmptyMessage.style.display = cart.length ? 'none' : 'block';
        cartItemsContainer.style.display = cart.length ? 'block' : 'none';

        totalItemsElems.forEach(el => el.textContent = totalQty);
        subtotalElems.forEach(el => el.textContent = `₱${totalPrice.toFixed(2)}`);

        document.querySelectorAll('.decrease-btn, .increase-btn, .remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-name');
                const item = cart.find(item => item.name === itemName);
                
                if (e.target.classList.contains('decrease-btn')) {
                    item.qty > 1 ? item.qty-- : cart = cart.filter(item => item.name !== itemName);
                } else if (e.target.classList.contains('increase-btn')) {
                    item.qty++;
                } else {
                    cart = cart.filter(item => item.name !== itemName);
                }
                saveCart();
                updateCartDisplay();
            });
        });
    };

    addBtn.addEventListener('click', () => {
        const qty = Math.max(1, parseInt(qtyInput.value) || 1);
        const existing = cart.find(item => item.name === productName);

        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ name: productName, price, qty, img: productImg });
        }

        saveCart();
        cartModal.style.display = 'block';
        updateCartDisplay();
    });

    document.querySelector('.Bt2').addEventListener('click', () => {
        cartModal.style.display = 'block';
        updateCartDisplay();
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            confirmCheckoutBtn.style.display = 'none';
        } else {
            const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
            confirmCheckoutBtn.style.display = 'inline-block';
        }
        checkoutModalWrapper.style.display = 'block';
    });

    confirmCheckoutBtn.addEventListener('click', () => {
        alert('Checkout successful. Thank you for your purchase!');
        cart = [];
        saveCart();
        updateCartDisplay();
        cartModal.style.display = 'none';
        checkoutModalWrapper.style.display = 'none';
    });

    cancelCheckoutBtn.addEventListener('click', () => {
        checkoutModalWrapper.style.display = 'none';
    });

    updateCartDisplay();
});
