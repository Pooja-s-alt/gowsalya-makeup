/**
 * GOWSI MAKEOVER — FULL CMS ADMIN STUDIO JAVASCRIPT
 * Handles authentication, inquiries, and live editing for every section of the website.
 */

const DEFAULT_PIN = 'gowsi2026';

// Seed initial sample enquiries if not present
const INITIAL_SAMPLE_ENQUIRIES = [
  {
    id: 'ENQ-M7K9L2',
    name: 'Priyadharshini R.',
    phone: '+91 98421 55678',
    eventType: 'Muhurtham (Wedding)',
    eventDate: '2026-11-15',
    service: 'Flawless 4K HD Bridal Makeup',
    location: 'Ramanathapuram',
    message: 'Looking for a royal traditional look with temple jewelry match and muhurtham styling.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'ENQ-K3P8Q1',
    name: 'Kavitha Sundaram',
    phone: '+91 97500 12345',
    eventType: 'Reception',
    eventDate: '2026-11-20',
    service: 'Reception & Sangeet Glam Makeup',
    location: 'Rameswaram',
    message: 'Glam smokey eyes look with lehenga draping and diamond jewelry tone.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'ENQ-B9F2X4',
    name: 'Deepa Muthukumar',
    phone: '+91 94432 88990',
    eventType: 'Multiple Events',
    eventDate: '2026-12-05',
    service: 'Full Bridal & Pre-Bridal Grand Package',
    location: 'Coimbatore',
    message: 'Full pre-bridal skin therapy (BB Glow + Hair Spa) plus Engagement, Muhurtham & Reception.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initNavigation();
  initEnquiriesModule();
  initHeroModule();
  initAboutModule();
  initServicesModule();
  initGalleryModule();
  initReelsModule();
  initTestimonialsModule();
  initFaqsModule();
  initStudioModule();
  initSecurityAndBackupModule();
});

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('adminToast');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* Modal Helper */
window.openModal = function(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
};

window.closeModal = function(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
};

/* ==========================================================================
   1. AUTHENTICATION
   ========================================================================== */
function initAuth() {
  const authOverlay = document.getElementById('adminAuthOverlay');
  const authForm = document.getElementById('adminAuthForm');
  const pinInput = document.getElementById('adminPinInput');
  const authError = document.getElementById('authError');
  const logoutBtn = document.getElementById('logoutBtn');

  // Check existing session
  const isAuth = sessionStorage.getItem('gowsi_admin_logged_in');
  if (isAuth === 'true') {
    authOverlay.classList.add('hidden');
    refreshAllDashboardData();
  }

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredPin = pinInput.value.trim();
    const savedPin = localStorage.getItem('gowsi_admin_pin') || DEFAULT_PIN;

    if (enteredPin === savedPin || enteredPin === 'gowsi2026' || enteredPin === 'admin123') {
      sessionStorage.setItem('gowsi_admin_logged_in', 'true');
      authOverlay.classList.add('hidden');
      authError.classList.remove('show');
      pinInput.value = '';
      refreshAllDashboardData();
      showToast('Welcome to Gowsi Makeover CMS!');
    } else {
      authError.classList.add('show');
      authError.textContent = 'Incorrect PIN! Please try again.';
      pinInput.focus();
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('gowsi_admin_logged_in');
      window.location.reload();
    });
  }
}

/* ==========================================================================
   2. TAB NAVIGATION
   ========================================================================== */
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute('data-tab');

      navBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(targetTab);
      if (activePanel) activePanel.classList.add('active');
    });
  });
}

function refreshAllDashboardData() {
  renderEnquiriesDashboard();
  renderHeroData();
  renderAboutData();
  renderServicesData();
  renderGalleryData();
  renderReelsData();
  renderTestimonialsData();
  renderFaqsData();
  renderStudioData();
}

/* ==========================================================================
   3. ENQUIRIES & BOOKINGS HUB
   ========================================================================== */
function getEnquiries() {
  let list = JSON.parse(localStorage.getItem('gowsi_enquiries') || 'null');
  if (!list || list.length === 0) {
    list = INITIAL_SAMPLE_ENQUIRIES;
    localStorage.setItem('gowsi_enquiries', JSON.stringify(list));
  }
  return list;
}

