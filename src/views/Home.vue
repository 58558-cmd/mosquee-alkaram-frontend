<template>
  <div class="home">
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero-pattern">
        <svg
          class="pattern-svg"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="islamic"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <g stroke="#C9A84C" stroke-width="0.6" fill="none">
                <polygon
                  points="50,10 55,35 78,20 63,42 88,50 63,58 78,80 55,65 50,90 45,65 22,80 37,58 12,50 37,42 22,20 45,35"
                />
                <polygon
                  points="50,25 61,39 75,50 61,61 50,75 39,61 25,50 39,39"
                />
                <line x1="50" y1="0" x2="50" y2="100" />
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="0" y1="0" x2="100" y2="100" />
                <line x1="100" y1="0" x2="0" y2="100" />
              </g>
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#islamic)" />
        </svg>
      </div>
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-badge animate-fadeUp">
          <span class="arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        </div>
        <h1 class="hero-title animate-fadeUp delay-1">
          Mosquée<br />
          <em>Al-Karam</em>
        </h1>
        <p class="hero-subtitle animate-fadeUp delay-2">
          Un lieu de paix, de prière et de fraternité<br />
          au cœur de <strong>Forest, Bruxelles</strong>
        </p>
        <div class="hero-actions animate-fadeUp delay-3">
          <router-link to="/don" class="btn-gold"
            >❤ Soutenir notre mosquée</router-link
          >
          <a href="#about" class="btn-outline">Découvrir</a>
        </div>
        <div class="hero-address animate-fadeUp delay-4">
          <span>Chaussée de Neerstalle 52, 1190 Forest, Bruxelles</span>
        </div>
      </div>
      <div class="scroll-hint">
        <div class="scroll-dot"></div>
        <span>Défiler</span>
      </div>
    </section>

    <!-- ===== ABOUT ===== -->
    <section id="about" class="about-section">
      <div class="container about-grid">
        <div class="about-visual">
          <div class="about-ornament">
            <svg viewBox="0 0 300 300" class="ornament-svg">
              <defs>
                <pattern
                  id="ornam"
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <g
                    stroke="#C9A84C"
                    stroke-width="0.5"
                    fill="none"
                    opacity="0.4"
                  >
                    <polygon
                      points="30,5 33,22 48,18 38,30 48,42 33,38 30,55 27,38 12,42 22,30 12,18 27,22"
                    />
                  </g>
                </pattern>
              </defs>
              <rect width="300" height="300" fill="url(#ornam)" />
              <g transform="translate(150,150)" stroke="#C9A84C" fill="none">
                <polygon
                  points="0,-80 20,-30 75,-25 35,10 50,65 0,35 -50,65 -35,10 -75,-25 -20,-30"
                  stroke-width="1.5"
                />
                <circle r="45" stroke-width="1" />
                <circle r="60" stroke-width="0.5" stroke-dasharray="4,4" />
                <circle r="20" fill="#C9A84C" opacity="0.15" />
                <circle r="8" fill="#C9A84C" opacity="0.6" />
              </g>
            </svg>
          </div>
          <div class="about-card">
            <div class="about-card-quote arabic">
              «إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ»
            </div>
            <p>
              «Seuls ceux qui croient en Allah édifient les mosquées d'Allah» —
              Sourate At-Tawbah, 18
            </p>
          </div>
        </div>
        <div class="about-text">
          <p class="section-label">Notre mosquée</p>
          <h2 class="section-title">Al-Karam, bien plus qu'une mosquée</h2>
          <div class="divider-gold"></div>
          <p class="about-body">
            Implantée au cœur de <strong>Forest</strong>, Chaussée de Neerstalle
            52, la Mosquée Al-Karam est un espace sacré et vivant où les fidèles
            se retrouvent chaque jour pour la prière, l'apprentissage et le lien
            social.
          </p>
          <p class="about-body">
            Al-Karam — qui signifie <em>la générosité</em> en arabe — accueille
            des familles de tout horizon, propose des cours de langue arabe pour
            les enfants, et contribue activement à la cohésion sociale de notre
            quartier.
          </p>
          <div class="about-features">
            <div class="feature" v-for="f in features" :key="f.title">
              <div class="feature-icon">{{ f.icon }}</div>
              <div>
                <strong>{{ f.title }}</strong>
                <p>{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PROJET D'AGRANDISSEMENT ===== -->
    <section class="project-section">
      <div class="project-bg">
        <svg
          class="project-pattern"
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="proj-pat"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <g stroke="#ffffff" stroke-width="0.4" fill="none" opacity="0.08">
                <polygon
                  points="40,5 44,28 62,25 50,40 62,55 44,52 40,75 36,52 18,55 30,40 18,25 36,28"
                />
              </g>
            </pattern>
          </defs>
          <rect width="600" height="600" fill="url(#proj-pat)" />
        </svg>
      </div>
      <div class="container">
        <div class="project-header">
          <p class="section-label" style="color: var(--gold-light)">
            Notre ambition
          </p>
          <h2 class="section-title" style="color: var(--white)">
            Projet d'agrandissement
          </h2>
          <div class="divider-gold"></div>
          <p class="project-intro">
            Notre mosquée est trop petite pour accueillir tous les fidèles,
            notamment lors du Jumu'ah et du Ramadan. Votre soutien nous
            permettra d'agrandir et de rénover notre espace pour la communauté.
          </p>
        </div>

        <div class="progress-card">
          <div
            v-if="statsLoading"
            style="
              color: rgba(255, 255, 255, 0.5);
              text-align: center;
              padding: 1rem;
            "
          >
            Chargement...
          </div>
          <div v-else>
            <div class="progress-header">
              <div>
                <div class="progress-amount">
                  {{ formatEuro(stats.totalCollecte) }}
                </div>
                <div class="progress-label">
                  collectés sur {{ formatEuro(stats.objectif) }}
                </div>
              </div>
              <div class="progress-pct">
                {{ Math.round(stats.pourcentage) }}%
              </div>
            </div>
            <div class="progress-bar-wrap">
              <div
                class="progress-bar-fill"
                :style="{ width: Math.min(stats.pourcentage, 100) + '%' }"
              ></div>
            </div>
            <div class="progress-info">
              <span>Objectif : {{ formatEuro(stats.objectif) }}</span>
              <span>{{ Math.round(stats.pourcentage) }}% atteint</span>
            </div>
          </div>
        </div>

        <div class="needs-grid">
          <div class="need-card" v-for="need in needs" :key="need.title">
            <div class="need-icon">{{ need.icon }}</div>
            <h3>{{ need.title }}</h3>
            <p>{{ need.desc }}</p>
            <div class="need-amount">{{ formatEuro(need.amount) }}</div>
          </div>
        </div>

        <div class="project-cta">
          <router-link
            to="/don"
            class="btn-gold"
            style="font-size: 1.05rem; padding: 1rem 2.5rem"
          >
            ❤ Contribuer au projet
          </router-link>
          <p class="project-cta-note">
            Chaque don compte. Que ce soit 5€ ou 500€, votre générosité est
            précieuse.
          </p>
        </div>
      </div>
    </section>

    <!-- ===== HORAIRES ===== -->
    <section class="horaires-section">
      <div class="container">
        <div class="horaires-header">
          <p class="section-label">Salat</p>
          <h2 class="section-title">Horaires de prière du jour</h2>
          <div class="divider-gold"></div>
          <p style="color: var(--text-mid)">
            Horaires calculés pour <strong>Forest, Bruxelles</strong> — mis à
            jour quotidiennement
          </p>
        </div>

        <div v-if="prayersLoading" class="prayers-loading">
          <div class="loading-spinner"></div>
          <span>Chargement des horaires...</span>
        </div>
        <div v-else-if="prayersError" class="prayers-error">
          ⚠️ Impossible de charger les horaires. Veuillez réessayer plus tard.
        </div>
        <div v-else class="prayers-grid">
          <div
            v-for="prayer in prayers"
            :key="prayer.name"
            :class="['prayer-card', { active: prayer.isNext }]"
          >
            <div class="prayer-arabic arabic">{{ prayer.arabic }}</div>
            <div class="prayer-name">{{ prayer.name }}</div>
            <div class="prayer-time">{{ prayer.time }}</div>
            <div class="prayer-sun">{{ prayer.sun }}</div>
            <div v-if="prayer.isNext" class="prayer-next-badge">Prochaine</div>
          </div>
        </div>

        <div class="juma-banner">
          <div class="juma-content">
            <div class="juma-icon">🕌</div>
            <div>
              <h3>Prière du Vendredi (Jumu'ah)</h3>
              <p>Khutbah et prière chaque vendredi à la mosquée Al-Karam</p>
            </div>
            <div class="juma-time">{{ jumuahTime }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== ACTIVITÉS ===== -->
    <section class="activites-home">
      <div class="container">
        <p class="section-label">Programmes</p>
        <h2 class="section-title">Nos activités</h2>
        <div class="divider-gold"></div>
        <div class="act-home-grid">
          <div class="act-home-card" v-for="act in activites" :key="act.title">
            <div class="act-home-icon">{{ act.icon }}</div>
            <h3>{{ act.title }}</h3>
            <p>{{ act.desc }}</p>
            <div class="act-home-schedule">{{ act.schedule }}</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 2.5rem">
          <router-link
            to="/activites"
            class="btn-outline"
            style="color: var(--emerald); border-color: var(--emerald)"
          >
            Voir toutes les activités →
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===== DON RAPIDE ===== -->
    <section class="quick-don-section">
      <div class="container quick-don-inner">
        <div class="quick-don-text">
          <p class="section-label">Sadaqa jariya</p>
          <h2 class="section-title">Votre don, une aumône perpétuelle</h2>
          <div class="divider-gold"></div>
          <p>
            Le Prophète ﷺ a dit :
            <em
              >«Quand l'homme meurt, ses actions s'arrêtent sauf trois : une
              aumône perpétuelle, une science dont on tire profit, ou un enfant
              pieux qui prie pour lui.»</em
            >
          </p>
          <p style="margin-top: 1rem; color: var(--text-mid)">
            Contribuer à l'agrandissement d'une mosquée est parmi les plus
            belles sadaqa jariya.
          </p>
        </div>
        <div class="quick-don-box">
          <h3>Faire un don rapide</h3>
          <div class="amount-grid">
            <button
              v-for="a in amounts"
              :key="a"
              :class="['amount-btn', { selected: selectedAmount === a }]"
              @click="
                selectedAmount = a;
                customAmount = '';
              "
            >
              {{ a }}€
            </button>
          </div>
          <div class="custom-amount">
            <input
              type="number"
              v-model="customAmount"
              placeholder="Autre montant (€)"
              @focus="selectedAmount = null"
              min="1"
            />
          </div>
          <router-link
            :to="{
              path: '/don',
              query: { montant: selectedAmount || customAmount },
            }"
            class="btn-gold"
            style="width: 100%; justify-content: center; margin-top: 0.5rem"
          >
            Faire un don de {{ selectedAmount || customAmount || "?" }}€ →
          </router-link>
          <p class="don-note">Paiement sécurisé.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const API = "http://localhost:8080";

const stats = ref({ totalCollecte: 0, objectif: 258000, pourcentage: 0 });
const statsLoading = ref(true);
const prayers = ref([]);
const prayersLoading = ref(true);
const prayersError = ref(false);
const jumuahTime = ref("13h00");
const selectedAmount = ref(25);
const customAmount = ref("");
const amounts = [10, 25, 50, 100, 250];

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
    stats.value.pourcentage =
      (stats.value.totalCollecte / stats.value.objectif) * 100;
  } finally {
    statsLoading.value = false;
  }
}

