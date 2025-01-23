// Données des projets
const projects = [
    {
        id: 2,
        title: "Site E-commerce",
        category: "web",
        image: "image/projects/ecommerce.jpg",
        description: "Interface utilisateur pour une boutique en ligne",
        link: "https://ecomdemowebsite.netlify.app/"
    },
    {
        id: 3,
        title: "Site Vitrine Architecte",
        category: "brand",
        image: "image/projects/startup-brand.jpg",
        description: "Création de l'identité visuelle complète",
        link: "https://atelierdesign.netlify.app/"
    },
    {
        id: 5,
        title: "Portfolio d'artiste",
        category: "web",
        image: "image/projects/artist-portfolio.jpg",
        description: "Site web responsive pour artiste",
        link: "https://portfoliophotography.netlify.app/",
    },
    {
        id: 6,
        title: "Branding Restaurant",
        category: "brand",
        image: "image/projects/restaurant-brand.jpg",
        description: "Design de restaurant de burger premium",
        link: "https://transcendent-kelpie-bc6237.netlify.app/"
    }
];

// Gestion du header au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Gestion du menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Fermer le menu quand on clique sur un lien
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Gestion des liens actifs
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Filtrage des projets
const filterButtons = document.querySelectorAll('.filter-btn');
const projectsGrid = document.querySelector('.projects-grid');

// Fonction pour afficher les projets
function displayProjects(category) {
    const currentLang = document.documentElement.lang;
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" class="project-link" target="_blank" data-i18n="viewProject">
                        ${translations[currentLang].viewProject}
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Écouteurs d'événements pour les filtres
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayProjects(button.dataset.filter);
    });
});

// Afficher tous les projets au chargement
displayProjects('all');

// Animation au défilement
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Configuration EmailJS
(function() {
    emailjs.init("VOTRE_CLE_PUBLIQUE"); // Remplacez par votre clé publique EmailJS
})();

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    console.log('Form found:', contactForm); // Debug
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted'); // Debug
            
            // Récupération des données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            console.log('Form data:', formData); // Debug

            // Stockage des données pour la page de confirmation
            localStorage.setItem('contactFormData', JSON.stringify(formData));
            
            // Redirection
            window.location.href = 'confirmation.html';
        });
    }
});

// Gestion du bouton retour en haut
const backToTop = document.getElementById('backToTop');

// Afficher/masquer le bouton en fonction du scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Action de retour en haut
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fonction pour retour à la page précédente
function goBack() {
    window.history.back();
}

// Gestion du changement de langue
document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    
    // Charger la langue sauvegardée ou utiliser le français par défaut
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
    languageSelect.value = savedLanguage;
    updateLanguage(savedLanguage);

    // Écouteur d'événement pour le changement de langue
    languageSelect.addEventListener('change', function(e) {
        const selectedLanguage = e.target.value;
        updateLanguage(selectedLanguage);
        localStorage.setItem('selectedLanguage', selectedLanguage);
    });
});

function updateLanguage(language) {
    // Mise à jour de l'attribut lang de la page
    document.documentElement.lang = language;

    // Mise à jour du texte normal
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    // Mise à jour des placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[language] && translations[language][key]) {
            element.placeholder = translations[language][key];
        }
    });

    // Mise à jour du contenu HTML
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        if (translations[language] && translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });

    // Mise à jour des projets
    displayProjects(document.querySelector('.filter-btn.active').dataset.filter);
}

// Gestion du carrousel de témoignages
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 32; // Largeur + gap
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = cards.length - Math.floor(slider.offsetWidth / cards[0].offsetWidth);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Mise à jour lors du redimensionnement
    window.addEventListener('resize', updateSlider);
});

// Menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    // Toggle menu when clicking hamburger
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});