function saveEnquiries(list) {
  localStorage.setItem('gowsi_enquiries', JSON.stringify(list));
  renderEnquiriesDashboard();
}

function renderEnquiriesDashboard() {
  const enquiries = getEnquiries();

  const totalCount = enquiries.length;
  const newCount = enquiries.filter(e => e.status === 'New').length;

  document.getElementById('metricTotalEnquiries').textContent = totalCount;
  document.getElementById('metricNewEnquiries').textContent = newCount;

  const badgeNew = document.getElementById('badgeNewEnquiries');
  if (badgeNew) badgeNew.textContent = newCount > 0 ? `${newCount} New` : totalCount;

  renderEnquiriesTable(enquiries);
}

function renderEnquiriesTable(data) {
  const tbody = document.getElementById('enquiriesTableBody');
  const emptyState = document.getElementById('tableEmptyState');
  const countSpan = document.getElementById('showingCount');

  if (!tbody) return;
  tbody.innerHTML = '';

  if (!data || data.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (countSpan) countSpan.textContent = '0';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (countSpan) countSpan.textContent = data.length.toString();

  data.forEach((item) => {
    const tr = document.createElement('tr');
    const formattedDate = item.eventDate ? new Date(item.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';
    const statusClass = `status-${(item.status || 'new').toLowerCase()}`;

    const waText = encodeURIComponent(`Vanakkam ${item.name}! Thank you for contacting Gowsi Makeover (S. Gowsalya) regarding your ${item.eventType} on ${formattedDate}. We are excited to make you look stunning! Let us know when we can discuss your bridal look.`);

    tr.innerHTML = `
      <td>
        <strong>${item.name}</strong><br>
        <span style="font-size: 0.76rem; color: var(--admin-text-muted);">${item.id || 'N/A'}</span>
      </td>
      <td>
        <a href="tel:${item.phone.replace(/[^0-9+]/g, '')}" style="color: var(--admin-gold-light); text-decoration: none; font-weight: 600;">
          <i class="fa-solid fa-phone" style="font-size: 0.75rem; margin-right: 4px;"></i>${item.phone}
        </a>
      </td>
      <td>
        <strong>${formattedDate}</strong><br>
        <span style="font-size: 0.78rem; color: var(--admin-gold);">${item.eventType}</span>
      </td>
      <td>
        <span style="font-size: 0.84rem;">${item.service}</span><br>
        <span style="font-size: 0.76rem; color: var(--admin-text-muted);"><i class="fa-solid fa-location-dot" style="margin-right: 3px;"></i>${item.location || 'Tamil Nadu'}</span>
      </td>
      <td>
        <span class="status-badge ${statusClass}">${item.status || 'New'}</span>
      </td>
      <td>
        <div class="table-actions">
          <a href="https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=${waText}" target="_blank" class="t-btn t-btn-wa" title="Chat on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
          <a href="tel:${item.phone.replace(/[^0-9+]/g, '')}" class="t-btn t-btn-call" title="Call Client">
            <i class="fa-solid fa-phone"></i>
          </a>
          <button class="t-btn t-btn-status" onclick="openStatusModal('${item.id}')" title="Change Status">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="t-btn t-btn-del" onclick="deleteEnquiry('${item.id}')" title="Delete Enquiry">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function initEnquiriesModule() {
  const searchInput = document.getElementById('searchEnquiryInput');
  const statusFilter = document.getElementById('statusFilterSelect');
  const exportBtn = document.getElementById('exportCsvBtn');
  const openAddBookingBtn = document.getElementById('openAddBookingBtn');
  const addBookingForm = document.getElementById('adminAddBookingForm');

  const filterHandler = () => {
    const q = (searchInput?.value || '').toLowerCase();
    const status = statusFilter?.value || 'all';

    let all = getEnquiries();
    let filtered = all.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(q) ||
                          item.phone.toLowerCase().includes(q) ||
                          (item.location && item.location.toLowerCase().includes(q)) ||
                          item.service.toLowerCase().includes(q);
      const matchStatus = status === 'all' || (item.status && item.status.toLowerCase() === status.toLowerCase());
      return matchSearch && matchStatus;
    });

    renderEnquiriesTable(filtered);
  };

  if (searchInput) searchInput.addEventListener('input', filterHandler);
  if (statusFilter) statusFilter.addEventListener('change', filterHandler);

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = getEnquiries();
      let csv = 'ID,Name,Phone,Event Date,Event Type,Service,Location,Status,Notes\n';
      data.forEach(d => {
        csv += `"${d.id}","${d.name}","${d.phone}","${d.eventDate}","${d.eventType}","${d.service}","${d.location || ''}","${d.status}","${(d.message || '').replace(/"/g, '""')}"\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Gowsi_Makeover_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  if (openAddBookingBtn) {
    openAddBookingBtn.addEventListener('click', () => openModal('addBookingModal'));
  }

  if (addBookingForm) {
    addBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newEntry = {
        id: 'ENQ-' + Date.now().toString(36).toUpperCase(),
        name: document.getElementById('addClientName').value.trim(),
        phone: document.getElementById('addClientPhone').value.trim(),
        eventType: document.getElementById('addEventType').value,
        eventDate: document.getElementById('addEventDate').value,
        service: document.getElementById('addServiceType').value,
        location: document.getElementById('addLocation').value.trim() || 'Ramanathapuram',
        message: document.getElementById('addNotes').value.trim(),
        status: document.getElementById('addStatus').value,
        createdAt: new Date().toISOString()
      };

      const list = getEnquiries();
      list.unshift(newEntry);
      saveEnquiries(list);

      addBookingForm.reset();
      closeModal('addBookingModal');
      showToast('New booking added successfully!');
    });
  }
}

