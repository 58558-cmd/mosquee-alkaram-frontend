<template>
  <div class="contact-page">
    <!-- Hero -->
    <section class="ct-hero">
      <div class="ct-hero-overlay"></div>
      <div class="container ct-hero-content">
        <p class="section-label" style="color: var(--gold-light)">
          Nous trouver
        </p>
        <h1>Contact & Accès</h1>
        <p>Venez nous rendre visite — Chaussée de Neerstalle 52, Forest</p>
      </div>
    </section>

    <!-- Infos + Formulaire -->
    <section class="contact-main">
      <div class="container contact-grid">
        <!-- Infos + Carte -->
        <div class="contact-info">
          <h2>Retrouvez-nous</h2>

          <div class="info-blocks">
            <div class="ib">
              <div class="ib-icon">📍</div>
              <div>
                <h4>Adresse</h4>
                <p>
                  Chaussée de Neerstalle 52<br />1190 Forest, Bruxelles<br />Belgique
                </p>
              </div>
            </div>

            <div class="ib">
              <div class="ib-icon">📞</div>
              <div>
                <h4>Téléphone</h4>
                <p v-if="contactInfo.telephone">
                  <a :href="'tel:' + contactInfo.telephone">{{
                    contactInfo.telephone
                  }}</a>
                </p>
                <p v-else class="info-soon">Bientôt disponible</p>
              </div>
            </div>

            <div class="ib">
              <div class="ib-icon">✉️</div>
              <div>
                <h4>Email</h4>
                <p v-if="contactInfo.email">
                  <a :href="'mailto:' + contactInfo.email">{{
                    contactInfo.email
                  }}</a>
                </p>
                <p v-else class="info-soon">Bientôt disponible</p>
              </div>
            </div>

            <div class="ib">
              <div class="ib-icon">🚇</div>
              <div>
                <h4>Transports en commun</h4>
                <p>
                  Tram 82 — arrêt Saint-Denis ou Max-Waller<br />
                  Bus 50, 54, 74 — arrêt Saint-Denis
                </p>
              </div>
            </div>

            <div class="ib">
              <div class="ib-icon">🕐</div>
              <div>
                <h4>Ouverture</h4>
                <p>
                  Ouverte tous les jours<br />Pour les 5 prières quotidiennes
                </p>
              </div>
            </div>
          </div>

          <!-- Google Maps réel -->
          <div class="map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.85!2d4.3319!3d50.8138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4b2b2b2b2b3%3A0x0!2sChaussée+de+Neerstalle+52%2C+1190+Forest!5e0!3m2!1sfr!2sbe!4v1234567890"
              width="100%"
              height="300"
              style="border: 0; border-radius: 12px; display: block"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Mosquée Al-Karam — Chaussée de Neerstalle 52, Forest"
            ></iframe>
            <a
              href="https://maps.app.goo.gl/19fY284jaJUvLLZ39"
              target="_blank"
              rel="noopener"
              class="map-link"
            >
              Ouvrir dans Google Maps →
            </a>
          </div>

          <!-- Réseaux sociaux -->
          <div class="socials">
            <h4>Suivez-nous</h4>
            <div class="social-links">
              <a href="#" class="social-btn">📘 Facebook</a>
              <a href="#" class="social-btn">📷 Instagram</a>
              <a href="#" class="social-btn">▶️ YouTube</a>
            </div>
          </div>
        </div>

        <!-- Formulaire -->
        <div class="contact-form-wrap">
          <h2>Envoyer un message</h2>
          <p class="form-intro">
            Une question sur nos activités, nos horaires ou notre projet
            d'agrandissement ? Écrivez-nous et nous vous répondrons dans les
            plus brefs délais.
          </p>

          <div class="cf-row">
            <div class="cf-field">
              <label>Prénom & Nom *</label>
              <input
                type="text"
                v-model="cf.nom"
                placeholder="Votre nom complet"
              />
            </div>
            <div class="cf-field">
              <label>Email *</label>
              <input
                type="email"
                v-model="cf.email"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div class="cf-field">
            <label>Téléphone (optionnel)</label>
            <input type="tel" v-model="cf.tel" placeholder="+32 4XX XX XX XX" />
          </div>

          <div class="cf-field">
            <label>Sujet</label>
            <select v-model="cf.sujet">
              <option value="">Choisir un sujet...</option>
              <option value="info">Informations générales</option>
              <option value="cours">Inscription aux cours</option>
              <option value="don">Don & prêt</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div class="cf-field">
            <label>Message *</label>
            <textarea
              v-model="cf.message"
              rows="6"
              placeholder="Votre message..."
            ></textarea>
          </div>

          <div v-if="errorMsg" class="error-msg">⚠️ {{ errorMsg }}</div>

          <button
            class="btn-gold submit-cf"
            @click="sendMessage"
            :disabled="sending"
          >
            <span v-if="sending">Envoi en cours...</span>
            <span v-else>Envoyer le message →</span>
          </button>

          <div v-if="sent" class="sent-msg">
            ✅ Message envoyé ! JazakAllah khayran, nous vous répondrons
            bientôt.
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section">
      <div class="container">
        <p class="section-label">Questions fréquentes</p>
        <h2 class="section-title">FAQ</h2>
        <div class="divider-gold"></div>

        <div class="faq-list">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            :class="['faq-item', { open: openFaq === i }]"
            @click="openFaq = openFaq === i ? null : i"
          >
            <div class="faq-q">
              <span>{{ faq.q }}</span>
              <span class="faq-arrow">{{ openFaq === i ? "−" : "+" }}</span>
            </div>
            <transition name="faq-slide">
              <div class="faq-a" v-if="openFaq === i">
                <p>{{ faq.a }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const API = 'https://mosquee-alkaram-backend-production.up.railway.app'

// Infos contact dynamiques (chargées depuis l'admin plus tard)
const contactInfo = ref({ telephone: "", email: "" });

const cf = ref({ nom: "", email: "", tel: "", sujet: "", message: "" });
const sent = ref(false);
const sending = ref(false);
const errorMsg = ref("");
const openFaq = ref(null);

async function loadContactInfo() {
  try {
    const res = await fetch(`${API}/api/config/contact`);
    if (res.ok) {
      contactInfo.value = await res.json();
    }
  } catch (e) {
    // Silencieux — on affiche "Bientôt disponible"
  }
}

async function sendMessage() {
  errorMsg.value = "";
  if (!cf.value.nom?.trim()) {
    errorMsg.value = "Le nom est obligatoire.";
    return;
  }
  if (!cf.value.email?.trim()) {
    errorMsg.value = "L'email est obligatoire.";
    return;
  }
  if (!cf.value.message?.trim()) {
    errorMsg.value = "Le message est obligatoire.";
    return;
  }

  sending.value = true;
  try {
    const res = await fetch(`${API}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: cf.value.nom,
        email: cf.value.email,
        telephone: cf.value.tel,
        sujet: cf.value.sujet,
        message: cf.value.message,
      }),
    });
    if (res.ok) {
      sent.value = true;
      cf.value = { nom: "", email: "", tel: "", sujet: "", message: "" };
      setTimeout(() => (sent.value = false), 6000);
    } else {
      const data = await res.json();
      errorMsg.value = data.erreur || "Une erreur est survenue.";
    }
  } catch (e) {
    errorMsg.value = "Impossible de contacter le serveur.";
  } finally {
    sending.value = false;
  }
}

const faqs = [
  {
    q: "Comment accéder à la mosquée en transports en commun ?",
    a: "Vous pouvez prendre le tram 82 (arrêt Saint-Denis ou Max-Waller) ou les bus 50, 54 et 74 (arrêt Saint-Denis).",
  },
  {
    q: "Comment inscrire mon enfant aux cours d'arabe ?",
    a: "Les cours d'arabe pour enfants ont lieu le samedi et dimanche de 10h à 14h. Contactez-nous par le formulaire ci-contre ou venez directement à la mosquée pour vous inscrire.",
  },
  {
    q: "Comment suivre l'avancement du projet d'agrandissement ?",
    a: "Vous pouvez suivre la progression en temps réel sur notre page d'accueil. Nous communiquons également les mises à jour sur nos réseaux sociaux.",
  },
];

onMounted(loadContactInfo);
</script>

<style scoped>
.ct-hero {
  position: relative;
  background: var(--emerald);
  padding: 9rem 0 5rem;
  overflow: hidden;
}
.ct-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.3' opacity='0.15'%3E%3Cpolygon points='30,3 33,18 45,15 37,25 45,35 33,32 30,47 27,32 15,35 23,25 15,15 27,18'/%3E%3C/g%3E%3C/svg%3E")
    repeat;
}
.ct-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(26, 74, 58, 0.92),
    rgba(45, 107, 84, 0.75)
  );
}
.ct-hero-content {
  position: relative;
  z-index: 1;
}
.ct-hero-content h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--white);
  margin-bottom: 1rem;
}
.ct-hero-content p {
  color: rgba(255, 255, 255, 0.65);
  font-size: 1.05rem;
}

.contact-main {
  padding: 6rem 0;
  background: var(--cream);
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 5rem;
  align-items: start;
}

.contact-info h2,
.contact-form-wrap h2 {
  font-family: var(--font-display);
  font-size: 1.7rem;
  color: var(--emerald);
  margin-bottom: 1.75rem;
}

.info-blocks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.ib {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem;
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  border-left: 3px solid var(--gold);
  transition: var(--transition);
}
.ib:hover {
  transform: translateX(4px);
}
.ib-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  margin-top: 2px;
}
.ib h4 {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold-dark);
  margin-bottom: 0.3rem;
}
.ib p {
  font-size: 0.9rem;
  color: var(--text-mid);
  line-height: 1.6;
  margin: 0;
}
.ib p a {
  color: var(--emerald);
  text-decoration: none;
}
.ib p a:hover {
  color: var(--gold);
}
.info-soon {
  color: var(--text-light) !important;
  font-style: italic;
}

.map-wrap {
  margin-bottom: 2rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
}
.map-link {
  display: block;
  text-align: center;
  font-size: 0.85rem;
  color: var(--emerald);
  padding: 0.75rem;
  background: var(--cream-dark);
  text-decoration: none;
  transition: var(--transition);
  font-weight: 500;
}
.map-link:hover {
  background: var(--gold);
  color: var(--white);
}

.socials h4 {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-mid);
  margin-bottom: 0.75rem;
}
.social-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  background: var(--white);
  border: 1.5px solid var(--cream-dark);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  color: var(--text-dark);
  text-decoration: none;
  transition: var(--transition);
}
.social-btn:hover {
  border-color: var(--gold);
  color: var(--emerald);
  transform: translateY(-2px);
}

.contact-form-wrap {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-soft);
}
.form-intro {
  color: var(--text-mid);
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  margin-top: -0.5rem;
}
.cf-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.cf-field {
  margin-bottom: 1.25rem;
}
.cf-field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--text-mid);
  margin-bottom: 0.45rem;
}
input,
select,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--cream-dark);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text-dark);
  background: var(--cream);
  outline: none;
  transition: var(--transition);
  -webkit-appearance: none;
}
input:focus,
select:focus,
textarea:focus {
  border-color: var(--gold);
  background: var(--white);
}
textarea {
  resize: vertical;
}
.error-msg {
  background: rgba(220, 53, 69, 0.08);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  font-size: 0.88rem;
  color: #dc3545;
  margin-bottom: 1rem;
}
.submit-cf {
  width: 100%;
  justify-content: center;
  font-size: 1rem;
  padding: 0.9rem;
  margin-top: 0.5rem;
}
.submit-cf:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
.sent-msg {
  margin-top: 1rem;
  padding: 0.85rem 1.25rem;
  background: rgba(26, 74, 58, 0.08);
  border: 1px solid rgba(26, 74, 58, 0.2);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  color: var(--emerald);
}

.faq-section {
  padding: 6rem 0 7rem;
  background: var(--cream-dark);
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 800px;
}
.faq-item {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.3s;
}
.faq-item.open {
  border-color: var(--gold);
}
.faq-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  font-weight: 500;
  color: var(--emerald);
  gap: 1rem;
}
.faq-arrow {
  font-size: 1.2rem;
  color: var(--gold);
  font-weight: 300;
  flex-shrink: 0;
}
.faq-a {
  padding: 0 1.5rem 1.25rem;
}
.faq-a p {
  font-size: 0.9rem;
  color: var(--text-mid);
  line-height: 1.7;
  border-top: 1px solid var(--cream-dark);
  padding-top: 1rem;
  margin: 0;
}

.faq-slide-enter-active,
.faq-slide-leave-active {
  transition: all 0.3s ease;
}
.faq-slide-enter-from,
.faq-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .cf-row {
    grid-template-columns: 1fr;
  }
}
</style>
