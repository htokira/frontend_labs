document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".dropdown");
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener("click", (e) => {
            const isOpen = dropdownMenu.classList.contains("active");
            
            if (!isOpen) {
                e.preventDefault();
                dropdownMenu.classList.add("active");
            }
        });

        document.addEventListener("click", (e) => {
            if(!dropdown.contains(e.target)) {
                dropdownMenu.classList.remove("active");
            }
        });
    }

    const carouselImg = document.querySelector("#carousel-img");
    const prevBtn = document.querySelector("#prev-btn");
    const nextBtn = document.querySelector("#next-btn");

    if(carouselImg && prevBtn && nextBtn) {
        const img = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.png"];
        let currentImg = 0;
        let slideInterval;

        function showImage(index) {
            carouselImg.style.opacity = 0;

            setTimeout(() => {
                currentImg = index;
                carouselImg.src = img[currentImg];

                carouselImg.style.opacity = 1;
            }, 300);
        }

        function startInterval() {
            slideInterval = setInterval(() => {
                let nextIndex = (currentImg + 1) % img.length;
                showImage(nextIndex);
            }, 4000);
        }

        nextBtn.addEventListener("click", () => {
            clearInterval(slideInterval);
            let nextIndex = (currentImg + 1) % img.length;
            showImage(nextIndex);
            startInterval();
        });

        prevBtn.addEventListener("click", () => {
            clearInterval(slideInterval);
            let prevIndex = (currentImg - 1 + img.length) % img.length;
            showImage(prevIndex);
            startInterval();
        });

        startInterval();
    } 

    const searchButton = document.querySelector(".activity-search button");

    if(searchButton) {
        const searchInput = document.querySelector("#activitySearch");
        const activityCards = document.querySelectorAll(".activity-card");
        const searchMessage = document.querySelector("#searchMessage");
        const sectionAct = document.getElementById("activities-section");

        function searchActivity() {
            const query = searchInput.value.trim().toLocaleLowerCase("uk");
            let visibleCount = 0;
            sectionAct.style.display = "block";

            activityCards.forEach((card) => {
                const title = card.querySelector("h3").textContent.trim().toLocaleLowerCase("uk");
                const listItem = card.closest("li");
                const match = title.includes(query);

                listItem.style.display = match ? "" : "none";

                if(match) {
                    visibleCount++;
                }
            });

            if(query == "") {
                searchMessage.textContent = "";
            } else if (visibleCount == 0) {
                searchMessage.textContent = "За вашим запитом нічого не знайдено.";
                sectionAct.style.display = "none";
            } else {
                searchMessage.textContent = `Знайдено напрямів: ${visibleCount}.`;
            }
        }

        searchButton.addEventListener("click", searchActivity);
    }

    const detailsField = document.querySelector("#details");

    if(detailsField) {
        const tooltip = document.querySelector(".details-tooltip");

        function activateDetailsEffect() {
            detailsField.style.backgroundColor = "#f4f6f8";
            detailsField.style.border = "2px solid #39536c";
            detailsField.style.outline = "none";

            tooltip.style.display = "block";
        }

        function deactivateDetailsEffect() {
            detailsField.style.backgroundColor = "";
            detailsField.style.border = "1px solid #cccccc";

            tooltip.style.display = "none";
        }

        detailsField.onmouseenter = activateDetailsEffect;
        detailsField.onmouseleave = deactivateDetailsEffect;
    }

    const nav = document.querySelector("nav");

    if (nav) {
        function adjustNavigation() {
            if(window.innerWidth <= 768) {
                nav.style.flexDirection = "column";
                nav.style.alignItems = "flex-end";
            } else {
                nav.style.flexDirection = "row";
                nav.style.alignItems = "center";
            }
        }

        adjustNavigation();
        window.addEventListener("resize", adjustNavigation);
    }
});