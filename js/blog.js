let blogJson = null;
let currentBlogName;
let currentBlogTitle;
let currentBlogDescription;
let currentBlogDate;
let currentBlogImages;
let currentImageIndex;

function renderBlogCards(blogData) {
    const portfolioItems = document.getElementById("portfolio-items");
    const moreCard = portfolioItems.querySelector(".portfolio-more").closest(".col-lg-4");
    portfolioItems.querySelector(".portfolio-loading").remove();

    const entries = Object.entries(blogData);
    entries.slice(0, 5).forEach(([blogName, blog]) => {
        portfolioItems.insertBefore(createPortfolioCard(blogName, blog), moreCard);
    });

    const allPortfolioItems = document.getElementById("all-portfolio-items");
    allPortfolioItems.querySelector(".all-portfolio-loading").remove();
    entries.forEach(([blogName, blog]) => {
        allPortfolioItems.append(createPortfolioCard(blogName, blog, true));
    });

    const allProjectsModal = document.getElementById("allPortfolioModal");
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && allProjectsModal.classList.contains("show")) {
            const detailView = document.getElementById("all-project-detail-view");
            if (!detailView.classList.contains("d-none")) {
                showAllProjectsList();
            } else {
                bootstrap.Modal.getOrCreateInstance(allProjectsModal).hide();
            }
        }
    });
    allProjectsModal.addEventListener("hidden.bs.modal", showAllProjectsList);
}

function createPortfolioCard(blogName, blog, fromAllProjectsModal = false) {
    const column = document.createElement("div");
    column.className = "col-lg-4 col-sm-6 mb-4";

    const item = document.createElement("div");
    item.className = "portfolio-item";

    const link = document.createElement("a");
    link.className = "portfolio-link";
    link.href = "#portfolioModal";
    link.setAttribute("aria-label", blog.title);
    if (!fromAllProjectsModal) {
        link.dataset.bsToggle = "modal";
    } else {
        link.addEventListener("click", event => {
            event.preventDefault();
            onBlogClick(blogName);
            document.getElementById("all-project-list-view").classList.add("d-none");
            document.getElementById("all-project-detail-view").classList.remove("d-none");
        });
    }
    if (!fromAllProjectsModal) {
        link.addEventListener("click", () => onBlogClick(blogName));
    }

    const hover = document.createElement("div");
    hover.className = "portfolio-hover";
    const hoverContent = document.createElement("div");
    hoverContent.className = "portfolio-hover-content";
    const icon = document.createElement("i");
    icon.className = "fas fa-plus fa-3x";
    hoverContent.append(icon);
    hover.append(hoverContent);

    const image = document.createElement("img");
    image.className = "img-fluid";
    image.src = blog.images[0];
    image.alt = blog.title;
    link.append(hover, image);

    const caption = document.createElement("div");
    caption.className = "portfolio-caption";
    const heading = document.createElement("div");
    heading.className = "portfolio-caption-heading";
    heading.textContent = blog.title;
    caption.append(heading);

    item.append(link, caption);
    column.append(item);
    return column;
}

function showAllProjectsList() {
    document.getElementById("all-project-detail-view").classList.add("d-none");
    document.getElementById("all-project-list-view").classList.remove("d-none");
}

function closeAllProjectsModal() {
    const detailView = document.getElementById("all-project-detail-view");
    if (!detailView.classList.contains("d-none")) {
        showAllProjectsList();
        return;
    }

    bootstrap.Modal.getOrCreateInstance(document.getElementById("allPortfolioModal")).hide();
}

function onBlogClick(blogName) {
    if (blogJson === null) return;

    const jsonData = blogJson[blogName]
    if (jsonData !== undefined) {
        currentBlogName = blogName;
        currentBlogTitle = jsonData["title"];
        currentBlogDescription = jsonData["description"];
        currentBlogDate = jsonData["date"];
        currentBlogImages = jsonData["images"];

        changeBlogContent();
    }
}

function changeBlogContent() {
    currentImageIndex = 0;
    //const languageSelect = document.getElementById("language-select");
    //const language = languageSelect.value;
    //const currentBlogContent = translations["blogs"][currentBlogName];

    //document.getElementById("blog-modal-type").textContent = currentBlogContent["type"][language];
    document.getElementById("blog-modal-title").textContent = currentBlogTitle;
    document.getElementById("blog-modal-description").textContent = currentBlogDescription;
    document.getElementById("blog-modal-date").textContent = currentBlogDate;
    document.getElementById("all-project-title").textContent = currentBlogTitle;
    document.getElementById("all-project-description").textContent = currentBlogDescription;
    document.getElementById("all-project-date").textContent = currentBlogDate;

    showImage();
}

function showPrevBlogImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = currentBlogImages.length - 1;
    }

    showImage();
}

function showNextBlogImage() {
    currentImageIndex++;
    if (currentImageIndex >= currentBlogImages.length) {
        currentImageIndex = 0;
    }

    showImage();
}

function showImage() {
    document.getElementById("blog-modal-image").src = currentBlogImages[currentImageIndex];
    document.getElementById("blog-modal-image").alt = currentBlogTitle;
    document.getElementById("all-project-image").src = currentBlogImages[currentImageIndex];
    document.getElementById("all-project-image").alt = currentBlogTitle;
    document.getElementById("image-number").textContent = (currentImageIndex + 1) + " / " + currentBlogImages.length;
    document.getElementById("all-project-image-number").textContent = (currentImageIndex + 1) + " / " + currentBlogImages.length;
}

function onBlogClose() {
    currentBlogName = null;
    currentBlogImages = null;
    currentImageIndex = 0;
}
