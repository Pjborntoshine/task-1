document.addEventListener('DOMContentLoaded', function () {
    const selectButtons = document.querySelectorAll('.select-button');
    const addToCartButton = document.getElementById('add-to-cart-button');
    const totalPriceSpan = document.getElementById('total-price');
    const selectedCountSpan = document.getElementById('selected-count');
    const customNotification = document.getElementById('custom-notification');

    const cartItemsList = document.getElementById('cart-items');
    const cartTotalPriceSpan = document.getElementById('cart-total-price');

    let totalPrice = 0;
    let selectedCount = 0;
    const cart = [];

    selectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const chocolateItem = button.closest('.chocolate-item');
            const price = parseFloat(chocolateItem.querySelector('.price').textContent.slice(1));

            if (button.classList.contains('selected')) {
                totalPrice -= price;
                selectedCount--;
                removeFromCart(chocolateItem);
            } else {
                if (selectedCount < 8) {
                    totalPrice += price;
                    selectedCount++;
                    addToCart(chocolateItem);
                } else {
                    customNotification.style.display = 'block';
                    setTimeout(() => {
                        customNotification.style.display = 'none';
                    }, 2000);
                    return;
                }
            }

            button.classList.toggle('selected');

            if (button.classList.contains('selected')) {
                button.textContent = 'Selected';
            } else {
                button.textContent = 'Select';
            }

            totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;
            selectedCountSpan.textContent = selectedCount;
        });
    });

    addToCartButton.addEventListener('click', () => {
        updateCartDisplay();
    });

    function addToCart(chocolateItem) {
        const itemName = chocolateItem.querySelector('h2').textContent;
        const itemPrice = parseFloat(chocolateItem.querySelector('.price').textContent.slice(1));

        cart.push({
            name: itemName,
            price: itemPrice,
        });
    }

    function removeFromCart(chocolateItem) {
        const itemName = chocolateItem.querySelector('h2').textContent;
        const itemIndex = cart.findIndex(item => item.name === itemName);

        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
        }
    }

    function updateCartDisplay() {
        cartItemsList.innerHTML = '';

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
        });

        const cartTotal = cart.reduce((total, item) => total + item.price, 0);
        cartTotalPriceSpan.textContent = `$${cartTotal.toFixed(2)}`;
    }
});
