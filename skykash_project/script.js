// Sidebar functions
function openSidebar() {
    document.getElementById("sidebar").classList.add("open");
    document.getElementById("overlay").classList.add("active");
    document.getElementById("page").classList.add("blur");
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("active");
    document.getElementById("page").classList.remove("blur");
}

// Create animated particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on page load
createParticles();

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Don't prevent default for Menu link
        if (href === '#Menu') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "admin@skykash.com" && password === "admin123") {
      alert("Login Successful ✅");
      window.location.href = "./index.html"; 
    } else {
      alert("Invalid Email or Password ❌");
    }
  });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Get elements
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');
  const loginForm = document.getElementById('loginForm');
  const modalContainer = document.querySelector('.modal-container');

  // Function to close modal
  function closeLoginModal() {
    if (loginModal) {
      loginModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      console.log('Modal closed');
    }
  }

  // Function to open modal
  function openLoginModal() {
    if (loginModal) {
      loginModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      console.log('Modal opened');
    }
  }

  // Show modal on page load
  openLoginModal();

  // Close button click
  if (closeModal) {
    closeModal.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeLoginModal();
    });
  }

  // Click outside modal to close
  if (loginModal) {
    loginModal.addEventListener('click', function(e) {
      if (e.target === loginModal) {
        closeLoginModal();
      }
    });
  }

  // Prevent clicks inside modal from closing it
  if (modalContainer) {
    modalContainer.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Escape key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLoginModal();
    }
  });

  // Form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('modalEmail').value;
      const password = document.getElementById('modalPassword').value;
      
      console.log('Login:', email);
      alert('Login successful! (Demo)');
      
      closeLoginModal();
      loginForm.reset();
    });
  }

  // Optional: Reopen modal from navbar
  const openLoginBtn = document.getElementById('openLoginModal');
  if (openLoginBtn) {
    openLoginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openLoginModal();
    });
  }

});