async function loadConfig() {
  try {
    const res = await fetch(`${API}/api/config/contact`);
    if (res.ok) {
      const data = await res.json();
      if (data.jumuahTime) jumuahTime.value = data.jumuahTime.replace(":", "h");
    }
  } catch {}
}

async function loadPrayerTimes() {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const now = today.getHours() * 60 + today.getMinutes();
    const res = await fetch(
      `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=50.8175&longitude=4.3335&method=3`,
    );
    const data = await res.json();
    const timings = data.data.timings;
    const rawPrayers = [
      {
        name: "Fajr",
        arabic: "الفجر",
        time: timings.Fajr,
        sun: "🌙 Avant l'aube",
      },
      { name: "Dhuhr", arabic: "الظهر", time: timings.Dhuhr, sun: "☀️ Midi" },
      { name: "Asr", arabic: "العصر", time: timings.Asr, sun: "🌤 Après-midi" },
      {
        name: "Maghrib",
        arabic: "المغرب",
        time: timings.Maghrib,
        sun: "🌅 Coucher du soleil",
      },
      { name: "Isha", arabic: "العشاء", time: timings.Isha, sun: "🌙 Nuit" },
    ];
    let nextFound = false;
    prayers.value = rawPrayers.map((p) => {
      const [h, m] = p.time.split(":").map(Number);
      const pMin = h * 60 + m;
      const isNext = !nextFound && pMin > now;
      if (isNext) nextFound = true;
      return { ...p, isNext };
    });
  } catch (e) {
    prayersError.value = true;
  } finally {
    prayersLoading.value = false;
  }
}

