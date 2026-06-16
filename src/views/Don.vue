<template>
  <div class="don-page">
    <!-- Hero -->
    <section class="don-hero">
      <div class="don-hero-bg">
        <svg viewBox="0 0 800 400" class="don-hero-pattern">
          <defs>
            <pattern
              id="don-pat"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <g stroke="#C9A84C" stroke-width="0.5" fill="none" opacity="0.15">
                <polygon
                  points="40,5 44,28 62,25 50,40 62,55 44,52 40,75 36,52 18,55 30,40 18,25 36,28"
                />
              </g>
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#don-pat)" />
        </svg>
      </div>
      <div class="container don-hero-content">
        <p class="section-label" style="color: var(--gold-light)">
          Sadaqa jariya
        </p>
        <h1>Faites un don</h1>
        <p>
          Votre générosité nous permet d'agrandir et de rénover notre mosquée
          pour accueillir davantage de fidèles.
        </p>
      </div>
    </section>

    <!-- Barre de progression -->
    <section class="don-progress">
      <div class="container">
        <div v-if="statsLoading" class="loading-bar">Chargement...</div>
        <div v-else class="progress-global">
          <div class="pg-left">
            <div class="pg-amount">{{ formatEuro(stats.totalCollecte) }}</div>
            <div class="pg-subtitle">
              collectés sur {{ formatEuro(stats.objectif) }}
            </div>
          </div>
          <div class="pg-mid">
            <div class="pg-bar-wrap">
              <div
                class="pg-bar-fill"
                :style="{ width: Math.min(stats.pourcentage, 100) + '%' }"
              ></div>
            </div>
            <div class="pg-bar-labels">
              <span>{{ Math.round(stats.pourcentage) }}% atteint</span>
            </div>
          </div>
          <div class="pg-right">
            <div class="pg-pct">{{ Math.round(stats.pourcentage) }}%</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulaire -->
    <section class="don-main">
      <div class="container don-grid">
        <div class="don-form-wrap">
          <!-- ÉTAPE 1 : Montant + coordonnées -->
          <div v-if="step === 1">
            <h2>Votre don</h2>
            <div class="form-amounts">
              <button
                v-for="a in amounts"
                :key="a"
                :class="['fa-btn', { selected: chosen === a }]"
                @click="choose(a)"
              >
                <strong>{{ a }}€</strong>
                <span>{{ getLabel(a) }}</span>
              </button>
            </div>
            <div class="form-divider">ou</div>
            <div class="form-custom">
              <label>Montant personnalisé (€)</label>
              <input
                type="number"
                v-model="customAmt"
                placeholder="Ex : 75"
                min="1"
                @input="chosen = null"
              />
            </div>
            <div class="form-type">
              <label>Fréquence</label>
              <div class="type-btns">
                <button
                  :class="['type-btn', { selected: freq === 'once' }]"
                  @click="freq = 'once'"
                >
                  Une seule fois
                </button>
                <button
                  :class="['type-btn', { selected: freq === 'monthly' }]"
                  @click="freq = 'monthly'"
                >
                  Mensuel
                </button>
              </div>
            </div>
            <div class="form-section-title">Vos coordonnées</div>
            <div class="form-row">
              <div class="form-field">
                <label>Prénom</label>
                <input
                  type="text"
                  v-model="form.prenom"
                  placeholder="Votre prénom"
                />
              </div>
              <div class="form-field">
                <label>Nom</label>
                <input type="text" v-model="form.nom" placeholder="Votre nom" />
              </div>
            </div>
            <div class="form-field">
              <label>Email *</label>
              <input
                type="email"
                v-model="form.email"
                placeholder="votre@email.com"
              />
            </div>
            <div class="form-anon">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.anon" />
                <span class="checkbox-custom"></span>
                Don anonyme (votre nom ne sera pas affiché)
              </label>
            </div>
            <div v-if="errorMsg" class="error-msg">⚠️ {{ errorMsg }}</div>
            <button
              class="btn-gold submit-btn"
              @click="goToPayment"
              :disabled="loadingIntent"
            >
              <span v-if="loadingIntent">
                <span class="btn-spinner"></span> Préparation...
              </span>
              <span v-else
                >Continuer vers le paiement — {{ finalAmount }}€ →</span
              >
            </button>
            <div class="form-secure">
              🔒 Paiement sécurisé par <strong>Stripe</strong>
            </div>
          </div>

          <!-- ÉTAPE 2 : Stripe Payment Element -->
          <div v-if="step === 2">
            <div class="payment-header">
              <button class="back-btn" @click="goBack">← Modifier</button>
              <div class="payment-summary">
                <span>Don de</span>
                <strong>{{ finalAmount }}€</strong>
              </div>
            </div>

            <h2>Choisissez votre mode de paiement</h2>
            <p class="payment-subtitle">
              Carte, Bancontact, Apple Pay, Google Pay et plus encore.
            </p>

            <!-- Stripe Payment Element se monte ici -->
            <div v-if="elementLoading" class="element-loading">
              <div class="loading-spinner"></div>
              <span>Chargement des méthodes de paiement...</span>
            </div>
            <div id="payment-element" :class="{ hidden: elementLoading }"></div>

            <div v-if="payError" class="error-msg">⚠️ {{ payError }}</div>

            <button
              class="btn-gold submit-btn"
              @click="confirmPayment"
              :disabled="paying || elementLoading"
            >
              <span v-if="paying">
                <span class="btn-spinner"></span> Traitement...
              </span>
              <span v-else>❤ Confirmer le don de {{ finalAmount }}€</span>
            </button>

            <div class="form-secure">
              🔒 Chiffrement SSL 256-bit • Certifié PCI-DSS • Stripe
            </div>
          </div>
        </div>

        <!-- Infos latérales -->
        <div class="don-info">
          <div class="info-card">
            <div class="info-card-icon">🕌</div>
            <h3>Transparence totale</h3>
            <p>
              Chaque euro collecté est intégralement dédié aux projets de la
              mosquée Al-Karam.
            </p>
          </div>
          <div class="info-card">
            <div class="info-card-icon">🔒</div>
            <h3>Paiement 100% sécurisé</h3>
            <p>
              Vos données bancaires sont protégées par Stripe (PCI-DSS). Nous
              n'avons jamais accès à vos informations de carte.
            </p>
          </div>
          <div class="info-card hadith-card">
            <div class="hadith-arabic arabic">
              «مَنْ بَنَى مَسْجِدًا لِلَّهِ، بَنَى اللَّهُ لَهُ بَيْتًا فِي
              الْجَنَّةِ»
            </div>
            <p class="hadith-text">
              «Celui qui construit une mosquée pour Allah, Allah lui construira
              une maison au Paradis.»
            </p>
            <p class="hadith-ref">— Sahih Muslim</p>
          </div>
          <div class="info-card">
            <h3>❤ Derniers donateurs</h3>
            <ul class="donors-list">
              <li v-for="d in recentDonors" :key="d.id">
                <span class="donor-avatar">{{ getInitials(d) }}</span>
                <span class="donor-info">
                  <strong>{{
                    d.anonyme
                      ? "Anonyme"
                      : d.prenom + " " + (d.nom ? d.nom.charAt(0) + "." : "")
                  }}</strong>
                  <span
                    >{{ d.montant }}€ • {{ formatDate(d.dateCreation) }}</span
                  >
                </span>
              </li>
              <li
                v-if="recentDonors.length === 0"
                style="color: var(--text-light); font-size: 0.85rem"
              >
                Soyez le premier à donner !
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";

