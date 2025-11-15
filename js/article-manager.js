// Article Manager for WELL WELL WELL Website
// Handles article loading, filtering, and interactions

(function() {
    'use strict';

    // Article database - maps article IDs to content
    const articles = {
        1: {
            id: 1,
            title: "BREAKING: India Discovers Showers, Locals Refuses To Use Them",
            category: "Asia",
            excerpt: "In a groundbreaking discovery that has shocked the international community, advanced water-dispensing technology known as 'showers' has been introduced to India...",
            content: "Full article content here... This is satire.",
            image: "article1.jpg"
        },
        2: {
            id: 2,
            title: "EXCLUSIVE: Israel Threatens To Bomb Hospital If $WELLWELL News Doesn't Close",
            category: "Middle East",
            excerpt: "In an unprecedented escalation, sources report threats against satirical news outlet...",
            content: "Full article content here... This is satire.",
            image: "article2.jpg"
        },
        3: {
            id: 3,
            title: "URGENT: Women still Can't Drive",
            category: "Middle East",
            excerpt: "Despite reforms, reports continue to emerge...",
            content: "Full article content here... This is satire.",
            image: "article3.jpg"
        },
        4: {
            id: 4,
            title: "ALERT: Neighbors accuse Local Chinese Of Serving Their Pet Dog",
            category: "Asia",
            excerpt: "Community tensions rise as controversial accusations surface...",
            content: "Full article content here... This is satire.",
            image: "article4.jpg"
        },
        5: {
            id: 5,
            title: "FLASH: North Korea Blames CZ for trenches Dying",
            category: "Asia",
            excerpt: "In a bizarre turn of events, North Korean state media has issued statement...",
            content: "Full article content here... This is satire.",
            image: "article5.jpg"
        }
    };

    // Open article function - called from ticker and article cards
    window.openArticle = function(articleId) {
        const article = articles[articleId];

        if (!article) {
            console.warn('Article not found:', articleId);
            return;
        }

        // For now, just show an alert with the article title
        // In a full implementation, this would open a modal or navigate to article page
        alert('Opening Article:\n\n' + article.title + '\n\n' + article.excerpt + '\n\n[This is satire content - full article coming soon]');

        // Optional: Play the "well well well" sound
        if (typeof playSound === 'function') {
            playSound();
        }
    };

    // Load articles into the articles section
    function loadArticlesGrid() {
        const articlesSection = document.querySelector('#articles .articles-grid');
        if (!articlesSection) return;

        // Clear existing content
        articlesSection.innerHTML = '';

        // Create article cards
        Object.values(articles).forEach(article => {
            const card = createArticleCard(article);
            articlesSection.appendChild(card);
        });
    }

    // Create an article card element
    function createArticleCard(article) {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.onclick = () => {
            openArticle(article.id);
            if (typeof playSound === 'function') {
                playSound();
            }
        };

        card.innerHTML = `
            <div class="article-image">
                <img src="images/${article.image}" alt="${article.title}"
                     onerror="this.parentElement.innerHTML='📰'; this.parentElement.style.background='linear-gradient(135deg, #4ECDC4, #FF6B6B)'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center'; this.parentElement.style.fontSize='60px';">
            </div>
            <div class="article-content">
                <span class="article-category">${article.category}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
            </div>
        `;

        return card;
    }

    // Initialize when DOM is ready
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadArticlesGrid);
        } else {
            loadArticlesGrid();
        }
    }

    // Start initialization
    init();

    // Expose API for external use
    window.ArticleManager = {
        articles: articles,
        openArticle: openArticle,
        reload: loadArticlesGrid
    };

})();
