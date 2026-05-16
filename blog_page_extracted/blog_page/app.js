// CYZEN Blog Application Logic

document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    // Initialize currentBlogs directly from window.cyzenBlogs
    let allBlogs = window.cyzenBlogs || [];
    let activeFilter = 'all';
    let searchQuery = '';

    // --- DOM Elements ---
    const blogGrid = document.getElementById('blogGrid');
    const categoriesGrid = document.getElementById('categoriesGrid');
    const featuredGrid = document.getElementById('featuredGrid');
    const filterBar = document.getElementById('filterBar');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    
    // Write Modal Elements
    const writeModalOverlay = document.getElementById('writeModalOverlay');
    const writeModalClose = document.getElementById('writeModalClose');
    const openWriteModalBtn = document.getElementById('openWriteModalBtn');
    const writeBlogForm = document.getElementById('writeBlogForm');
    const blogCategorySelect = document.getElementById('blogCategory');
    
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const toast = document.getElementById('toast');

    // --- Initialization ---
    // Wait a tiny bit to ensure all scripts are executed if needed
    setTimeout(init, 100);

    // ==========================================
    // BACKEND INTEGRATION HOOKS (SUPABASE)
    // ==========================================
    // TEAMMATE INSTRUCTIONS:
    // To connect this to Supabase, you only need to modify the two functions below:
    // 1. fetchExternalBlogs(): Replace the localStorage read with a Supabase SELECT query.
    // 2. saveExternalBlog(): Replace the localStorage write with a Supabase INSERT query.
    // You'll also want to update the 'author' field in the form submission to use Supabase Auth user.

    async function fetchExternalBlogs() {
        /*
        // SUPABASE IMPLEMENTATION EXAMPLE:
        // const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        // if (error) {
        //     console.error(error);
        //     return [];
        // }
        // return data || [];
        */
        
        // CURRENT LOCAL IMPLEMENTATION (Replace this block with Supabase code above):
        let localBlogs = [];
        try {
            const stored = localStorage.getItem('cyzen_user_blogs');
            if (stored) localBlogs = JSON.parse(stored);
        } catch(e) {
            console.error('Error loading local blogs', e);
        }
        return localBlogs;
    }

    async function saveExternalBlog(newBlog) {
        /*
        // SUPABASE IMPLEMENTATION EXAMPLE:
        // const { data, error } = await supabase.from('blogs').insert([
        //     { 
        //         title: newBlog.title, 
        //         category: newBlog.category,
        //         image: newBlog.image,
        //         content: newBlog.content,
        //         author: newBlog.author,
        //         date: newBlog.date,
        //         read_time: newBlog.readTime,
        //         excerpt: newBlog.excerpt 
        //     }
        // ]);
        // if (error) throw error;
        // return true;
        */

        // CURRENT LOCAL IMPLEMENTATION (Replace this block with Supabase code above):
        let localBlogs = await fetchExternalBlogs();
        localBlogs.unshift(newBlog);
        localStorage.setItem('cyzen_user_blogs', JSON.stringify(localBlogs));
        return true;
    }
    // ==========================================

    async function init() {
        // Refresh allBlogs in case some were added late
        const hardcodedBlogs = window.cyzenBlogs || [];
        
        // Load external/database blogs
        const externalBlogs = await fetchExternalBlogs();
        
        // Put external blogs first so newly written blogs show at the top
        allBlogs = [...externalBlogs, ...hardcodedBlogs];
        console.log("CYZEN Blogs Initialized:", allBlogs.length);
        
        renderCategories();
        populateCategoryDropdown();
        renderFeatured();
        renderBlogs();
        animateStats();
        setupEventListeners();
    }

    // --- Core Functions ---

    function renderBlogs() {
        // Filter by category
        let filtered = activeFilter === 'all' 
            ? allBlogs 
            : allBlogs.filter(blog => blog.category === activeFilter);

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(blog => 
                blog.title.toLowerCase().includes(query) || 
                blog.excerpt.toLowerCase().includes(query) ||
                blog.category.toLowerCase().includes(query) ||
                blog.content.toLowerCase().includes(query)
            );
        }

        blogGrid.innerHTML = '';
        
        if (filtered.length === 0) {
            noResults.style.display = 'flex';
        } else {
            noResults.style.display = 'none';
            filtered.forEach((blog, index) => {
                const card = createBlogCard(blog, index);
                blogGrid.appendChild(card);
            });
        }
    }

    function createBlogCard(blog, index) {
        const div = document.createElement('div');
        div.className = 'blog-card';
        div.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.05}s`;
        div.innerHTML = `
            <div class="blog-img-wrapper">
                <img src="${blog.image}" alt="${blog.title}" class="blog-img" loading="lazy">
                <span class="blog-badge">${blog.category}</span>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span>${blog.date}</span>
                    <span>•</span>
                    <span>${blog.readTime}</span>
                </div>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div class="blog-footer">
                    <span class="read-more">Read Article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
                </div>
            </div>
        `;
        div.addEventListener('click', () => openArticle(blog));
        return div;
    }

    function renderCategories() {
        const categories = [...new Set(allBlogs.map(b => b.category))];
        const categoryCounts = {};
        allBlogs.forEach(b => {
            categoryCounts[b.category] = (categoryCounts[b.category] || 0) + 1;
        });

        // Update filters
        filterBar.innerHTML = '<button class="filter-btn active" data-filter="all">All Topics</button>';
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = cat;
            btn.textContent = cat;
            filterBar.appendChild(btn);
        });

        // Update categories section
        categoriesGrid.innerHTML = '';
        categories.slice(0, 10).forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="cat-icon">
                    ${getCategoryIcon(cat)}
                </div>
                <h3>${cat}</h3>
                <p>Simple guides and expert tips for ${cat.toLowerCase()}.</p>
                <span class="cat-count">${categoryCounts[cat]} Guides</span>
            `;
            card.addEventListener('click', (e) => {
                setActiveFilter(cat);
                document.getElementById('all-blogs').scrollIntoView({ behavior: 'smooth' });
            });
            categoriesGrid.appendChild(card);
        });

        // Footer categories
        const footerCats = document.getElementById('footerCategories');
        if (footerCats) {
            footerCats.innerHTML = '';
            categories.slice(0, 5).forEach(cat => {
                const a = document.createElement('a');
                a.href = "#all-blogs";
                a.textContent = cat;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    setActiveFilter(cat);
                    document.getElementById('all-blogs').scrollIntoView({ behavior: 'smooth' });
                });
                footerCats.appendChild(a);
            });
        }
    }

    function renderFeatured() {
        const featured = allBlogs.slice(0, 2);
        featuredGrid.innerHTML = '';
        featured.forEach(blog => {
            const div = document.createElement('div');
            div.className = 'featured-card';
            div.innerHTML = `
                <img src="${blog.image}" alt="${blog.title}" class="featured-img">
                <div class="featured-overlay">
                    <span class="featured-cat">${blog.category}</span>
                    <h3 class="featured-title">${blog.title}</h3>
                    <div class="featured-meta">
                        <span>By ${blog.author}</span>
                        <span>•</span>
                        <span>${blog.readTime}</span>
                    </div>
                </div>
            `;
            div.addEventListener('click', () => openArticle(blog));
            featuredGrid.appendChild(div);
        });
    }

    function openArticle(blog) {
        modalContent.innerHTML = `
            <div class="article-header">
                <span class="blog-badge" style="position: static; display: inline-block; margin-bottom: 16px;">${blog.category}</span>
                <h1 class="article-title">${blog.title}</h1>
                <div class="article-meta">
                    <span>By ${blog.author}</span>
                    <span>•</span>
                    <span>${blog.date}</span>
                    <span>•</span>
                    <span>${blog.readTime}</span>
                </div>
            </div>
            <img src="${blog.image}" alt="${blog.title}" class="article-banner">
            <div class="article-body">
                ${blog.content}
            </div>
            <div class="article-footer" style="margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border); text-align: center;">
                <h3>Did you find this helpful?</h3>
                <p style="color: var(--text-muted); margin-bottom: 24px;">Knowledge is the best defense. Share this guide with your family and friends.</p>
                <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
                    <button class="btn btn-primary" id="shareBtn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                        Share This Guide
                    </button>
                </div>
            </div>
        `;

        // Add Share functionality
        const shareBtn = document.getElementById('shareBtn');
        shareBtn.addEventListener('click', () => {
            const shareData = {
                title: blog.title,
                text: blog.excerpt,
                url: window.location.href
            };

            if (navigator.share) {
                navigator.share(shareData)
                    .catch((err) => console.log('Error sharing', err));
            } else {
                // Fallback: Copy to clipboard
                navigator.clipboard.writeText(window.location.href);
                const toastMsg = document.getElementById('toastMessage');
                toastMsg.textContent = "Link copied to clipboard!";
                toast.classList.add('active');
                setTimeout(() => toast.classList.remove('active'), 3000);
            }
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeArticle() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function setActiveFilter(cat) {
        activeFilter = cat;
        const btns = filterBar.querySelectorAll('.filter-btn');
        btns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === cat);
        });
        renderBlogs();
    }

    function populateCategoryDropdown() {
        if (!blogCategorySelect) return;
        const categories = [...new Set(allBlogs.map(b => b.category))];
        blogCategorySelect.innerHTML = '<option value="">Select a Category</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            blogCategorySelect.appendChild(option);
        });
    }

    function showToast(message) {
        const toastMsg = document.getElementById('toastMessage');
        toastMsg.textContent = message;
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 3000);
    }

    // --- Helpers ---

    function getCategoryIcon(cat) {
        const icons = {
            'Scam Protection': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            'Identity & Access': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
            'Network Security': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><circle cx="12" cy="20" r="2"/></svg>',
            'Travel Security': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3-3 .5c-.5.1-.8.3-.9.7l-.3.5c-.2.5-.1 1 .3 1.3L12 18l5 2c.5.2 1.1 0 1.3-.4l.3-.5c.2-.5.1-.9-.1-1.2z"/></svg>',
            'Social Privacy': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
            'Identity Protection': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
            'Device Safety': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
            'Malware Education': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
            'Money Safety': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
            'Data Recovery': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>'
        };
        return icons[cat] || '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        // Calculate live counts
        const liveCounts = {
            guides: allBlogs.length,
            categories: [...new Set(allBlogs.map(b => b.category))].length,
            readTime: allBlogs.reduce((acc, b) => acc + parseInt(b.readTime || 0), 0)
        };

        stats.forEach((stat, index) => {
            // Map the stat index to our live counts
            let target = 0;
            if (index === 0) target = liveCounts.guides;
            else if (index === 1) target = liveCounts.categories;
            else if (index === 2) target = liveCounts.readTime;
            
            // Fallback to data-count if live counts are 0
            if (target === 0) target = parseInt(stat.getAttribute('data-count')) || 0;
            
            let current = 0;
            const duration = 2000;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (target > 50 ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    // --- Event Listeners ---

    function setupEventListeners() {
        // Filter clicks
        filterBar.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                setActiveFilter(e.target.dataset.filter);
            }
        });

        // Search input
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderBlogs();
        });

        // Modal close
        modalClose.addEventListener('click', closeArticle);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeArticle();
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Mobile menu
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeArticle();
                closeWriteModal();
            }
        });

        // Write Blog Modal Events
        if (openWriteModalBtn) {
            openWriteModalBtn.addEventListener('click', () => {
                writeModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (writeModalClose) {
            writeModalClose.addEventListener('click', closeWriteModal);
        }

        if (writeModalOverlay) {
            writeModalOverlay.addEventListener('click', (e) => {
                if (e.target === writeModalOverlay) closeWriteModal();
            });
        }

        function closeWriteModal() {
            writeModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (writeBlogForm) {
            writeBlogForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Show loading state
                const submitBtn = writeBlogForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = "Publishing...";
                submitBtn.disabled = true;
                
                try {
                    const newBlog = {
                        id: 'user-blog-' + Date.now(),
                        title: document.getElementById('blogTitle').value,
                        category: document.getElementById('blogCategory').value,
                        image: document.getElementById('blogImage').value,
                        content: document.getElementById('blogContent').value,
                        // TEAMMATE INSTRUCTION: Replace this with `supabase.auth.getUser()` details
                        author: 'CYZEN Community Member', 
                        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        readTime: '5 min read',
                        excerpt: document.getElementById('blogContent').value.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...'
                    };

                    // Save to backend
                    await saveExternalBlog(newBlog);

                    // Add to current state and re-render
                    allBlogs.unshift(newBlog);
                    renderBlogs();
                    renderCategories();
                    animateStats();
                    
                    // Close and reset
                    closeWriteModal();
                    writeBlogForm.reset();
                    showToast('Blog published successfully!');
                } catch (error) {
                    console.error("Error publishing blog:", error);
                    alert("There was an error publishing your blog. Please try again.");
                } finally {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }
});

// Custom Animation Styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