const features = [
  {
    icon: "🕌",
    title: "Prière quotidienne",
    desc: "Les 5 prières célébrées en jamaah chaque jour",
  },
  {
    icon: "📖",
    title: "Cours d'arabe",
    desc: "Enseignement de l'arabe pour les enfants, sam. & dim.",
  },
  {
    icon: "🤝",
    title: "Cohésion sociale",
    desc: "Événements communautaires ouverts à tous",
  },
];

const needs = [
  {
    icon: "🏗️",
    title: "Extension de la mosquée",
    desc: "Agrandissement pour accueillir davantage de fidèles lors du Jumu'ah et du Ramadan",
    amount: 250000,
  },
];

const activites = computed(() => [
  {
    icon: "🔤",
    title: "Cours d'arabe — Enfants",
    desc: "Apprentissage de la langue arabe pour les enfants dans une ambiance bienveillante et structurée.",
    schedule: "📅 Samedi & Dimanche • 10h00 – 14h00",
  },
  {
    icon: "📖",
    title: "Cours d'arabe & Coran — Adultes",
    desc: "Cours en projet pour adultes : langue arabe et récitation du Coran. Lancement très prochainement.",
    schedule: "🔜 Bientôt disponible",
  },
  {
    icon: "🕌",
    title: "Prière du Vendredi",
    desc: "Khutbah et Jumu'ah chaque vendredi. Venez nombreux renforcer les liens de la communauté.",
    schedule: `📅 Chaque vendredi • ${jumuahTime.value}`,
  },
]);