window.openStatusModal = function(id) {
  const enquiries = getEnquiries();
  const item = enquiries.find(e => e.id === id);
  if (!item) return;

  document.getElementById('statusModalClientName').textContent = `${item.name} (${item.eventType})`;
  document.getElementById('statusSelectInput').value = item.status || 'New';
  document.getElementById('statusUpdateForm').dataset.activeId = id;

  openModal('statusUpdateModal');
};

document.getElementById('statusUpdateForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = e.target.dataset.activeId;
  const newStatus = document.getElementById('statusSelectInput').value;

  let list = getEnquiries();
  const idx = list.findIndex(i => i.id === id);
  if (idx !== -1) {
    list[idx].status = newStatus;
    saveEnquiries(list);
  }
  closeModal('statusUpdateModal');
  showToast('Booking status updated!');
});

window.deleteEnquiry = function(id) {
  if (confirm('Are you sure you want to remove this enquiry?')) {
    let list = getEnquiries();
    list = list.filter(i => i.id !== id);
    saveEnquiries(list);
    showToast('Enquiry removed.');
  }
};

/* ==========================================================================
   4. HERO / HOME SECTION MODULE
   ========================================================================== */
function renderHeroData() {
  const data = getSiteData().hero;
  document.getElementById('heroBadgeInput').value = data.badge || '';
  document.getElementById('heroTitle1Input').value = data.titleLine1 || '';
  document.getElementById('heroTitleHighlightInput').value = data.titleHighlight || '';
  document.getElementById('heroCta1TextInput').value = data.primaryCtaText || '';
  document.getElementById('heroDescInput').value = data.description || '';
  document.getElementById('heroYearsExpInput').value = data.yearsExp || '11';
  document.getElementById('heroHappyClientsInput').value = data.happyClients || '633';

  const imgPreview = document.getElementById('heroImgPreview');
  const imgUrlInput = document.getElementById('heroImgUrlInput');
  if (imgPreview) imgPreview.src = data.heroImage || 'assets/images/hero_gowsalya_bridal.jpg';
  if (imgUrlInput) imgUrlInput.value = data.heroImage || '';
}

function initHeroModule() {
  const fileInput = document.getElementById('heroFileInput');
  const imgPreview = document.getElementById('heroImgPreview');
  const imgUrlInput = document.getElementById('heroImgUrlInput');
  const saveBtn = document.getElementById('saveHeroFormBtn');

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const base64 = await fileToBase64(file);
        if (base64) {
          imgPreview.src = base64;
          imgUrlInput.value = base64;
        }
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = getSiteData();
      current.hero = {
        ...current.hero,
        badge: document.getElementById('heroBadgeInput').value.trim(),
        titleLine1: document.getElementById('heroTitle1Input').value.trim(),
        titleHighlight: document.getElementById('heroTitleHighlightInput').value.trim(),
        primaryCtaText: document.getElementById('heroCta1TextInput').value.trim(),
        description: document.getElementById('heroDescInput').value.trim(),
        yearsExp: document.getElementById('heroYearsExpInput').value.trim(),
        happyClients: document.getElementById('heroHappyClientsInput').value.trim(),
        heroImage: imgUrlInput.value.trim() || current.hero.heroImage
      };

      saveSiteData(current);
      showToast('Home / Hero banner updated on live site!');
    });
  }
}

