document.addEventListener('DOMContentLoaded', function() {

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => { // Asegura que todo esté cargado visualmente
                preloader.classList.add('loaded');
                // Iniciar animación de entrada para la sección de inicio después del preloader
                animateHeroSection();
            }, 500); // Un pequeño delay adicional
        });
    } else {
        // Si no hay preloader, iniciar animación de inicio directamente
        animateHeroSection();
    }

    // Animación de entrada para la sección de inicio (si no hay preloader, o después de él)
    function animateHeroSection() {
        const heroAvatar = document.querySelector('#inicio .avatar-img');
        const heroH1 = document.querySelector('#inicio h1');
        const heroLead = document.querySelector('#inicio p.lead');
        const heroButtons = document.querySelector('#inicio div[data-aos="fade-up"]'); // Contenedor de botones

        if (heroAvatar) {
            heroAvatar.classList.add('fade-in-element');
            setTimeout(() => heroAvatar.classList.add('visible'), 100); // Pequeño delay para asegurar transición
        }
        if (heroH1) {
            heroH1.classList.add('fade-in-element');
            setTimeout(() => heroH1.classList.add('visible'), 300);
        }
        if (heroLead) {
            heroLead.classList.add('fade-in-element');
            setTimeout(() => heroLead.classList.add('visible'), 500);
        }
        if (heroButtons) {
            heroButtons.classList.add('fade-in-element');
            setTimeout(() => heroButtons.classList.add('visible'), 700);
        }
    }


    // AOS (Animate On Scroll) Inicialización
    AOS.init({
        duration: 1000, // Duración de la animación
        once: true,     // La animación ocurre solo una vez
        offset: 50,     // Offset (en px) desde el borde original del elemento
        delay: 100,     // Delay global para animaciones AOS
    });

    // Typed.js Inicialización
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        new Typed('#typed-text', {
            strings: ["Desarrollador Frontend.", "Técnico en Programación.", "Futuro Ingeniero en Software.", "un apasionado por la tecnología."],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true,
            backDelay: 1500,
            smartBackspace: true
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active Nav Link Scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { // Ajusta el offset según necesites
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - (navbar ? navbar.offsetHeight : 70), // Ajusta por altura de navbar
                        behavior: 'smooth'
                    });
                     // Cierra el menú hamburguesa en móviles después de hacer clic
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarToggler && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });


    // Formulario de Contacto con SweetAlert2
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir envío real por ahora

            // Validación simple (Bootstrap se encarga de la mayoría con 'required')
            let isValid = true;
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;

            if (!nombre || !email || !asunto || !mensaje) {
                isValid = false;
            }

            // Aquí puedes agregar validaciones más complejas si es necesario

            if (isValid) {
                // Simulación de envío
                // En un caso real, aquí harías una petición fetch o AJAX a tu backend
                Swal.fire({
                    title: '¡Mensaje Enviado!',
                    text: 'Gracias por contactarme, Manuel. Te responderé lo antes posible.',
                    icon: 'success',
                    confirmButtonText: 'Entendido',
                    customClass: {
                        popup: 'swal-popup-custom',
                        title: 'swal-title-custom',
                        confirmButton: 'swal-button-custom'
                    },
                    buttonsStyling: false // Para usar clases personalizadas de SweetAlert si las defines en CSS
                });
                contactForm.reset(); // Limpiar el formulario
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, completa todos los campos requeridos.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: { /* ... */ },
                    buttonsStyling: false
                });
            }
        });
    }

    // ScrollReveal (Opcional, si decides usarlo. Configura según su documentación)
    // if (typeof ScrollReveal !== 'undefined') {
    //     ScrollReveal().reveal('.some-element-to-reveal', {
    //         delay: 200,
    //         distance: '50px',
    //         origin: 'bottom',
    //         easing: 'ease-in-out',
    //         interval: 150
    //     });
    // }

    // Botón Modo Oscuro/Claro
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const sunIcon = darkModeToggle.querySelector('.fa-sun');
    const moonIcon = darkModeToggle.querySelector('.fa-moon');

    // Función para aplicar el tema y guardar preferencia
    function applyTheme(theme) {
        body.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline-block';
        } else {
            moonIcon.style.display = 'inline-block';
            sunIcon.style.display = 'none';
        }
    }

    // Cargar tema guardado o usar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Default
    }
    

    darkModeToggle.addEventListener('click', () => {
        let newTheme = body.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });


    // Actualizar año en el footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});

// Para que las animaciones de AOS se reinicien si el usuario navega hacia atrás
window.addEventListener('pageshow', function(event) {
    if (event.persisted) { // La página se cargó desde la caché (ej. botón atrás)
        AOS.refreshHard(); // Refresca AOS para re-evaluar elementos visibles
    }
});