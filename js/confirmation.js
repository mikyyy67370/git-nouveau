document.addEventListener('DOMContentLoaded', function() {
    // Récupération des données du formulaire
    const formData = JSON.parse(localStorage.getItem('contactFormData'));
    
    if (formData) {
        // Affichage du nom
        document.getElementById('userName').textContent = formData.name;
        
        // Affichage du message
        document.getElementById('messagePreview').textContent = formData.message;
        
        // Nettoyage du localStorage
        localStorage.removeItem('contactFormData');
    } else {
        // Redirection si pas de données
        window.location.href = 'index.html#contact';
    }
});

// Fonction pour retour à la page précédente
function goBack() {
    window.history.back();
} 