const productCategories = {
    "producto.png": ["Hombre"],
    "producto2.png": ["Hombre", "Deportivo"],
    "producto3.png": ["Mujer"],
    "producto4.png": ["Mujer", "Casual"],
    "producto5.png": ["Hombre", "Deportivo"],
    "producto6.png": ["Hombre"],
    "producto7.png": ["Hombre"],
    "producto8.png": ["Mujer", "Deportivo"],
};

function assignCategoryAttributes() {
    document.querySelectorAll(".product-card").forEach((card) => {
        const src = card.querySelector(".product-img img")?.getAttribute("src") || "";
        const filename = src.split("/").pop();
        const cats = productCategories[filename] || [];

        card.setAttribute("data-categories", cats.join(","));
    });
}

function filterProducts(category) {
    const cards = document.querySelectorAll(".product-card");
    const grid = document.querySelector(".products-grid");
    let visibleCount = 0;

    const prev = document.querySelector(".no-results");
    if (prev) prev.remove();

    cards.forEach((card) => {
        const cats = card.getAttribute("data-categories") || "";
        const show = category === "Todos" || cats.split(",").includes(category);

        if (show) {
            card.classList.remove("hidden");
            card.style.animation = "none";
            void card.offsetWidth;
            card.style.animation = "";
            visibleCount++;
        } else {
            card.classList.add("hidden");
        }
    });

    if (visibleCount === 0) {
        const msg = document.createElement("p");
        msg.className = "no-results";
        msg.textContent = `No hay productos disponibles en la categoría "${category}".`;
        grid.appendChild(msg);
    }
}

function initFilterButtons() {
    const filterBtns = document.querySelectorAll(".filter-btn");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            filterProducts(btn.textContent.trim());
        });
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector("#navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}

function initHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        navLinks.classList.toggle("open");
    });

    // Cerrar al hacer clic en cualquier enlace del menú
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            navLinks.classList.remove("open");
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    assignCategoryAttributes(); // 1. Asignar categorías a las cards
    initFilterButtons();        // 2. Activar filtros
    initNavbarScroll();         // 3. Navbar con scroll
    initHamburgerMenu();        // 4. Menú móvil
});
