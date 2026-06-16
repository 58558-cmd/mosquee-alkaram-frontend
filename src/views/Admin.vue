<template>
  <div class="admin-page">
    <!-- LOGIN -->
    <div v-if="!isLoggedIn" class="login-screen">
      <div class="login-card">
        <div class="login-logo">
          <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
            <polygon
              points="30,3 33,18 45,15 37,25 45,35 33,32 30,47 27,32 15,35 23,25 15,15 27,18"
              stroke="#C9A84C"
              stroke-width="1.5"
              fill="none"
            />
            <circle cx="30" cy="30" r="7" fill="#C9A84C" opacity="0.3" />
            <circle cx="30" cy="30" r="3" fill="#C9A84C" />
          </svg>
        </div>
        <h1>Espace Admin</h1>
        <p class="login-sub">Mosquée Al-Karam — Forest</p>
        <div class="lf-field">
          <label>Identifiant</label>
          <input
            type="text"
            v-model="loginForm.username"
            placeholder="Identifiant"
            @keyup.enter="login"
          />
        </div>
        <div class="lf-field">
          <label>Mot de passe</label>
          <input
            type="password"
            v-model="loginForm.password"
            placeholder="••••••••"
            @keyup.enter="login"
          />
        </div>
        <div v-if="loginError" class="login-error">{{ loginError }}</div>
        <button
          class="btn-admin-primary"
          @click="login"
          :disabled="loginLoading"
        >
          {{ loginLoading ? "Connexion..." : "Se connecter" }}
        </button>
      </div>
    </div>

    <!-- DASHBOARD -->
    <div v-else class="dashboard">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <svg width="32" height="32" viewBox="0 0 60 60" fill="none">
            <polygon
              points="30,3 33,18 45,15 37,25 45,35 33,32 30,47 27,32 15,35 23,25 15,15 27,18"
              stroke="#C9A84C"
              stroke-width="1.5"
              fill="none"
            />
            <circle cx="30" cy="30" r="4" fill="#C9A84C" />
          </svg>
          <div>
            <div class="sidebar-title">Al-Karam</div>
            <div class="sidebar-sub">Administration</div>
          </div>
        </div>
        <nav class="sidebar-nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['nav-item', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            <span class="nav-icon">{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </nav>
        <div class="sidebar-footer">
          <button class="nav-item logout-btn" @click="logout">
            <span class="nav-icon">🚪</span><span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <main class="dash-main">
        <div class="dash-header">
          <div>
            <h2>{{ currentTabLabel }}</h2>
            <p>Mosquée Al-Karam — Chau. de Neerstalle 52, Forest</p>
          </div>
          <div class="dash-lang">
            <button
              :class="['lang-btn', { active: lang === 'fr' }]"
              @click="lang = 'fr'"
            >
              FR
            </button>
            <button
              :class="['lang-btn', { active: lang === 'ar' }]"
              @click="lang = 'ar'"
            >
              ع
            </button>
          </div>
        </div>

        <!-- COLLECTE -->
        <div v-if="activeTab === 'collecte'" class="tab-content">
          <div class="stats-row">
            <div class="stat-card gold">
              <div class="stat-label">Montant collecté</div>
              <div class="stat-value">
                {{ formatEuro(config.montantCollecte) }}
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Objectif</div>
              <div class="stat-value">
                {{ formatEuro(config.objectif || 258000) }}
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Progression</div>
              <div class="stat-value">{{ pourcentage }}%</div>
              <div class="mini-bar">
                <div
                  class="mini-bar-fill"
                  :style="{ width: pourcentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
          <div class="form-card">
            <h3>Mettre à jour le montant collecté</h3>
            <div class="mode-toggle">
              <button
                :class="['mode-btn', { active: modeCollecte === 'remplacer' }]"
                @click="modeCollecte = 'remplacer'"
              >
                ✏️ Remplacer le total
              </button>
              <button
                :class="['mode-btn', { active: modeCollecte === 'ajouter' }]"
                @click="modeCollecte = 'ajouter'"
              >
                ➕ Ajouter un montant
              </button>
            </div>
            <p class="mode-desc" v-if="modeCollecte === 'remplacer'">
              Le montant <strong>remplacera</strong> l'actuel.
            </p>
            <p class="mode-desc" v-else>
              Le montant sera <strong>ajouté</strong> au total actuel.
            </p>
            <div class="input-row">
              <div class="af-field">
                <label>{{
                  modeCollecte === "remplacer"
                    ? "Nouveau total (€)"
                    : "Montant à ajouter (€)"
                }}</label>
                <input
                  type="number"
                  v-model="valeurCollecte"
                  min="0"
                  placeholder="Ex: 5000"
                />
              </div>
              <button
                class="btn-admin-primary"
                @click="updateMontant"
                :disabled="savingCollecte"
              >
                {{ savingCollecte ? "Enregistrement..." : "Enregistrer" }}
              </button>
            </div>
            <div class="objectif-separator"></div>
            <div class="input-row">
              <div class="af-field">
                <label>Modifier l'objectif (€)</label>
                <input
                  type="number"
                  v-model="nouvelObjectif"
                  min="0"
                  :placeholder="
                    'Actuel : ' + formatEuro(config.objectif || 258000)
                  "
                />
              </div>
              <button
                class="btn-admin-secondary"
                @click="updateObjectif"
                :disabled="savingObjectif"
              >
                {{
                  savingObjectif ? "Enregistrement..." : "Changer l'objectif"
                }}
              </button>
            </div>
            <div v-if="msgCollecte" :class="['msg-feedback', msgCollecte.type]">
              {{ msgCollecte.text }}
            </div>
          </div>
        </div>

        <!-- ÉVÉNEMENTS -->
        <div v-if="activeTab === 'evenements'" class="tab-content">
          <div class="tab-top-action">
            <button class="btn-admin-primary" @click="openEvenementModal(null)">
              ＋ Nouvel événement
            </button>
          </div>
          <div v-if="evenements.length === 0" class="empty-state">
            🗓️ Aucun événement. Créez le premier !
          </div>
          <div class="events-table" v-else>
            <div class="et-header">
              <span>Titre</span><span>Tag</span><span>Date</span
              ><span>Visible</span><span>Actions</span>
            </div>
            <div class="et-row" v-for="ev in evenements" :key="ev.id">
              <span class="et-titre">{{ ev.titre }}</span>
              <span
                ><span
                  class="ev-tag"
                  :style="{ background: ev.tagColor || '#1a4a3a' }"
                  >{{ ev.tag }}</span
                ></span
              >
              <span>{{ formatDate(ev.dateEvenement) }}</span>
              <span
                ><span :class="['visible-badge', ev.visible ? 'yes' : 'no']">{{
                  ev.visible ? "✅" : "❌"
                }}</span></span
              >
              <span class="et-actions">
                <button class="btn-icon edit" @click="openEvenementModal(ev)">
                  ✏️
                </button>
                <button class="btn-icon del" @click="deleteEvenement(ev.id)">
                  🗑️
                </button>
              </span>
            </div>
          </div>
        </div>

        <!-- MESSAGES -->
        <div v-if="activeTab === 'messages'" class="tab-content">
          <div v-if="messages.length === 0" class="empty-state">
            ✉️ Aucun message reçu.
          </div>
          <div class="messages-list" v-else>
            <div class="msg-card" v-for="msg in messages" :key="msg.id">
              <div class="msg-card-top">
                <div>
                  <strong>{{ msg.nom }}</strong>
                  <span class="msg-email">{{ msg.email }}</span>
                </div>
                <div class="msg-card-right">
                  <span class="msg-date">{{
                    formatDate(msg.dateCreation)
                  }}</span>
                  <button class="btn-icon del" @click="deleteMessage(msg.id)">
                    🗑️
                  </button>
                </div>
              </div>
              <div v-if="msg.sujet" class="msg-sujet">{{ msg.sujet }}</div>
              <p class="msg-body">{{ msg.message }}</p>
              <div v-if="msg.telephone" class="msg-tel">
                📞 {{ msg.telephone }}
              </div>
            </div>
          </div>
        </div>

        <!-- CONTACT & PARAMÈTRES -->
        <div v-if="activeTab === 'contact'" class="tab-content">
          <div class="form-card">
            <h3>Informations de contact</h3>
            <div class="af-field">
              <label>Téléphone</label>
              <input
                type="tel"
                v-model="contactForm.telephone"
                placeholder="+32 4XX XX XX XX"
              />
            </div>
            <div class="af-field">
              <label>Email</label>
              <input
                type="email"
                v-model="contactForm.email"
                placeholder="contact@mosquee-alkaram.be"
              />
            </div>
            <div class="objectif-separator"></div>
            <h3>Prière du vendredi (Jumu'ah)</h3>
            <div class="af-field">
              <label>Heure du Jumu'ah</label>
              <input type="time" v-model="contactForm.jumuahTime" />
            </div>
            <button
              class="btn-admin-primary"
              @click="saveContact"
              :disabled="savingContact"
            >
              {{ savingContact ? "Enregistrement..." : "Enregistrer" }}
            </button>
            <div v-if="msgContact" :class="['msg-feedback', msgContact.type]">
              {{ msgContact.text }}
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- MODAL ÉVÉNEMENT -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <div class="modal-header">
          <h3>
            {{ editingEv?.id ? "Modifier l'événement" : "Nouvel événement" }}
          </h3>
          <button class="modal-close" @click="closeModal">✕</button>
        </div>
        <div class="modal-body">
          <div class="af-field">
            <label>Titre *</label
            ><input
              type="text"
              v-model="evForm.titre"
              placeholder="Ex: Conférence sur le Coran"
            />
          </div>
          <div class="af-row">
            <div class="af-field">
              <label>Tag</label>
              <select v-model="evForm.tag">
                <option value="Conférence">Conférence</option>
                <option value="Collecte">Collecte</option>
                <option value="Cours">Cours</option>
                <option value="Communauté">Communauté</option>
                <option value="Ramadan">Ramadan</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div class="af-field">
              <label>Couleur du tag</label>
              <select v-model="evForm.tagColor">
                <option value="#1a4a3a">Vert</option>
                <option value="#C9A84C">Or</option>
                <option value="#7c3aed">Violet</option>
                <option value="#dc2626">Rouge</option>
                <option value="#0284c7">Bleu</option>
              </select>
            </div>
          </div>
          <div class="af-row">
            <div class="af-field">
              <label>Date</label><input type="date" v-model="evForm.date" />
            </div>
            <div class="af-field">
              <label>Heure</label><input type="time" v-model="evForm.heure" />
            </div>
          </div>
          <div class="af-field">
            <label>Lieu</label
            ><input
              type="text"
              v-model="evForm.lieu"
              placeholder="Ex: Mosquée Al-Karam"
            />
          </div>
          <div class="af-field">
            <label>Description</label
            ><textarea
              v-model="evForm.description"
              rows="4"
              placeholder="Description..."
            ></textarea>
          </div>
          <div class="af-field af-check">
            <input type="checkbox" id="visible" v-model="evForm.visible" />
            <label for="visible">Visible sur le site public</label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-admin-secondary" @click="closeModal">
            Annuler
          </button>
          <button
            class="btn-admin-primary"
            @click="saveEvenement"
            :disabled="savingEv"
          >
            {{ savingEv ? "Enregistrement..." : "Enregistrer" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const API = 'https://mosquee-alkaram-backend-production.up.railway.app'
const isLoggedIn = ref(false);
const loginForm = ref({ username: "", password: "" });
const loginError = ref("");
const loginLoading = ref(false);
const token = ref(localStorage.getItem("admin_token") || "");
const activeTab = ref("collecte");
const lang = ref("fr");

const tabs = computed(() =>
  lang.value === "ar"
    ? [
        { id: "collecte", icon: "💰", label: "التبرعات" },
        { id: "evenements", icon: "🗓️", label: "الأحداث" },
        { id: "messages", icon: "✉️", label: "الرسائل" },
        { id: "contact", icon: "📞", label: "الإعدادات" },
      ]
    : [
        { id: "collecte", icon: "💰", label: "Collecte" },
        { id: "evenements", icon: "🗓️", label: "Événements" },
        { id: "messages", icon: "✉️", label: "Messages" },
        { id: "contact", icon: "📞", label: "Paramètres" },
      ],
);

const currentTabLabel = computed(
  () => tabs.value.find((t) => t.id === activeTab.value)?.label || "",
);
const config = ref({ montantCollecte: 47678, objectif: 258000 });
const modeCollecte = ref("remplacer");
const valeurCollecte = ref("");
const savingCollecte = ref(false);
const msgCollecte = ref(null);
const nouvelObjectif = ref("");
const savingObjectif = ref(false);
const pourcentage = computed(() => {
  const obj = config.value.objectif || 258000;
  return Math.min(Math.round((config.value.montantCollecte / obj) * 100), 100);
});
const evenements = ref([]);
const showModal = ref(false);
const editingEv = ref(null);
const savingEv = ref(false);
const evForm = ref(defaultEvForm());
const messages = ref([]);
const contactForm = ref({ telephone: "", email: "", jumuahTime: "13:00" });
const savingContact = ref(false);
const msgContact = ref(null);

function defaultEvForm() {
  return {
    titre: "",
    tag: "Conférence",
    tagColor: "#1a4a3a",
    date: "",
    heure: "",
    lieu: "Mosquée Al-Karam",
    description: "",
    visible: true,
  };
}
function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.value}`,
  };
}
function formatEuro(n) {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}
function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function login() {
  loginError.value = "";
  loginLoading.value = true;
  try {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm.value),
    });
    const data = await res.json();
    if (res.ok) {
      token.value = data.token;
      localStorage.setItem("admin_token", data.token);
      isLoggedIn.value = true;
      loadAll();
    } else {
      loginError.value = data.erreur || "Identifiants incorrects";
    }
  } catch {
    loginError.value = "Impossible de contacter le serveur.";
  } finally {
    loginLoading.value = false;
  }
}

function logout() {
  token.value = "";
  localStorage.removeItem("admin_token");
  isLoggedIn.value = false;
}

async function verifyToken() {
  if (!token.value) return;
  try {
    const res = await fetch(`${API}/api/auth/verify`, {
      headers: authHeaders(),
    });
    if (res.ok) {
      isLoggedIn.value = true;
      loadAll();
    } else logout();
  } catch {
    logout();
  }
}

async function loadAll() {
  loadConfig();
  loadEvenements();
  loadMessages();
  loadContact();
}

async function loadConfig() {
  try {
    const res = await fetch(`${API}/api/admin/config`, {
      headers: authHeaders(),
    });
    if (res.ok) config.value = await res.json();
  } catch {}
}

async function updateMontant() {
  if (!valeurCollecte.value) return;
  savingCollecte.value = true;
  msgCollecte.value = null;
  try {
    const res = await fetch(`${API}/api/admin/config/montant`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        mode: modeCollecte.value,
        valeur: parseFloat(valeurCollecte.value),
      }),
    });
    if (res.ok) {
      config.value = await res.json();
      valeurCollecte.value = "";
      msgCollecte.value = { type: "success", text: "✅ Montant mis à jour !" };
    }
  } catch {
    msgCollecte.value = { type: "error", text: "❌ Erreur." };
  } finally {
    savingCollecte.value = false;
    setTimeout(() => (msgCollecte.value = null), 4000);
  }
}

async function updateObjectif() {
  if (!nouvelObjectif.value) return;
  savingObjectif.value = true;
  msgCollecte.value = null;
  try {
    const res = await fetch(`${API}/api/admin/config/montant`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ objectif: parseFloat(nouvelObjectif.value) }),
    });
    if (res.ok) {
      config.value = await res.json();
      nouvelObjectif.value = "";
      msgCollecte.value = { type: "success", text: "✅ Objectif mis à jour !" };
    }
  } catch {
    msgCollecte.value = { type: "error", text: "❌ Erreur." };
  } finally {
    savingObjectif.value = false;
    setTimeout(() => (msgCollecte.value = null), 4000);
  }
}

async function loadEvenements() {
  try {
    const res = await fetch(`${API}/api/admin/evenements`, {
      headers: authHeaders(),
    });
    if (res.ok) evenements.value = await res.json();
  } catch {}
}

function openEvenementModal(ev) {
  editingEv.value = ev;
  evForm.value = ev
    ? {
        titre: ev.titre,
        tag: ev.tag,
        tagColor: ev.tagColor,
        date: ev.dateEvenement ? ev.dateEvenement.split("T")[0] : "",
        heure: ev.heure || "",
        lieu: ev.lieu || "",
        description: ev.description || "",
        visible: ev.visible,
      }
    : defaultEvForm();
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}

async function saveEvenement() {
  if (!evForm.value.titre) return;
  savingEv.value = true;
  const payload = {
    titre: evForm.value.titre,
    tag: evForm.value.tag,
    tagColor: evForm.value.tagColor,
    dateEvenement: evForm.value.date
      ? `${evForm.value.date}T${evForm.value.heure || "00:00"}:00`
      : null,
    heure: evForm.value.heure,
    lieu: evForm.value.lieu,
    description: evForm.value.description,
    visible: evForm.value.visible,
  };
  try {
    const url = editingEv.value?.id
      ? `${API}/api/admin/evenements/${editingEv.value.id}`
      : `${API}/api/admin/evenements`;
    const method = editingEv.value?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      closeModal();
      loadEvenements();
    }
  } catch {
  } finally {
    savingEv.value = false;
  }
}

async function deleteEvenement(id) {
  if (!confirm("Supprimer cet événement ?")) return;
  await fetch(`${API}/api/admin/evenements/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  loadEvenements();
}

async function loadMessages() {
  try {
    const res = await fetch(`${API}/api/admin/messages`, {
      headers: authHeaders(),
    });
    if (res.ok) messages.value = await res.json();
  } catch {}
}

async function deleteMessage(id) {
  if (!confirm("Supprimer ce message ?")) return;
  await fetch(`${API}/api/admin/messages/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  loadMessages();
}

async function loadContact() {
  try {
    const res = await fetch(`${API}/api/admin/config`, {
      headers: authHeaders(),
    });
    if (res.ok) {
      const d = await res.json();
      contactForm.value = {
        telephone: d.telephone || "",
        email: d.email || "",
        jumuahTime: d.jumuahTime || "13:00",
      };
    }
  } catch {}
}

async function saveContact() {
  savingContact.value = true;
  msgContact.value = null;
  try {
    const res = await fetch(`${API}/api/admin/config/contact`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(contactForm.value),
    });
    if (res.ok)
      msgContact.value = {
        type: "success",
        text: "✅ Paramètres mis à jour !",
      };
    else msgContact.value = { type: "error", text: "❌ Erreur." };
  } catch {
    msgContact.value = {
      type: "error",
      text: "❌ Impossible de contacter le serveur.",
    };
  } finally {
    savingContact.value = false;
    setTimeout(() => (msgContact.value = null), 4000);
  }
}

onMounted(verifyToken);
</script>

<style scoped>
.admin-page {
  --adm-bg: #0f1923;
  --adm-surface: #1a2535;
  --adm-surface2: #222f42;
  --adm-border: rgba(255, 255, 255, 0.07);
  --adm-gold: #c9a84c;
  --adm-text: #e2e8f0;
  --adm-muted: #8896a7;
  min-height: 100vh;
  font-family: var(--font-body);
}
.login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--adm-bg);
  background-image: radial-gradient(
    ellipse at 30% 40%,
    rgba(26, 74, 58, 0.3) 0%,
    transparent 60%
  );
}
.login-card {
  background: var(--adm-surface);
  border: 1px solid var(--adm-border);
  border-radius: 16px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
}
.login-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.login-card h1 {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--adm-text);
  text-align: center;
  margin-bottom: 0.35rem;
}
.login-sub {
  text-align: center;
  color: var(--adm-muted);
  font-size: 0.88rem;
  margin-bottom: 2rem;
}
.lf-field {
  margin-bottom: 1.25rem;
}
.lf-field label {
  display: block;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--adm-muted);
  margin-bottom: 0.45rem;
}
.lf-field input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--adm-surface2);
  border: 1.5px solid var(--adm-border);
  border-radius: 8px;
  color: var(--adm-text);
  font-family: var(--font-body);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}
.lf-field input:focus {
  border-color: var(--adm-gold);
}
.login-error {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 8px;
  padding: 0.65rem 1rem;
  font-size: 0.85rem;
  color: #f87171;
  margin-bottom: 1rem;
}
.dashboard {
  display: flex;
  min-height: 100vh;
  background: var(--adm-bg);
}
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: var(--adm-surface);
  border-right: 1px solid var(--adm-border);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 10;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1.25rem 2rem;
  border-bottom: 1px solid var(--adm-border);
  margin-bottom: 1rem;
}
.sidebar-title {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--adm-text);
  font-weight: 600;
}
.sidebar-sub {
  font-size: 0.7rem;
  color: var(--adm-muted);
  margin-top: 1px;
}
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 0.75rem;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--adm-muted);
  font-family: var(--font-body);
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}
.nav-item:hover {
  background: var(--adm-surface2);
  color: var(--adm-text);
}
.nav-item.active {
  background: rgba(201, 168, 76, 0.1);
  color: var(--adm-gold);
  border: 1px solid rgba(201, 168, 76, 0.2);
}
.nav-icon {
  font-size: 1.1rem;
}
.sidebar-footer {
  padding: 1rem 0.75rem;
  border-top: 1px solid var(--adm-border);
}
.logout-btn {
  color: #f87171 !important;
}
.logout-btn:hover {
  background: rgba(248, 113, 113, 0.1) !important;
}
.dash-main {
  flex: 1;
  margin-left: 240px;
  padding: 2rem 2.5rem;
  min-height: 100vh;
}
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--adm-border);
}
.dash-header h2 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--adm-text);
  margin-bottom: 0.25rem;
}
.dash-header p {
  color: var(--adm-muted);
  font-size: 0.85rem;
}
.dash-lang {
  display: flex;
  gap: 0.4rem;
}
.lang-btn {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--adm-border);
  border-radius: 6px;
  background: transparent;
  color: var(--adm-muted);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;
}
.lang-btn.active {
  background: var(--adm-gold);
  color: #000;
  border-color: var(--adm-gold);
  font-weight: 600;
}
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.stat-card {
  background: var(--adm-surface);
  border: 1px solid var(--adm-border);
  border-radius: 12px;
  padding: 1.5rem;
}
.stat-card.gold {
  border-color: rgba(201, 168, 76, 0.3);
  background: linear-gradient(
    135deg,
    rgba(201, 168, 76, 0.08),
    var(--adm-surface)
  );
}
.stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--adm-muted);
  margin-bottom: 0.5rem;
}
.stat-value {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--adm-text);
}
.stat-card.gold .stat-value {
  color: var(--adm-gold);
}
.mini-bar {
  height: 4px;
  background: var(--adm-surface2);
  border-radius: 2px;
  margin-top: 0.75rem;
  overflow: hidden;
}
.mini-bar-fill {
  height: 100%;
  background: var(--adm-gold);
  border-radius: 2px;
  transition: width 1s ease;
}
.form-card {
  background: var(--adm-surface);
  border: 1px solid var(--adm-border);
  border-radius: 12px;
  padding: 2rem;
}
.form-card h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--adm-text);
  margin-bottom: 1.5rem;
}
.mode-toggle {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.mode-btn {
  padding: 0.6rem 1.25rem;
  border: 1.5px solid var(--adm-border);
  border-radius: 8px;
  background: transparent;
  color: var(--adm-muted);
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}
.mode-btn.active {
  border-color: var(--adm-gold);
  color: var(--adm-gold);
  background: rgba(201, 168, 76, 0.08);
}
.mode-desc {
  font-size: 0.85rem;
  color: var(--adm-muted);
  margin-bottom: 1.25rem;
}
.mode-desc strong {
  color: var(--adm-text);
}
.input-row {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}
.input-row .af-field {
  flex: 1;
}
.objectif-separator {
  height: 1px;
  background: var(--adm-border);
  margin: 1.5rem 0;
}
.af-field {
  margin-bottom: 1.25rem;
}
.af-field label {
  display: block;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--adm-muted);
  margin-bottom: 0.45rem;
}
.af-field input,
.af-field select,
.af-field textarea {
  width: 100%;
  padding: 0.7rem 1rem;
  background: var(--adm-surface2);
  border: 1.5px solid var(--adm-border);
  border-radius: 8px;
  color: var(--adm-text);
  font-family: var(--font-body);
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.2s;
}
.af-field input:focus,
.af-field select:focus,
.af-field textarea:focus {
  border-color: var(--adm-gold);
}
.af-field textarea {
  resize: vertical;
}
.af-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.af-check {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
}
.af-check label {
  text-transform: none;
  font-size: 0.9rem;
  color: var(--adm-text);
  letter-spacing: 0;
  margin: 0;
}
.af-check input {
  width: auto;
}
.btn-admin-primary {
  padding: 0.7rem 1.5rem;
  background: var(--adm-gold);
  color: #000;
  border: none;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-admin-primary:hover {
  background: #d4aa50;
  transform: translateY(-1px);
}
.btn-admin-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.btn-admin-secondary {
  padding: 0.7rem 1.5rem;
  background: transparent;
  color: var(--adm-muted);
  border: 1.5px solid var(--adm-border);
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-admin-secondary:hover {
  border-color: var(--adm-text);
  color: var(--adm-text);
}
.btn-icon {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--adm-border);
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.btn-icon.edit:hover {
  background: rgba(201, 168, 76, 0.1);
  border-color: var(--adm-gold);
}
.btn-icon.del:hover {
  background: rgba(248, 113, 113, 0.1);
  border-color: #f87171;
}
.msg-feedback {
  margin-top: 1rem;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
}
.msg-feedback.success {
  background: rgba(26, 74, 58, 0.2);
  border: 1px solid rgba(26, 74, 58, 0.4);
  color: #6ee7b7;
}
.msg-feedback.error {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #f87171;
}
.tab-top-action {
  display: flex;
  justify-content: flex-end;
}
.events-table {
  background: var(--adm-surface);
  border: 1px solid var(--adm-border);
  border-radius: 12px;
  overflow: hidden;
}
.et-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.8fr 0.8fr;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--adm-surface2);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--adm-muted);
}
.et-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.8fr 0.8fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--adm-border);
  align-items: center;
  font-size: 0.9rem;
  color: var(--adm-text);
  transition: background 0.2s;
}
.et-row:hover {
  background: var(--adm-surface2);
}
.et-titre {
  font-weight: 500;
}
.et-actions {
  display: flex;
  gap: 0.4rem;
}
.ev-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #fff;
}
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.msg-card {
  background: var(--adm-surface);
  border: 1px solid var(--adm-border);
  border-radius: 12px;
  padding: 1.5rem;
}
.msg-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}
.msg-card-top strong {
  display: block;
  color: var(--adm-text);
  font-size: 0.95rem;
}
.msg-email {
  display: block;
  font-size: 0.82rem;
  color: var(--adm-gold);
  margin-top: 2px;
}
.msg-card-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.msg-date {
  font-size: 0.78rem;
  color: var(--adm-muted);
}
.msg-sujet {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--adm-muted);
  margin-bottom: 0.5rem;
}
.msg-body {
  font-size: 0.9rem;
  color: var(--adm-text);
  line-height: 1.6;
  margin: 0 0 0.5rem;
}
.msg-tel {
  font-size: 0.82rem;
  color: var(--adm-muted);
}
.empty-state {
  background: var(--adm-surface);
  border: 2px dashed var(--adm-border);
  border-radius: 12px;
  padding: 4rem 2rem;
  text-align: center;
  color: var(--adm-muted);
  font-size: 0.95rem;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal-card {
  background: var(--adm-surface);
  border: 1px solid var(--adm-border);
  border-radius: 16px;
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid var(--adm-border);
}
.modal-header h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--adm-text);
}
.modal-close {
  background: transparent;
  border: none;
  color: var(--adm-muted);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.25rem;
}
.modal-body {
  padding: 1.75rem;
}
.modal-footer {
  padding: 1.25rem 1.75rem;
  border-top: 1px solid var(--adm-border);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
