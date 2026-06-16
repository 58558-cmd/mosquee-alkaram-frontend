<template>
  <div class="activites-page">
    <!-- Hero -->
    <section class="act-hero">
      <div class="act-hero-overlay"></div>
      <div class="container act-hero-content">
        <p class="section-label" style="color: var(--gold-light)">Programme</p>
        <h1>Activités & Horaires</h1>
        <p>Prières, cours et vie communautaire à la Mosquée Al-Karam</p>
      </div>
    </section>

    <!-- ===== HORAIRES DYNAMIQUES ===== -->
    <section class="prayers-section">
      <div class="container">
        <div class="prayers-header">
          <p class="section-label">Salat</p>
          <h2 class="section-title">Horaires de prière</h2>
          <div class="divider-gold"></div>
          <p class="prayers-subtitle">
            Horaires du <strong>{{ todayLabel }}</strong> — calculés pour
            <strong>Forest, Bruxelles</strong>
          </p>
        </div>

        <!-- Loading -->
        <div v-if="prayersLoading" class="prayers-loading">
          <div class="loading-spinner"></div>
          <span>Chargement des horaires...</span>
        </div>

        <!-- Erreur -->
        <div v-else-if="prayersError" class="prayers-error">
          ⚠️ Impossible de charger les horaires. Veuillez réessayer.
        </div>

        <!-- Grille des prières -->
        <div v-else class="prayers-showcase">
          <div
            v-for="prayer in prayers"
            :key="prayer.name"
            :class="[
              'prayer-showcase-card',
              { active: prayer.isNext, past: prayer.isPast },
            ]"
          >
            <div class="psc-top">
              <span class="psc-arabic arabic">{{ prayer.arabic }}</span>
              <span v-if="prayer.isNext" class="psc-badge">Prochaine</span>
              <span v-if="prayer.isPast" class="psc-badge-past">Passée</span>
            </div>
            <div class="psc-name">{{ prayer.name }}</div>
            <div class="psc-time">{{ prayer.time }}</div>
            <div class="psc-icon">{{ prayer.icon }}</div>
          </div>
        </div>

        <!-- Jumu'ah -->
        <div class="juma-card">
          <div class="juma-ornament">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <polygon
                points="30,5 33,22 48,18 38,30 48,42 33,38 30,55 27,38 12,42 22,30 12,18 27,22"
                stroke="#C9A84C"
                stroke-width="1"
                fill="none"
              />
              <circle cx="30" cy="30" r="8" fill="#C9A84C" opacity="0.2" />
              <circle cx="30" cy="30" r="4" fill="#C9A84C" />
            </svg>
          </div>
          <div class="juma-info">
            <div class="juma-label">Prière du Vendredi</div>
            <h3 class="juma-title">Jumu'ah — صلاة الجمعة</h3>
            <p>
              Khutbah et prière chaque vendredi à la Mosquée Al-Karam.<br />
              Venez nombreux renforcer les liens de la communauté.
            </p>
          </div>
          <div class="juma-time-display">
            <div class="juma-time-label">Heure</div>
            <div class="juma-time-value">{{ jumuahTime }}</div>
            <div class="juma-time-sub">Chaque vendredi</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== ACTIVITÉS ===== -->
    <section class="act-section">
      <div class="container">
        <p class="section-label">Programmes</p>
        <h2 class="section-title">Nos activités</h2>
        <div class="divider-gold"></div>

        <div class="act-grid">
          <div class="act-card" v-for="act in activities" :key="act.title">
            <div class="act-card-top">
              <div class="act-icon">{{ act.icon }}</div>
              <div class="act-badge" :class="act.status">
                {{ act.statusLabel }}
              </div>
            </div>
            <h3>{{ act.title }}</h3>
            <p>{{ act.desc }}</p>
            <div class="act-schedule">
              <span v-for="s in act.schedule" :key="s" class="schedule-item">
                📅 {{ s }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== ÉVÉNEMENTS ===== -->
    <section class="events-section">
      <div class="container">
        <p class="section-label">À venir</p>
        <h2 class="section-title">Événements</h2>
        <div class="divider-gold"></div>

        <!-- Chargement -->
        <div v-if="eventsLoading" class="prayers-loading">
          <div class="loading-spinner"></div>
          <span>Chargement...</span>
        </div>

        <!-- Aucun événement -->
        <div v-else-if="evenements.length === 0" class="no-events">
          <div class="no-events-icon">🗓️</div>
          <h3>Aucun événement programmé pour le moment</h3>
          <p>
            Des conférences, collectes et activités communautaires sont en cours
            de préparation.<br />
            Revenez bientôt ou suivez-nous sur les réseaux sociaux pour être
            informé.
          </p>
        </div>

        <!-- Liste événements -->
        <div v-else class="events-grid">
          <div class="event-card" v-for="ev in evenements" :key="ev.id">
            <div class="event-card-top">
              <span
                class="event-tag"
                :style="{ background: ev.tagColor || '#1a4a3a' }"
                >{{ ev.tag }}</span
              >
              <span class="event-date">{{ formatDate(ev.dateEvenement) }}</span>
            </div>
            <h3>{{ ev.titre }}</h3>
            <p>{{ ev.description }}</p>
            <div class="event-meta" v-if="ev.heure || ev.lieu">
              <span v-if="ev.heure">🕐 {{ ev.heure }}</span>
              <span v-if="ev.lieu">📍 {{ ev.lieu }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const prayers = ref([]);
const prayersLoading = ref(true);
const prayersError = ref(false);
const todayLabel = ref("");
const evenements = ref([]);
const eventsLoading = ref(true);

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function loadEvenements() {
  try {
    const res = await fetch("http://localhost:8080/api/evenements/public");
    if (res.ok) evenements.value = await res.json();
  } catch (e) {
    evenements.value = [];
  } finally {
    eventsLoading.value = false;
  }
}

async function loadPrayerTimes() {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const now = today.getHours() * 60 + today.getMinutes();

    // Format date en français
    todayLabel.value = today.toLocaleDateString("fr-BE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const res = await fetch(
      `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=50.8175&longitude=4.3335&method=3`,
    );
    const data = await res.json();
    const t = data.data.timings;

    const rawPrayers = [
      { name: "Fajr", arabic: "الفجر", time: t.Fajr, icon: "🌙" },
      { name: "Dhuhr", arabic: "الظهر", time: t.Dhuhr, icon: "☀️" },
      { name: "Asr", arabic: "العصر", time: t.Asr, icon: "🌤️" },
      { name: "Maghrib", arabic: "المغرب", time: t.Maghrib, icon: "🌅" },
      { name: "Isha", arabic: "العشاء", time: t.Isha, icon: "🌙" },
    ];

    let nextFound = false;
    prayers.value = rawPrayers.map((p) => {
      const [h, m] = p.time.split(":").map(Number);
      const pMin = h * 60 + m;
      const isPast = pMin < now;
      const isNext = !nextFound && !isPast;
      if (isNext) nextFound = true;
      return { ...p, isNext, isPast };
    });
  } catch (e) {
    prayersError.value = true;
  } finally {
    prayersLoading.value = false;
  }
}

const activities = [
  {
    icon: "🔤",
    title: "Cours d'arabe — Enfants",
    desc: "Apprentissage de la langue arabe pour les enfants dans une ambiance bienveillante et structurée, encadrée par des professeurs qualifiés.",
    status: "active",
    statusLabel: "En cours",
    schedule: ["Samedi 10h00 – 14h00", "Dimanche 10h00 – 14h00"],
  },
  {
    icon: "📖",
    title: "Cours d'arabe & Coran — Adultes",
    desc: "Cours d'arabe et de récitation du Coran pour adultes, en cours d'organisation. Inscrivez-vous pour être informé du lancement.",
    status: "soon",
    statusLabel: "Bientôt",
    schedule: ["Dates à confirmer"],
  },
  {
    icon: "🕌",
    title: "Prière du Vendredi — Jumu'ah",
    desc: "Khutbah et prière du vendredi chaque semaine. Un moment fort de rassemblement et de spiritualité pour toute la communauté.",
    status: "active",
    statusLabel: "Hebdomadaire",
    schedule: ["Chaque vendredi à 13h00"],
  },
];

onMounted(() => {
  loadPrayerTimes();
  loadEvenements();
});
</script>

<style scoped>
/* Hero */
.act-hero {
  position: relative;
  background: var(--emerald);
  padding: 9rem 0 5rem;
  overflow: hidden;
}
.act-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.3' opacity='0.15'%3E%3Cpolygon points='30,3 33,18 45,15 37,25 45,35 33,32 30,47 27,32 15,35 23,25 15,15 27,18'/%3E%3C/g%3E%3C/svg%3E")
    repeat;
}
.act-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(26, 74, 58, 0.92),
    rgba(45, 107, 84, 0.75)
  );
}
.act-hero-content {
  position: relative;
  z-index: 1;
}
.act-hero-content h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--white);
  margin-bottom: 1rem;
}
.act-hero-content p {
  color: rgba(255, 255, 255, 0.65);
  font-size: 1.05rem;
}

