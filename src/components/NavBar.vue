<template>
  <header
    :class="[
      'navbar',
      {
        scrolled: isScrolled,
        'menu-open': menuOpen,
        'light-page': isLightPage,
      },
    ]"
  >
    <div class="container nav-inner">
      <!-- Logo -->
      <router-link to="/" class="nav-logo" @click="closeMenu">
        <div class="logo-text">
          <span class="logo-arabic arabic">الكرم</span>
          <span class="logo-latin">Al-Karam</span>
        </div>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="nav-links">
        <router-link to="/" exact-active-class="active">Accueil</router-link>
        <router-link to="/activites" active-class="active"
          >Activités</router-link
        >
        <router-link to="/contact" active-class="active">Contact</router-link>
        <router-link to="/don" class="nav-cta">
          <span>❤</span> Faire un don
        </router-link>
      </nav>

      <!-- Hamburger -->
      <button
        class="hamburger"
        @click="toggleMenu"
        :aria-expanded="menuOpen"
        aria-label="Menu"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <router-link to="/" @click="closeMenu">Accueil</router-link>
      <router-link to="/activites" @click="closeMenu">Activités</router-link>
      <router-link to="/contact" @click="closeMenu">Contact</router-link>
      <router-link to="/don" @click="closeMenu" class="mobile-cta"
        >❤ Faire un don</router-link
      >
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";

const isScrolled = ref(false);
const menuOpen = ref(false);
const route = useRoute();

// Pages sans hero vert — navbar sombre dès le départ
const lightPages = ["/success"];
const isLightPage = computed(() => lightPages.includes(route.path));

function onScroll() {
  isScrolled.value = window.scrollY > 50;
}
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
function closeMenu() {
  menuOpen.value = false;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 0;
  transition: all 0.4s ease;
  background: transparent;
}

.navbar.scrolled {
  background: rgba(26, 74, 58, 0.97);
  backdrop-filter: blur(12px);
  padding: 0.85rem 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

.navbar.menu-open {
  background: var(--emerald);
}

/* Pages claires (ex: /success) — navbar avec fond vert dès le départ */
.navbar.light-page {
  background: rgba(26, 74, 58, 0.97);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-arabic {
  font-family: var(--font-arabic);
  font-size: 1.1rem;
  color: var(--gold);
}

.logo-latin {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.05em;
}

/* Nav links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  position: relative;
  transition: color 0.3s;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--gold);
  transition: width 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--white);
}

.nav-links a:hover::after,
.nav-links a.active::after {
  width: 100%;
}

.nav-cta {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: var(--white) !important;
  padding: 0.6rem 1.4rem;
  border-radius: 2px;
  font-weight: 500 !important;
  letter-spacing: 0.06em !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 12px rgba(201, 168, 76, 0.3);
}
.nav-cta::after {
  display: none !important;
}
.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(201, 168, 76, 0.45) !important;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--white);
  border-radius: 2px;
  transition: all 0.3s;
}

/* Mobile menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 0;
  background: var(--emerald);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s ease;
}
.mobile-menu.open {
  max-height: 400px;
}
.mobile-menu a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s;
}
.mobile-menu a:hover {
  color: var(--gold);
  padding-left: 2.5rem;
}
.mobile-cta {
  color: var(--gold) !important;
  font-weight: 500;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .mobile-menu {
    display: flex;
  }
}
</style>
