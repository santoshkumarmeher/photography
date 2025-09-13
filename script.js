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


  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("closeBtn");
  const gallery = document.getElementById("gallery");
  const pagination = document.getElementById("pagination");

  const perPage = 50;   // ✅ number of images per page
  let currentPage = 1;
  let allImages = [];

  // Load images.json
  fetch("images.json")
    .then(res => res.json())
    .then(images => {
      allImages = images;
      renderGallery();
      renderPagination();
    })
    .catch(err => console.error("Error loading images.json:", err));

  function renderGallery() {
    gallery.innerHTML = ""; // Clear old content
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageImages = allImages.slice(start, end);

    pageImages.forEach(file => {
      const img = document.createElement("img");
      img.src = folder + file;  // Make sure `folder` is defined
      img.alt = file;

      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
      });

      gallery.appendChild(img);
    });
  }

  function renderPagination() {
    pagination.innerHTML = ""; // Clear old controls
    const totalPages = Math.ceil(allImages.length / perPage);

    // Prev button
    if (currentPage > 1) {
      const prev = document.createElement("button");
      prev.textContent = "Prev";
      prev.addEventListener("click", () => {
        currentPage--;
        renderGallery();
        renderPagination();
      });
      pagination.appendChild(prev);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.disabled = true;
      btn.addEventListener("click", () => {
        currentPage = i;
        renderGallery();
        renderPagination();
      });
      pagination.appendChild(btn);
    }

    // Next button
    if (currentPage < totalPages) {
      const next = document.createElement("button");
      next.textContent = "Next";
      next.addEventListener("click", () => {
        currentPage++;
        renderGallery();
        renderPagination();
      });
      pagination.appendChild(next);
    }
  }

  // Close lightbox
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