const API = 'https://mosquee-alkaram-backend-production.up.railway.app'
const route = useRoute();
const router = useRouter();

const step = ref(1);
const stats = ref({ totalCollecte: 0, objectif: 258000, pourcentage: 0 });
const statsLoading = ref(true);
const recentDonors = ref([]);
const amounts = [10, 25, 50, 100, 250, 500];
const chosen = ref(25);
const customAmt = ref("");
const freq = ref("once");
const form = ref({ prenom: "", nom: "", email: "", anon: false });
const errorMsg = ref("");
const payError = ref("");
const loadingIntent = ref(false);
const elementLoading = ref(true);
const paying = ref(false);

let stripe = null;
let elements = null;
let paymentElement = null;
let clientSecret = ref("");
let currentDonId = ref(null);

const finalAmount = computed(
  () => chosen.value || parseInt(customAmt.value) || 0,
);

function choose(a) {
  chosen.value = a;
  customAmt.value = "";
}

function getLabel(a) {
  return (
    {
      10: "Petite pierre",
      25: "Belle action",
      50: "Soutien solide",
      100: "Généreux",
      250: "Grand donateur",
      500: "Bienfaiteur",
    }[a] || ""
  );
}
function getInitials(d) {
  if (d.anonyme) return "❤";
  return ((d.prenom?.[0] || "") + (d.nom?.[0] || "")).toUpperCase();
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 60) return `il y a ${diff} min`;
  if (diff < 1440) return `il y a ${Math.floor(diff / 60)}h`;
  return `il y a ${Math.floor(diff / 1440)}j`;
}
function formatEuro(n) {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

async function loadStats() {
  try {
    const res = await fetch(`${API}/api/dons/stats`);
    stats.value = await res.json();
  } catch (e) {
  } finally {
    statsLoading.value = false;
  }
}

async function loadDonateurs() {
  try {
    const res = await fetch(`${API}/api/dons/recents`);
    recentDonors.value = await res.json();
  } catch (e) {}
}

async function goToPayment() {
  errorMsg.value = "";
  if (!finalAmount.value || finalAmount.value < 1) {
    errorMsg.value = "Veuillez choisir un montant.";
    return;
  }
  if (!form.value.email) {
    errorMsg.value = "L'email est obligatoire.";
    return;
  }

  loadingIntent.value = true;
  try {
    const res = await fetch(`${API}/api/stripe/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        montant: finalAmount.value,
        prenom: form.value.prenom,
        nom: form.value.nom,
        email: form.value.email,
        anonyme: form.value.anon,
        frequence: freq.value,
      }),
    });
    const data = await res.json();
    if (data.clientSecret) {
      clientSecret.value = data.clientSecret;
      currentDonId.value = data.donId;
      step.value = 2;
      await nextTick();
      await initPaymentElement(data.clientSecret, data.publicKey);
    } else {
      errorMsg.value = data.erreur || "Erreur lors de la création du paiement.";
    }
  } catch (e) {
    errorMsg.value = "Impossible de contacter le serveur.";
  } finally {
    loadingIntent.value = false;
  }
}

async function initPaymentElement(secret, publicKey) {
  elementLoading.value = true;
  try {
    if (!stripe) {
      stripe = await loadStripe(publicKey);
    }

    elements = stripe.elements({
      clientSecret: secret,
      appearance: {
        theme: "stripe",
        variables: {
          colorPrimary: "#1a4a3a",
          colorBackground: "#faf9f6",
          colorText: "#2c3e2d",
          colorDanger: "#dc3545",
          fontFamily: '"DM Sans", sans-serif',
          borderRadius: "8px",
          spacingUnit: "4px",
        },
        rules: {
          ".Input": {
            border: "2px solid #e8e4da",
            boxShadow: "none",
            padding: "12px 16px",
          },
          ".Input:focus": {
            border: "2px solid #C9A84C",
            boxShadow: "none",
          },
          ".Label": {
            fontWeight: "500",
            fontSize: "12px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#6b7280",
          },
          ".Tab": {
            border: "2px solid #e8e4da",
            boxShadow: "none",
          },
          ".Tab:hover": {
            border: "2px solid #1a4a3a",
          },
          ".Tab--selected": {
            border: "2px solid #1a4a3a",
            backgroundColor: "#f0f7f4",
          },
          ".TabIcon--selected": {
            fill: "#1a4a3a",
          },
          ".TabLabel--selected": {
            color: "#1a4a3a",
          },
        },
      },
      locale: "fr",
    });

    paymentElement = elements.create("payment", {
      layout: { type: "tabs", defaultCollapsed: false },
      wallets: { applePay: "auto", googlePay: "auto" },
    });

    paymentElement.mount("#payment-element");
    paymentElement.on("ready", () => {
      elementLoading.value = false;
    });
  } catch (e) {
    elementLoading.value = false;
  }
}

async function confirmPayment() {
  payError.value = "";
  paying.value = true;

  try {
    const returnUrl = `${window.location.origin}/success?montant=${finalAmount.value}&don_id=${currentDonId.value}`;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        payment_method_data: {
          billing_details: {
            name: `${form.value.prenom} ${form.value.nom}`.trim() || "Donateur",
            email: form.value.email,
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      payError.value = error.message;
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      // Confirmer côté backend et mettre à jour la cagnotte
      await fetch(`${API}/api/stripe/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
          donId: currentDonId.value,
        }),
      });
      router.push({
        path: "/success",
        query: { montant: finalAmount.value, don_id: currentDonId.value },
      });
    }
  } catch (e) {
    payError.value = "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    paying.value = false;
  }
}

