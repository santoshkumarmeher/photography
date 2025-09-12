document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar
    fetch("navbar.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("navbar").innerHTML = data;
        });

    // Load Footer
    fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

    const folder = "images/"; // folder path
    const gallery = document.getElementById("gallery");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("closeBtn");

    // Load images.json and render gallery
    fetch("images.json")
        .then(res => res.json())
        .then(images => {
            images.forEach(file => {
                const img = document.createElement("img");
                img.src = folder + file;
                img.alt = file;

                // ✅ Add click handler here (after element exists)
                img.addEventListener("click", () => {
                    lightbox.style.display = "flex";
                    lightboxImg.src = img.src;
                });

                gallery.appendChild(img);
            });
        })
        .catch(err => console.error("Error loading images.json:", err));

    // Close on X button
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Close on clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // Close with ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    });
});
