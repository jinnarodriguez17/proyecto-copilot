// ============ DEMO FUNCTIONS ============

// Simple hash function for demo purposes
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// Demo table state
let demoTableState = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null
};

function updateDemoTable() {
    const table = document.getElementById('insertTable');
    const cells = table.querySelectorAll('.demo-cell');
    cells.forEach((cell, index) => {
        const value = demoTableState[index];
        cell.textContent = index + ': ' + (value ? value : '-');
        cell.classList.remove('updated');
    });
}

function simulateInsert() {
    const keyInput = document.getElementById('insertKey');
    const valueInput = document.getElementById('insertValue');
    const feedback = document.getElementById('insertFeedback');
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();

    if (!key || !value) {
        feedback.textContent = '❌ Por favor ingresa clave y valor';
        feedback.classList.add('error');
        feedback.classList.remove('success');
        return;
    }

    const hash = simpleHash(key);
    const index = hash % 5;

    demoTableState[index] = `${key}→${value}`;

    const table = document.getElementById('insertTable');
    const cell = table.querySelectorAll('.demo-cell')[index];
    cell.classList.add('updated');

    feedback.textContent = `✓ Insertado "${key}→${value}" en índice ${index}`;
    feedback.classList.add('success');
    feedback.classList.remove('error');

    updateDemoTable();
    keyInput.value = '';
    valueInput.value = '';

    setTimeout(() => {
        cell.classList.remove('updated');
    }, 1000);
}

function simulateSearch() {
    const searchKey = document.getElementById('searchKey');
    const feedback = document.getElementById('searchFeedback');
    const key = searchKey.value.trim();

    if (!key) {
        feedback.textContent = '❌ Por favor ingresa una clave a buscar';
        feedback.classList.add('error');
        feedback.classList.remove('success');
        return;
    }

    const hash = simpleHash(key);
    const index = hash % 5;
    const value = demoTableState[index];

    if (value && value.startsWith(key)) {
        feedback.textContent = `✓ Encontrado en índice ${index}: ${value}`;
        feedback.classList.add('success');
        feedback.classList.remove('error');
    } else {
        feedback.textContent = `❌ Clave "${key}" no encontrada`;
        feedback.classList.add('error');
        feedback.classList.remove('success');
    }

    searchKey.value = '';
}

function simulateDelete() {
    const deleteKey = document.getElementById('deleteKey');
    const feedback = document.getElementById('deleteFeedback');
    const key = deleteKey.value.trim();

    if (!key) {
        feedback.textContent = '❌ Por favor ingresa una clave a eliminar';
        feedback.classList.add('error');
        feedback.classList.remove('success');
        return;
    }

    const hash = simpleHash(key);
    const index = hash % 5;

    if (demoTableState[index] && demoTableState[index].startsWith(key)) {
        demoTableState[index] = null;
        feedback.textContent = `✓ Eliminada clave "${key}" del índice ${index}`;
        feedback.classList.add('success');
        feedback.classList.remove('error');
        updateDemoTable();
    } else {
        feedback.textContent = `❌ Clave "${key}" no encontrada`;
        feedback.classList.add('error');
        feedback.classList.remove('success');
    }

    deleteKey.value = '';
}

// ============ SMOOTH SCROLL NAVIGATION ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all posts
document.querySelectorAll('.post').forEach(post => {
    observer.observe(post);
});

// ============ PARALLAX EFFECT ============

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-animation');

    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrollTop * 0.5}px)`;
    });
});

// ============ KEYBOARD SHORTCUTS ============

document.addEventListener('keydown', (e) => {
    // Alt+1, Alt+2, Alt+3 para navegar a posts
    if (e.altKey) {
        if (e.key === '1') {
            document.getElementById('post1').scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === '2') {
            document.getElementById('post2').scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === '3') {
            document.getElementById('post3').scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============ THEME TOGGLE (Opcional) ============

function addThemeToggle() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 102, 204, 0.4);
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 102, 204, 0.6);
        }
    `;
    document.head.appendChild(styleSheet);
}

// ============ LOAD ANIMATIONS ============

window.addEventListener('load', () => {
    // Trigger fade-in animations for posts
    const posts = document.querySelectorAll('.post');
    posts.forEach((post, index) => {
        post.style.animation = `slideInUp 0.8s ease-out ${index * 0.2}s both`;
    });
});

// ============ SMOOTH TRANSITIONS ON LINK CLICKS ============

document.querySelectorAll('a:not([href^="#"])').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.target !== '_blank') {
            e.preventDefault();
            const href = link.href;
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
});

// ============ CONSOLE ART ============

console.log(`
╔════════════════════════════════════════╗
║       🚀 HASH ACADEMY v1.0 🚀         ║
║    Domina las Tablas Hash Hoy         ║
║════════════════════════════════════════╝
Estructuras de datos con estilo | 2025
`);

// ============ SCROLL REVEAL EFFECTS ============

function revealOnScroll() {
    const elements = document.querySelectorAll('.concept-card, .strategy-card, .operation-card, .feature');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize reveal on scroll
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealOnScroll);
} else {
    revealOnScroll();
}

// ============ RESPONSIVE NAVBAR ============

function updateNavBar() {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 102, 204, 0.4)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 102, 204, 0.3)';
    }
}

window.addEventListener('scroll', updateNavBar);
updateNavBar();

// ============ ENTER KEY FOR DEMOS ============

document.getElementById('insertKey')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') simulateInsert();
});

document.getElementById('insertValue')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') simulateInsert();
});

document.getElementById('searchKey')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') simulateSearch();
});

document.getElementById('deleteKey')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') simulateDelete();
});