function goBack() {
  if (paymentElement) {
    paymentElement.unmount();
    paymentElement = null;
  }
  step.value = 1;
}

onMounted(() => {
  loadStats();
  loadDonateurs();
  if (route.query.montant) {
    const m = parseInt(route.query.montant);
    if ([10, 25, 50, 100, 250, 500].includes(m)) {
      chosen.value = m;
    } else {
      chosen.value = null;
      customAmt.value = String(m);
    }
  }
});
</script>

<style scoped>
.don-hero {
  position: relative;
  background: var(--emerald);
  padding: 9rem 0 5rem;
  overflow: hidden;
}
.don-hero-bg {
  position: absolute;
  inset: 0;
}
.don-hero-pattern {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.don-hero-content {
  position: relative;
  z-index: 1;
}
.don-hero-content h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--white);
  margin-bottom: 1rem;
}
.don-hero-content p {
  color: rgba(255, 255, 255, 0.7);
  max-width: 550px;
  font-size: 1.05rem;
  line-height: 1.7;
}

.don-progress {
  background: var(--white);
  padding: 2.5rem 0;
  box-shadow: var(--shadow-soft);
}
.loading-bar {
  text-align: center;
  color: var(--text-light);
  padding: 1rem;
  font-size: 0.9rem;
}
.progress-global {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}
.pg-amount {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--emerald);
}
.pg-subtitle {
  font-size: 0.85rem;
  color: var(--text-light);
}
.pg-mid {
  flex: 1;
}
.pg-bar-wrap {
  height: 10px;
  background: var(--cream-dark);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.pg-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
  border-radius: 5px;
  transition: width 1.5s ease;
}
.pg-bar-labels {
  font-size: 0.8rem;
  color: var(--text-light);
}
.pg-pct {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--gold);
}

