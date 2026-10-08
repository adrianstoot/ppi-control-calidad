// Comprehensive Course Data for CIV_L3: Plan de Puntos de Inspección (PPI) & Control de Calidad
const COURSE_DATA = {
  meta: {
    code: "CIV_L3",
    subject: "Construcción VI • E.T.S.I.E.",
    title: "Plan de Puntos de Inspección (PPI) y Control de Ejecución",
    subtitle: "Plataforma Integral de Control de Calidad, Cimentaciones, Código Estructural y No Conformidades Forenses",
    edition: "2025/2026",
    slidesCount: 39,
    imagesCount: 29
  },
  modules: [
    {
      id: "mod-1",
      number: 1,
      title: "Marco Normativo & Factores de Riesgo",
      shortTitle: "Marco Normativo",
      icon: "layers",
      slidesRange: [1, 8],
      badge: "Normativa Oficial",
      description: "Anexos I a IV (Castellano y Valencià) del control de ejecución de unidades de obra no estructurales e instalaciones. Clasificación de factores de riesgo dimensional, sísmico, geotécnico, ambiental, climático y viento.",
      slides: [
        {
          slideNumber: 1,
          title: "Portada e Índice: Plan de Puntos de Inspección (PPI)",
          category: "General",
          images: [],
          content: `
            <div class="space-y-4">
              <p class="lead text-sm sm:text-base text-slate-200">
                El <strong>Plan de Puntos de Inspección (PPI)</strong> es el documento operativo y contractual nuclear para la supervisión de obra, asegurando la trazabilidad desde la recepción de materiales hasta la recepción final de la edificación.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h5 class="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-amber-400"></span> Marco Normativo & PPI
                  </h5>
                  <p class="text-slate-300">
                    Regulado por la LOE, Código Estructural, CTE (DB-SE-C, DB-HS, DB-HE) y decretos autonómicos de calidad. Contiene los Anexos I a IV y la ficha operativa MC1.
                  </p>
                </div>
                <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h5 class="font-bold text-sky-400 mb-1.5 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-sky-400"></span> Patología Forense & NC
                  </h5>
                  <p class="text-slate-300">
                    Metodología de diagnóstico en 6 fases, 6 soluciones de intervención en cimentaciones y el catálogo crítico de No Conformidades (NC-01 a NC-07) extraídas de obras reales.
                  </p>
                </div>
              </div>
            </div>
          `
        },
        {
          slideNumber: 2,
          title: "Anexo I: Factores y Niveles de Riesgo en el Edificio",
          category: "Anexo I",
          images: ["Captura de pantalla 2026-05-22 123050.png"],
          content: `
            <div class="space-y-3 text-xs sm:text-sm text-slate-300">
              <p>El Anexo I categoriza el edificio en tres niveles de riesgo (1, 2 y 3) según 6 factores determinantes:</p>
              <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                <li><strong>Dimensional:</strong> Viviendas: Nivel 1 (≤ 6 viv.), Nivel 2 (7-12 viv.), Nivel 3 (&gt; 12 viv.). Otros usos: Nivel 1 (≤ 1000 m²), Nivel 2 (1000-2000 m²), Nivel 3 (&gt; 2000 m²).</li>
                <li><strong>Sísmico (NCSE-02):</strong> Nivel 1 (a_b &lt; 0.08 g), Nivel 2 (0.08 g ≤ a_b &lt; 0.12 g), Nivel 3 (a_b ≥ 0.12 g).</li>
                <li><strong>Geotécnico:</strong> Terrenos T1, T2 y T3 del DB-SE-C o Guía DRB 02/10.</li>
                <li><strong>Ambiental:</strong> Nivel 1 (Clases X0, XC), Nivel 2 (Clases agresivas XD, XS, XF según Código Estructural).</li>
                <li><strong>Climático (DB-HE):</strong> Nivel 1 (Zonas B y C), Nivel 2 (Zonas frías D y E).</li>
                <li><strong>Viento (DB-HS 1):</strong> Nivel 1 (Grado V3), Nivel 2 (Grados V1 y V2).</li>
              </ul>
            </div>
          `
        },
        {
          slideNumber: 3,
          title: "Anexo II: Frecuencias de Comprobación de Fases de Ejecución",
          category: "Anexo II",
          images: ["Captura de pantalla 2026-05-22 123117.png"],
          content: `
            <div class="space-y-3 text-xs sm:text-sm text-slate-300">
              <p>Establece la <strong>Frecuencia de Comprobación (FC)</strong> y el tamaño de la Unidad de Inspección (UI) para cada unidad de obra:</p>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border border-slate-800">
                  <thead class="bg-slate-900 text-amber-400">
                    <tr><th class="p-2 border border-slate-800">Unidad de Obra</th><th class="p-2 border border-slate-800">Tamaño UI</th><th class="p-2 border border-slate-800">Frecuencia (FC)</th></tr>
                  </thead>
                  <tbody>
                    <tr class="border-t border-slate-800"><td class="p-2">Muros de Sótano</td><td class="p-2">250 m²</td><td class="p-2 font-mono text-sky-400">FC 2</td></tr>
                    <tr class="border-t border-slate-800 bg-slate-900/40"><td class="p-2">Fachadas</td><td class="p-2">400 m² / 600 m²</td><td class="p-2 font-mono text-sky-400">FC 2</td></tr>
                    <tr class="border-t border-slate-800"><td class="p-2">Carpintería Exterior</td><td class="p-2">50 unidades</td><td class="p-2 font-mono text-sky-400">FC 2</td></tr>
                    <tr class="border-t border-slate-800 bg-slate-900/40"><td class="p-2 font-bold text-amber-300">Cubiertas Planas</td><td class="p-2">400 m²</td><td class="p-2 font-mono font-bold text-amber-400">FC 4 (Máxima exigencia)</td></tr>
                    <tr class="border-t border-slate-800"><td class="p-2">Saneamiento y Ventilación</td><td class="p-2">Cada colector / conducto</td><td class="p-2 font-mono text-sky-400">FC 1</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          `
        },
        {
          slideNumber: 4,
          title: "Anexo III: Pruebas de Servicio de Justificación Obligatoria",
          category: "Anexo III",
          images: ["Captura de pantalla 2026-05-22 123134.png"],
          content: `
            <div class="space-y-3 text-xs sm:text-sm text-slate-300">
              <p>Pruebas de servicio obligatorias vinculadas al factor dimensional:</p>
              <ul class="space-y-2 text-xs">
                <li class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <strong class="text-amber-400">PSC (Estanqueidad cubiertas planas):</strong> Inundación o riego; 400 m² o fracción; <strong>Muestreo: 100% UI</strong> (obligatorio en niveles 1, 2 y 3).
                </li>
                <li class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <strong class="text-sky-400">PSF (Estanqueidad fachadas):</strong> Riego de fachadas en cada tipología; <strong>Muestreo: 100% UI</strong> (niveles 2 y 3).
                </li>
                <li class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <strong class="text-emerald-400">PSA (Fontanería interior):</strong> Prueba parcial resistencia (25% UI) y prueba final simultaneidad (100% UI).
                </li>
                <li class="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <strong class="text-rose-400">PSS (Evacuación de agua):</strong> Prueba hidráulica en enterradas (50% UI), pluviales (100% UI) y prueba de humo en cierres hidráulicos (100% UI).
                </li>
              </ul>
            </div>
          `
        },
        {
          slideNumber: 5,
          title: "Anexo IV: Certificados Finales de Obra (CFO)",
          category: "Anexo IV",
          images: ["Captura de pantalla 2026-05-22 122955.png"],
          content: `
            <div class="space-y-2 text-xs sm:text-sm text-slate-300">
              <p>Modelo oficial normalizado del Certificado Final de Obra que acredita la correcta ejecución conforme al proyecto y al control de calidad colegiado.</p>
              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <strong>Requisitos indispensables:</strong> Liquidación del presupuesto de control de calidad, anexión del PPI completo con todas las firmas de la D.E.O., y acreditación de los ensayos de laboratorio (hormigón, acero y pruebas de servicio).
              </div>
            </div>
          `
        },
        {
          slideNumber: 6,
          title: "Annex I (Valencià): Factors i Nivells de Risc en l'Edifici",
          category: "Annex I",
          images: ["Captura de pantalla 2026-05-22 122812.png"],
          content: `<p class="text-xs text-slate-300">Versió oficial en valencià de l'Annex I per a projectes i obres sotmeses a la normativa de la Generalitat Valenciana.</p>`
        },
        {
          slideNumber: 7,
          title: "Annex II (Valencià): Freqüències de Comprovació",
          category: "Annex II",
          images: ["Captura de pantalla 2026-05-22 122912.png"],
          content: `<p class="text-xs text-slate-300">Matriu de freqüències i grandària d'unitat d'inspecció en llengua valenciana.</p>`
        },
        {
          slideNumber: 8,
          title: "Annex III (Valencià): Proves de Servei de Justificació Obligatòria",
          category: "Annex III",
          images: ["Captura de pantalla 2026-05-22 122931.png"],
          content: `<p class="text-xs text-slate-300">Proves de servei de cobertes, façanes, subministrament d'aigua i evacuació en normativa valenciana.</p>`
        }
      ]
    },
    {
      id: "mod-2",
      number: 2,
      title: "El Programa de Puntos de Inspección en Obra (MC1)",
      shortTitle: "PPI en Obra (MC1)",
      icon: "check-circle",
      slidesRange: [9, 14],
      badge: "Operativa de Obra",
      description: "Estructura del PPI MC1 para Cimentación Superficial ('Obra: Metaverso'). Desglose de Controles Previos (1.1-1.3), Control de Ejecución (2.1-4.5) y tipología de puntos PN, PE y PP.",
      slides: [
        {
          slideNumber: 9,
          title: "El PPI como Herramienta de Calidad: Estructura y Propósito",
          category: "Concepto PPI",
          images: [],
          content: `
            <div class="space-y-3 text-xs sm:text-sm text-slate-300">
              <p>El PPI es el documento donde se protocolizan todas las comprobaciones que debe realizar la Dirección de Ejecución de la Obra (D.E.O.). Permite evitar que se tapen u oculten vicios constructivos en cimentación.</p>
              <div class="p-3 bg-amber-950/30 border border-amber-500/30 text-amber-200 rounded-xl text-xs">
                <strong>Principio fundamental:</strong> En elementos enterrados, cada fase previa al vertido de hormigón es un <em>Punto de Parada (PP)</em> de obligada inspección física.
              </div>
            </div>
          `
        },
        {
          slideNumber: 10,
          title: "Ficha Operativa PPI MC1: Cimentación Superficial",
          category: "Ficha MC1",
          images: ["Captura de pantalla 2026-05-22 123215.png"],
          content: `
            <div class="space-y-2 text-xs sm:text-sm text-slate-300">
              <p>Ficha oficial MC1: <strong>Obra: Metaverso | Denominación PPI: Ejecución cimentación superficial | Tamaño/Frecuencia: Cada zapata</strong>.</p>
              <p class="text-xs text-slate-400">Registra todos los controles con fecha de aceptación SÍ / NO y número de fotografía de Conformidad (C) o No Conformidad (N.C.).</p>
            </div>
          `
        },
        {
          slideNumber: 11,
          title: "PPI MC1: Desglose de Controles Previos (1.1, 1.2, 1.3)",
          category: "Controles Previos",
          images: [],
          content: `
            <div class="space-y-2 text-xs text-slate-300">
              <p><strong>1.1 Documentación materiales (Hormigón):</strong> Anejo 4 Código Estructural. Si carece de distintivo de calidad oficial, ensayos previos y característicos con antigüedad máxima de 6 meses. Hoja de suministro obligatoria en cada camión cuba.</p>
              <p><strong>1.2 Recepción acero / ferralla:</strong> Marcado CE, etiquetas de suministro y declaración de prestaciones (DoP). Si no tiene marcado CE, ensayos obligatorios de doblado y tracción.</p>
              <p><strong>1.3 Ensayos (Toma de probetas):</strong> Según programación LG-23 y norma UNE-EN 12390-2.</p>
            </div>
          `
        },
        {
          slideNumber: 12,
          title: "PPI MC1: Control de Ejecución (2.1 Replanteo, 2.2 Excavación, 2.3 HL)",
          category: "Control Ejecución",
          images: [],
          content: `
            <div class="space-y-2 text-xs text-slate-300">
              <p><strong>2.1 Replanteo:</strong> Variación máxima en planta del c.d.g. de la zapata: ≤ 2% de la dimensión, sin exceder 50 mm.</p>
              <p><strong>2.2 Excavación:</strong> Comprobación del estrato firme, limpieza de fondo y achique de agua.</p>
              <p><strong>2.3 Hormigón de limpieza (HL):</strong> Espesor mínimo 10 cm. Si no se hormigona de inmediato, dejar 10-15 cm de terreno de resguardo.</p>
            </div>
          `
        },
        {
          slideNumber: 13,
          title: "PPI MC1: Control de Armado, Vertido, Vibrado y Curado (3.2 a 4.5)",
          category: "Control Hormigón",
          images: [],
          content: `
            <div class="space-y-2 text-xs text-slate-300">
              <p><strong>3.2 Armaduras (PP):</strong> Separadores homologados, recubrimientos (50-70 mm) y espacio para aguja del vibrador.</p>
              <p><strong>4.2 Hormigonado (PE):</strong> Prohibido verter mezcla que haya empezado a fraguar. Tongadas continuas.</p>
              <p><strong>4.3 Vibrado:</strong> Hasta que refluya la pasta a la superficie y cese el burbujeo.</p>
              <p><strong>4.4 Curado:</strong> Humedad continua durante fraguado y primeros días.</p>
              <p><strong>4.5 Comprobaciones finales:</strong> Ausencia total de coqueras o armaduras vistas.</p>
            </div>
          `
        },
        {
          slideNumber: 14,
          title: "Tipología de Puntos de Control: PN, PE y PP",
          category: "Puntos de Control",
          images: [],
          content: `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-sky-950/40 border border-sky-500/40">
                <span class="px-2 py-0.5 rounded bg-sky-500 text-black font-bold">PN</span>
                <h5 class="font-bold text-sky-300 mt-2">Punto de Notificación</h5>
                <p class="text-slate-300 mt-1">El trabajo PUEDE continuar sin esperar los resultados del control.</p>
              </div>
              <div class="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40">
                <span class="px-2 py-0.5 rounded bg-amber-500 text-black font-bold">PE</span>
                <h5 class="font-bold text-amber-300 mt-2">Punto de Espera</h5>
                <p class="text-slate-300 mt-1">El trabajo NO puede seguir sin autorización expresa del JEFE DE OBRA.</p>
              </div>
              <div class="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40">
                <span class="px-2 py-0.5 rounded bg-rose-500 text-white font-bold">PP</span>
                <h5 class="font-bold text-rose-300 mt-2">Punto de Parada</h5>
                <p class="text-slate-300 mt-1">El trabajo se BLOQUEA: no puede seguir sin autorización expresa de la DIRECCIÓN FACULTATIVA (D.F.).</p>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-3",
      number: 3,
      title: "Código Estructural: Armado, Anclajes y Solapes",
      shortTitle: "Código Estructural",
      icon: "cpu",
      slidesRange: [15, 25],
      badge: "Articulado Técnico",
      description: "Art. 49 del Código Estructural: Mandriles mínimos (Tabla 49.3.4), atado de barras, formas de anclaje, longitudes lb y lb,neta, coeficientes m, beta y alfa, escalonamiento y solapes de barras y mallas.",
      slides: [
        {
          slideNumber: 15,
          title: "Tabla 49.3.4: Diámetro Mínimo de los Mandriles de Doblado",
          category: "Mandriles",
          images: ["n1.png"],
          content: `<p class="text-xs text-slate-300">Regula los diámetros de mandril para evitar la fisuración interna del acero durante el doblado en taller o banco de ferralla. B500S/SD: 4 Ø (Ø &lt; 20 mm) y 7 Ø (Ø ≥ 20 mm).</p>`
        },
        {
          slideNumber: 16,
          title: "Atado de Barras y Disposición de Estribos (Art. 49.4)",
          category: "Atado Ferralla",
          images: ["n2.png"],
          content: `<p class="text-xs text-slate-300">Regla estricta: Barras de esquina atadas en TODOS los estribos; barras restantes atadas cada 50 Ø1 / 50 Ø2. Se empleará alambre recocido cruzado.</p>`
        },
        {
          slideNumber: 17,
          title: "Formas de Anclaje de Barras Corrugadas (Art. 49.5.1.1)",
          category: "Anclajes",
          images: ["n3.png"],
          content: `<p class="text-xs text-slate-300">Cinco modalidades: a) Prolongación recta, b) Gancho (alfa ≥ 150º con patilla 5 Ø), c) Patilla (90º ≤ alfa &lt; 150º con patilla 5 Ø), d) Gancho en U, e) Barra transversal soldada.</p>`
        },
        {
          slideNumber: 18,
          title: "Longitud Básica de Anclaje lb: Fórmulas y Equilibrio",
          category: "Fórmulas lb",
          images: ["n4.png"],
          content: `<p class="text-xs text-slate-300">Posición I (buena adherencia): lb_I = m · Ø² &lt; (fyk / 20) · Ø. Posición II (adherencia deficiente): lb_II = 1.4 · m · Ø² &lt; (fyk / 14) · Ø.</p>`
        },
        {
          slideNumber: 19,
          title: "Coeficiente Numérico m y Longitud Neta lb,neta (Tabla 49.5.1.2.a)",
          category: "Coeficiente m",
          images: ["n5.png"],
          content: `<p class="text-xs text-slate-300">Tabla de valores m según fck (25 a ≥50 N/mm²) y tipo de acero. Cálculo de lb,neta = lb · beta · (As / As,real).</p>`
        },
        {
          slideNumber: 20,
          title: "Coeficiente Reductor beta de Anclaje (Tabla 49.5.1.2.b)",
          category: "Factor beta",
          images: ["n6.png"],
          content: `<p class="text-xs text-slate-300">Factor beta: Recta = 1.0; Patilla/Gancho en tracción = 0.7 (*); Barra soldada = 0.7. En compresión siempre beta = 1.0.</p>`
        },
        {
          slideNumber: 21,
          title: "Escalonamiento y Desfasado de Armaduras Longitudinales",
          category: "Escalonamiento",
          images: ["n7.png"],
          content: `<p class="text-xs text-slate-300">Figura 49.5.1.2: Prolongación de corte: 1.2 lb (1 barra), 1.3 lb (2 barras), 1.4 lb (3 barras) desde la sección de descarte.</p>`
        },
        {
          slideNumber: 22,
          title: "Empalmes por Solapo en Barras a Tracción",
          category: "Solapes Tracción",
          images: ["n9.png"],
          content: `<p class="text-xs text-slate-300">Figura 49.5.2.1: Los centros de los empalmes solapados a tracción deben distanciarse longitudinalmente una distancia mínima ≥ lb.</p>`
        },
        {
          slideNumber: 23,
          title: "Coeficiente alfa para Solapes según Porcentaje y Distancia",
          category: "Factor alfa",
          images: ["n10.png"],
          content: `<p class="text-xs text-slate-300">Tabla 49.5.2.2: Coeficiente alfa varía entre 1.0 y 2.0 en tracción según distancia transversal 'a' (a ≤ 10 Ø vs a &gt; 10 Ø) y porcentaje de barras solapadas.</p>`
        },
        {
          slideNumber: 24,
          title: "Empalmes por Solapo de Paquetes de Barras",
          category: "Grupos de Barras",
          images: ["n11.png"],
          content: `<p class="text-xs text-slate-300">Figura 49.5.2.3: Desfasado escalonado en paquetes: 1.2 lb para paquetes de 2 barras y 1.3 lb para paquetes de 3 barras.</p>`
        },
        {
          slideNumber: 25,
          title: "Disposición de Solapos en Mallas Electrosoldadas",
          category: "Mallas",
          images: ["n12.png"],
          content: `<p class="text-xs text-slate-300">Figura 49.5.2.4: Disposiciones de solapo (a, b, c) según la colocación relativa de alambres principales y transversales.</p>`
        }
      ]
    },
    {
      id: "mod-4",
      number: 4,
      title: "Diagnóstico e Intervenciones en Lesiones de Cimentación",
      shortTitle: "Lesiones & Intervención",
      icon: "alert-triangle",
      slidesRange: [26, 30],
      badge: "Patología Estructural",
      description: "Metodología integral de 6 fases en patología de cimentaciones, las 6 estrategias de intervención/recalce y caso forense real de asiento diferencial en C/ Galdopar.",
      slides: [
        {
          slideNumber: 26,
          title: "Metodología de Diagnóstico e Intervención (6 Fases)",
          category: "Metodología",
          images: ["CONST_VI_Lesiones_Cimentacion_04_Metodologia_diagnostico.png"],
          content: `<p class="text-xs text-slate-300">Esquema integral: 1. Levantamiento patológico, 2. Contexto y terreno, 3. Mecanismo de fallo, 4. Diagnóstico causa, 5A. Corrección causa, 5B. Reparación lesiones, 6. Seguimiento.</p>`
        },
        {
          slideNumber: 27,
          title: "Análisis de Fases 1 a 4: Del Síntoma a la Causa Raíz",
          category: "Fases 1-4",
          images: [],
          content: `<p class="text-xs text-slate-300">Detalla la inspección visual, cartografía de fisuras parabólicas a 45º por tracción diagonal, análisis del suelo y caracterización del mecanismo de asiento diferencial.</p>`
        },
        {
          slideNumber: 28,
          title: "Análisis de Fases 5 y 6: Corrección de Causa vs Reparación y Monitoreo",
          category: "Fases 5-6",
          images: [],
          content: `<p class="text-xs text-slate-300">Prioridad absoluta: Fase 5A (detener la evolución del daño) antes de Fase 5B (reparación estética). Seguimiento con testigos de yeso y fisurómetros.</p>`
        },
        {
          slideNumber: 29,
          title: "Intervenciones en Cimentaciones: Las 6 Estrategias de Actuación",
          category: "Estrategias Recalce",
          images: ["CONST_VI_Lesiones_Cimentacion_05_Intervencion.png"],
          content: `<p class="text-xs text-slate-300">1. Ensanche de zapatas, 2. Puenteo con micropilotes, 3. Profundización (bataches alternos), 4. Consolidación del terreno (inyecciones), 5. Nuevas zapatas, 6. Sustitución total.</p>`
        },
        {
          slideNumber: 30,
          title: "Caso Práctico Real: Ficha de Análisis Patológico (C/ Galdopar)",
          category: "Caso Real Galdopar",
          images: ["CONST_VI_Lesiones_Cimentacion_06_Caso_practico.png"],
          content: `<p class="text-xs text-slate-300">Edificio entre medianeras con asiento diferencial por excavación colindante profunda. Diagnóstico: proceso estabilizado, afección estética, no requiere recalce.</p>`
        }
      ]
    },
    {
      id: "mod-5",
      number: 5,
      title: "Casos Reales de No Conformidades Forenses (NC-01 a NC-07)",
      shortTitle: "No Conformidades",
      icon: "camera",
      slidesRange: [31, 37],
      badge: "Casos de Obra",
      description: "Catálogo forense fotográfico de 7 No Conformidades graves detectadas en obra: excavación sin refinar, ausencia de separadores, calzos de cascote, HL fresco, probetas defectuosas y esperas desviadas.",
      slides: [
        {
          slideNumber: 31,
          title: "NC-01: Fondo de Excavación sin Refino y Falta de Separadores",
          category: "Caso NC-01",
          images: ["MC1-NC 01 refino insuficiente-faltan separadores.png"],
          content: `<p class="text-xs text-slate-300">Zanja sin reperfilar, desprendimiento de tierras sobre la armadura y ausencia de separadores. Bloqueo inmediato en PPI (Punto de Parada PP).</p>`
        },
        {
          slideNumber: 32,
          title: "NC-02: Parrilla Apoyada Directamente sobre Terreno Natural",
          category: "Caso NC-02",
          images: ["MC1-NC 02 refino insuficiente-ausencia separadores.png"],
          content: `<p class="text-xs text-slate-300">Parrilla colocada sobre tierra suelta sin hormigón de limpieza ni separadores. Causa de rechazo: corrosión inmediata y anulación del recubrimiento mínimo.</p>`
        },
        {
          slideNumber: 33,
          title: "NC-03: Hormigón de Limpieza Insuficiente o Discontinuo",
          category: "Caso NC-03",
          images: ["MC1-NC 03 hormigon de limpieza insuficiente.png"],
          content: `<p class="text-xs text-slate-300">Capa de HL con espesor &lt; 10 cm y zonas con tierra vista. Exigencia: demoler zonas deficientes y reverter solera continua.</p>`
        },
        {
          slideNumber: 34,
          title: "NC-04: Uso de Calzos Inadecuados (Ladrillos y Cascotes)",
          category: "Caso NC-04",
          images: ["MC1-NC 04 calzos inadecuados.png"],
          content: `<p class="text-xs text-slate-300">Infracción flagrante del Art. 49.4. Los ladrillos son porosos y crean vías directas de corrosión. Obligatorio sustituir por separadores de mortero homologados.</p>`
        },
        {
          slideNumber: 35,
          title: "NC-05: Colocación de Armadura sobre Hormigón de Limpieza Fresco",
          category: "Caso NC-05",
          images: ["MC1-NC 05 colocacion armaduras antes de fraguar el HL.png"],
          content: `<p class="text-xs text-slate-300">Ferralla colocada antes del fraguado del HL. La parrilla se hunde en la masa perdiendo el recubrimiento inferior de proyecto.</p>`
        },
        {
          slideNumber: 36,
          title: "NC-06: Moldeo Deficiente en la Toma de Probetas",
          category: "Caso NC-06",
          images: ["MC1-NC 06 toma de probetas.png"],
          content: `<p class="text-xs text-slate-300">Probetas cúbicas sin enrasar, rebosantes y mal compactadas. Invalidez de los ensayos a rotura según norma UNE-EN 12390-2.</p>`
        },
        {
          slideNumber: 37,
          title: "NC-07: Desviación de Armaduras de Espera de Pilar",
          category: "Caso NC-07",
          images: ["MC1-NC 07 esperas incorrectas.png"],
          content: `<p class="text-xs text-slate-300">Armaduras de arranque desfasadas respecto a las marcas del eje de replanteo. Requiere solución técnica facultativa (taladros y anclaje químico).</p>`
        }
      ]
    },
    {
      id: "mod-6",
      number: 6,
      title: "Gestión de No Conformidades y Tolerancias Críticas",
      shortTitle: "Gestión & Tolerancias",
      icon: "clipboard-check",
      slidesRange: [38, 39],
      badge: "Cierre de Calidad",
      description: "Protocolo de 5 pasos para gestión de No Conformidades y tabla resumen de tolerancias reglamentarias y criterios de aceptación en supervisión de cimentaciones.",
      slides: [
        {
          slideNumber: 38,
          title: "Protocolo de Gestión y Resolución de NC en el PPI",
          category: "Protocolo NC",
          images: [],
          content: `
            <div class="space-y-2 text-xs text-slate-300">
              <p>Procedimiento formal de 5 pasos: 1. Detección y bloqueo (Punto de Parada PP) -> 2. Apertura de parte de NC con registro fotográfico -> 3. Análisis de causa raíz -> 4. Propuesta correctora y ejecución -> 5. Reinspección de la D.E.O., cierre y firma en el PPI.</p>
            </div>
          `
        },
        {
          slideNumber: 39,
          title: "Síntesis Ejecutiva: Tolerancias y Criterios Críticos de Aceptación",
          category: "Tolerancias",
          images: [],
          content: `
            <div class="space-y-2 text-xs text-slate-300">
              <p>Resumen normativo de tolerancias: Replanteo (≤ 2%, máx 50 mm), HL (≥ 10 cm), Recubrimientos (50-70 mm), Mandriles (4 Ø y 7 Ø), Atado (cada 50 Ø) y Probetas UNE-EN 12390-2.</p>
            </div>
          `
        }
      ]
    }
  ],
  flashcards: [
    {
      id: 1,
      front: "¿Cuál es la tolerancia máxima en planta para la variación del centro de gravedad (c.d.g.) de una zapata aislada?",
      back: "≤ 2% de la dimensión del cimiento, sin exceder en ningún caso los 50 mm (Código Estructural Art. 65.2 y PPI MC1 ítem 2.1).",
      category: "Replanteo"
    },
    {
      id: 2,
      front: "¿Qué previsión debe adoptarse en la excavación si la solera de asiento no se hormigona inmediatamente?",
      back: "Se deben dejar 10-15 cm de terreno de resguardo por encima de la cota definitiva para proteger el estrato portante de la intemperie (CTE DB-SE-C 4.6.2).",
      category: "Excavación"
    },
    {
      id: 3,
      front: "¿Cuál es el diámetro mínimo del mandril de doblado para barras B 500 S con diámetro Ø < 20 mm?",
      back: "4 Ø para ganchos y patillas (y 7 Ø si Ø ≥ 20 mm). Para barras dobladas: 12 Ø a 14 Ø (Tabla 49.3.4 Código Estructural).",
      category: "Mandriles"
    },
    {
      id: 4,
      front: "¿Cómo debe realizarse el atado de barras longitudinales en vigas y pilares según el Art. 49.4?",
      back: "Barras de esquina: atadas en TODOS los estribos. Barras intermedias restantes: atadas cada 50 Ø1 / 50 Ø2.",
      category: "Atado"
    },
    {
      id: 5,
      front: "¿Cuál es el valor del coeficiente reductor beta para patillas o ganchos en barras sometidas a tracción?",
      back: "beta = 0.7 (*) según Tabla 49.5.1.2.b. En barras comprimidas siempre es beta = 1.0 (sin reducción).",
      category: "Anclaje"
    },
    {
      id: 6,
      front: "¿Por qué el Código Estructural prohíbe terminantemente calzar la ferralla con ladrillos o cascotes (NC-04)?",
      back: "Porque son porosos, carecen de resistencia normalizada, absorben agua de la mezcla y crean vías directas de penetración de humedad oxidando el acero.",
      category: "No Conformidad"
    },
    {
      id: 7,
      front: "¿Cuál es el tamaño de la unidad de inspección (UI) y muestreo exigido en estanqueidad de cubiertas planas (PSC)?",
      back: "400 m² o fracción, con un muestreo del 100% de la UI mediante prueba de inundación o riego continuado (Anexo III).",
      category: "Pruebas Servicio"
    },
    {
      id: 8,
      front: "¿Cuál es la regla de oro en la metodología de diagnóstico e intervención de lesiones en cimentación?",
      back: "Actuar sobre la CAUSA (Fase 5A) antes que sobre el SÍNTOMA (Fase 5B). Reparar grietas sin estabilizar el cimiento provoca la reapertura inmediata.",
      category: "Patología"
    }
  ],
  ppiChecklist: [
    { code: "1.1", phase: "Previo", desc: "Documentación de materiales (Hormigón, Anejo 4)", punto: "PN", doc: "Código Estructural Cap. 13, Art. 57, Anejo 4", criterio: "DOR vigente o ensayos previos < 6 meses. Hoja de suministro en cada camión.", resp: "D.E.O. / Constructor" },
    { code: "1.2", phase: "Previo", desc: "Recepción de acero y ferralla", punto: "PN", doc: "Código Estructural Cap. 13, Art. 58 y 59", criterio: "Marcado CE, etiquetado y DoP completos. Ensayos adicionales si carece de sello.", resp: "D.E.O." },
    { code: "1.3", phase: "Previo", desc: "Ensayos de control (Toma de probetas)", punto: "PN", doc: "UNE-EN 12390-2, Programación LG-23", criterio: "Muestreo en cuba, compactación y enrase plano de probetas.", resp: "Laboratorio / D.E.O." },
    { code: "2.1", phase: "Ejecución", desc: "Replanteo de cimentación y ejes", punto: "PE", doc: "Código Estructural Art. 65.2, Anejo 14 pto. 5.2", criterio: "Variación c.d.g. ≤ 2% dimensión zapata, sin exceder 50 mm.", resp: "Jefe de Obra / Topógrafo" },
    { code: "2.2", phase: "Ejecución", desc: "Excavación y limpieza de fondo", punto: "PE", doc: "Estudio geotécnico, DB-SE-C", criterio: "Estrato competente alcanzado, fondo compactado y achique de agua freática.", resp: "Jefe de Obra" },
    { code: "2.3", phase: "Ejecución", desc: "Cota y nivel. Hormigón de limpieza (HL)", punto: "PP", doc: "CTE DB-SE-C 4.6.2, Anejo 14 pto. 5.2.b", criterio: "Espesor HL ≥ 10 cm continuo. Resguardo 10-15 cm si no se vierte de inmediato.", resp: "D.E.O." },
    { code: "3.1", phase: "Ejecución", desc: "Recepción de ferralla en tajo", punto: "PN", doc: "Planos de armado, Programación LG-23", criterio: "Geometría, diámetros, longitudes y limpieza de óxido suelto.", resp: "D.E.O." },
    { code: "3.2", phase: "Ejecución", desc: "Colocación y atado de armaduras (PP)", punto: "PP", doc: "Código Estructural Art. 49.4, Art. 66, DB-SE-C", criterio: "Separadores homologados (recubrimiento 50-70 mm). Paso para vibrador. Atado conforme.", resp: "D.E.O. (Presencial)" },
    { code: "4.1", phase: "Ejecución", desc: "Recepción del camión de hormigón", punto: "PE", doc: "Anejo 4, Programación LG-23", criterio: "Comprobación de albarán, cono de Abrams y tiempo transcurrido desde amasado.", resp: "Jefe de Obra / D.E.O." },
    { code: "4.2", phase: "Ejecución", desc: "Hormigonado y vertido de zapatas", punto: "PE", doc: "Plan de hormigonado, Art. 52", criterio: "Vertido continuo por tongadas. Prohibido verter hormigón prefraguado.", resp: "Jefe de Obra" },
    { code: "4.3", phase: "Ejecución", desc: "Compactación y vibrado", punto: "PN", doc: "Código Estructural Art. 52.2", criterio: "Vibrado hasta reflujo de pasta sin tocar armaduras ni sobrevibrar.", resp: "Encargado" },
    { code: "4.4", phase: "Ejecución", desc: "Curado húmedo del hormigón", punto: "PE", doc: "Código Estructural Art. 52.5", criterio: "Mantenimiento de humedad superficial continuo durante 3-7 días.", resp: "Jefe de Obra" },
    { code: "4.5", phase: "Ejecución", desc: "Comprobaciones finales y desencofrado", punto: "PN", doc: "Código Estructural Art. 53.3, Art. 69", criterio: "Superficies vistas sin coqueras, aristas íntegras y plomo de esperas.", resp: "D.E.O." }
  ]
};
