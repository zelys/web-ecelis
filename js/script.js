// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const body = document.body;

function toggleTheme() {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);

  // Update icons
  const moonIcon = "fas fa-moon";
  const sunIcon = "fas fa-sun";
  const themeIcons = document.querySelectorAll(".theme-toggle i");

  themeIcons.forEach((icon) => {
    icon.className = newTheme === "dark" ? sunIcon : moonIcon;
  });
}

themeToggle.addEventListener("click", toggleTheme);
themeToggleMobile.addEventListener("click", toggleTheme);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar Background on Scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark"
        ? "rgba(31, 41, 55, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background =
      body.getAttribute("data-theme") === "dark"
        ? "rgba(31, 41, 55, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
  }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form Submission
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("¡Gracias por tu mensaje! Te contactaré pronto.");
        form.reset();
      } else {
        alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
      }
    })
    .catch(() => {
      alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
    });
});

// Animation on Scroll (Simple)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe cards for animation
document
  .querySelectorAll(".education-card, .project-card, .tech-grid")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

// Mostrar proyecto de GitHub dinámicamente
const repos = ["analisis-evasion", "sistema-medico"];

const githubUser = "zelys";
const container = document.getElementById("github-projects");
container.innerHTML = ""; // Limpia el contenedor

repos.forEach((repoName) => {
  fetch(`https://api.github.com/repos/${githubUser}/${repoName}`)
    .then((res) => res.json())
    .then((repo) => {
      container.innerHTML += `
        <div class="project-card">
          <div class="project-header">
            <i class="fab fa-github project-icon"></i>
            <a href="${repo.html_url}" target="_blank" class="project-title">
              ${repo.name}
            </a>
          </div>
          <p class="project-description">${
            repo.description || "Sin descripción."
          }</p>
          <div class="project-footer">
            <div class="project-tags">
              <span class="tech-tag">${repo.language || "Lenguaje N/A"}</span>
            </div>
            <div class="project-stats">
              <span title="Estrellas"><i class="fas fa-star"></i> ${
                repo.stargazers_count
              }</span>
              <span title="Forks"><i class="fas fa-code-branch"></i> ${
                repo.forks_count
              }</span>
              <span title="Actualizado"><i class="fas fa-clock"></i> ${new Date(
                repo.updated_at
              ).toLocaleDateString()}</span>
            </div>
            <a href="${
              repo.html_url
            }" target="_blank" class="btn btn-secondary">
              <i class="fab fa-github"></i> Ver en GitHub
            </a>
          </div>
        </div>
      `;
    });
});
