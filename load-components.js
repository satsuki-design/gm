// Load footer component
document.addEventListener('DOMContentLoaded', function() {
    // Create footer container if it doesn't exist
    if (!document.querySelector('footer')) {
        const footerContainer = document.createElement('footer');
        footerContainer.id = 'footer-container';
        document.body.appendChild(footerContainer);
    }
    
    // Load footer content
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});
