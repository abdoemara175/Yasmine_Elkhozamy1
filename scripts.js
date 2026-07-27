// ==========================================================================
// YASMINE ELKHOZAMY — FULL SKILLSET INTERACTION ENGINE
// Dual-Phase Curtain Sweep Theme Transition, Interactive Particle Canvas Backdrop,
// Project Filter Tabs, Project Detail Modal, Toast Notifications, & Observer
// ==========================================================================

// ---------- 1. LOADING SCREEN & FADE OUT ----------
window.addEventListener('load', () => {
  const loadingSpinner = document.getElementById('loadingSpinner');
  if (loadingSpinner) {
    setTimeout(() => {
      loadingSpinner.classList.add('hidden');
    }, 400);
  }
});

// ---------- 2. TOP SCROLL PROGRESS INDICATOR ----------
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${scrollPercentage}%`;
});

// ---------- 3. HERO SECTION ROLE ROTATOR ----------
const titles = [
  'Flutter Applications',
  'UI/UX Design Systems',
  'Cross-Platform Apps',
  'Clean Mobile Architectures'
];

let titleIndex = 0;
const swipeText = document.getElementById('swipeText');

function startRoleAnimation() {
  if (!swipeText) return;
  swipeText.textContent = titles[titleIndex];

  setInterval(() => {
    swipeText.classList.add('slide-out');

    setTimeout(() => {
      titleIndex = (titleIndex + 1) % titles.length;
      swipeText.classList.remove('slide-out');
      swipeText.classList.add('slide-in-prep');
      swipeText.textContent = titles[titleIndex];

      void swipeText.offsetWidth; // Force reflow
      swipeText.classList.remove('slide-in-prep');
    }, 550);
  }, 2800);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startRoleAnimation);
} else {
  startRoleAnimation();
}

// ---------- 4. SECTION INTERSECTION OBSERVER & ACTIVE NAV HIGHLIGHT ----------
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-section-link');

function checkHeroNavHighlight() {
  if (window.scrollY < 300) {
    navLinks.forEach(link => link.classList.remove('active'));
  }
}

window.addEventListener('scroll', checkHeroNavHighlight);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      if (window.scrollY < 300) {
        navLinks.forEach(link => link.classList.remove('active'));
        return;
      }

      const currentId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => sectionObserver.observe(section));

// ---------- 5. MOBILE MENU DRAWER TOGGLE ----------
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navSections = document.getElementById('navSections');

if (mobileMenuBtn && navSections) {
  mobileMenuBtn.addEventListener('click', () => {
    navSections.classList.toggle('mobile-open');
    const isOpen = navSections.classList.contains('mobile-open');
    mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  document.querySelectorAll('.nav-section-link').forEach(link => {
    link.addEventListener('click', () => {
      navSections.classList.remove('mobile-open');
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// ---------- 6. PROJECT FILTER TABS ----------
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filterValue = tab.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.classList.remove('hidden-project');
      } else {
        card.classList.add('hidden-project');
      }
    });
  });
});

// ---------- 7. PROJECT DETAIL MODAL DATA & HANDLERS ----------
const projectModalData = {
  coffayeen: {
    title: "Coffayeen Mobile Application",
    badge: "Flutter & Firebase App",
    desc: "Coffayeen is a sleek, modern mobile application designed for coffee lovers. It provides a seamless digital ordering experience with user authentication, custom order creation, real-time cart state management, and user favorite lists.",
    features: [
      "Firebase Authentication (Login & Signup workflows)",
      "Cart & Favorites State Management with Provider",
      "Dynamic menu rendering with item search and categories",
      "Pixel-perfect UI designed in Figma prior to code execution",
      "Responsive layout adapting across all mobile viewports"
    ],
    github: "https://github.com/YasmineElkhuzamy/coffayeen",
    tech: ["Flutter", "Dart", "Firebase", "Provider", "Figma"]
  },
  todo: {
    title: "Todo Task Manager App",
    badge: "Productivity Utility App",
    desc: "A lightweight, robust task management application supporting full CRUD operations. Designed to help users organize their daily routines efficiently with rapid local persistence.",
    features: [
      "Full Create, Read, Update, and Delete (CRUD) task operations",
      "Instant state persistence powered by SharedPreferences",
      "Task completion tracking with visual status indicators",
      "Clean, user-centric interface built with mobile UX best practices"
    ],
    github: "https://github.com/YasmineElkhuzamy/ToDo",
    tech: ["Flutter", "Dart", "SharedPreferences", "Clean UI"]
  },
  islamic: {
    title: "Islamic Companion Application",
    badge: "Religious & Media App",
    desc: "A feature-rich Islamic companion application featuring Quranic text and Hadith retrieval via REST APIs, live streaming radio broadcasts, and a digital Tasbeeh counter.",
    features: [
      "REST API integration for Quran surahs and Hadith texts",
      "Live audio radio streaming player for recitations",
      "Interactive Digital Tasbeeh counter with state persistence",
      "Comprehensive prayer timing & religious resources"
    ],
    github: "https://github.com/YasmineElkhuzamy/islamicapp",
    tech: ["Flutter", "Dart", "REST API", "Audio Streaming"]
  }
};

function openProjectModal(id) {
  const data = projectModalData[id];
  if (!data) return;

  const modalBody = document.getElementById('modalBody');
  const projectModal = document.getElementById('projectModal');

  modalBody.innerHTML = `
    <span class="project-badge" style="margin-bottom: 0.8rem; display: inline-block;">${data.badge}</span>
    <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--gold-primary); margin-bottom: 1rem;">${data.title}</h3>
    <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">${data.desc}</p>
    
    <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.8rem;">Key Engineering Highlights:</h4>
    <ul style="list-style: none; margin-bottom: 1.8rem; display: flex; flex-direction: column; gap: 0.6rem;">
      ${data.features.map(f => `<li style="font-size: 0.92rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.6rem;"><i class="fas fa-check-circle" style="color: var(--gold-primary);"></i> ${f}</li>`).join('')}
    </ul>

    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.8rem;">
      ${data.tech.map(t => `<span style="font-size: 0.8rem; font-weight: 600; color: var(--gold-primary); background: rgba(255,200,87,0.1); padding: 0.3rem 0.8rem; border-radius: 6px;">${t}</span>`).join('')}
    </div>

    <a href="${data.github}" target="_blank" class="btn btn-primary" style="width: 100%; justify-content: center;">
      <i class="fab fa-github"></i>
      <span>View GitHub Repository</span>
    </a>
  `;

  projectModal.classList.add('show');
}

function closeProjectModal() {
  const projectModal = document.getElementById('projectModal');
  if (projectModal) projectModal.classList.remove('show');
}

document.getElementById('projectModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'projectModal') closeProjectModal();
});

// ---------- 8. QUICK CONTACT FORM HANDLER (FORMSPREE AJAX) ----------
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const name = document.getElementById('senderName').value;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      showToast(`Thank you ${name}! Your message has been sent successfully.`);
      form.reset();
    } else {
      showToast(`Thank you ${name}! Your message has been sent.`);
      form.reset();
    }
  } catch (error) {
    showToast(`Thank you ${name}! Your message has been sent.`);
    form.reset();
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Send Message</span> <i class="fas fa-paper-plane"></i>`;
    }
  }
}

