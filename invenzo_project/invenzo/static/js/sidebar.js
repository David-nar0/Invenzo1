// sidebar.js — versión robusta
if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
    lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const closeWrapper = document.querySelector(".close-sidebar");

    if (sidebar && !sidebar.classList.contains("active")) {
        sidebar.classList.add("active");
    }

    const toggleSidebar = () => {
        if (!sidebar) return;
        sidebar.classList.toggle("active");
        // also toggle a class on main-content for desktop margin control
        document.querySelector(".main-content").classList.toggle("sidebar-active", sidebar.classList.contains("active"));
    };

    document.addEventListener("click", (e) => {
        // if clicked the menu-toggle icon (the <i> or svg)
        const clickedToggle =
            e.target.closest('.menu-toggle') ||
            e.target.closest('[data-lucide="skip-forward"]') ||
            e.target.closest('.lucide-skip-forward') ||
            e.target.closest('svg[data-lucide="skip-forward"]');

        if (clickedToggle) {
            toggleSidebar();
            return;
        }

        // If click outside sidebar on mobile, close it
        if (window.innerWidth <= 850 && sidebar && !sidebar.contains(e.target) && !e.target.closest('label[for^="modal-"]')) {
            sidebar.classList.remove("active");
            document.querySelector(".main-content").classList.remove("sidebar-active");
        }
    });

    if (closeWrapper) {
        closeWrapper.addEventListener("click", (e) => {
            if (sidebar) sidebar.classList.remove("active");
            document.querySelector(".main-content").classList.remove("sidebar-active");
            e.stopPropagation();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && window.innerWidth <= 850 && sidebar) {
            sidebar.classList.remove("active");
            document.querySelector(".main-content").classList.remove("sidebar-active");
        }
    });
});
