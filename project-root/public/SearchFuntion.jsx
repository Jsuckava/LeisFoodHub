document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search");
  const dropdown = document.getElementById("dropdownContent");
  const listItems = Array.from(dropdown.querySelectorAll("li"));
  let activeIndex = -1;

  const normalize = str =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  const toggleDropdown = (show) => {
    dropdown.style.display = show ? "block" : "none";
  };

  const handleInput = () => {
    const filter = normalize(input.value);
    let hasMatch = false;
    activeIndex = -1;

    listItems.forEach(item => {
      const match = normalize(item.textContent).startsWith(filter);
      item.style.display = match ? "" : "none";
      item.classList.remove("active");
      hasMatch ||= match;
    });

    toggleDropdown(filter && hasMatch);
  };

  const handleKeydown = (e) => {
    const visibleItems = listItems.filter(i => i.style.display !== "none");

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (visibleItems.length) {
        activeIndex = (activeIndex + (e.key === "ArrowDown" ? 1 : -1) + visibleItems.length) % visibleItems.length;
        updateActiveItem(visibleItems);
      }
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const selectedItem = visibleItems[activeIndex];
      input.value = selectedItem.textContent;  

      const redirectUrl = selectedItem.querySelector('a')?.getAttribute('data-url');
      if (redirectUrl) {
        window.location.href = redirectUrl;  
      }

      toggleDropdown(false);
    }
  };

  const updateActiveItem = (visibleItems) => {
    visibleItems.forEach(item => item.classList.remove("active"));
    visibleItems[activeIndex].classList.add("active");
  };

  listItems.forEach(item => {
    item.addEventListener("mouseover", () => {
      listItems.forEach(li => li.classList.remove("active"));
      item.classList.add("active");
      activeIndex = listItems.indexOf(item);
    });

    item.addEventListener("click", () => {
      input.value = item.textContent;  
      const redirectUrl = item.querySelector('a')?.getAttribute('data-url');
      if (redirectUrl) {
        window.location.href = redirectUrl;  
      }
      toggleDropdown(false);  
    });
  });

  input.addEventListener("input", handleInput);
  input.addEventListener("keydown", handleKeydown);

  window.addEventListener("click", (event) => {
    if (!input.contains(event.target) || !dropdown.contains(event.target)) {
      toggleDropdown(false);
    }
  });
});