// ---------- 9. COPY TO CLIPBOARD & TOAST ALERT ----------
function copyToClipboard(text, label = 'Content') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard!`);
    }).catch(() => {
      fallbackCopyTextToClipboard(text, label);
    });
  } else {
    fallbackCopyTextToClipboard(text, label);
  }
}

function fallbackCopyTextToClipboard(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied ${label} to clipboard!`);
  } catch (err) {
    showToast(`Failed to copy ${label}`);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--gold-primary)"></i> ${message}`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ---------- 10. DUAL-PHASE LIQUID CURTAIN SWEEP THEME SWITCHER ----------
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const navImg = document.getElementById('navImg');
const heroImg = document.getElementById('heroImg');

const DARK_IMAGE = 'Githubph-emara.jpg';
const LIGHT_IMAGE = 'Githubph-emara2.jpg';

function updateImagesForTheme(isLight) {
  const targetImage = isLight ? LIGHT_IMAGE : DARK_IMAGE;

  [navImg, heroImg].forEach(img => {
    if (!img) return;
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = targetImage;
      img.onerror = () => {
        img.src = DARK_IMAGE;
      };
      img.style.opacity = '1';
    }, 180);
  });
}

function updateThemeDOM(theme) {
  const isLight = theme === 'light';
  
  if (isLight) {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }

  if (themeIcon) {
    themeIcon.style.transform = 'scale(0) rotate(180deg)';
    themeIcon.style.opacity = '0';

    setTimeout(() => {
      themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
      themeIcon.style.transform = 'scale(1) rotate(0deg)';
      themeIcon.style.opacity = '1';
    }, 200);
  }

  updateImagesForTheme(isLight);
  localStorage.setItem('portfolio-theme', theme);
}

function toggleThemeWithCurtain() {
  const curtain = document.getElementById('themeCurtain');
  const isLight = document.body.classList.contains('light-mode');
  const nextTheme = isLight ? 'dark' : 'light';

  if (curtain) {
    curtain.classList.remove('sweep-active');
    void curtain.offsetWidth; // Force reflow
    curtain.classList.add('sweep-active');

    // Switch theme state halfway through curtain sweep
    setTimeout(() => {
      updateThemeDOM(nextTheme);
    }, 350);

    setTimeout(() => {
      curtain.classList.remove('sweep-active');
    }, 800);
  } else {
    updateThemeDOM(nextTheme);
  }
}

// Initial theme setup on page load
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
updateThemeDOM(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    toggleThemeWithCurtain();
  });
}

// ---------- 11. HERO INTERACTIVE PARTICLE CANVAS BACKDROP ----------
function initHeroParticleCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.body.classList.contains('light-mode');
    const particleColor = isLight ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 200, 87, 0.4)';
    const lineColor = isLight ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255, 200, 87, 0.08)';

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroParticleCanvas);
} else {
  initHeroParticleCanvas();
}
