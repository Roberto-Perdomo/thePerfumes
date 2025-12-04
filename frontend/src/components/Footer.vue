<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Contenido horizontal -->
      <div class="footer-content">
        <!-- Logo y descripción -->
        <div class="footer-brand">
          <h2 class="footer-logo">LEE PERFUM</h2>
          <div class="divider"></div>
          <p class="footer-tagline">
            Fragancias masculinas de lujo que definen tu estilo
          </p>
        </div>

        <!-- Enlaces rápidos -->
        <nav class="footer-nav">
          <a href="#" class="footer-link">Inicio</a>
          <a href="#" class="footer-link">Sobre la tienda</a>
          <a href="#" class="footer-link">Destacados</a>
          <a href="#" class="footer-link">Perfumes</a>
          <a href="#" class="footer-link">Mi Cuenta</a>
          <a href="#" class="footer-link">Contacto</a>
        </nav>

        <!-- Contacto e íconos -->
        <div class="footer-contact">
          <div class="contact-info">
            <div class="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span class="contact-text">+57 300 123 4567</span>
            </div>
            <div class="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span class="contact-text">contacto@essence.com</span>
            </div>
          </div>
          
          <div class="divider-vertical"></div>
          
          <div class="social-icons">
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Línea divisoria y copyright -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">© 2024 LEE PERFUM. Todos los derechos reservados.</p>
          <div class="footer-bottom-links">
            <a href="#" class="footer-bottom-link">Privacidad</a>
            <a href="#" class="footer-bottom-link">Términos</a>
            <a href="#" class="footer-bottom-link">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterPerfumes'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(to right, #0c0c0c, #0c0c0c, #0c0c0c);
  color: #d1d5db;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.footer-logo {
  font-size: 1.875rem;
  font-weight: bold;
  color: white;
  margin: 0;
}

.divider {
  height: 3rem;
  width: 1px;
  background-color: #374151;
}

.footer-tagline {
  font-size: 0.875rem;
  max-width: 20rem;
  margin: 0;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.875rem;
}

.footer-link {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #f59e0b;
}

.footer-contact {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-item svg {
  color: #f59e0b;
  flex-shrink: 0;
}

.contact-text {
  white-space: nowrap;
}

.divider-vertical {
  height: 2rem;
  width: 1px;
  background-color: #374151;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #d1d5db;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #f59e0b;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1.5rem;
}

.footer-bottom-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
}

.copyright {
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-link {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-bottom-link:hover {
  color: #f59e0b;
}

/* Responsive */
@media (max-width: 1024px) {
  .divider {
    display: none;
  }
  
  .footer-tagline {
    display: none;
  }
}

@media (max-width: 640px) {
  .divider-vertical {
    display: none;
  }
  
  .contact-text {
    display: none;
  }
  
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
