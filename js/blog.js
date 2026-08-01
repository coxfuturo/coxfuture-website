/**
 * CoxFuture - Blog Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Search Functionality
    const searchInput = document.getElementById('blogSearch');
    const blogCards = document.querySelectorAll('.blog-card-container');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            blogCards.forEach(card => {
                const title = card.querySelector('.blog-card h3').textContent.toLowerCase();
                const category = card.querySelector('.category-tag').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-card p').textContent.toLowerCase();

                if (title.includes(searchTerm) || category.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 2. Category Sidebar Links Filtering
    const categoryLinks = document.querySelectorAll('.category-list a[data-category]');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const selectedCategory = link.getAttribute('data-category');

            if (selectedCategory === 'all') {
                blogCards.forEach(card => card.style.display = 'block');
            } else {
                blogCards.forEach(card => {
                    const cardCategory = card.querySelector('.category-tag').getAttribute('data-category-slug');
                    if (cardCategory === selectedCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });

    // 3. Category Grid Cards Filtering
    const categoryGridCards = document.querySelectorAll('.category-card[data-category-filter]');
    categoryGridCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const filterSlug = card.getAttribute('data-category-filter');
            const targetSidebarLink = document.querySelector(`.category-list a[data-category="${filterSlug}"]`);
            if (targetSidebarLink) {
                targetSidebarLink.click();
            } else {
                blogCards.forEach(c => {
                    const cardCategory = c.querySelector('.category-tag').getAttribute('data-category-slug');
                    if (cardCategory === filterSlug) {
                        c.style.display = 'block';
                    } else {
                        c.style.display = 'none';
                    }
                });
            }
        });
    });

    // 4. Table of Contents Scroll Spy (for blog-details.html)
    const tocLinks = document.querySelectorAll('.toc-widget a');
    const sections = Array.from(document.querySelectorAll('.article-body h2, .article-body h3'));

    if (tocLinks.length > 0 && sections.length > 0) {
        sections.forEach((sec, idx) => {
            if (!sec.id) {
                const text = sec.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
                sec.id = text || `section-${idx}`;
            }
        });

        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetEl = document.getElementById(targetId);

                if (targetEl) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetEl.offsetTop - 120,
                        behavior: 'smooth'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(sec => {
                const sectionTop = sec.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = sec.getAttribute('id');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // 5. Copy Link to Clipboard
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href).then(() => {
                const originalHTML = copyLinkBtn.innerHTML;
                copyLinkBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyLinkBtn.style.color = 'var(--accent-color)';
                copyLinkBtn.style.borderColor = 'var(--accent-color)';

                setTimeout(() => {
                    copyLinkBtn.innerHTML = originalHTML;
                    copyLinkBtn.style.color = '';
                    copyLinkBtn.style.borderColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
});
