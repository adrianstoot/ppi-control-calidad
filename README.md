# 📋 CIV_L3: Plan de Puntos de Inspección (PPI) & Control de Calidad
### Aplicación Web Interactiva de Estudio, Supervisión de Obra & Laboratorio 3D
**Asignatura:** Construcción VI • **Escuela:** E.T.S.I.E. (Escuela Técnica Superior de Ingeniería de Edificación)  
**Marco Normativo:** Código Estructural • CTE DB-SE-C • Anexos I a IV (Castellano/Valencià) • LOE

---

## 🚀 Características de la Aplicación

Esta aplicación web interactiva transforma la documentación técnica y los casos reales de obra de la asignatura en una plataforma de estudio y supervisión profesional moderna, elegante y de alto rendimiento, exactamente igual a la plataforma de Sistemas Estructurales.

### 1. 📑 Temario Completo y Diapositivas Digitalizadas (39 Diapositivas HD)
- **6 Módulos Temáticos**:
  1. *Marco Normativo & Factores de Riesgo*: Anexos I a IV (Castellano y Valencià). Matriz de factores dimensionales, sísmicos (NCSE-02), geotécnicos (DB-SE-C), ambientales (Código Estructural tabla 27.1.a), climáticos (DB-HE) y viento (DB-HS 1).
  2. *El Programa de Puntos de Inspección en Obra (MC1)*: Ficha oficial de cimentación superficial ("Obra: Metaverso"). Controles previos (1.1 documentación, 1.2 acero, 1.3 probetas), controles de ejecución (2.1 replanteo, 2.2 fondo, 2.3 HL, 3.2 ferralla, 4.2 vertido, 4.3 vibrado, 4.4 curado, 4.5 acabado) y categorización de puntos PN, PE y PP.
  3. *Código Estructural (Armaduras, Anclajes y Solapes)*: Art. 49 completo: Mandriles mínimos de doblado (Tabla 49.3.4), atado de armaduras y estribos, formas de anclaje (patilla, gancho, barra soldada), fórmulas de longitud básica $l_b$, coeficientes $m$, factor reductor $\beta$, escalonamiento de armaduras longitudinales, solapes en barras a tracción, coeficiente $\alpha$, solapes en paquetes y mallas electrosoldadas.
  4. *Diagnóstico e Intervenciones en Lesiones de Cimentación*: Metodología en 6 fases (del síntoma al diagnóstico causal), regla de oro: *"Actuar sobre la causa antes que sobre el síntoma"*, las 6 estrategias de intervención/recalce (ensanche, micropilotes, bataches, consolidación, nuevas zapatas, sustitución) y caso práctico forense real de C/ Galdopar nº 8.
  5. *Casos Reales de No Conformidades en Obra (NC-01 a NC-07)*: Catálogo forense con fotografías reales de obra:
     - **NC-01**: Excavación sin refinar y falta de separadores (Punto de Parada PP).
     - **NC-02**: Parrilla apoyada directamente sobre tierra natural sin hormigón de limpieza ni calzos.
     - **NC-03**: Hormigón de limpieza insuficiente o menor a 10 cm.
     - **NC-04**: Calzos inadmisibles con ladrillos, bovedillas y cascotes.
     - **NC-05**: Colocación de armadura sobre hormigón de limpieza aún fresco/blando.
     - **NC-06**: Moldeo deficiente en toma de probetas de hormigón (UNE-EN 12390-2).
     - **NC-07**: Desviación de armaduras de espera respecto al replanteo del pilar.
  6. *Gestión de No Conformidades y Tolerancias Críticas*: Protocolo de 5 pasos para bloqueo, subsanación y cierre de NC en PPI, y matriz resumen de tolerancias reglamentarias.
- **Buscador en tiempo real**: Filtra conceptos, normativas y tolerancias al instante.
- **Marcadores y Notas Personales**: Guarda tus apuntes de clase sincronizados en `localStorage`.