/* Prayers section */
.prayers-section {
  padding: 6rem 0;
  background: var(--cream);
}
.prayers-header {
  text-align: center;
  margin-bottom: 3rem;
}
.prayers-header .divider-gold {
  margin: 0 auto 1.5rem;
}
.prayers-subtitle {
  color: var(--text-mid);
  font-size: 0.95rem;
}

.prayers-loading,
.prayers-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem;
  color: var(--text-light);
}
.loading-spinner {
  width: 28px;
  height: 28px;
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

/* Prayer showcase */
.prayers-showcase {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.prayer-showcase-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2rem 1.25rem;
  text-align: center;
  box-shadow: var(--shadow-soft);
  border: 2px solid transparent;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}
.prayer-showcase-card::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}
.prayer-showcase-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-gold);
  border-color: rgba(201, 168, 76, 0.3);
}
.prayer-showcase-card:hover::before {
  transform: scaleX(1);
}

.prayer-showcase-card.active {
  background: linear-gradient(145deg, var(--emerald), var(--emerald-mid));
  border-color: var(--gold);
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(26, 74, 58, 0.3);
}
.prayer-showcase-card.active::before {
  transform: scaleX(1);
}

.prayer-showcase-card.past {
  opacity: 0.5;
}

.psc-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  min-height: 28px;
}
.psc-arabic {
  font-family: var(--font-arabic);
  font-size: 1.3rem;
  color: var(--gold);
}
.prayer-showcase-card.active .psc-arabic {
  color: var(--gold-light);
}

