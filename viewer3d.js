// 3D Interactive Structural & Geotechnical Viewer for CIV_L3: PPI y Cimentaciones
// Developed with Three.js WebGL & OrbitControls

class StructuralViewer3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    if (typeof THREE === 'undefined') {
      this.container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center space-y-3">
          <div class="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xl">3D</div>
          <p class="text-sm">El visor 3D requiere conexión a internet para cargar Three.js.</p>
        </div>`;
      return;
    }

    this.currentModelType = 'footing'; // 'footing', 'settlement', 'micropiles', 'rebar_hook'
    this.isWireframe = false;
    this.isDeforming = false;
    this.deformationPhase = 0;
    this.modelGroup = null;

    this.init();
    this.setupEvents();
    this.loadModel(this.currentModelType);
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0f1d);
    this.scene.fog = new THREE.FogExp2(0x0a0f1d, 0.02);

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 500;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(16, 12, 20);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.05;
      this.controls.minDistance = 3;
      this.controls.maxDistance = 60;
    }

    // Grid Floor
    const gridHelper = new THREE.GridHelper(30, 30, 0xf59e0b, 0x1e293b);
    gridHelper.position.y = -0.01;
    this.scene.add(gridHelper);

    // Floor Shadow Plane
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x070b14, roughness: 0.9, metalness: 0.1 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.02;
    floorMesh.receiveShadow = true;
    this.scene.add(floorMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(15, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 1.2, 40);
    goldLight.position.set(-10, 10, -10);
    this.scene.add(goldLight);

    const skyLight = new THREE.PointLight(0x38bdf8, 1.0, 40);
    skyLight.position.set(10, 6, -10);
    this.scene.add(skyLight);

    // Materials Palette
    this.materials = {
      concrete: new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.8,
        metalness: 0.1,
        transparent: true,
        opacity: 0.65
      }),
      concreteSolid: new THREE.MeshStandardMaterial({
        color: 0x64748b,
        roughness: 0.9,
        metalness: 0.05
      }),
      cleaningConcrete: new THREE.MeshStandardMaterial({
        color: 0xcbd5e1,
        roughness: 0.95,
        metalness: 0.05
      }),
      soil: new THREE.MeshStandardMaterial({
        color: 0x78350f,
        roughness: 0.9,
        metalness: 0.0
      }),
      rebar: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.35,
        metalness: 0.8
      }),
      rebarPillar: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.35,
        metalness: 0.8
      }),
      spacer: new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.7,
        metalness: 0.2
      }),
      micropile: new THREE.MeshStandardMaterial({
        color: 0x10b981,
        roughness: 0.4,
        metalness: 0.8
      }),
      brick: new THREE.MeshStandardMaterial({
        color: 0xb45309,
        roughness: 0.85,
        metalness: 0.05
      }),
      crack: new THREE.MeshBasicMaterial({
        color: 0xef4444,
        wireframe: true
      })
    };

    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupEvents() {
    const modelButtons = document.querySelectorAll('.model-btn');
    modelButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modelButtons.forEach(b => b.classList.remove('bg-amber-500', 'text-black', 'font-bold'));
        btn.classList.add('bg-amber-500', 'text-black', 'font-bold');
        const m = btn.getAttribute('data-model');
        this.loadModel(m);
      });
    });

    const wireframeBtn = document.getElementById('toggleWireframeBtn');
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        this.isWireframe = !this.isWireframe;
        Object.values(this.materials).forEach(mat => {
          if (mat) mat.wireframe = this.isWireframe;
        });
        wireframeBtn.classList.toggle('text-amber-400');
      });
    }

    const deformBtn = document.getElementById('toggleDeformBtn');
    if (deformBtn) {
      deformBtn.addEventListener('click', () => {
        this.isDeforming = !this.isDeforming;
        deformBtn.classList.toggle('text-amber-400');
      });
    }

    const resetCamBtn = document.getElementById('resetCamBtn');
    if (resetCamBtn) {
      resetCamBtn.addEventListener('click', () => {
        this.camera.position.set(16, 12, 20);
        if (this.controls) this.controls.target.set(0, 2, 0);
      });
    }
  }

  loadModel(type) {
    this.currentModelType = type;
    if (this.modelGroup) {
      this.scene.remove(this.modelGroup);
    }
    this.modelGroup = new THREE.Group();

    if (type === 'footing') {
      this.buildFootingModel();
    } else if (type === 'settlement') {
      this.buildSettlementModel();
    } else if (type === 'micropiles') {
      this.buildMicropilesModel();
    } else if (type === 'rebar_hook') {
      this.buildRebarHookModel();
    }

    this.scene.add(this.modelGroup);
    this.updateModelDescription(type);
  }

  // Model 1: Zapata Superficial con Armaduras y Separadores
  buildFootingModel() {
    const g = this.modelGroup;

    // Excavation Pit Box (Ground level 0, depth -2.5)
    const pitGeo = new THREE.BoxGeometry(10, 0.4, 10);
    const pit = new THREE.Mesh(pitGeo, this.materials.soil);
    pit.position.set(0, -0.2, 0);
    g.add(pit);

    // Cleaning Concrete (HL) - Thickness 10cm (scaled to 0.2 units)
    const hlGeo = new THREE.BoxGeometry(6.4, 0.2, 6.4);
    const hl = new THREE.Mesh(hlGeo, this.materials.cleaningConcrete);
    hl.position.set(0, 0.1, 0);
    hl.receiveShadow = true;
    g.add(hl);

    // Spacers (Separadores homologados 70mm, 3x3 grid)
    const spacerGeo = new THREE.BoxGeometry(0.2, 0.14, 0.2);
    for (let ix = -2; ix <= 2; ix += 2) {
      for (let iz = -2; iz <= 2; iz += 2) {
        const sp = new THREE.Mesh(spacerGeo, this.materials.spacer);
        sp.position.set(ix, 0.27, iz);
        g.add(sp);
      }
    }

    // Bottom Rebar Mat (Parrilla inferior con patillas dobladas hacia arriba)
    const barRadius = 0.035;
    const matSize = 5.2;
    const spacing = 0.65;
    const half = matSize / 2;

    // X-direction bars
    for (let z = -half; z <= half; z += spacing) {
      // Main horizontal bar
      const barGeo = new THREE.CylinderGeometry(barRadius, barRadius, matSize, 8);
      const bar = new THREE.Mesh(barGeo, this.materials.rebar);
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, 0.38, z);
      g.add(bar);

      // Left hook (upward)
      const hookGeoL = new THREE.CylinderGeometry(barRadius, barRadius, 0.5, 8);
      const hookL = new THREE.Mesh(hookGeoL, this.materials.rebar);
      hookL.position.set(-half, 0.38 + 0.25, z);
      g.add(hookL);

      // Right hook (upward)
      const hookGeoR = new THREE.CylinderGeometry(barRadius, barRadius, 0.5, 8);
      const hookR = new THREE.Mesh(hookGeoR, this.materials.rebar);
      hookR.position.set(half, 0.38 + 0.25, z);
      g.add(hookR);
    }

    // Z-direction bars (perpendicular, slightly higher)
    for (let x = -half; x <= half; x += spacing) {
      const barGeo = new THREE.CylinderGeometry(barRadius, barRadius, matSize, 8);
      const bar = new THREE.Mesh(barGeo, this.materials.rebar);
      bar.rotation.x = Math.PI / 2;
      bar.position.set(x, 0.45, 0);
      g.add(bar);

      const hookGeoF = new THREE.CylinderGeometry(barRadius, barRadius, 0.5, 8);
      const hookF = new THREE.Mesh(hookGeoF, this.materials.rebar);
      hookF.position.set(x, 0.45 + 0.25, -half);
      g.add(hookF);

      const hookGeoB = new THREE.CylinderGeometry(barRadius, barRadius, 0.5, 8);
      const hookB = new THREE.Mesh(hookGeoB, this.materials.rebar);
      hookB.position.set(x, 0.45 + 0.25, half);
      g.add(hookB);
    }

    // Pillar Starter Bars (Armadura de espera de pilar)
    const pillarBarRadius = 0.045;
    const starterHeight = 3.5;
    const colCoords = [
      [-0.4, -0.4], [0.4, -0.4],
      [-0.4, 0.4], [0.4, 0.4]
    ];

    colCoords.forEach(([cx, cz]) => {
      // Vertical bar
      const vGeo = new THREE.CylinderGeometry(pillarBarRadius, pillarBarRadius, starterHeight, 8);
      const vBar = new THREE.Mesh(vGeo, this.materials.rebarPillar);
      vBar.position.set(cx, 0.38 + starterHeight / 2, cz);
      g.add(vBar);

      // Bottom bend (patilla de anclaje horizontal sobre la zapata)
      const hBendGeo = new THREE.CylinderGeometry(pillarBarRadius, pillarBarRadius, 0.7, 8);
      const hBend = new THREE.Mesh(hBendGeo, this.materials.rebarPillar);
      hBend.rotation.z = Math.PI / 2;
      hBend.position.set(cx > 0 ? cx + 0.35 : cx - 0.35, 0.38, cz);
      g.add(hBend);
    });

    // Pillar Stirrups (Estribos del pilar)
    const stirrupRadius = 0.025;
    for (let sy = 0.8; sy <= 3.2; sy += 0.5) {
      const stGeo = new THREE.BoxGeometry(0.88, 0.04, 0.88);
      const stWire = new THREE.Mesh(stGeo, this.materials.rebarPillar);
      stWire.position.set(0, sy, 0);
      g.add(stWire);
    }

    // Footing Concrete Volume (Zapata 6.0 x 6.0 x 1.2 m, semitransparente)
    const footingGeo = new THREE.BoxGeometry(5.8, 1.3, 5.8);
    const footing = new THREE.Mesh(footingGeo, this.materials.concrete);
    footing.position.set(0, 0.85, 0);
    footing.castShadow = true;
    footing.receiveShadow = true;
    g.add(footing);

    // Pillar Stub (Arranque de pilar de hormigón)
    const stubGeo = new THREE.BoxGeometry(1.0, 1.8, 1.0);
    const stub = new THREE.Mesh(stubGeo, this.materials.concreteSolid);
    stub.position.set(0, 2.3, 0);
    stub.castShadow = true;
    g.add(stub);
  }

  // Model 2: Asiento Diferencial y Fisura Parabólica a 45º
  buildSettlementModel() {
    const g = this.modelGroup;

    // Ground base
    const groundGeo = new THREE.BoxGeometry(18, 0.3, 8);
    const ground = new THREE.Mesh(groundGeo, this.materials.soil);
    ground.position.set(0, -0.15, 0);
    g.add(ground);

    // Left Footing (Estable)
    const footLeftGeo = new THREE.BoxGeometry(3.6, 0.9, 3.6);
    const footLeft = new THREE.Mesh(footLeftGeo, this.materials.concreteSolid);
    footLeft.position.set(-5, 0.45, 0);
    g.add(footLeft);

    // Left Pillar
    const pilLeftGeo = new THREE.BoxGeometry(0.8, 4.0, 0.8);
    const pilLeft = new THREE.Mesh(pilLeftGeo, this.materials.concreteSolid);
    pilLeft.position.set(-5, 2.9, 0);
    g.add(pilLeft);

    // Right Footing (Asentable - animable)
    const footRightGeo = new THREE.BoxGeometry(3.6, 0.9, 3.6);
    this.settlingFooting = new THREE.Mesh(footRightGeo, this.materials.concreteSolid);
    this.settlingFooting.position.set(5, 0.45, 0);
    g.add(this.settlingFooting);

    // Right Pillar
    const pilRightGeo = new THREE.BoxGeometry(0.8, 4.0, 0.8);
    this.settlingPillar = new THREE.Mesh(pilRightGeo, this.materials.concreteSolid);
    this.settlingPillar.position.set(5, 2.9, 0);
    g.add(this.settlingPillar);

    // Masonry Wall Between Pillars (Muro de fábrica con fisura diagonal)
    const wallGeo = new THREE.BoxGeometry(9.2, 3.2, 0.4);
    const wall = new THREE.Mesh(wallGeo, this.materials.brick);
    wall.position.set(0, 2.5, 0);
    g.add(wall);

    // 45-degree Parabolic Crack Line (Fisura parabólica de tracción)
    const crackPoints = [
      new THREE.Vector3(-3.5, 1.0, 0.22),
      new THREE.Vector3(-1.8, 1.8, 0.22),
      new THREE.Vector3(0.0, 2.5, 0.22),
      new THREE.Vector3(1.8, 3.3, 0.22),
      new THREE.Vector3(3.5, 3.9, 0.22)
    ];
    const crackCurve = new THREE.CatmullRomCurve3(crackPoints);
    const crackGeo = new THREE.TubeGeometry(crackCurve, 32, 0.045, 8, false);
    const crackMesh = new THREE.Mesh(crackGeo, this.materials.crack);
    g.add(crackMesh);

    // Tension vectors (Arrows)
    const arrowDir = new THREE.Vector3(1, 0.8, 0).normalize();
    const arrowOrigin = new THREE.Vector3(0, 2.5, 0.35);
    const arrowHelper = new THREE.ArrowHelper(arrowDir, arrowOrigin, 1.8, 0xef4444, 0.4, 0.25);
    g.add(arrowHelper);
  }

  // Model 3: Recalce por Micropilotes
  buildMicropilesModel() {
    const g = this.modelGroup;

    // Existing settling footing
    const oldFootingGeo = new THREE.BoxGeometry(4.0, 1.0, 4.0);
    const oldFooting = new THREE.Mesh(oldFootingGeo, this.materials.concreteSolid);
    oldFooting.position.set(0, 0.5, 0);
    g.add(oldFooting);

    // Column
    const colGeo = new THREE.BoxGeometry(0.8, 4.0, 0.8);
    const col = new THREE.Mesh(colGeo, this.materials.concreteSolid);
    col.position.set(0, 3.0, 0);
    g.add(col);

    // New Collar Beam / Ring Cap (Viga de atado perimetral de recalce)
    const collarGeo = new THREE.BoxGeometry(5.6, 1.1, 5.6);
    const collar = new THREE.Mesh(collarGeo, this.materials.concrete);
    collar.position.set(0, 0.55, 0);
    g.add(collar);

    // 4 Micropiles (Inclinados y verticales atravesando el estrato)
    const pileCoords = [
      [-2.3, -2.3, 0.1, 0.1],
      [2.3, -2.3, -0.1, 0.1],
      [-2.3, 2.3, 0.1, -0.1],
      [2.3, 2.3, -0.1, -0.1]
    ];

    pileCoords.forEach(([px, pz, rx, rz]) => {
      const pileGeo = new THREE.CylinderGeometry(0.12, 0.12, 6.5, 12);
      const pile = new THREE.Mesh(pileGeo, this.materials.micropile);
      pile.position.set(px, -2.5, pz);
      pile.rotation.x = rx;
      pile.rotation.z = rz;
      g.add(pile);
    });

    // Connecting rebar dowels (Barras de cosido químico perforadas en la zapata vieja)
    for (let ang = 0; ang < Math.PI * 2; ang += Math.PI / 4) {
      const dGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 8);
      const dowel = new THREE.Mesh(dGeo, this.materials.rebar);
      dowel.rotation.z = Math.PI / 2;
      dowel.rotation.y = ang;
      dowel.position.set(Math.cos(ang) * 2.0, 0.55, Math.sin(ang) * 2.0);
      g.add(dowel);
    }
  }

  // Model 4: Detalle Mandril de Doblado y Anclaje
  buildRebarHookModel() {
    const g = this.modelGroup;

    // Mandrel Cylinder (Mandril de doblado normalizado)
    const mandrelRadius = 0.8; // e.g. 4x or 7x bar diameter
    const mandrelGeo = new THREE.CylinderGeometry(mandrelRadius, mandrelRadius, 1.2, 32);
    const mandrel = new THREE.Mesh(mandrelGeo, this.materials.spacer);
    mandrel.position.set(0, 1.5, 0);
    g.add(mandrel);

    // Bent Bar Curve around Mandrel (Curva de la barra alrededor del mandril)
    const barRadius = 0.12;
    const curvePoints = [];
    // Straight segment
    for (let y = -2.5; y <= 1.5; y += 0.4) {
      curvePoints.push(new THREE.Vector3(-mandrelRadius - barRadius, y, 0));
    }
    // Arc around mandrel (90 to 180 degrees)
    for (let a = Math.PI; a >= 0; a -= Math.PI / 16) {
      const rad = mandrelRadius + barRadius;
      curvePoints.push(new THREE.Vector3(Math.cos(a) * rad, 1.5 + Math.sin(a) * rad, 0));
    }
    // Tail extension (patilla recta >= 5 Ø)
    for (let y = 1.5; y >= -0.5; y -= 0.4) {
      curvePoints.push(new THREE.Vector3(mandrelRadius + barRadius, y, 0));
    }

    const rebarCurve = new THREE.CatmullRomCurve3(curvePoints);
    const rebarGeo = new THREE.TubeGeometry(rebarCurve, 64, barRadius, 12, false);
    const rebarMesh = new THREE.Mesh(rebarGeo, this.materials.rebar);
    g.add(rebarMesh);

    // Corrugations (Anillos de corrugas simulados)
    for (let y = -2.3; y <= 1.0; y += 0.25) {
      const ringGeo = new THREE.TorusGeometry(barRadius + 0.015, 0.015, 8, 16);
      const ring = new THREE.Mesh(ringGeo, this.materials.rebar);
      ring.position.set(-mandrelRadius - barRadius, y, 0);
      ring.rotation.x = Math.PI / 2;
      g.add(ring);
    }
  }

  updateModelDescription(type) {
    const titleEl = document.getElementById('viewer3dTitle');
    const descEl = document.getElementById('viewer3dDesc');
    const specsEl = document.getElementById('viewer3dSpecs');

    if (!titleEl || !descEl || !specsEl) return;

    if (type === 'footing') {
      titleEl.textContent = 'Modelo 1: Zapata Superficial con Armaduras y Separadores';
      descEl.textContent = 'Visualización tridimensional de la solera de hormigón de limpieza (HL ≥ 10 cm), separadores de mortero homologados (70 mm), parrilla inferior de acero B 500 S con patillas perimetrales levantadas y esperas de arranque del pilar.';
      specsEl.innerHTML = `
        <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">HL: ≥ 10 cm</span>
        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Recubrimiento: 70 mm</span>
        <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Punto de Parada (PP)</span>
      `;
    } else if (type === 'settlement') {
      titleEl.textContent = 'Modelo 2: Asiento Diferencial y Fisura Parabólica a 45º';
      descEl.textContent = 'Simulación cinemática del descenso de un apoyo aislado, generando tracciones diagonales en el paño de fábrica y la consiguiente fisura parabólica a 45º característica.';
      specsEl.innerHTML = `
        <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">Fisura Tracción: 45º</span>
        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Asiento Diferencial</span>
        <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">Caso C/ Galdopar</span>
      `;
    } else if (type === 'micropiles') {
      titleEl.textContent = 'Modelo 3: Recalce Estructural con Micropilotes Perimetrales';
      descEl.textContent = 'Estrategia de intervención nº 2: Transfiere las cargas de la zapata existente hacia estratos profundos competentes mediante micropilotes de acero inyectado y viga de atado perimetral con cosido químico.';
      specsEl.innerHTML = `
        <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Estrategia Recalce 2</span>
        <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">Estrato Firme</span>
        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Viga Encepado</span>
      `;
    } else if (type === 'rebar_hook') {
      titleEl.textContent = 'Modelo 4: Mandril de Doblado y Anclajes (Art. 49.3)';
      descEl.textContent = 'Detalle técnico de doblado según Tabla 49.3.4. Radio de mandril reglamentario (4 Ø en B 500 S para Ø < 20 mm) evitando la pérdida de ductilidad y fisuración por aplastamiento.';
      specsEl.innerHTML = `
        <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">Mandril: 4 Ø / 7 Ø</span>
        <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">Patilla Recta ≥ 5 Ø</span>
        <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Tabla 49.3.4</span>
      `;
    }
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.controls) {
      this.controls.update();
    }

    // Animation / Deformation logic
    if (this.isDeforming) {
      this.deformationPhase += 0.03;
      const delta = Math.sin(this.deformationPhase) * 0.4;

      if (this.currentModelType === 'settlement' && this.settlingFooting && this.settlingPillar) {
        this.settlingFooting.position.y = 0.45 - Math.abs(delta);
        this.settlingPillar.position.y = 2.9 - Math.abs(delta);
      } else if (this.modelGroup) {
        this.modelGroup.rotation.y += 0.005;
      }
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

window.StructuralViewer3D = StructuralViewer3D;