.don-main {
  padding: 5rem 0 7rem;
  background: var(--cream);
}
.don-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 4rem;
  align-items: start;
}
.don-form-wrap {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-soft);
}
.don-form-wrap h2 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--emerald);
  margin-bottom: 1.75rem;
}

.form-amounts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.fa-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.85rem;
  border: 2px solid var(--cream-dark);
  background: var(--cream);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-body);
}
.fa-btn strong {
  font-size: 1.1rem;
  color: var(--emerald);
}
.fa-btn span {
  font-size: 0.72rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.fa-btn:hover {
  border-color: var(--gold);
}
.fa-btn.selected {
  background: var(--emerald);
  border-color: var(--emerald);
}
.fa-btn.selected strong,
.fa-btn.selected span {
  color: var(--white);
}

.form-divider {
  text-align: center;
  color: var(--text-light);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 1rem 0;
  position: relative;
}
.form-divider::before,
.form-divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 44%;
  height: 1px;
  background: var(--cream-dark);
}
.form-divider::before {
  left: 0;
}
.form-divider::after {
  right: 0;
}

.form-custom,
.form-type,
.form-field {
  margin-bottom: 1.25rem;
}
.form-custom label,
.form-type label,
.form-field label,
.form-section-title {
  display: block;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-mid);
  margin-bottom: 0.5rem;
}
.form-section-title {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: var(--emerald);
  border-bottom: 1px solid var(--cream-dark);
  padding-bottom: 0.5rem;
}
input[type="text"],
input[type="email"],
input[type="number"] {
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
  box-sizing: border-box;
}
input:focus {
  border-color: var(--gold);
  background: var(--white);
}

