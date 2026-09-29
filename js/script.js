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

        const href =
            link.getAttribute("href");

        if (!href || href === "#") {
            return;
        }

        const linkPage =
            href.split("/").pop();

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

});