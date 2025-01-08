// Données des témoignages
const testimonials = [
    {
        name: "Sophie Martin",
        company: "Tech Solutions",
        text: "Un travail exceptionnel ! Le design est moderne et l'expérience utilisateur est parfaitement pensée.",
        rating: 5,
        image: "assets/images/testimonials/client1.jpg"
    },
    // Ajoutez d'autres témoignages...
];

// Afficher les témoignages
function displayTestimonials() {
    const grid = document.querySelector('.testimonials-grid');
    grid.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-header">
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <div class="testimonial-info">
                    <h3>${testimonial.name}</h3>
                    <p>${testimonial.company}</p>
                </div>
            </div>
            <div class="testimonial-content">
                <p>${testimonial.text}</p>
                <div class="rating">
                    ${generateStars(testimonial.rating)}
                </div>
            </div>
        </div>
    `).join('');
}

// Gérer le modal
const modal = document.getElementById('testimonialModal');
const addButton = document.getElementById('addTestimonial');
const closeButton = document.querySelector('.close');

addButton.onclick = () => modal.style.display = "block";
closeButton.onclick = () => modal.style.display = "none";

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayTestimonials();
}); 