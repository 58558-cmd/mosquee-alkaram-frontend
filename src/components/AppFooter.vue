<template>
  <footer class="footer">
    <!-- Geometric ornament top -->
    <div class="footer-ornament">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" class="wave-svg">
        <path
          d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20 L1200,40 L0,40 Z"
          fill="#1A4A3A"
        />
      </svg>
    </div>

    <div class="footer-main">
      <div class="container footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <div class="footer-logo">
            <div>
              <div class="arabic footer-arabic">مسجد الكرم</div>
              <div class="footer-name">Mosquée Al-Karam</div>
            </div>
          </div>
          <p class="footer-desc">
            Un lieu de paix, de prière et de fraternité au cœur de Forest,
            Bruxelles. Ouverte à tous, al-ḥamdulillāh.
          </p>
          <div class="footer-quote arabic">
            «وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ»
          </div>
        </div>

        <!-- Navigation -->
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><router-link to="/">Accueil</router-link></li>
            <li>
              <router-link to="/activites"
                >Activités &amp; Horaires</router-link
              >
            </li>
            <li><router-link to="/don">Faire un don</router-link></li>
            <li>
              <router-link to="/contact">Contact &amp; Accès</router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-col">
          <h4>Nous trouver</h4>
          <ul class="contact-list">
            <li>
              <span class="icon">📍</span>
              <span>Chaussée de Neerstalle 52, 1190 Forest<br />Bruxelles, Belgique</span>
            </li>
            <li>
              <span class="icon">🕌</span>
              <span>Ouvert tous les jours<br />pour les 5 prières</span>
            </li>
            <li>
              <span class="icon">✉</span>
              <span>contact@mosquee-alkaram.be</span>
            </li>
          </ul>
        </div>

        <!-- Don -->
        <div class="footer-col">
          <h4>Soutenir le projet</h4>
          <p
            style="
              color: rgba(255, 255, 255, 0.6);
              font-size: 0.9rem;
              margin-bottom: 1rem;
            "
          >
            Aidez-nous à agrandir notre mosquée pour accueillir davantage de
            fidèles.
          </p>
          <router-link
            to="/don"
            class="btn-gold"
            style="font-size: 0.85rem; padding: 0.7rem 1.4rem"
          >
            ❤ Faire un don
          </router-link>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <span>© 2025 Mosquée Al-Karam — Forest, Bruxelles</span>      
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  margin-top: 6rem;
}

.footer-ornament {
  height: 40px;
  overflow: hidden;
}
.wave-svg {
  width: 100%;
  height: 40px;
  display: block;
}

.footer-main {
  background: var(--emerald);
  padding: 4rem 0 3rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.footer-arabic {
  font-size: 1.4rem;
  color: var(--gold);
}

.footer-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--white);
}

.footer-desc {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.footer-quote {
  font-size: 1.8rem;
  color: var(--gold-light);
  font-style: italic;
  border-left: 2px solid var(--gold);
  padding-left: 1rem;
  line-height: 1.8;
}

.footer-col h4 {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1.25rem;
}

.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-col ul a {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.footer-col ul a:hover {
  color: var(--gold-light);
  padding-left: 4px;
}

.contact-list li {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.9rem;
}
.icon {
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.footer-bottom {
  background: rgba(0, 0, 0, 0.25);
  padding: 1rem 0;
}

.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .footer-bottom-inner {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
