// Main JavaScript Application for CIV_L3: PPI y Control de Calidad
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  // State Management
  const state = {
    currentView: 'slides', // 'slides', 'content', 'viewer3d', 'tools', 'flashcards', 'gallery'
    currentSlide: 1,
    totalSlides: (typeof PRESENTATION !== 'undefined' && PRESENTATION.totalSlides) ? PRESENTATION.totalSlides : 46,
    currentChapter: 1,
    
    // Search & Filter
    searchQuery: '',
    selectedModule: 'all',
    bookmarks: JSON.parse(localStorage.getItem('ppi_bookmarks') || '[]'),
    personalNotes: JSON.parse(localStorage.getItem('ppi_notes') || '{}'),
    showingBookmarksOnly: false,

    // Quiz State
    quizIndex: 0,
    quizScore: 0,
    quizAnswered: false,

    // Flashcard State
    flashcardIndex: 0,
    flashcardFlipped: false,
    learnedCards: JSON.parse(localStorage.getItem('ppi_learned_cards') || '[]'),

    // Lightbox State
    lightboxZoom: 1.0,
    lightboxImageSrc: '',

    // 3D Viewer Instance
    viewer3d: null,

    // PPI Checklist state
    ppiRecords: JSON.parse(localStorage.getItem('ppi_records') || '{}')
  };

  // Flatten slides from COURSE_DATA
  const allCourseSlides = [];
  if (typeof COURSE_DATA !== 'undefined' && COURSE_DATA.modules) {
    COURSE_DATA.modules.forEach(mod => {
      mod.slides.forEach(s => {
        allCourseSlides.push({
          ...s,
          moduleId: mod.id,
          moduleNumber: mod.number,
          moduleTitle: mod.title
        });
      });
    });
  }

  // DOM Elements - Navigation & Top Bar
  const viewModeButtons = document.querySelectorAll('.view-mode-btn');
  const viewPanes = document.querySelectorAll('.view-pane');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const chapterPillsContainer = document.getElementById('chapterPillsContainer');
  const chapterMobileSelect = document.getElementById('chapterMobileSelect');

  // DOM Elements - Slide Presentation
  const mainSlideImg = document.getElementById('mainSlideImg');
  const slideCounterBadge = document.getElementById('slideCounterBadge') || document.getElementById('currentSlideNum');
  const slideChapterTag = document.getElementById('slideChapterTag');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const filmstripContainer = document.getElementById('filmstripContainer');
  const filmstripDrawer = document.getElementById('filmstripDrawer');
  const slideViewportContainer = document.getElementById('slideViewportContainer');
  const toggleFilmstripBtn = document.getElementById('toggleFilmstripBtn');
  const toggleFilmstripText = document.getElementById('toggleFilmstripText');
  const slideZoomBtn = document.getElementById('slideZoomBtn');

  // DOM Elements - Quiz Modal
  const openTestBtn = document.getElementById('openTestBtn');
  const testModal = document.getElementById('testModal');
  const closeTestBtn = document.getElementById('closeTestBtn');
  const quizCounter = document.getElementById('quizCounter');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizJumpSlideBtn = document.getElementById('quizJumpSlideBtn');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizSummaryBox = document.getElementById('quizSummaryBox');
  const quizScoreReport = document.getElementById('quizScoreReport');
  const quizRestartBtn = document.getElementById('quizRestartBtn');

  // DOM Elements - Lightbox
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const resetZoomBtn = document.getElementById('resetZoomBtn');
  const zoomLevelText = document.getElementById('zoomLevelText');

  // ========================================================
  // 1. VIEW MODE SWITCHING (Diapositivas, 3D, Calculadoras, etc.)
  // ========================================================
  viewModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-view');
      switchView(mode);
    });
  });

  function switchView(mode) {
    state.currentView = mode;

    viewModeButtons.forEach(b => {
      if (b.getAttribute('data-view') === mode) {
        b.classList.add('active-nav-tab');
        b.classList.remove('text-slate-400');
      } else {
        b.classList.remove('active-nav-tab');
        b.classList.add('text-slate-400');
      }
    });

    viewPanes.forEach(pane => {
      if (pane.id === `view-${mode}`) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    // Control visibility of top chapter pills (visible only in slides & content)
    if (mode === 'slides' || mode === 'content') {
      if (chapterPillsContainer) chapterPillsContainer.classList.remove('opacity-30', 'pointer-events-none');
    } else {
      if (chapterPillsContainer) chapterPillsContainer.classList.add('opacity-30', 'pointer-events-none');
    }

    // Lazy load 3D viewer
    if (mode === 'viewer3d') {
      if (!state.viewer3d && window.StructuralViewer3D) {
        state.viewer3d = new window.StructuralViewer3D('threeCanvasContainer');
      } else if (state.viewer3d) {
        setTimeout(() => state.viewer3d.onWindowResize(), 60);
      }
    }

    // Refresh lucide icons
    if (window.lucide) lucide.createIcons();
  }

  // ========================================================
  // 2. SLIDE PRESENTATION & FILMSTRIP LOGIC
  // ========================================================
  function initPresentation() {
    // 1. Build Chapter Pills
    chapterPillsContainer.innerHTML = '';
    chapterMobileSelect.innerHTML = '';

    PRESENTATION.chapters.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'chapter-pill px-3 py-1 rounded-full text-slate-400 hover:text-white transition-all whitespace-nowrap text-xs';
      btn.textContent = ch.name;
      btn.addEventListener('click', () => {
        goToSlide(ch.slideStart);
        if (state.currentView !== 'slides') switchView('slides');
      });
      chapterPillsContainer.appendChild(btn);

      // Mobile option
      const opt = document.createElement('option');
      opt.value = ch.slideStart;
      opt.textContent = ch.name;
      chapterMobileSelect.appendChild(opt);
    });

    chapterMobileSelect.addEventListener('change', (e) => {
      goToSlide(parseInt(e.target.value));
      if (state.currentView !== 'slides') switchView('slides');
    });

    // 2. Build Thumbnails (Filmstrip)
    filmstripContainer.innerHTML = '';
    for (let i = 1; i <= state.totalSlides; i++) {
      const thumb = document.createElement('button');
      thumb.className = `filmstrip-thumb relative shrink-0 h-16 aspect-[16/9] rounded-lg overflow-hidden border border-white/10 hover:border-amber-400/80 transition-all ${
        i === 1 ? 'ring-2 ring-amber-400 opacity-100' : 'opacity-70 hover:opacity-100'
      }`;
      thumb.dataset.slide = i;
      thumb.innerHTML = `
        <img src="slides/slide_${String(i).padStart(2, '0')}.jpg" alt="Slide ${i}" class="w-full h-full object-cover" loading="lazy" />
        <span class="absolute bottom-1 right-1 text-[9px] font-mono bg-black/75 px-1 py-0.2 rounded text-white">${i}</span>
      `;
      thumb.addEventListener('click', () => {
        goToSlide(i);
        if (state.currentView !== 'slides') switchView('slides');
      });
      filmstripContainer.appendChild(thumb);
    }

    // Set initial slide
    goToSlide(1);
  }

  function goToSlide(num) {
    if (num < 1 || num > state.totalSlides) return;
    state.currentSlide = num;

    // Update main image with fade transition
    mainSlideImg.style.opacity = '0.4';
    mainSlideImg.style.transform = 'scale(0.99)';
    setTimeout(() => {
      mainSlideImg.src = `slides/slide_${String(num).padStart(2, '0')}.jpg`;
      mainSlideImg.style.opacity = '1';
      mainSlideImg.style.transform = 'scale(1)';
    }, 60);

    // Update counter
    if (slideCounterBadge) {
      slideCounterBadge.textContent = `${String(num).padStart(2, '0')} / ${state.totalSlides}`;
    }

    // Update chapter tag & active pill
    const ch = PRESENTATION.chapters.find(c => num >= c.range[0] && num <= c.range[1]);
    if (ch) {
      slideChapterTag.textContent = ch.name;
      const pills = chapterPillsContainer.querySelectorAll('.chapter-pill');
      pills.forEach((p, idx) => {
        if (idx === ch.id - 1) {
          p.className = 'chapter-pill px-3 py-1 rounded-full bg-white/10 text-amber-400 font-semibold transition-all whitespace-nowrap text-xs border border-amber-400/30';
        } else {
          p.className = 'chapter-pill px-3 py-1 rounded-full text-slate-400 hover:text-white transition-all whitespace-nowrap text-xs border border-transparent';
        }
      });
      chapterMobileSelect.value = ch.slideStart;
    }

    // Highlight thumbnail in filmstrip
    const thumbs = filmstripContainer.querySelectorAll('.filmstrip-thumb');
    thumbs.forEach((t, idx) => {
      if (idx + 1 === num) {
        t.className = 'filmstrip-thumb relative shrink-0 h-16 aspect-[16/9] rounded-lg overflow-hidden border border-amber-400 ring-2 ring-amber-400 transition-all opacity-100';
        t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        t.className = 'filmstrip-thumb relative shrink-0 h-16 aspect-[16/9] rounded-lg overflow-hidden border border-white/10 hover:border-amber-400/80 transition-all opacity-70 hover:opacity-100';
      }
    });

    // Also sync digitalized content tab if active
    syncContentTab(num);
  }

  prevSlideBtn.addEventListener('click', () => goToSlide(state.currentSlide - 1));
  nextSlideBtn.addEventListener('click', () => goToSlide(state.currentSlide + 1));

  // Collapsible Filmstrip logic to maximize slide viewport
  let filmstripCollapsed = false;
  function toggleFilmstrip() {
    filmstripCollapsed = !filmstripCollapsed;
    if (filmstripDrawer) {
      if (filmstripCollapsed) {
        filmstripDrawer.classList.add('collapsed');
        if (toggleFilmstripText) toggleFilmstripText.textContent = 'Mostrar Tira (B)';
        if (mainSlideImg) {
          mainSlideImg.classList.remove('fit-contain');
          mainSlideImg.classList.add('fit-contain-collapsed');
        }
        if (slideViewportContainer) {
          slideViewportContainer.classList.remove('h-[calc(100vh-9.5rem)]');
          slideViewportContainer.classList.add('h-[calc(100vh-4.5rem)]');
        }
      } else {
        filmstripDrawer.classList.remove('collapsed');
        if (toggleFilmstripText) toggleFilmstripText.textContent = 'Ocultar Tira (B)';
        if (mainSlideImg) {
          mainSlideImg.classList.remove('fit-contain-collapsed');
          mainSlideImg.classList.add('fit-contain');
        }
        if (slideViewportContainer) {
          slideViewportContainer.classList.remove('h-[calc(100vh-4.5rem)]');
          slideViewportContainer.classList.add('h-[calc(100vh-9.5rem)]');
        }
      }
    }
  }

  if (toggleFilmstripBtn) {
    toggleFilmstripBtn.addEventListener('click', toggleFilmstrip);
  }

  if (slideZoomBtn) {
    slideZoomBtn.addEventListener('click', () => {
      openLightbox(mainSlideImg.src, `Diapositiva ${state.currentSlide} / ${state.totalSlides}`);
    });
  }

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    // Avoid interfering with inputs or textareas
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      return;
    }

    if (e.key === 'ArrowLeft') goToSlide(state.currentSlide - 1);
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      goToSlide(state.currentSlide + 1);
    }
    if (e.key === 'b' || e.key === 'B') toggleFilmstrip();
    if (e.key === 'z' || e.key === 'Z') {
      openLightbox(mainSlideImg.src, `Diapositiva ${state.currentSlide} / ${state.totalSlides}`);
    }
    if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    if (e.key === 'Escape') {
      closeQuiz();
      closeLightbox();
    }
  });

  // Fullscreen Toggle
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.documentElement.classList.toggle('dark');
  });

  // Double-click on main slide opens Lightbox zoom
  mainSlideImg.addEventListener('dblclick', () => {
    openLightbox(mainSlideImg.src, `Diapositiva ${state.currentSlide} / ${state.totalSlides}`);
  });

  // ========================================================
  // 3. QUIZ MODAL LOGIC (HERO ACTION)
  // ========================================================
  function openQuiz() {
    testModal.classList.remove('hidden');
    renderQuiz();
  }

  function closeQuiz() {
    testModal.classList.add('hidden');
  }

  openTestBtn.addEventListener('click', openQuiz);
  closeTestBtn.addEventListener('click', closeQuiz);
  testModal.addEventListener('click', (e) => {
    if (e.target === testModal) closeQuiz();
  });

  function renderQuiz() {
    state.quizAnswered = false;
    quizFeedback.classList.add('hidden');
    quizNextBtn.classList.add('opacity-50', 'pointer-events-none');
    quizSummaryBox.classList.add('hidden');
    quizOptions.classList.remove('hidden');

    const total = PRESENTATION.quiz.length;
    const q = PRESENTATION.quiz[state.quizIndex];

    quizCounter.textContent = `${state.quizIndex + 1} / ${total}`;
    quizQuestion.textContent = q.question;
    quizProgressBar.style.width = `${((state.quizIndex + 1) / total) * 100}%`;

    quizJumpSlideBtn.onclick = () => {
      closeQuiz();
      switchView('slides');
      goToSlide(q.slideRef);
    };

    quizOptions.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'w-full text-left p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs sm:text-sm text-slate-200 transition-all flex items-center justify-between group';
      btn.innerHTML = `
        <span class="flex-1 pr-2">${opt}</span>
        <span class="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-slate-400 font-mono group-hover:border-amber-400 group-hover:text-amber-400 shrink-0">
          ${String.fromCharCode(65 + idx)}
        </span>
      `;
      btn.addEventListener('click', () => {
        if (state.quizAnswered) return;
        handleAnswer(idx, q);
      });
      quizOptions.appendChild(btn);
    });
  }

  function handleAnswer(selectedIdx, q) {
    state.quizAnswered = true;
    quizNextBtn.classList.remove('opacity-50', 'pointer-events-none');

    const isCorrect = selectedIdx === q.correct;
    if (isCorrect) state.quizScore++;

    const optionButtons = quizOptions.querySelectorAll('button');
    optionButtons.forEach((btn, idx) => {
      if (idx === q.correct) {
        btn.className = 'w-full text-left p-3 rounded-xl border border-emerald-500 bg-emerald-500/20 text-xs sm:text-sm text-emerald-200 font-semibold flex items-center justify-between';
      } else if (idx === selectedIdx && !isCorrect) {
        btn.className = 'w-full text-left p-3 rounded-xl border border-rose-500 bg-rose-500/20 text-xs sm:text-sm text-rose-200 flex items-center justify-between';
      } else {
        btn.classList.add('opacity-40');
      }
    });

    quizFeedback.classList.remove('hidden');
    if (isCorrect) {
      quizFeedback.className = 'p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs space-y-1';
      quizFeedback.innerHTML = `<strong class="font-bold">✓ ¡Correcto!</strong><p class="mt-0.5 text-slate-300">${q.explanation}</p>`;
    } else {
      quizFeedback.className = 'p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs space-y-1';
      quizFeedback.innerHTML = `<strong class="font-bold">✗ Incorrecto.</strong><p class="mt-0.5 text-slate-300">${q.explanation}</p>`;
    }
  }

  quizNextBtn.addEventListener('click', () => {
    if (state.quizIndex < PRESENTATION.quiz.length - 1) {
      state.quizIndex++;
      renderQuiz();
    } else {
      showQuizSummary();
    }
  });

  function showQuizSummary() {
    quizOptions.classList.add('hidden');
    quizFeedback.classList.add('hidden');
    quizNextBtn.classList.add('hidden');
    quizJumpSlideBtn.classList.add('hidden');
    quizSummaryBox.classList.remove('hidden');

    const total = PRESENTATION.quiz.length;
    const pct = Math.round((state.quizScore / total) * 100);
    quizScoreReport.textContent = `Has acertado ${state.quizScore} de ${total} preguntas (${pct}%). ${
      pct >= 80 ? '¡Sobresaliente! Dominas perfectamente el PPI y el Código Estructural.' :
      pct >= 60 ? '¡Aprobado! Tienes buenos conocimientos, pero repasa los Puntos de Parada y tolerancias.' :
      'Se sugiere repasar las diapositivas técnicas de cimentación y no conformidades.'
    }`;
  }

  quizRestartBtn.addEventListener('click', () => {
    state.quizIndex = 0;
    state.quizScore = 0;
    quizNextBtn.classList.remove('hidden');
    quizJumpSlideBtn.classList.remove('hidden');
    renderQuiz();
  });

  // ========================================================
  // 4. LIGHTBOX ZOOM MODAL
  // ========================================================
  let panX = 0, panY = 0, isPanning = false, startPanX = 0, startPanY = 0;

  function openLightbox(src, caption) {
    state.lightboxImageSrc = src;
    state.lightboxZoom = 1.0;
    panX = 0;
    panY = 0;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    zoomLevelText.textContent = '100%';
    applyZoom();
    lightboxModal.classList.remove('hidden');
  }

  function closeLightbox() {
    lightboxModal.classList.add('hidden');
    state.lightboxZoom = 1.0;
    panX = 0;
    panY = 0;
  }

  closeLightboxBtn.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('zoom-container')) closeLightbox();
  });

  zoomInBtn.addEventListener('click', () => {
    state.lightboxZoom = Math.min(state.lightboxZoom + 0.25, 4.0);
    applyZoom();
  });
  zoomOutBtn.addEventListener('click', () => {
    state.lightboxZoom = Math.max(state.lightboxZoom - 0.25, 0.5);
    applyZoom();
  });
  resetZoomBtn.addEventListener('click', () => {
    state.lightboxZoom = 1.0;
    panX = 0;
    panY = 0;
    applyZoom();
  });

  function applyZoom() {
    lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${state.lightboxZoom})`;
    lightboxImg.style.cursor = state.lightboxZoom > 1 ? 'grab' : 'default';
    zoomLevelText.textContent = `${Math.round(state.lightboxZoom * 100)}%`;
  }

  // Wheel zoom on Lightbox
  lightboxModal.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      state.lightboxZoom = Math.min(state.lightboxZoom + 0.2, 4.0);
    } else {
      state.lightboxZoom = Math.max(state.lightboxZoom - 0.2, 0.5);
    }
    applyZoom();
  }, { passive: false });

  // Pan (drag) when zoomed
  lightboxImg.addEventListener('mousedown', (e) => {
    if (state.lightboxZoom <= 1) return;
    isPanning = true;
    startPanX = e.clientX - panX;
    startPanY = e.clientY - panY;
    lightboxImg.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panX = e.clientX - startPanX;
    panY = e.clientY - startPanY;
    applyZoom();
  });

  window.addEventListener('mouseup', () => {
    if (isPanning) {
      isPanning = false;
      lightboxImg.style.cursor = state.lightboxZoom > 1 ? 'grab' : 'default';
    }
  });

  // ========================================================
  // 5. DIGITALIZED CONTENT TAB & NOTES
  // ========================================================
  function initContentTab() {
    const searchInput = document.getElementById('contentSearchInput');
    const moduleSelect = document.getElementById('contentModuleFilter');
    const slideListEl = document.getElementById('contentSlideList');

    if (moduleSelect) {
      moduleSelect.innerHTML = '<option value="all">Todos los Módulos (1 a 6)</option>';
      COURSE_DATA.modules.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.number.toString();
        opt.textContent = `M${m.number}: ${m.shortTitle}`;
        moduleSelect.appendChild(opt);
      });

      moduleSelect.addEventListener('change', (e) => {
        state.selectedModule = e.target.value;
        renderContentSlideList();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderContentSlideList();
      });
    }

    renderContentSlideList();
  }

  function renderContentSlideList() {
    const listEl = document.getElementById('contentSlideList');
    if (!listEl) return;
    listEl.innerHTML = '';

    const filtered = allCourseSlides.filter(s => {
      if (state.selectedModule !== 'all' && s.moduleNumber.toString() !== state.selectedModule) {
        return false;
      }
      if (state.searchQuery) {
        const match = (s.title + ' ' + s.category + ' ' + s.content).toLowerCase().includes(state.searchQuery);
        if (!match) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = '<div class="p-4 text-center text-xs text-slate-500">No se encontraron diapositivas con ese criterio.</div>';
      return;
    }

    filtered.forEach(s => {
      const isCur = s.slideNumber === state.currentSlide;
      const isBook = state.bookmarks.includes(s.slideNumber);

      const item = document.createElement('div');
      item.className = `p-3 rounded-xl border transition-all cursor-pointer ${
        isCur ? 'bg-amber-500/15 border-amber-500/50 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
      }`;
      item.innerHTML = `
        <div class="flex items-center justify-between text-xs mb-1">
          <span class="font-mono text-amber-400 font-bold">Slide ${String(s.slideNumber).padStart(2, '0')}</span>
          <span class="text-[10px] text-slate-400">${s.category}</span>
        </div>
        <h5 class="text-xs font-bold text-white line-clamp-1">${s.title}</h5>
      `;
      item.addEventListener('click', () => {
        goToSlide(s.slideNumber);
        syncContentTab(s.slideNumber);
      });
      listEl.appendChild(item);
    });
  }

  function syncContentTab(slideNum) {
    const titleEl = document.getElementById('activeContentTitle');
    const badgeEl = document.getElementById('activeContentBadge');
    const bodyEl = document.getElementById('activeContentBody');
    const notesArea = document.getElementById('activeContentNotes');

    let s = allCourseSlides.find(item => item.slideNumber === slideNum);
    const pSlide = (typeof PRESENTATION !== 'undefined' && PRESENTATION.slides) ? PRESENTATION.slides[slideNum - 1] : null;

    if (!s && pSlide) {
      s = {
        slideNumber: pSlide.id,
        title: pSlide.title,
        moduleNumber: pSlide.chapter || 1,
        category: pSlide.chapterName || 'Replanteo & PPI',
        content: `
          <div class="space-y-4">
            <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span class="text-xs font-mono text-amber-400 font-semibold uppercase">${pSlide.chapterName}</span>
              <h3 class="text-lg font-bold text-white">${pSlide.title}</h3>
              <p class="text-slate-300 text-sm leading-relaxed">${pSlide.subtitle}</p>
            </div>
            <div class="flex justify-center p-3 rounded-2xl bg-black/40 border border-white/5">
              <img src="slides/${pSlide.file}" alt="${pSlide.title}" class="max-h-[460px] rounded-xl object-contain shadow-2xl cursor-zoom-in hover:scale-[1.01] transition-transform" onclick="openLightbox('slides/${pSlide.file}', '${pSlide.title}')" />
            </div>
          </div>
        `
      };
    }
    if (!s) return;

    if (titleEl) titleEl.textContent = `${s.slideNumber}. ${s.title}`;
    if (badgeEl) badgeEl.textContent = `M${s.moduleNumber} • ${s.category}`;
    if (bodyEl) bodyEl.innerHTML = s.content;

    if (notesArea) {
      notesArea.value = state.personalNotes[slideNum] || '';
      notesArea.oninput = (e) => {
        state.personalNotes[slideNum] = e.target.value;
        localStorage.setItem('ppi_notes', JSON.stringify(state.personalNotes));
      };
    }
  }

  // ========================================================
  // 6. TECHNICAL CALCULATORS & TOOLS
  // ========================================================
  function initCalculators() {
    // Tool 1: Matriz de Riesgo y Frecuencias (Anexo I & II)
    const calcRiskBtn = document.getElementById('calcRiskBtn');
    if (calcRiskBtn) {
      calcRiskBtn.addEventListener('click', () => {
        const useType = document.getElementById('riskUseType').value;
        const units = parseFloat(document.getElementById('riskUnits').value) || 0;
        const seismicAcc = parseFloat(document.getElementById('riskSeismic').value) || 0.04;
        const soilType = document.getElementById('riskSoil').value;

        // Dimensional level
        let dimLevel = 1;
        if (useType === 'vivienda') {
          if (units > 12) dimLevel = 3;
          else if (units >= 7) dimLevel = 2;
        } else {
          if (units > 2000) dimLevel = 3;
          else if (units >= 1000) dimLevel = 2;
        }

        // Seismic level
        let seismicLevel = 1;
        if (seismicAcc >= 0.12) seismicLevel = 3;
        else if (seismicAcc >= 0.08) seismicLevel = 2;

        // Geotechnical level
        let geoLevel = soilType === 'T3' ? 3 : soilType === 'T2' ? 2 : 1;

        const maxLevel = Math.max(dimLevel, seismicLevel, geoLevel);
        const resultEl = document.getElementById('riskResultBox');
        resultEl.innerHTML = `
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-300">Nivel de Riesgo Global:</span>
              <span class="px-2 py-0.5 rounded font-bold ${
                maxLevel === 3 ? 'bg-rose-500 text-white' : maxLevel === 2 ? 'bg-amber-500 text-black' : 'bg-emerald-500 text-black'
              }">NIVEL ${maxLevel}</span>
            </div>
            <p class="text-slate-400">
              Dimensional: Nivel ${dimLevel} • Sísmico: Nivel ${seismicLevel} (a_b = ${seismicAcc}g) • Geotécnico: Nivel ${geoLevel} (${soilType})
            </p>
            <div class="pt-2 border-t border-slate-800 space-y-1">
              <p><strong>Frecuencias Exigidas (Anexo II):</strong></p>
              <ul class="list-disc pl-4 space-y-0.5 text-slate-300">
                <li>Muros de Sótano (250 m²): FC 2</li>
                <li>Fachadas (400-600 m²): FC 2</li>
                <li>Cubiertas Planas (400 m²): <span class="text-amber-400 font-bold">FC 4</span></li>
                <li>Prueba Estanqueidad Cubiertas: <span class="text-emerald-400 font-bold">100% de la UI (Obligatoria)</span></li>
              </ul>
            </div>
          </div>
        `;
      });
    }

    // Tool 2: Calculadora de Longitudes de Anclaje y Solape (Art. 49.5)
    const calcAnchorBtn = document.getElementById('calcAnchorBtn');
    if (calcAnchorBtn) {
      calcAnchorBtn.addEventListener('click', () => {
        const fck = parseFloat(document.getElementById('anchorFck').value) || 25;
        const steel = document.getElementById('anchorSteel').value;
        const phi = parseFloat(document.getElementById('anchorPhi').value) || 16;
        const pos = document.getElementById('anchorPos').value; // 'I' or 'II'
        const hookType = document.getElementById('anchorHook').value; // 'recta', 'patilla', 'soldada'

        // Table 49.5.1.2.a: Coefficient m
        const mTableB500 = { 25: 1.5, 30: 1.3, 35: 1.2, 40: 1.1, 45: 1.0, 50: 1.0 };
        const mTableB400 = { 25: 1.2, 30: 1.0, 35: 0.9, 40: 0.8, 45: 0.7, 50: 0.7 };
        const mVal = steel === 'B500S' ? (mTableB500[fck] || 1.5) : (mTableB400[fck] || 1.2);
        const fyk = steel === 'B500S' ? 500 : 400;

        // Basic anchor length lb (in mm)
        let lb = 0;
        if (pos === 'I') {
          lb = Math.round(mVal * (phi * phi));
          const maxCheck = Math.round((fyk / 20) * phi);
          if (lb > maxCheck) lb = maxCheck;
        } else {
          lb = Math.round(1.4 * mVal * (phi * phi));
          const maxCheck = Math.round((fyk / 14) * phi);
          if (lb > maxCheck) lb = maxCheck;
        }

        // Factor beta
        let beta = 1.0;
        if (hookType === 'patilla' || hookType === 'gancho') {
          beta = 0.7;
        } else if (hookType === 'soldada') {
          beta = 0.7;
        }

        const lbNeta = Math.round(lb * beta);
        const mandrel = phi < 20 ? 4 * phi : 7 * phi;
        const lapLength = Math.round(lbNeta * 1.4); // Typical alpha = 1.4

        const resEl = document.getElementById('anchorResultBox');
        resEl.innerHTML = `
          <div class="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2 text-xs">
            <div class="grid grid-cols-2 gap-2 text-slate-300">
              <div>Coeficiente m: <span class="text-amber-400 font-bold">${mVal}</span></div>
              <div>Factor beta: <span class="text-sky-400 font-bold">${beta}</span></div>
              <div>Longitud básica (lb): <span class="text-white font-bold">${lb} mm (${(lb/10).toFixed(1)} cm)</span></div>
              <div>Longitud neta (lb,neta): <span class="text-emerald-400 font-bold">${lbNeta} mm (${(lbNeta/10).toFixed(1)} cm)</span></div>
              <div>Solape estimado (α=1.4): <span class="text-amber-300 font-bold">${lapLength} mm (${(lapLength/10).toFixed(1)} cm)</span></div>
              <div>Mandril mín. (Tabla 49.3.4): <span class="text-cyan-300 font-bold">${mandrel} mm (${(mandrel/10).toFixed(1)} cm)</span></div>
            </div>
            <p class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              * Nota: Si la patilla está a compresión, beta = 1.0. Patilla recta reglamentaria ≥ 5 Ø (${(5 * phi)/10} cm).
            </p>
          </div>
        `;
      });
    }

    // Tool 3: Checklist Interactivo PPI MC1
    initPpiChecklist();
  }

  function initPpiChecklist() {
    const container = document.getElementById('ppiChecklistContainer');
    if (!container || !COURSE_DATA.ppiChecklist) return;

    container.innerHTML = '';
    COURSE_DATA.ppiChecklist.forEach(item => {
      const currentStatus = state.ppiRecords[item.code] || 'pending'; // 'conforme', 'no_conforme', 'pending'

      const row = document.createElement('div');
      row.className = `p-3 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs ${
        currentStatus === 'conforme' ? 'bg-emerald-950/20 border-emerald-500/40' :
        currentStatus === 'no_conforme' ? 'bg-rose-950/20 border-rose-500/40' :
        'bg-slate-900/50 border-slate-800'
      }`;

      const pointBadgeColor = item.punto === 'PP' ? 'bg-rose-500 text-white' : item.punto === 'PE' ? 'bg-amber-500 text-black' : 'bg-sky-500 text-black';

      row.innerHTML = `
        <div class="flex items-start gap-2.5 flex-1">
          <span class="px-2 py-0.5 rounded font-mono font-bold text-xs ${pointBadgeColor}">${item.punto}</span>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono font-bold text-amber-400">${item.code}</span>
              <strong class="text-white text-xs">${item.desc}</strong>
            </div>
            <p class="text-[11px] text-slate-400 mt-0.5">${item.criterio}</p>
            <span class="text-[10px] text-slate-500 italic">${item.doc} • Resp: ${item.resp}</span>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button class="status-btn px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            currentStatus === 'conforme' ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-emerald-500'
          }" data-code="${item.code}" data-status="conforme">
            ✓ Conforme
          </button>
          <button class="status-btn px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            currentStatus === 'no_conforme' ? 'bg-rose-500 text-white border-rose-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-rose-500'
          }" data-code="${item.code}" data-status="no_conforme">
            ✗ No Conforme
          </button>
        </div>
      `;

      // Status buttons
      row.querySelectorAll('.status-btn').forEach(b => {
        b.addEventListener('click', () => {
          const st = b.getAttribute('data-status');
          state.ppiRecords[item.code] = st;
          localStorage.setItem('ppi_records', JSON.stringify(state.ppiRecords));
          initPpiChecklist();
          updatePpiSummary();
        });
      });

      container.appendChild(row);
    });

    updatePpiSummary();
  }

  function updatePpiSummary() {
    const summaryEl = document.getElementById('ppiSummaryStats');
    if (!summaryEl) return;
    const total = COURSE_DATA.ppiChecklist.length;
    let conf = 0, nconf = 0;
    Object.values(state.ppiRecords).forEach(v => {
      if (v === 'conforme') conf++;
      if (v === 'no_conforme') nconf++;
    });
    const pending = total - (conf + nconf);

    summaryEl.innerHTML = `
      <span class="text-emerald-400">✓ ${conf} Conformes</span> •
      <span class="text-rose-400">✗ ${nconf} No Conformidades</span> •
      <span class="text-slate-400">⏳ ${pending} Pendientes</span>
    `;
  }

  // ========================================================
  // 7. FLASHCARDS 3D LOGIC
  // ========================================================
  function initFlashcards() {
    const flashcardEl = document.getElementById('flashcardElement');
    const frontText = document.getElementById('flashcardFrontText');
    const backText = document.getElementById('flashcardBackText');
    const catBadge = document.getElementById('flashcardCategory');
    const counterEl = document.getElementById('flashcardCounter');
    const prevBtn = document.getElementById('prevFlashcardBtn');
    const nextBtn = document.getElementById('nextFlashcardBtn');
    const flipBtn = document.getElementById('flipFlashcardBtn');

    if (!flashcardEl || !COURSE_DATA.flashcards) return;

    function renderCard() {
      state.flashcardFlipped = false;
      flashcardEl.classList.remove('is-flipped');

      const card = COURSE_DATA.flashcards[state.flashcardIndex];
      frontText.textContent = card.front;
      backText.textContent = card.back;
      catBadge.textContent = card.category;
      counterEl.textContent = `${state.flashcardIndex + 1} / ${COURSE_DATA.flashcards.length}`;
    }

    flashcardEl.addEventListener('click', () => {
      state.flashcardFlipped = !state.flashcardFlipped;
      flashcardEl.classList.toggle('is-flipped');
    });

    if (flipBtn) {
      flipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.flashcardFlipped = !state.flashcardFlipped;
        flashcardEl.classList.toggle('is-flipped');
      });
    }

    prevBtn.addEventListener('click', () => {
      state.flashcardIndex = (state.flashcardIndex - 1 + COURSE_DATA.flashcards.length) % COURSE_DATA.flashcards.length;
      renderCard();
    });

    nextBtn.addEventListener('click', () => {
      state.flashcardIndex = (state.flashcardIndex + 1) % COURSE_DATA.flashcards.length;
      renderCard();
    });

    renderCard();
  }

  // ========================================================
  // 8. HIGH RESOLUTION FORENSIC GALLERY
  // ========================================================
  function initGallery() {
    const galleryContainer = document.getElementById('galleryGridContainer');
    if (!galleryContainer) return;

    const galleryItems = [
      { file: 'replanteo_img/replanteo_01.jpg', title: 'Replanteo: Cimentación con cal y yeso sobre terreno', tag: 'Replanteo' },
      { file: 'replanteo_img/replanteo_02.jpg', title: 'Replanteo: Camillas de madera y alineaciones', tag: 'Replanteo' },
      { file: 'replanteo_img/replanteo_03.jpg', title: 'Replanteo: Estación total electrónica en obra', tag: 'Replanteo' },
      { file: 'replanteo_img/replanteo_04.jpg', title: 'Replanteo: Replanteo de zapatas y ejes de pilares', tag: 'Replanteo' },
      { file: 'replanteo_img/replanteo_05.jpg', title: 'Replanteo: Topografía con prisma y jalón', tag: 'Replanteo' },
      { file: 'replanteo_img/replanteo_06.jpg', title: 'Replanteo: Marcado perimetral y encofrados', tag: 'Replanteo' },
      { file: 'replanteo_img/replanteo_07.jpg', title: 'Replanteo: Control de cotas y nivelación', tag: 'Replanteo' },
      { file: 'MC1-NC 01 refino insuficiente-faltan separadores.png', title: 'NC-01: Excavación sin refino y falta separadores', tag: 'No Conformidad' },
      { file: 'MC1-NC 02 refino insuficiente-ausencia separadores.png', title: 'NC-02: Parrilla sobre tierra sin HL', tag: 'No Conformidad' },
      { file: 'MC1-NC 03 hormigon de limpieza insuficiente.png', title: 'NC-03: Hormigón de limpieza insuficiente', tag: 'No Conformidad' },
      { file: 'MC1-NC 04 calzos inadecuados.png', title: 'NC-04: Calzos inadecuados (ladrillos y cascotes)', tag: 'No Conformidad' },
      { file: 'MC1-NC 05 colocacion armaduras antes de fraguar el HL.png', title: 'NC-05: Ferralla sobre HL fresco', tag: 'No Conformidad' },
      { file: 'MC1-NC 06 toma de probetas.png', title: 'NC-06: Probetas de hormigón defectuosas', tag: 'No Conformidad' },
      { file: 'MC1-NC 07 esperas incorrectas.png', title: 'NC-07: Desviación esperas pilar', tag: 'No Conformidad' },
      { file: 'CONST_VI_Lesiones_Cimentacion_04_Metodologia_diagnostico.png', title: 'Metodología Diagnóstico en 6 Fases', tag: 'Patología' },
      { file: 'CONST_VI_Lesiones_Cimentacion_05_Intervencion.png', title: '6 Estrategias de Intervención en Cimentación', tag: 'Intervención' },
      { file: 'CONST_VI_Lesiones_Cimentacion_06_Caso_practico.png', title: 'Ficha Caso Real C/ Galdopar', tag: 'Caso Forense' },
      { file: 'Captura de pantalla 2026-05-22 123215.png', title: 'PPI MC1: Programa de Cimentación Superficial', tag: 'Ficha PPI' },
      { file: 'Captura de pantalla 2026-05-22 123050.png', title: 'Anexo I: Factores y Niveles de Riesgo', tag: 'Anexo Oficial' },
      { file: 'Captura de pantalla 2026-05-22 123117.png', title: 'Anexo II: Frecuencias de Comprobación', tag: 'Anexo Oficial' },
      { file: 'Captura de pantalla 2026-05-22 123134.png', title: 'Anexo III: Pruebas de Servicio Obligatorias', tag: 'Anexo Oficial' },
      { file: 'Captura de pantalla 2026-05-22 122955.png', title: 'Anexo IV: Certificados Finales de Obra', tag: 'Anexo Oficial' },
      { file: 'n1.png', title: 'Tabla 49.3.4: Mandriles mínimos', tag: 'Código Estructural' },
      { file: 'n2.png', title: 'Atado de armaduras y estribos', tag: 'Código Estructural' },
      { file: 'n3.png', title: 'Tipos de anclaje (patilla, gancho, recta)', tag: 'Código Estructural' },
      { file: 'n4.png', title: 'Longitud básica lb (Art. 49.5.1.2)', tag: 'Código Estructural' },
      { file: 'n5.png', title: 'Tabla m y fórmula lb,neta', tag: 'Código Estructural' },
      { file: 'n6.png', title: 'Tabla beta para factores de anclaje', tag: 'Código Estructural' },
      { file: 'n7.png', title: 'Escalonamiento de armaduras', tag: 'Código Estructural' },
      { file: 'n9.png', title: 'Empalmes por solapo en tracción', tag: 'Código Estructural' },
      { file: 'n10.png', title: 'Tabla alfa para solapes', tag: 'Código Estructural' },
      { file: 'n11.png', title: 'Solapos de grupos de barras', tag: 'Código Estructural' },
      { file: 'n12.png', title: 'Solapos de mallas electrosoldadas', tag: 'Código Estructural' }
    ];

    galleryContainer.innerHTML = '';
    galleryItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glass-panel rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-amber-400/60 transition-all flex flex-col justify-between';
      card.innerHTML = `
        <div class="h-44 w-full overflow-hidden bg-black/60 relative">
          <img src="${item.file}" alt="${item.title}" class="w-full h-full object-contain group-hover:scale-105 transition-all duration-300" loading="lazy" />
          <span class="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/80 text-amber-400 border border-white/10">${item.tag}</span>
        </div>
        <div class="p-3 bg-surface-900/80 flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-200 line-clamp-1">${item.title}</span>
          <i data-lucide="zoom-in" class="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors shrink-0"></i>
        </div>
      `;
      card.addEventListener('click', () => {
        openLightbox(item.file, item.title);
      });
      galleryContainer.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
  }

  // ========================================================
  // INITIALIZE EVERYTHING
  // ========================================================
  initPresentation();
  initContentTab();
  initCalculators();
  initFlashcards();
  initGallery();

  // Print checklist report
  const printReportBtn = document.getElementById('printChecklistBtn');
  if (printReportBtn) {
    printReportBtn.addEventListener('click', () => window.print());
  }
});
