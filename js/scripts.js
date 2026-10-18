window.addEventListener('DOMContentLoaded', event => {
    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav && typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    fetch('json/blog.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load blog.json: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            blogJson = data;
            renderBlogCards(data);
        })
        .catch(error => {
            console.error('Error loading blog data:', error);
            const loadingMessage = document.querySelector(".portfolio-loading");
            if (loadingMessage) {
                loadingMessage.textContent = "Blogbeiträge konnten nicht geladen werden.";
            }
            const allPortfolioLoadingMessage = document.querySelector(".all-portfolio-loading");
            if (allPortfolioLoadingMessage) {
                allPortfolioLoadingMessage.textContent = "Blogbeiträge konnten nicht geladen werden.";
            }
        });

    document.getElementById("year").innerHTML = String(new Date().getFullYear());

});