### 2. 🧊 Laboratorio 3D Interactivo (WebGL / Three.js)
- Desarrollado con **Three.js** y **OrbitControls** con renderizado acelerado por hardware:
  - **Modelo 1: Zapata Superficial con Armaduras y Separadores**: Pozo de excavación, capa de hormigón de limpieza (HL ≥ 10 cm), separadores homologados (70 mm), parrilla inferior de acero B 500 S con patillas levantadas y esperas del pilar con estribos.
  - **Modelo 2: Asiento Diferencial y Fisura Parabólica a 45º**: Simulación cinemática del descenso de una zapata aislada provocando tracciones diagonales y la típica fisura parabólica a 45º en la fábrica.
  - **Modelo 3: Recalce Estructural con Micropilotes**: Viga de atado/encepado perimetral y 4 micropilotes inclinados/verticales penetrando hacia estrato firme con cosido químico.
  - **Modelo 4: Mandril de Doblado y Anclajes (Art. 49.3)**: Visualización geométrica del mandril normalizado (4 Ø / 7 Ø) y curvatura reglamentaria sin pérdida de ductilidad.
- **Herramientas 3D**: Modo alambre (*wireframe*), simulación cinemática y rotación libre 360º.

### 3. 📐 Calculadoras & Comprobadores Técnicos
- **Matriz de Riesgo y Frecuencias (Anexo I & II)**: Determina los niveles 1, 2 o 3 según número de viviendas/m², aceleración sísmica $a_b$, tipo de terreno (T1, T2, T3) y fija las frecuencias FC requeridas.
- **Comprobador de Pruebas de Servicio (Anexo III)**: Calcula las Unidades de Inspección (UI) de 400 m² para cubiertas planas (PSC), fachadas (PSF) y fontanería/evacuación.
- **Calculadora de Longitudes de Anclaje y Solape (Art. 49.5)**: Introduce $f_{ck}$, tipo de acero, diámetro $\varnothing$, posición I/II y calcula el coeficiente $m$, $l_b$, factor $\beta$, $l_{b,neta}$, solape estimado y mandril mínimo.
- **Checklist Interactivo del PPI MC1**: Registro interactivo de controles con marcado Conforme / No Conforme, recuento en vivo y botón para imprimir el acta oficial.

### 4. 📝 Modo Test & Examen
- Cuestionario de 15 preguntas tipo test de nivel universitario con corrección en tiempo real, barra de progreso, opciones A-D, explicaciones pedagógicas detalladas y salto directo a la diapositiva de referencia.

### 5. 🃏 Flashcards 3D
- 8 tarjetas mnemotécnicas con efecto de volteo 3D para memorizar tolerancias críticas (desviación 2% / 50 mm, resguardo 10-15 cm, HL ≥ 10 cm, mandriles 4 Ø / 7 Ø, factor $\beta = 0.7$, etc.).

### 6. 🔍 Galería Forense en Alta Resolución con Lightbox
- Acceso directo a todas las 26 fotografías y planos originales con zoom interactivo (+, -, reset) y visualización a pantalla completa.

---

## 💻 Cómo Abrir y Usar la App

La aplicación está lista para usar de dos formas sencillas:

### Opción 1: Navegador Directo (Sin instalación ni requisitos)
Haz doble clic en `index.html` o ejecuta el archivo `abrir_app.bat`. Se abrirá en cualquier navegador moderno (Chrome, Edge, Firefox, Safari):
- `file:///C:/Users/instalador/Downloads/ppi%20nuevo/index.html`

### Opción 2: Servidor Local
Si deseas ejecutarla a través de un servidor local HTTP:
- Ejecuta `abrir_app.bat` o `python server.py`.
- O bien ejecuta en consola:
  ```powershell
  python -m http.server 8080
  ```
- Abre tu navegador en: **http://localhost:8080**

---

## ⌨️ Atajos de Teclado
- **Flecha Izquierda ($\leftarrow$):** Diapositiva anterior.
- **Flecha Derecha ($\rightarrow$) / Barra Espaciadora:** Diapositiva siguiente.
- **F / f:** Pantalla completa (*Fullscreen*).
- **Escape (Esc):** Cerrar modales (Test o Lightbox).
- **Doble clic en diapositiva:** Abrir en visor Lightbox HD con zoom.
