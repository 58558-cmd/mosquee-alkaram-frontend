<template>
  <div class="success-page">
    <div class="success-container">
      <div class="success-ornament">
        <svg width="80" height="80" viewBox="0 0 60 60" fill="none">
          <polygon
            points="30,3 33,18 45,15 37,25 45,35 33,32 30,47 27,32 15,35 23,25 15,15 27,18"
            stroke="#C9A84C"
            stroke-width="1.5"
            fill="none"
          />
          <circle cx="30" cy="30" r="8" fill="#C9A84C" opacity="0.2" />
          <circle cx="30" cy="30" r="4" fill="#C9A84C" />
        </svg>
      </div>
      <div class="success-check">✓</div>
      <h1>JazakAllah Khayran !</h1>
      <div class="arabic success-arabic">جَزَاكَ اللَّهُ خَيْرًا</div>
      <p class="success-msg">
        Votre don de <strong>{{ route.query.montant }}€</strong> a bien été
        reçu.<br />
        Qu'Allah vous récompense en ce monde et dans l'au-delà.
      </p>
      <div class="success-hadith">
        <span class="arabic"
          >«مَنْ بَنَى مَسْجِدًا لِلَّهِ، بَنَى اللَّهُ لَهُ بَيْتًا فِي
          الْجَنَّةِ»</span
        >
        <span
          >«Celui qui construit une mosquée pour Allah, Allah lui construira une
          maison au Paradis.» — Sahih Muslim</span
        >
      </div>
      <div class="success-actions">
        <router-link to="/" class="btn-gold">Retour à l'accueil</router-link>
        <router-link
          to="/don"
          class="btn-outline"
          style="color: var(--emerald); border-color: var(--emerald)"
        >
          Faire un autre don
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  background: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
}
.success-container {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 4rem 3rem;
  max-width: 580px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-soft);
  border-top: 4px solid var(--gold);
}
.success-ornament {
  margin-bottom: 1rem;
}
.success-check {
  width: 64px;
  height: 64px;
  background: var(--emerald);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
}
.success-container h1 {
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: var(--emerald);
  margin-bottom: 0.5rem;
}
.success-arabic {
  font-family: var(--font-arabic);
  font-size: 1.5rem;
  color: var(--gold);
  display: block;
  margin-bottom: 1.25rem;
}
.success-msg {
  color: var(--text-mid);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}
.success-msg strong {
  color: var(--emerald);
}
.success-hadith {
  background: var(--emerald);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.success-hadith .arabic {
  font-family: var(--font-arabic);
  font-size: 1.1rem;
  color: var(--gold);
}
.success-hadith span:last-child {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.65);
  font-style: italic;
}
.success-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
