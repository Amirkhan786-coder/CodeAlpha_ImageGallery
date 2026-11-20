
const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const imageCount = document.getElementById("imageCount");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Gallery image data
const images = [
    {
        title: "Mountain Adventure",
        category: "nature",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900"
    },
    {
        title: "Beautiful Forest",
        category: "nature",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900"
    },
    {
        title: "Ocean Waves",
        category: "nature",
        url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900"
    },
    {
        title: "Modern Architecture",
        category: "architecture",
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900"
    },
    {
        title: "City Building",
        category: "architecture",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900"
    },
    {
        title: "Urban Design",
        category: "architecture",
        url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900"
    },
    {
        title: "Wild Tiger",
        category: "animals",
        url: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=900"
    },
    {
        title: "Beautiful Elephant",
        category: "animals",
        url: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=900"
    },
    {
        title: "Wildlife Beauty",
        category: "animals",
        url: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=900"
    },
    {
        title: "Travel Destination",
        category: "travel",
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900"
    },
    {
        title: "Beautiful Island",
        category: "travel",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900"
    },
    {
        title: "Mountain Journey",
        category: "travel",
        url: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=900"
    }
];

let filteredImages = [...images];
let currentIndex = 0;

// Display images
function displayImages(imageArray) {

    galleryGrid.innerHTML = "";

    imageCount.textContent =
        `${imageArray.length} Photos`;

    imageArray.forEach((image, index) => {

        const card = document.createElement("div");

        card.className = "gallery-item";

        card.innerHTML = `
            <img
                src="${image.url}"
                alt="${image.title}"
                loading="lazy"
            >

            <div class="gallery-overlay">
                <h3>${image.title}</h3>
                <p>${image.category}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            openLightbox(index);
        });

        galleryGrid.appendChild(card);
    });
}

// Category filter
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "all") {
            filteredImages = [...images];
        } else {
            filteredImages = images.filter(image =>
                image.category === category
            );
        }

        displayImages(filteredImages);
    });

});

// Open lightbox
function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}

// Update lightbox content
function updateLightbox() {

    const image = filteredImages[currentIndex];

    lightboxImage.src = image.url;
    lightboxImage.alt = image.title;

    lightboxTitle.textContent = image.title;

    lightboxCategory.textContent =
        image.category.toUpperCase();
}

// Close lightbox
function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}

// Next image
function nextImage() {

    currentIndex++;

    if (currentIndex >= filteredImages.length) {
        currentIndex = 0;
    }

    updateLightbox();
}

// Previous image
function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = filteredImages.length - 1;
    }

    updateLightbox();
}

// Button events
closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", previousImage);

// Keyboard navigation
document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

});

// Close when clicking outside image
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

// Initial gallery display
displayImages(images);
