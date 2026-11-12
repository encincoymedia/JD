const filters = [...document.querySelectorAll(".filter")];
const projects = [...document.querySelectorAll(".project")];
const visibleCount = document.querySelector("#visible-count");
const viewer = document.querySelector("#viewer");
const viewerMedia = document.querySelector("#viewer-media");
const viewerTitle = document.querySelector("#viewer-title");
const viewerDescription = document.querySelector("#viewer-description");
const viewerClose = document.querySelector(".viewer-close");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filters.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    let count = 0;
    projects.forEach((project) => {
      const categories = project.dataset.category.split(" ");
      const isVisible = selected === "all" || categories.includes(selected);
      project.classList.toggle("is-hidden", !isVisible);
      if (isVisible) count += 1;
    });
    visibleCount.textContent = count;
  });
});

document.querySelectorAll("[data-kind][data-src]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const { kind, src, title, copy } = trigger.dataset;
    const media = document.createElement(kind === "video" ? "video" : "img");

    media.src = src;
    if (kind === "video") {
      media.controls = true;
      media.autoplay = true;
      media.playsInline = true;
    } else {
      media.alt = title;
    }

    viewerMedia.replaceChildren(media);
    viewerTitle.textContent = title;
    viewerDescription.textContent = copy;
    viewer.showModal();
  });
});

function closeViewer() {
  const video = viewerMedia.querySelector("video");
  if (video) video.pause();
  viewer.close();
  viewerMedia.replaceChildren();
}

viewerClose.addEventListener("click", closeViewer);

viewer.addEventListener("click", (event) => {
  if (event.target === viewer) closeViewer();
});

viewer.addEventListener("close", () => {
  viewerMedia.replaceChildren();
});

document.querySelector("#year").textContent = new Date().getFullYear();