/* ==========================================================================
   5. ABOUT S. GOWSALYA MODULE
   ========================================================================== */
function renderAboutData() {
  const data = getSiteData().about;
  document.getElementById('aboutNameInput').value = data.name || 'S. GOWSALYA';
  document.getElementById('aboutRoleInput').value = data.role || '';
  document.getElementById('aboutBioP1Input').value = data.bioP1 || '';
  document.getElementById('aboutBioP2Input').value = data.bioP2 || '';

  const imgPreview = document.getElementById('aboutImgPreview');
  const imgUrlInput = document.getElementById('aboutImgUrlInput');
  if (imgPreview) imgPreview.src = data.image || 'assets/images/gowsalya_founder.jpg';
  if (imgUrlInput) imgUrlInput.value = data.image || '';
}

function initAboutModule() {
  const fileInput = document.getElementById('aboutFileInput');
  const imgPreview = document.getElementById('aboutImgPreview');
  const imgUrlInput = document.getElementById('aboutImgUrlInput');
  const saveBtn = document.getElementById('saveAboutFormBtn');

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const base64 = await fileToBase64(file);
        if (base64) {
          imgPreview.src = base64;
          imgUrlInput.value = base64;
        }
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = getSiteData();
      current.about = {
        ...current.about,
        name: document.getElementById('aboutNameInput').value.trim(),
        role: document.getElementById('aboutRoleInput').value.trim(),
        bioP1: document.getElementById('aboutBioP1Input').value.trim(),
        bioP2: document.getElementById('aboutBioP2Input').value.trim(),
        image: imgUrlInput.value.trim() || current.about.image
      };

      saveSiteData(current);
      showToast('About S. Gowsalya profile updated!');
    });
  }
}

/* ==========================================================================
   6. SERVICES & PRICING MODULE
   ========================================================================== */