onMounted(async () => {
  await loadConfig();
  loadStats();
  loadPrayerTimes();
});
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--emerald);
  overflow: hidden;
}
.hero-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.12;
}
.pattern-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: patternRotate 120s linear infinite;
  transform-origin: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(26, 74, 58, 0.7) 0%,
    rgba(26, 74, 58, 0.4) 50%,
    rgba(26, 74, 58, 0.8) 100%
  );
}
.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 8rem;
  padding-bottom: 5rem;
}
.hero-badge {
  display: inline-block;
  font-family: var(--font-arabic);
  font-size: 1.1rem;
  color: var(--gold-light);
  background: rgba(201, 168, 76, 0.12);
  border: 1px solid rgba(201, 168, 76, 0.3);
  padding: 0.5rem 1.25rem;
  border-radius: 2px;
  margin-bottom: 1.75rem;
  opacity: 0;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 8vw, 7rem);
  font-weight: 700;
  color: var(--white);
  line-height: 1.05;
  margin-bottom: 1.5rem;
  opacity: 0;
}
.hero-title em {
  font-style: normal;
  color: var(--gold);
  display: block;
}
.hero-subtitle {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 2.5rem;
  line-height: 1.7;
  opacity: 0;
}
.hero-subtitle strong {
  color: var(--white);
}
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  opacity: 0;
}
.hero-address {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  opacity: 0;
}
.scroll-hint {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.scroll-dot {
  width: 6px;
  height: 6px;
  background: var(--gold);
  border-radius: 50%;
  animation: pulse-gold 2s ease-in-out infinite;
}

.about-section {
  padding: 7rem 0;
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 5rem;
  align-items: center;
}
.about-visual {
  position: relative;
}
.about-ornament {
  width: 100%;
  aspect-ratio: 1;
  max-width: 380px;
  margin: 0 auto;
}
.ornament-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 8px 40px rgba(201, 168, 76, 0.15));
  animation: patternRotate 60s linear infinite;
}
.about-card {
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  background: var(--emerald);
  color: var(--white);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  max-width: 260px;
  box-shadow: var(--shadow-soft);
  border-left: 3px solid var(--gold);
}
.about-card-quote {
  font-family: var(--font-arabic);
  font-size: 2rem;
  color: var(--gold-light);
  margin-bottom: 0.5rem;
}
.about-card p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.65);
  font-style: italic;
  line-height: 1.5;
}
.about-body {
  color: var(--text-mid);
  margin-bottom: 1rem;
  line-height: 1.8;
}
.about-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}
.feature {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem 1.25rem;
  background: var(--cream-dark);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--gold);
  transition: var(--transition);
}
.feature:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-soft);
}
.feature-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}
.feature strong {
  display: block;
  color: var(--emerald);
  margin-bottom: 0.2rem;
}
.feature p {
  font-size: 0.85rem;
  color: var(--text-mid);
  margin: 0;
}

