// Minimalist presentation metadata & test questions for CIV_L3: PPI y Control de Ejecución
const PRESENTATION = {
  title: "CIV_L3 • Plan de Puntos de Inspección (PPI)",
  subject: "Construcción VI • E.T.S.I.E. • Código Estructural / CTE",
  totalSlides: 39,
  chapters: [
    { id: 1, name: "1. Marco Normativo & Riesgo", range: [1, 8], slideStart: 1 },
    { id: 2, name: "2. El PPI en Obra (MC1)", range: [9, 14], slideStart: 9 },
    { id: 3, name: "3. Código Estructural (Armaduras)", range: [15, 25], slideStart: 15 },
    { id: 4, name: "4. Lesiones & Diagnóstico", range: [26, 30], slideStart: 26 },
    { id: 5, name: "5. Casos Reales No Conformidades", range: [31, 37], slideStart: 31 },
    { id: 6, name: "6. Gestión & Tolerancias", range: [38, 39], slideStart: 38 }
  ],
  quiz: [
    {
      id: 1,
      question: "¿Cuál es el tamaño/frecuencia de inspección establecido en el PPI MC1 para la ejecución de cimentación superficial?",
      options: [
        "1 inspección por cada 5 zapatas",
        "Cada zapata de forma individual y sistemática",
        "1 por cada 500 m² de superficie de parcela",
        "Únicamente la zapata más cargada del proyecto"
      ],
      correct: 1,
      slideRef: 10,
      explanation: "En la ficha oficial del PPI MC1 ('Obra: Metaverso - Ejecución cimentación superficial'), la casilla TAMAÑO/FRECUENCIA fija taxativamente: 'cada zapata'."
    },
    {
      id: 2,
      question: "Según el Código Estructural y el ítem 2.1 del PPI MC1, ¿cuál es la tolerancia máxima en planta para la variación del centro de gravedad (c.d.g.) de una zapata?",
      options: [
        "Hasta un 5% de la dimensión sin límite milimétrico",
        "2% de la dimensión del cimiento, sin exceder 50 mm",
        "10 cm con autorización previa del jefe de obra",
        "No existe tolerancia geométrica para cimentaciones superficiales"
      ],
      correct: 1,
      slideRef: 12,
      explanation: "El criterio de aceptación del punto 2.1 y Art. 65.2 del Código Estructural establece: 'Variación en planta del centro de gravedad, 2% de la dimensión del cimiento, sin exceder 50 mm'."
    },
    {
      id: 3,
      question: "En la metodología de control del PPI, ¿qué define y exige un 'Punto de Parada (PP)'?",
      options: [
        "El trabajo puede continuar sin esperar los resultados del control",
        "El trabajo se detiene solo si el encargado detecta fisuras visibles",
        "El trabajo se BLOQUEA: no puede continuar sin inspección formal y autorización expresa de la Dirección Facultativa",
        "Requiere únicamente aviso telefónico al promotor antes de 24 horas"
      ],
      correct: 2,
      slideRef: 14,
      explanation: "La leyenda del PPI MC1 define: 'PP punto de parada (el trabajo no puede seguir sin autorización expresa del cliente / D.F.)'. Hormigonar sin su firma previa constituye infracción grave."
    },
    {
      id: 4,
      question: "Según el CTE DB-SE-C y el ítem 2.3 del PPI MC1, si no se va a hormigonar inmediatamente tras la excavación, ¿qué previsión debe adoptarse?",
      options: [
        "Cubrir el fondo con plástico negro y regar abundantemente",
        "Dejar 10-15 cm de terreno por encima de la cota definitiva hasta el momento del hormigonado de limpieza",
        "Verter una capa de arena de miga de 5 cm",
        "Excavar 20 cm adicionales para drenaje de aguas"
      ],
      correct: 1,
      slideRef: 12,
      explanation: "Ítem 2.3 del PPI y CTE DB-SE-C: 'Solera de asiento: si no se hormigona inmediatamente después de excavar, se deben dejar 10-15 cm por encima de la cota definitiva' para evitar la meteorización del estrato portante."
    },
    {
      id: 5,
      question: "Según la Tabla 49.3.4 del Código Estructural, ¿cuál es el diámetro mínimo del mandril para ganchos y patillas en barras de acero B 500 S con diámetro Ø < 20 mm?",
      options: [
        "2 Ø",
        "4 Ø",
        "7 Ø",
        "12 Ø"
      ],
      correct: 1,
      slideRef: 15,
      explanation: "La Tabla 49.3.4 del Código Estructural fija para aceros B 400 S y B 500 S con diámetro Ø < 20 mm un mandril mínimo de 4 Ø. Para Ø ≥ 20 mm se exige 7 Ø."
    },
    {
      id: 6,
      question: "En el caso real NC-04, ¿por qué está terminantemente prohibido utilizar ladrillos, bovedillas o cascotes como calzos para la ferralla?",
      options: [
        "Porque aumentan excesivamente el peso propio de la zapata",
        "Porque carecen de resistencia normalizada, absorben agua del hormigón, generan discontinuidades y crean vías directas de corrosión hacia el acero",
        "Porque aceleran el fraguado impidiendo el vibrado adecuado",
        "Solo está prohibido si el ladrillo es macizo en lugar de hueco"
      ],
      correct: 1,
      slideRef: 34,
      explanation: "El Código Estructural exige separadores homologados de hormigón/mortero o poliméricos. Los ladrillos y cascotes son porosos, por lo que desvían esfuerzos y permiten la entrada de humedad exterior oxidando la ferralla."
    },
    {
      id: 7,
      question: "Según el Código Estructural (Cap. 11 Art. 49.4), ¿cómo debe realizarse el atado de las armaduras en vigas y pilares?",
      options: [
        "Las barras de esquina se atan en todos los estribos, y las restantes barras cada 50 Ø",
        "Basta con atar un estribo cada metro lineal",
        "Solo se atan las barras traccionadas, dejando libres las comprimidas",
        "El atado con alambre es voluntario si se utiliza hormigón autocompactante"
      ],
      correct: 0,
      slideRef: 16,
      explanation: "La Figura del Art. 49.4 indica: 'Barras de esquina en todos los estribos; restantes barras cada 50 Ø1 / 50 Ø2; estribos múltiples cruzados'."
    },
    {
      id: 8,
      question: "Según el Anexo III, ¿cuál es la exigencia y muestreo para la prueba de servicio de estanqueidad de cubiertas planas (PSC)?",
      options: [
        "Prueba de humo con muestreo del 25% de la superficie",
        "Inundación o riego de la cubierta, con unidad de inspección de 400 m² o fracción y muestreo del 100% de la UI",
        "Inspección visual simple en el 10% de los sumideros",
        "Prueba de carga estática durante 72 horas"
      ],
      correct: 1,
      slideRef: 4,
      explanation: "El Anexo III establece para PSC: 'Inundación de la cubierta o, en su caso, riego o combinación de ambas. Tamaño: 400 m² o fracción. Muestreo: 100% UI'."
    },
    {
      id: 9,
      question: "En el caso real NC-05, ¿qué grave anomalía se produce al colocar las armaduras sobre el hormigón de limpieza (HL) antes de su fraguado?",
      options: [
        "El acero se descompone químicamente por el cemento",
        "La ferralla se hunde por su peso en la masa blanda, perdiendo el recubrimiento inferior de proyecto y tocando el fondo",
        "El hormigón de limpieza fragua demasiado rápido provocando fisuras térmicas",
        "No representa anomalía alguna si se vibra conjuntamente"
      ],
      correct: 1,
      slideRef: 35,
      explanation: "Si el HL no ha fraguado y alcanzado resistencia suficiente, los separadores y parrillas se clavan en la masa perdiendo el recubrimiento nominal exigido (50-70 mm), quedando expuestos a la humedad del terreno."
    },
    {
      id: 10,
      question: "En la metodología de diagnóstico e intervención de lesiones en cimentaciones, ¿cuál es la máxima prioridad en la Fase 5?",
      options: [
        "Proceder de inmediato al sellado y repintado de las fisuras visibles (Fase 5B)",
        "Corregir la CAUSA (Fase 5A: detener la evolución del daño y estabilizar el sistema) antes de reparar el síntoma",
        "Demoler preventivamente la tabiquería de las plantas intermedias",
        "Instalar vigas metálicas sin comprobar el terreno"
      ],
      correct: 1,
      slideRef: 28,
      explanation: "La regla de oro de la patología estructural establece: 'Actuar sobre la CAUSA antes que sobre el SÍNTOMA'. Reparar fisuras sin estabilizar el cimiento provoca la reapertura inmediata de las grietas."
    },
    {
      id: 11,
      question: "Al realizar un recalce mediante profundización del plano de apoyo de una zapata (Estrategia 3), ¿qué procedimiento de seguridad es preceptivo?",
      options: [
        "Descalzar simultáneamente todo el perímetro del edificio",
        "Excavación por bataches alternos o recalce progresivo sin descalzar simultáneamente toda la cimentación",
        "Inyectar agua a presión para ablandar el terreno de apoyo",
        "Retirar los puntales de seguridad para comprobar si la zapata cede"
      ],
      correct: 1,
      slideRef: 29,
      explanation: "La ficha técnica de intervenciones indica taxativamente: 'Excavación por bataches alternos o recalce progresivo hasta alcanzar el estrato competente. No descalzar simultáneamente toda la cimentación'."
    },
    {
      id: 12,
      question: "Según la Tabla 49.5.1.2.b del Código Estructural, ¿cuál es el coeficiente reductor beta para barras ancladas en patilla o gancho sometidas a tracción?",
      options: [
        "beta = 1.0 (sin reducción)",
        "beta = 0.7 (*)",
        "beta = 0.4",
        "beta = 1.4"
      ],
      correct: 1,
      slideRef: 20,
      explanation: "La Tabla 49.5.1.2.b establece: Patilla, gancho y gancho en U en tracción: beta = 0.7 (*). En cambio, para barras trabajando a compresión siempre es beta = 1.0."
    },
    {
      id: 13,
      question: "Según la Figura 49.5.2.1 del Código Estructural, ¿qué separación longitudinal mínima deben guardar los centros de los empalmes por solapo en tracción?",
      options: [
        "10 veces el diámetro (10 Ø)",
        "Una longitud igual o mayor a lb (longitud básica de anclaje)",
        "25 cm fijos para cualquier tipo de barra",
        "Pueden coincidir exactamente en la misma sección transversal"
      ],
      correct: 1,
      slideRef: 22,
      explanation: "El texto normativo de la diapositiva 22 indica: 'los empalmes de las distintas barras en tracción de una pieza se distanciarán de tal modo que sus centros queden separados en la dirección de las armaduras una longitud igual o mayor a lb'."
    },
    {
      id: 14,
      question: "En el control previo de materiales (ítem 1.1 del PPI MC1), si el hormigón carece de Distintivo Oficialmente Reconocido (DOR), ¿qué antigüedad máxima pueden tener los ensayos previos y característicos?",
      options: [
        "15 días",
        "Máximo 6 meses",
        "2 años",
        "No caducan si la planta hormigonera tiene certificación ISO"
      ],
      correct: 1,
      slideRef: 11,
      explanation: "El ítem 1.1 del PPI y Anejo 4 del Código Estructural exige que los ensayos previos y característicos de plantas de hormigón sin distintivo de calidad oficialmente reconocido tengan una antigüedad máxima de 6 meses."
    },
    {
      id: 15,
      question: "En el caso práctico real de análisis patológico en C/ Galdopar nº 8 (Slide 30), ¿cuál fue la conclusión y propuesta técnica final?",
      options: [
        "Ruina inminente que motivó el desalojo y derribo del edificio",
        "Asiento diferencial estabilizado por obras colindantes, con afección no estructural compatible, requiriendo únicamente reparación estética de acabados",
        "Necesidad urgente de recalce perimetral completo con 40 micropilotes",
        "Sustitución inmediata de los muros de carga por pilares metálicos HEB"
      ],
      correct: 1,
      slideRef: 30,
      explanation: "La ficha técnica concluyó: 'Afección estructural NO SIGNIFICATIVA. Estado evolutivo: ESTABILIZADO (testigos de yeso sin rotura). Conclusión: no se considera necesaria intervención estructural ni recalce; se recomienda reparación estética'."
    }
  ]
};
