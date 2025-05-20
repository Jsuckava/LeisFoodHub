//NOTE - Dropdown Toggle Logic
let openDropdownId = null;

window.onclick = function(event) {
  const dropdownTriggers = ['.cdo', '.pureF', '.MomL', '.Frab', '.searchCl'];
  const isTrigger = dropdownTriggers.some(cls => event.target.closest(cls));
  const isContent = event.target.closest('#dropdownContent') || ['C', 'F', 'M', 'R'].some(l => event.target.closest(`#dropdownContent${l}`));

  if (!isTrigger && !isContent) {
    closeAllDropdowns();
  }
};

const toggleDropdown = (id) => {
  const content = document.getElementById(id);

  if (openDropdownId && openDropdownId !== id) {
    document.getElementById(openDropdownId).style.display = 'none';
  }

  if (content) {
    const isVisible = content.style.display === 'block';
    content.style.display = isVisible ? 'none' : 'block';
    openDropdownId = isVisible ? null : id;
  }
};

['C', 'F', 'M', 'R'].forEach(letter => {
  window[`toggleDropdown${letter}`] = () => toggleDropdown(`dropdownContent${letter}`);
});

function closeAllDropdowns() {
  ['dropdownContentC', 'dropdownContentF', 'dropdownContentM', 'dropdownContentR', 'dropdownContent'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  openDropdownId = null;
}
  

//NOTE - Quantity Increment/Decrement Logic
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".DecAdd").forEach(section => {
    const decButton = section.querySelector(".aDec");
    const addButton = section.querySelector(".bAdd");
    const inputField = section.querySelector(".input");

    const priceContainer = section.parentElement.querySelector(".Price span");
    const pricePerItemText = section.parentElement.querySelector(".priceRtext");

    const basePrice = Number(priceContainer.textContent.replace(/[^\d.]/g, "")) || 0;
    const pricePerItem = Number(pricePerItemText.textContent.replace(/[^\d.]/g, "")) || 0;

    const updatePrice = () => {
      const quantity = Math.max(Number(inputField.value) || 0, 0);
      const totalPrice = pricePerItem * quantity;
      priceContainer.textContent = quantity === 0 ? `₱${basePrice.toFixed(2)}` : `₱${totalPrice.toFixed(2)}`;
    };

    const changeQuantity = (delta) => {
      let currentValue = Math.max(Number(inputField.value) || 0, 0);
      currentValue = Math.max(currentValue + delta, 0);
      inputField.value = currentValue;
      updatePrice();
    };

    decButton.addEventListener("click", () => changeQuantity(-1));
    addButton.addEventListener("click", () => changeQuantity(1));
    inputField.addEventListener("input", updatePrice);

    updatePrice();
  });
});

//NOTE - Payment Modal Logic
document.addEventListener("DOMContentLoaded", () => {
  const payBtn = document.querySelector(".payBtn");
  const modal = document.getElementById("modalWrapper");
  const overlay = document.getElementById("modalOverlay");
  const closeModal = document.querySelector(".closeModal");
  const paymentAmount = document.querySelector(".paymentAmount");
  const priceSpan = document.querySelector(".Price span");

  const toggleModal = (show) => {
    modal.style.display = show ? "inline-flex" : "none";
    overlay.style.display = show ? "block" : "none";
  };

  payBtn.addEventListener("click", () => {
    paymentAmount.textContent = `Amount to pay: ${priceSpan.textContent}`;
    toggleModal(true);
  });

  closeModal.addEventListener("click", () => toggleModal(false));
  overlay.addEventListener("click", () => toggleModal(false));
});

function togglePaymentModal() {
  const wrapper = document.getElementById('modalWrapper');
  wrapper.style.display = wrapper.style.display === 'inline-flex' ? 'none' : 'inline-flex';
}

//NOTE - Footer Logic 
document.addEventListener('DOMContentLoaded', () => {
  const contactBtn = document.getElementById('contact-toggle');
  const closeBtn = document.getElementById('close-footer');
  const footer = document.getElementById('main-footer');
  const overlay = document.getElementById('overlay-bg');

  contactBtn.addEventListener('click', () => {
    footer.classList.add('expanded');
    overlay.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    footer.classList.remove('expanded');
    overlay.style.display = 'none';
  });
});
//NOTE - if else logic for the back button
function goBack() {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = 'products.html';
    }
}
    fetch('/get-username')
      .then(response => response.json())
      .then(data => {
        if (data.username) {
          document.getElementById('username').textContent = data.username;
        }
      })
      .catch(err => console.error('Error fetching username:', err));