.project-section {
  position: relative;
  background: var(--emerald);
  padding: 7rem 0;
  overflow: hidden;
}
.project-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.project-pattern {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.project-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}
.project-header .divider-gold {
  margin: 0 auto 1.5rem;
}
.project-intro {
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.05rem;
}
.progress-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: var(--radius-lg);
  padding: 2rem 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(8px);
}
.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}
.progress-amount {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--gold);
}
.progress-label {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.85rem;
}
.progress-pct {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--white);
  opacity: 0.15;
}
.progress-bar-wrap {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
  border-radius: 4px;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 12px rgba(201, 168, 76, 0.5);
}
.progress-info {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}
.needs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}
.need-card:only-child {
  grid-column: 1/-1;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
}
.need-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(201, 168, 76, 0.15);
  border-radius: var(--radius-md);
  padding: 1.75rem 1.5rem;
  text-align: center;
  transition: var(--transition);
}
.need-card:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(201, 168, 76, 0.4);
  transform: translateY(-4px);
}
.need-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}
.need-card h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--white);
  margin-bottom: 0.5rem;
}
.need-card p {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
  margin-bottom: 1rem;
}
.need-amount {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--gold);
}
.project-cta {
  text-align: center;
  position: relative;
  z-index: 1;
}
.project-cta-note {
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
}

.horaires-section {
  padding: 7rem 0;
  background: var(--cream-dark);
}
.horaires-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
.horaires-header .divider-gold {
  margin: 0 auto 1.5rem;
}
.prayers-loading,
.prayers-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--text-light);
  font-size: 0.95rem;
}
.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--cream-dark);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.prayers-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}
.prayer-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 1.75rem 1rem;
  text-align: center;
  border: 2px solid transparent;
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  position: relative;
}
.prayer-card:hover {
  border-color: var(--gold);
  transform: translateY(-4px);
  box-shadow: var(--shadow-gold);
}
.prayer-card.active {
  background: var(--emerald);
  border-color: var(--gold);
}
.prayer-arabic {
  font-family: var(--font-arabic);
  font-size: 2rem;
  color: var(--gold);
  margin-bottom: 0.5rem;
  display: block;
}
.prayer-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--emerald);
  margin-bottom: 0.5rem;
}
.prayer-card.active .prayer-name {
  color: var(--white);
}
.prayer-time {
  font-size: 1.6rem;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--emerald);
  margin-bottom: 0.3rem;
}
.prayer-card.active .prayer-time {
  color: var(--gold);
}
.prayer-sun {
  font-size: 0.75rem;
  color: var(--text-light);
}
.prayer-card.active .prayer-sun {
  color: rgba(255, 255, 255, 0.5);
}
.prayer-next-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gold);
  color: var(--white);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  white-space: nowrap;
}
.juma-banner {
  background: linear-gradient(135deg, var(--emerald), var(--emerald-mid));
  border-radius: var(--radius-md);
  padding: 1.75rem 2rem;
  border: 1px solid rgba(201, 168, 76, 0.25);
}
.juma-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.juma-icon {
  font-size: 2rem;
}
.juma-content h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--white);
  margin-bottom: 0.25rem;
}
.juma-content p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}
.juma-time {
  margin-left: auto;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--gold);
  white-space: nowrap;
}

.activites-home {
  padding: 7rem 0;
  background: var(--cream);
}
.act-home-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.act-home-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-soft);
  border-top: 3px solid var(--gold);
  transition: var(--transition);
}
.act-home-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-gold);
}
.act-home-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}
.act-home-card h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--emerald);
  margin-bottom: 0.5rem;
}
.act-home-card p {
  font-size: 0.88rem;
  color: var(--text-mid);
  line-height: 1.6;
  margin-bottom: 1rem;
}
.act-home-schedule {
  font-size: 0.82rem;
  color: var(--gold-dark);
  font-weight: 500;
}

.quick-don-section {
  padding: 7rem 0;
  background: var(--cream-dark);
}
.quick-don-inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5rem;
  align-items: center;
}
.quick-don-text p {
  color: var(--text-mid);
  line-height: 1.8;
}
.quick-don-text em {
  color: var(--emerald);
  font-style: italic;
}
.quick-don-box {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--cream-dark);
}
.quick-don-box h3 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--emerald);
  margin-bottom: 1.5rem;
  text-align: center;
}
.amount-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.amount-btn {
  padding: 0.65rem 0.5rem;
  border: 2px solid var(--cream-dark);
  background: var(--cream);
  color: var(--text-dark);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}
.amount-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}
.amount-btn.selected {
  background: var(--emerald);
  border-color: var(--emerald);
  color: var(--white);
}
.custom-amount {
  margin-bottom: 1rem;
}
.custom-amount input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--cream-dark);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text-dark);
  background: var(--cream);
  transition: var(--transition);
  outline: none;
}
.custom-amount input:focus {
  border-color: var(--gold);
  background: var(--white);
}
.don-note {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-light);
  margin-top: 0.75rem;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .prayers-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .quick-don-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .act-home-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 768px) {
  .prayers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .juma-content {
    flex-wrap: wrap;
  }
  .juma-time {
    margin-left: 0;
  }
  .amount-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .act-home-grid {
    grid-template-columns: 1fr;
  }
}
</style>
