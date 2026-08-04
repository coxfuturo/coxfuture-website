/**
 * CoxFuture Technologies - Blog & Blog Details Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initSearchAndFilter();
    initCategoryCards();
    initTableOfContents();
    initShareButtons();
    initNewsletterForm();
});

/**
 * Real-time Search and Category Filtering
 */
function initSearchAndFilter() {
    const searchInput = document.getElementById('blogSearchInput');
    const filterPills = document.querySelectorAll('.filter-pill');
    const blogCards = document.querySelectorAll('.latest-articles-section .blog-card-wrapper, .blog-row > div');
    const noResultsMsg = document.getElementById('noResultsMessage');

    if (!blogCards.length) return;

    let currentCategory = 'all';
    let currentSearchQuery = '';

    function filterGrid() {
        let visibleCount = 0;

        blogCards.forEach(cardWrapper => {
            const card = cardWrapper.classList.contains('blog-card') ? cardWrapper : cardWrapper.querySelector('.blog-card');
            if (!card) return;

            const title = (card.querySelector('h3, h4')?.textContent || '').toLowerCase();
            const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
            const category = (card.querySelector('.category-tag')?.getAttribute('data-category-slug') || card.querySelector('.category-tag')?.textContent || '').toLowerCase();

            const matchesCategory = (currentCategory === 'all') || 
                                    (category.includes(currentCategory.toLowerCase())) || 
                                    (currentCategory === 'latest' && visibleCount < 6) ||
                                    (currentCategory === 'popular' && cardWrapper.dataset.popular === 'true');

            const matchesSearch = title.includes(currentSearchQuery) || desc.includes(currentSearchQuery);

            if (matchesCategory && matchesSearch) {
                cardWrapper.style.display = 'block';
                visibleCount++;
            } else {
                cardWrapper.style.display = 'none';
            }
        });

        if (noResultsMsg) {
            noResultsMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.trim().toLowerCase();
            filterGrid();
        });
    }

    if (filterPills.length) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                e.preventDefault();
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentCategory = pill.getAttribute('data-category') || 'all';
                filterGrid();
            });
        });
    }
}

/**
 * Category Card Clicks on main blog page
 */
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    const filterPills = document.querySelectorAll('.filter-pill');

    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const categoryFilter = card.getAttribute('data-category-filter');
            if (!categoryFilter) return;

            const targetPill = Array.from(filterPills).find(pill => pill.getAttribute('data-category') === categoryFilter);
            if (targetPill) {
                targetPill.click();
                const articlesSection = document.getElementById('latest-articles');
                if (articlesSection) {
                    articlesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Table of Contents (TOC) for blog-details.html
 */
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    const articleHeadings = document.querySelectorAll('.article-body h2, .article-body h3');

    if (!tocLinks.length || !articleHeadings.length) return;

    // Smooth scroll
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ScrollSpy active link update
    window.addEventListener('scroll', () => {
        let currentActiveId = '';
        articleHeadings.forEach(heading => {
            const headingTop = heading.getBoundingClientRect().top;
            if (headingTop <= 140) {
                currentActiveId = heading.id;
            }
        });

        if (currentActiveId) {
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentActiveId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/**
 * Share Buttons Feedback (Copy link to clipboard)
 */
function initShareButtons() {
    const copyBtn = document.getElementById('copyArticleLinkBtn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href).then(() => {
            const originalTitle = copyBtn.getAttribute('title');
            copyBtn.setAttribute('title', 'Copied!');
            copyBtn.style.background = '#10b981';
            copyBtn.style.color = '#ffffff';

            setTimeout(() => {
                copyBtn.setAttribute('title', originalTitle);
                copyBtn.style.background = '';
                copyBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy link: ', err);
        });
    });
}

/**
 * Newsletter Form Interactive Feedback
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
            alert(`Thank you for subscribing to CoxFuture Insights! We've registered ${input.value}.`);
            input.value = '';
        }
    });
}