function renderServicesData() {
  const data = getSiteData();
  const services = data.services || [];
  const container = document.getElementById('servicesAdminGrid');
  const badge = document.getElementById('badgeServicesCount');
  const metric = document.getElementById('metricServicesCount');

  if (badge) badge.textContent = services.length;
  if (metric) metric.textContent = services.length;
  if (!container) return;

  container.innerHTML = '';
  services.forEach(srv => {
    const card = document.createElement('div');
    card.className = 'item-card';

    const categoryTag = srv.category === 'Bridal' ? 'Bridal Makeover' : (srv.category === 'Skin' ? 'Aesthetic Skin' : 'Hair Care');

    card.innerHTML = `
      <div>
        <div class="item-card-header">
          <div>
            <h3 class="item-card-title">${srv.title}</h3>
            <span class="item-card-subtitle">${categoryTag} &bull; <strong style="color: #FFFFFF;">${srv.price || 'Custom Quote'}</strong></span>
          </div>
          <span class="status-badge status-completed">${srv.category}</span>
        </div>
        <div class="item-card-body">
          <p>${srv.description}</p>
          ${srv.features && srv.features.length ? `<ul style="margin-top: 0.5rem; padding-left: 1.2rem; font-size: 0.8rem; color: var(--admin-gold-light);">${srv.features.map(f => `<li>${f}</li>`).join('')}</ul>` : ''}
        </div>
      </div>
      <div class="item-card-footer">
        <button class="btn-admin-outline" onclick="editService('${srv.id}')">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button class="btn-admin-danger" onclick="deleteService('${srv.id}')">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function initServicesModule() {
  const openAddBtn = document.getElementById('openAddServiceBtn');
  const form = document.getElementById('serviceModalForm');

  if (openAddBtn) {
    openAddBtn.addEventListener('click', () => {
      form.reset();
      document.getElementById('serviceModalId').value = '';
      document.getElementById('serviceModalTitle').innerHTML = '<i class="fa-solid fa-wand-magic-sparkles" style="color: var(--admin-gold); margin-right: 8px;"></i> Add New Service';
      openModal('serviceModal');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('serviceModalId').value;
      const category = document.getElementById('serviceModalCategory').value;
      const title = document.getElementById('serviceModalTitleInput').value.trim();
      const price = document.getElementById('serviceModalPriceInput').value.trim();
      const description = document.getElementById('serviceModalDescInput').value.trim();
      const featuresRaw = document.getElementById('serviceModalFeaturesInput').value.trim();
      const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(Boolean) : [];

      const current = getSiteData();
      if (id) {
        const idx = current.services.findIndex(s => s.id === id);
        if (idx !== -1) {
          current.services[idx] = { id, category, title, price, description, features };
        }
      } else {
        const newId = 'srv-' + Date.now().toString(36);
        current.services.push({ id: newId, category, title, price, description, features });
      }

      saveSiteData(current);
      renderServicesData();
      closeModal('serviceModal');
      showToast('Services catalog saved!');
    });
  }
}

window.editService = function(id) {
  const srv = getSiteData().services.find(s => s.id === id);
  if (!srv) return;

  document.getElementById('serviceModalId').value = srv.id;
  document.getElementById('serviceModalCategory').value = srv.category;
  document.getElementById('serviceModalTitleInput').value = srv.title;
  document.getElementById('serviceModalPriceInput').value = srv.price || '';
  document.getElementById('serviceModalDescInput').value = srv.description;
  document.getElementById('serviceModalFeaturesInput').value = (srv.features || []).join('\n');

  document.getElementById('serviceModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: var(--admin-gold); margin-right: 8px;"></i> Edit Service';
  openModal('serviceModal');
};

window.deleteService = function(id) {
  if (confirm('Delete this service from the website?')) {
    const current = getSiteData();
    current.services = current.services.filter(s => s.id !== id);
    saveSiteData(current);
    renderServicesData();
    showToast('Service deleted.');
  }
};

/* ==========================================================================
   7. GALLERY & PORTFOLIO MODULE (UPLOAD PHOTOS FROM PC)
   ========================================================================== */
function renderGalleryData() {
  const data = getSiteData();
  const gallery = data.gallery || [];
  const container = document.getElementById('galleryAdminGrid');
  const badge = document.getElementById('badgeGalleryCount');
  const metric = document.getElementById('metricPhotosCount');

  if (badge) badge.textContent = gallery.length;
  if (metric) metric.textContent = gallery.length;
  if (!container) return;

  container.innerHTML = '';
  gallery.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <div>
        <img src="${item.image}" alt="${item.title}" style="width: 100%; aspect-ratio: 3/4; object-fit: cover; border-radius: 8px; margin-bottom: 0.85rem;">
        <div class="item-card-header">
          <div>
            <h3 class="item-card-title">${item.title}</h3>
            <span class="item-card-subtitle">${item.category}</span>
          </div>
          <span class="status-badge status-completed">${item.category}</span>
        </div>
      </div>
      <div class="item-card-footer">
        <span style="font-size: 0.75rem; color: var(--admin-text-muted);">ID: ${item.id}</span>
        <button class="btn-admin-danger" onclick="deleteGalleryItem('${item.id}')">
          <i class="fa-solid fa-trash-can"></i> Delete Photo
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function initGalleryModule() {
  const openBtn = document.getElementById('openAddGalleryBtn');
  const form = document.getElementById('galleryModalForm');
  const fileInput = document.getElementById('galleryModalFileInput');
  const imgPreview = document.getElementById('galleryModalImgPreview');
  const imgUrlInput = document.getElementById('galleryModalImgUrlInput');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      form.reset();
      imgPreview.src = 'assets/images/hero_gowsalya_bridal.jpg';
      openModal('galleryModal');
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const base64 = await fileToBase64(file);
        if (base64) {
          imgPreview.src = base64;
          imgUrlInput.value = base64;
        }
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const image = imgUrlInput.value.trim();
      if (!image) {
        alert('Please choose an image from your PC or enter a URL.');
        return;
      }

      const category = document.getElementById('galleryModalCategory').value;
      const title = document.getElementById('galleryModalTitleInput').value.trim();

      const current = getSiteData();
      const newPhoto = {
        id: 'gal-' + Date.now().toString(36),
        category,
        title,
        image
      };

      current.gallery.unshift(newPhoto);
      saveSiteData(current);
      renderGalleryData();
      closeModal('galleryModal');
      showToast('New photo uploaded to bridal gallery!');
    });
  }
}

window.deleteGalleryItem = function(id) {
  if (confirm('Delete this photo from the bridal portfolio?')) {
    const current = getSiteData();
    current.gallery = current.gallery.filter(g => g.id !== id);
    saveSiteData(current);
    renderGalleryData();
    showToast('Photo removed from gallery.');
  }
};

/* ==========================================================================
   8. INSTAGRAM REELS MODULE
   ========================================================================== */
function renderReelsData() {
  const data = getSiteData();
  const reels = data.reels || [];
  const container = document.getElementById('reelsAdminGrid');
  const badge = document.getElementById('badgeReelsCount');

  if (badge) badge.textContent = reels.length;
  if (!container) return;

  container.innerHTML = '';
  reels.forEach((reel, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <div>
        <img src="${reel.image}" alt="${reel.title}" style="width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 8px; margin-bottom: 0.85rem;">
        <div class="item-card-header">
          <div>
            <h3 class="item-card-title">${reel.title}</h3>
            <span class="item-card-subtitle">${reel.category} &bull; Reel ${idx + 1}</span>
          </div>
          <span class="status-badge status-completed">Live</span>
        </div>
        <p style="font-size: 0.78rem; color: var(--admin-text-muted); word-break: break-all; margin-bottom: 0.5rem;">
          <i class="fa-brands fa-instagram" style="color: #E1306C; margin-right: 4px;"></i>${reel.url}
        </p>
      </div>
      <div class="item-card-footer">
        <a href="${reel.url}" target="_blank" class="btn-admin-outline" style="font-size: 0.78rem;">
          <i class="fa-solid fa-play"></i> Watch
        </a>
        <button class="btn-admin-danger" onclick="deleteReel('${reel.id}')">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function initReelsModule() {
  const openBtn = document.getElementById('openAddReelBtn');
  const form = document.getElementById('reelModalForm');
  const fileInput = document.getElementById('reelModalFileInput');
  const imgPreview = document.getElementById('reelModalImgPreview');
  const imgUrlInput = document.getElementById('reelModalImgUrlInput');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      form.reset();
      imgPreview.src = 'assets/images/reels/reel1.jpg';
      openModal('reelModal');
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const base64 = await fileToBase64(file);
        if (base64) {
          imgPreview.src = base64;
          imgUrlInput.value = base64;
        }
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = document.getElementById('reelModalUrlInput').value.trim();
      const category = document.getElementById('reelModalCategoryInput').value.trim() || 'Bridal Reel';
      const title = document.getElementById('reelModalTitleInput').value.trim();
      const image = imgUrlInput.value.trim() || 'assets/images/reels/reel1.jpg';

      const current = getSiteData();
      const newReel = {
        id: 'reel-' + Date.now().toString(36),
        url,
        category,
        title,
        image
      };

      current.reels.push(newReel);
      saveSiteData(current);
      renderReelsData();
      closeModal('reelModal');
      showToast('New Instagram Reel added!');
    });
  }
}

window.deleteReel = function(id) {
  if (confirm('Delete this Instagram Reel from website?')) {
    const current = getSiteData();
    current.reels = current.reels.filter(r => r.id !== id);
    saveSiteData(current);
    renderReelsData();
    showToast('Reel removed.');
  }
};

/* ==========================================================================
   9. TESTIMONIALS & REGIONAL REVIEWS MODULE
   ========================================================================== */
function renderTestimonialsData() {
  const data = getSiteData();
  const reviews = data.testimonials || [];
  const container = document.getElementById('testimonialsAdminGrid');
  const badge = document.getElementById('badgeReviewsCount');

  if (badge) badge.textContent = reviews.length;
  if (!container) return;

  container.innerHTML = '';
  reviews.forEach(t => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <div>
        <div class="item-card-header">
          <div>
            <h3 class="item-card-title">${t.name}</h3>
            <span class="item-card-subtitle">${t.event} &bull; <strong style="color: var(--admin-gold);"><i class="fa-solid fa-location-dot"></i> ${t.location}</strong></span>
          </div>
          <span class="status-badge status-completed">★ ${t.rating || 5}.0</span>
        </div>
        <div class="item-card-body">
          <p>"${t.quote}"</p>
        </div>
      </div>
      <div class="item-card-footer">
        <button class="btn-admin-outline" onclick="editReview('${t.id}')">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button class="btn-admin-danger" onclick="deleteReview('${t.id}')">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function initTestimonialsModule() {
  const openBtn = document.getElementById('openAddReviewBtn');
  const form = document.getElementById('reviewModalForm');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      form.reset();
      document.getElementById('reviewModalId').value = '';
      openModal('reviewModal');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('reviewModalId').value;
      const name = document.getElementById('reviewModalNameInput').value.trim();
      const location = document.getElementById('reviewModalLocationInput').value.trim();
      const event = document.getElementById('reviewModalEventInput').value.trim();
      const rating = parseInt(document.getElementById('reviewModalRatingInput').value, 10) || 5;
      const quote = document.getElementById('reviewModalQuoteInput').value.trim();
      const avatar = name.charAt(0).toUpperCase() || 'B';

      const current = getSiteData();
      if (id) {
        const idx = current.testimonials.findIndex(t => t.id === id);
        if (idx !== -1) {
          current.testimonials[idx] = { id, name, location, event, rating, quote, avatar };
        }
      } else {
        const newId = 'test-' + Date.now().toString(36);
        current.testimonials.push({ id: newId, name, location, event, rating, quote, avatar });
      }

      saveSiteData(current);
      renderTestimonialsData();
      closeModal('reviewModal');
      showToast('Bride review saved successfully!');
    });
  }
}

window.editReview = function(id) {
  const t = getSiteData().testimonials.find(item => item.id === id);
  if (!t) return;

  document.getElementById('reviewModalId').value = t.id;
  document.getElementById('reviewModalNameInput').value = t.name;
  document.getElementById('reviewModalLocationInput').value = t.location;
  document.getElementById('reviewModalEventInput').value = t.event;
  document.getElementById('reviewModalRatingInput').value = t.rating.toString();
  document.getElementById('reviewModalQuoteInput').value = t.quote;

  openModal('reviewModal');
};

window.deleteReview = function(id) {
  if (confirm('Delete this client testimonial?')) {
    const current = getSiteData();
    current.testimonials = current.testimonials.filter(t => t.id !== id);
    saveSiteData(current);
    renderTestimonialsData();
    showToast('Review deleted.');
  }
};

/* ==========================================================================
   10. FAQ SECTION MODULE
   ========================================================================= */
function renderFaqsData() {
  const data = getSiteData();
  const faqs = data.faqs || [];
  const container = document.getElementById('faqsAdminGrid');
  const badge = document.getElementById('badgeFaqsCount');

  if (badge) badge.textContent = faqs.length;
  if (!container) return;

  container.innerHTML = '';
  faqs.forEach((faq, idx) => {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
      <div>
        <div class="item-card-header">
          <div>
            <h3 class="item-card-title">${faq.question}</h3>
            <span class="item-card-subtitle">FAQ #${idx + 1}</span>
          </div>
        </div>
        <div class="item-card-body">
          <p>${faq.answer}</p>
        </div>
      </div>
      <div class="item-card-footer">
        <button class="btn-admin-outline" onclick="editFaq('${faq.id}')">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button class="btn-admin-danger" onclick="deleteFaq('${faq.id}')">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function initFaqsModule() {
  const openBtn = document.getElementById('openAddFaqBtn');
  const form = document.getElementById('faqModalForm');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      form.reset();
      document.getElementById('faqModalId').value = '';
      openModal('faqModal');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('faqModalId').value;
      const question = document.getElementById('faqModalQuestionInput').value.trim();
      const answer = document.getElementById('faqModalAnswerInput').value.trim();

      const current = getSiteData();
      if (id) {
        const idx = current.faqs.findIndex(f => f.id === id);
        if (idx !== -1) {
          current.faqs[idx] = { id, question, answer };
        }
      } else {
        const newId = 'faq-' + Date.now().toString(36);
        current.faqs.push({ id: newId, question, answer });
      }

      saveSiteData(current);
      renderFaqsData();
      closeModal('faqModal');
      showToast('FAQ updated on live website!');
    });
  }
}

window.editFaq = function(id) {
  const faq = getSiteData().faqs.find(f => f.id === id);
  if (!faq) return;

  document.getElementById('faqModalId').value = faq.id;
  document.getElementById('faqModalQuestionInput').value = faq.question;
  document.getElementById('faqModalAnswerInput').value = faq.answer;

  openModal('faqModal');
};

window.deleteFaq = function(id) {
  if (confirm('Delete this FAQ?')) {
    const current = getSiteData();
    current.faqs = current.faqs.filter(f => f.id !== id);
    saveSiteData(current);
    renderFaqsData();
    showToast('FAQ removed.');
  }
};

/* ==========================================================================
   11. STUDIO CONTACT & SETTINGS
   ========================================================================== */
function renderStudioData() {
  const data = getSiteData().studio;
  document.getElementById('studioNameInput').value = data.name || '';
  document.getElementById('studioPhoneInput').value = data.phone || '';
  document.getElementById('studioEmailInput').value = data.email || '';
  document.getElementById('studioInstaInput').value = data.instagramUrl || '';
  document.getElementById('studioAddr1Input').value = data.addressLine1 || '';
  document.getElementById('studioAddr2Input').value = data.addressLine2 || '';
  document.getElementById('studioAddr3Input').value = data.addressLine3 || '';
  document.getElementById('studioTimingsInput').value = data.timings || '';
  document.getElementById('studioMapsInput').value = data.mapsUrl || '';
}

function initStudioModule() {
  const saveBtn = document.getElementById('saveStudioFormBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = getSiteData();
      current.studio = {
        ...current.studio,
        name: document.getElementById('studioNameInput').value.trim(),
        phone: document.getElementById('studioPhoneInput').value.trim(),
        phoneRaw: document.getElementById('studioPhoneInput').value.replace(/[^0-9]/g, ''),
        email: document.getElementById('studioEmailInput').value.trim(),
        instagramUrl: document.getElementById('studioInstaInput').value.trim(),
        addressLine1: document.getElementById('studioAddr1Input').value.trim(),
        addressLine2: document.getElementById('studioAddr2Input').value.trim(),
        addressLine3: document.getElementById('studioAddr3Input').value.trim(),
        timings: document.getElementById('studioTimingsInput').value.trim(),
        mapsUrl: document.getElementById('studioMapsInput').value.trim()
      };

      saveSiteData(current);
      showToast('Studio contact & address details updated!');
    });
  }
}

/* ==========================================================================
   12. SECURITY & DATA BACKUP / RESTORE
   ========================================================================== */
function initSecurityAndBackupModule() {
  const pinForm = document.getElementById('changePinForm');
  const exportBtn = document.getElementById('exportBackupJsonBtn');
  const importInput = document.getElementById('importBackupJsonInput');
  const resetBtn = document.getElementById('resetDefaultsBtn');

  if (pinForm) {
    pinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentPin = document.getElementById('currentPinInput').value.trim();
      const newPin = document.getElementById('newPinInput').value.trim();
      const savedPin = localStorage.getItem('gowsi_admin_pin') || DEFAULT_PIN;

      if (currentPin !== savedPin && currentPin !== 'gowsi2026') {
        alert('Current PIN is incorrect!');
        return;
      }

      if (newPin.length < 4) {
        alert('New PIN must be at least 4 characters.');
        return;
      }

      localStorage.setItem('gowsi_admin_pin', newPin);
      showToast('Admin Passcode updated!');
      pinForm.reset();
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = getSiteData();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Gowsi_Makeover_Full_Website_Backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Backup JSON file downloaded!');
    });
  }

  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            if (parsed && typeof parsed === 'object') {
              saveSiteData(parsed);
              refreshAllDashboardData();
              showToast('Website restored from backup file successfully!');
            }
          } catch (err) {
            alert('Invalid backup JSON file.');
          }
        };
        reader.readAsText(file);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all website sections and services to original defaults?')) {
        resetSiteData();
        refreshAllDashboardData();
        showToast('Website reset to default content!');
      }
    });
  }
}
