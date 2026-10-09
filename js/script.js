/* =========================
   WHO I AM - MAIN SCRIPT
========================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks =
        document.querySelectorAll(".nav-links a");

    navLinks.forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href || href === "#") {
            return;
        }

        const linkPage = href.split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =========================
       MORE MENU
    ========================= */

    const moreButton =
        document.querySelector(".nav-more-button");

    const moreContainer =
        document.querySelector(".nav-more");

    if (moreButton && moreContainer) {

        moreButton.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            moreContainer.classList.toggle("open");

        });

        document.addEventListener("click", function (event) {

            if (!moreContainer.contains(event.target)) {
                moreContainer.classList.remove("open");
            }

        });

    }


    /* =========================
       SEARCH ELEMENTS
    ========================= */

    const searchButton =
        document.querySelector(".search-button");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const searchClose =
        document.getElementById("searchClose");

    const searchInput =
        document.getElementById("searchInput");

    const searchResults =
        document.getElementById("searchResults");


    /* =========================
       OPEN SEARCH
    ========================= */

    function openSearch() {

        if (!searchOverlay || !searchInput) {
            return;
        }

        searchOverlay.classList.add("open");
        document.body.classList.add("search-open");

        searchInput.focus();

    }


    /* =========================
       CLOSE SEARCH
    ========================= */

    function closeSearch() {

        if (!searchOverlay) {
            return;
        }

        searchOverlay.classList.remove("open");
        document.body.classList.remove("search-open");

    }

    if (searchButton) {
        searchButton.addEventListener("click", openSearch);
    }

    if (searchClose) {
        searchClose.addEventListener("click", closeSearch);
    }

    if (searchOverlay) {

        searchOverlay.addEventListener("click", function (event) {

            if (event.target === searchOverlay) {
                closeSearch();
            }

        });

    }

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeSearch();
        }

    });


    /* =========================
       SEARCH RESULTS
    ========================= */

    function displaySearchResults(query) {

        if (!searchResults) {
            return;
        }

        searchResults.replaceChildren();

        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return;
        }

        if (typeof searchIndex === "undefined") {

            searchResults.textContent =
                "Search is temporarily unavailable.";

            return;

        }

        const matches = searchIndex.filter(function (page) {

            const searchableText = [
                page.title,
                page.description,
                page.keywords
            ].join(" ").toLowerCase();

            return searchableText.includes(normalizedQuery);

        });

        if (matches.length === 0) {

            const emptyMessage = document.createElement("p");

            emptyMessage.className = "search-empty";
            emptyMessage.textContent = "No results found.";

            searchResults.appendChild(emptyMessage);

            return;

        }

        matches.forEach(function (page) {

            const resultLink = document.createElement("a");

            resultLink.className = "search-result";
            resultLink.href = page.url;

            const resultTitle = document.createElement("h3");

            resultTitle.className = "search-result-title";
            resultTitle.textContent = page.title;

            const resultDescription = document.createElement("p");

            resultDescription.className = "search-result-description";
            resultDescription.textContent = page.description;

            resultLink.appendChild(resultTitle);
            resultLink.appendChild(resultDescription);

            searchResults.appendChild(resultLink);

        });

    }

    if (searchInput) {

        searchInput.addEventListener("input", function () {
            displaySearchResults(searchInput.value);
        });

    }

});