.type-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.type-btn {
  padding: 0.65rem;
  border: 2px solid var(--cream-dark);
  background: var(--cream);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: var(--transition);
}
.type-btn.selected {
  background: var(--emerald);
  border-color: var(--emerald);
  color: var(--white);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-anon {
  margin-bottom: 0.75rem;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.88rem;
  color: var(--text-mid);
}
.checkbox-label input[type="checkbox"] {
  display: none;
}
.checkbox-custom {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border: 2px solid var(--cream-dark);
  border-radius: 3px;
  background: var(--cream);
  transition: var(--transition);
  position: relative;
}
.checkbox-label input:checked + .checkbox-custom {
  background: var(--emerald);
  border-color: var(--emerald);
}
.checkbox-label input:checked + .checkbox-custom::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 700;
}

.error-msg {
  background: rgba(220, 53, 69, 0.08);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  font-size: 0.88rem;
  color: #dc3545;
  margin: 0.75rem 0;
}
.submit-btn {
  width: 100%;
  justify-content: center;
  font-size: 1.05rem;
  padding: 1rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
.form-secure {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-light);
  margin-top: 0.75rem;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Étape 2 */
.payment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--cream-dark);
}
.back-btn {
  background: none;
  border: none;
  color: var(--emerald);
  font-size: 0.9rem;
  cursor: pointer;
  font-family: var(--font-body);
  padding: 0;
}
.back-btn:hover {
  color: var(--gold);
}
.payment-summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-mid);
}
.payment-summary strong {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--emerald);
}
.payment-subtitle {
  color: var(--text-mid);
  font-size: 0.9rem;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
}

.element-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
}
.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--cream-dark);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}
#payment-element {
  margin-bottom: 1.5rem;
}
#payment-element.hidden {
  display: none;
}

/* Info cards */
.don-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.info-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-soft);
  border-left: 3px solid var(--gold);
}
.info-card-icon {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}
.info-card h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--emerald);
  margin-bottom: 0.5rem;
}
.info-card p {
  font-size: 0.88rem;
  color: var(--text-mid);
  line-height: 1.6;
}
.hadith-card {
  background: var(--emerald);
  border-color: var(--gold);
}
.hadith-arabic {
  font-size: 1.5rem;
  color: var(--gold);
  margin-bottom: 0.75rem;
  line-height: 1.8;
}
.hadith-text {
  color: rgba(255, 255, 255, 0.75) !important;
  font-style: italic;
  font-size: 0.88rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}
.hadith-ref {
  color: var(--gold-light) !important;
  font-size: 0.82rem;
}
.donors-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
}
.donors-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.donor-avatar {
  width: 36px;
  height: 36px;
  background: var(--emerald);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}
.donor-info {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
}
.donor-info strong {
  color: var(--text-dark);
}
.donor-info span {
  color: var(--text-light);
  font-size: 0.78rem;
}

@media (max-width: 768px) {
  .don-grid {
    grid-template-columns: 1fr;
  }
  .progress-global {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .form-amounts {
    grid-template-columns: repeat(2, 1fr);
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