.psc-badge {
  background: var(--gold);
  color: var(--white);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
}
.psc-badge-past {
  background: rgba(0, 0, 0, 0.1);
  color: var(--text-light);
  font-size: 0.6rem;
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
}

.psc-name {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--emerald);
  margin-bottom: 0.75rem;
}
.prayer-showcase-card.active .psc-name {
  color: var(--white);
}

.psc-time {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--emerald);
  margin-bottom: 0.5rem;
  line-height: 1;
}
.prayer-showcase-card.active .psc-time {
  color: var(--gold);
}

.psc-icon {
  font-size: 1.2rem;
  opacity: 0.6;
}

/* Jumu'ah card */
.juma-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, var(--emerald), var(--emerald-mid));
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  border: 1px solid rgba(201, 168, 76, 0.3);
  box-shadow: 0 8px 40px rgba(26, 74, 58, 0.2);
}
.juma-ornament {
  flex-shrink: 0;
}
.juma-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.4rem;
}
.juma-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--white);
  margin-bottom: 0.5rem;
}
.juma-info p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.6;
}
.juma-time-display {
  margin-left: auto;
  text-align: center;
  flex-shrink: 0;
}
.juma-time-label {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.25rem;
}
.juma-time-value {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}
.juma-time-sub {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 0.25rem;
}

/* Activités */
.act-section {
  padding: 6rem 0;
  background: var(--cream-dark);
}
.act-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.act-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}
.act-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
}
.act-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-gold);
}
.act-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}
.act-icon {
  font-size: 2rem;
}
.act-badge {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
}
.act-badge.active {
  background: rgba(26, 74, 58, 0.1);
  color: var(--emerald);
}
.act-badge.soon {
  background: rgba(201, 168, 76, 0.12);
  color: var(--gold-dark);
}
.act-card h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--emerald);
  margin-bottom: 0.6rem;
}
.act-card p {
  font-size: 0.88rem;
  color: var(--text-mid);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}
.act-schedule {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.schedule-item {
  font-size: 0.82rem;
  color: var(--gold-dark);
  font-weight: 500;
}

/* Événements */
.events-section {
  padding: 6rem 0 7rem;
  background: var(--cream);
}
.no-events {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--white);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--cream-dark);
  max-width: 600px;
  margin: 0 auto;
}
.no-events-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}
.no-events h3 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--emerald);
  margin-bottom: 0.75rem;
}
.no-events p {
  color: var(--text-mid);
  font-size: 0.9rem;
  line-height: 1.7;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.event-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  box-shadow: var(--shadow-soft);
  border-top: 3px solid var(--gold);
  transition: var(--transition);
}
.event-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-gold);
}
.event-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.event-tag {
  font-size: 0.72rem;
  font-weight: 600;
  color: #fff;
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
}
.event-date {
  font-size: 0.8rem;
  color: var(--text-light);
}
.event-card h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--emerald);
  margin-bottom: 0.6rem;
}
.event-card p {
  font-size: 0.88rem;
  color: var(--text-mid);
  line-height: 1.6;
  margin-bottom: 1rem;
}
.event-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.82rem;
  color: var(--gold-dark);
  font-weight: 500;
}

@media (max-width: 768px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .prayers-showcase {
    grid-template-columns: repeat(3, 1fr);
  }
  .act-grid {
    grid-template-columns: 1fr 1fr;
  }
  .juma-card {
    flex-wrap: wrap;
  }
  .juma-time-display {
    margin-left: 0;
  }
}
@media (max-width: 768px) {
  .prayers-showcase {
    grid-template-columns: repeat(2, 1fr);
  }
  .act-grid {
    grid-template-columns: 1fr;
  }
}
</style>
