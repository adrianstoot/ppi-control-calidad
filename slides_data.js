// Minimalist presentation metadata & test questions for CIV_L3: PPI, Replanteo y Control de Ejecución
const PRESENTATION = {
  title: "CIV_L3 • Plan de Puntos de Inspección (PPI) & Replanteo",
  subject: "Construcción VI • E.T.S.I.E. • Código Estructural / CTE",
  totalSlides: 46,
  chapters: [
    { id: 1, name: "1. Replanteo & Control Topográfico", range: [1, 7], slideStart: 1 },
    { id: 2, name: "2. Marco Normativo & Riesgo", range: [8, 8], slideStart: 8 },
    { id: 3, name: "3. El PPI en Obra (MC1)", range: [9, 14], slideStart: 9 },
    { id: 4, name: "4. Código Estructural (Armaduras)", range: [15, 25], slideStart: 15 },
    { id: 5, name: "5. Lesiones & Diagnóstico", range: [26, 30], slideStart: 26 },
    { id: 6, name: "6. Casos Reales No Conformidades", range: [31, 37], slideStart: 31 },
    { id: 7, name: "7. Gestión de NC & Tolerancias", range: [38, 46], slideStart: 38 }
  ],
  quiz: [
    {
      id: 1,
      question: "En la fase inicial de replanteo, ¿cuál es la función primordial de las camillas o caballetes de madera colocados en el perímetro de la excavación?",
      options: [
        "Servir de apoyo provisional para acopiar barras de ferralla",
        "Materializar alineaciones y ejes inalterables mediante ranuras o clavos para proyectarlos al fondo de zanja",
        "Delimitar el vallado de seguridad de la obra según el Plan de Seguridad y Salud",
        "Sujetar los tubos de hormigonado durante el vertido de limpieza"
      ],
      correct: 1,
      slideRef: 2,
      explanation: "Las camillas o caballetes deben situarse fuera del radio de maniobra de la maquinaria y permanecer inmóviles. Permiten tensar lienzas sobre ranuras/clavos para bajar plomadas hacia el fondo de la excavación con total fidelidad geométrica."
    },
    {
      id: 2,
      question: "Según el Código Estructural y el ítem 2.1 del PPI MC1, ¿cuál es la tolerancia máxima en planta para la variación del centro de gravedad (c.d.g.) de una zapata en el replanteo?",
      options: [
        "Hasta un 5% de la dimensión sin límite milimétrico",
        "2% de la dimensión del cimiento, sin exceder 50 mm",
        "10 cm con autorización previa del jefe de obra",
        "No existe tolerancia geométrica para cimentaciones superficiales"
      ],
      correct: 1,
      slideRef: 3,
      explanation: "El Art. 65.2 del Código Estructural y el ítem 2.1 del PPI MC1 fijan taxativamente: 'Variación en planta del centro de gravedad: 2% de la dimensión del cimiento, sin exceder 50 mm'. Desviaciones mayores generan excentricidades no previstas en el cálculo."
    },
    {
      id: 3,
      question: "Al utilizar un nivel de agua de manguera transparente basado en el principio de vasos comunicantes, ¿qué precaución es obligatoria para evitar lecturas erróneas?",
      options: [
        "Añadir salmuera o anticongelante para aumentar la densidad del líquido",
        "Expulsar por completo cualquier burbuja de aire retenida en el interior de la manguera",
        "Mantener siempre los dos extremos a diferente presión atmosférica",
        "Utilizar exclusivamente mangueras opacas de más de 30 mm de diámetro"
      ],
      correct: 1,
      slideRef: 5,
      explanation: "Las burbujas de aire interrumpen la continuidad hidrostática de la columna de agua y provocan desniveles artificiales de varios centímetros. La manguera debe purgarse exhaustivamente antes de marcar cotas altimétricas."
    },
    {
      id: 4,
      question: "En la comprobación de escuadras de una zapata o esquina de cimentación, ¿cómo se aplica la regla geométrica 3-4-5 mediante cinta métrica?",
      options: [
        "Midiendo 3 m en un lado, 4 m en el perpendicular y verificando que la hipotenusa mide exactamente 5 m",
        "Sumando 3+4+5 para obtener el perímetro de la excavación",
        "Multiplicando 3x4x5 para calcular el volumen de hormigón necesario",
        "Comprobando que la zapata tiene 3 metros de ancho, 4 de largo y 5 de profundidad"
      ],
      correct: 0,
      slideRef: 6,
      explanation: "Basado en el Teorema de Pitágoras (3² + 4² = 9 + 16 = 25 = 5²), al medir 3 m y 4 m en los catetos perpendiculares, la hipotenusa tensada debe ser exactamente 5 m para garantizar un ángulo recto perfecto de 90°."
    },
    {
      id: 5,
      question: "¿Cuál es el tamaño/frecuencia de inspección establecido en el PPI MC1 para la ejecución de cimentación superficial?",
      options: [
        "1 inspección por cada 5 zapatas",
        "Cada zapata de forma individual y sistemática (100%)",
        "1 por cada 500 m² de superficie de parcela",
        "Únicamente la zapata más cargada del proyecto"
      ],
      correct: 1,
      slideRef: 10,
      explanation: "En la ficha oficial del PPI MC1 ('Obra: Metaverso - Ejecución cimentación superficial'), la casilla TAMAÑO/FRECUENCIA fija taxativamente: 'cada zapata'. No se permite control por muestreo aleatorio en cimentaciones."
    },
    {
      id: 6,
      question: "En la metodología de control del PPI, ¿qué define y exige un 'Punto de Parada (PP)'?",
      options: [
        "El trabajo puede continuar sin esperar los resultados del control",
        "El trabajo se detiene solo si el encargado detecta fisuras visibles",
        "El trabajo se BLOQUEA: no puede continuar sin inspección formal y autorización expresa de la Dirección Facultativa",
        "Requiere únicamente aviso telefónico al promotor antes de 24 horas"
      ],
      correct: 2,
      slideRef: 14,
      explanation: "La leyenda del PPI MC1 define: 'PP punto de parada (el trabajo no puede seguir sin autorización expresa del cliente / D.F.)'. Hormigonar sin su firma previa constituye infracción contractual grave y motivo de rechazo."
    },
    {
      id: 7,
      question: "Según el CTE DB-SE-C y el ítem 2.3 del PPI MC1, si no se va a hormigonar inmediatamente tras la excavación, ¿qué previsión debe adoptarse?",
      options: [
        "Cubrir el fondo con plástico negro y regar abundantemente",
        "Dejar 10-15 cm de terreno por encima de la cota definitiva hasta el momento del hormigonado de limpieza",
        "Verter una capa de arena de miga de 5 cm",
        "Excavar 20 cm adicionales para drenaje de aguas"
      ],
      correct: 1,
      slideRef: 12,
      explanation: "Ítem 2.3 del PPI y CTE DB-SE-C: 'Solera de asiento: si no se hormigona inmediatamente después de excavar, se deben dejar 10-15 cm por encima de la cota definitiva' para evitar la meteorización y pérdida de capacidad portante del estrato."
    },
    {
      id: 8,
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
      id: 9,
      question: "¿Cuál es el recubrimiento nominal mínimo reglamentario (r_nom) exigido cuando se hormigona un elemento de cimentación directamente contra el terreno sin solera de limpieza previa?",
      options: [
        "25 mm",
        "40 mm",
        "50 mm",
        "70 mm"
      ],
      correct: 3,
      slideRef: 16,
      explanation: "El Código Estructural (Art. 44) establece que cuando el hormigón se vierte directamente contra el terreno natural, el recubrimiento nominal mínimo debe ser de 70 mm. Si se dispone hormigón de limpieza previo, puede reducirse a 40-50 mm."
    },
    {
      id: 10,
      question: "En el caso real NC-04, ¿por qué está terminantemente prohibido utilizar ladrillos, bovedillas o cascotes como calzos para la ferralla?",
      options: [
        "Porque aumentan excesivamente el peso propio de la zapata",
        "Porque carecen de resistencia normalizada, absorben agua del hormigón, generan discontinuidades y crean vías directas de corrosión hacia el acero",
        "Porque aceleran el fraguado impidiendo el vibrado adecuado",
        "Solo está prohibido si el ladrillo es macizo en lugar de hueco"
      ],
      correct: 1,
      slideRef: 34,
      explanation: "El Código Estructural exige separadores homologados de hormigón/mortero (resistencia ≥ 50 N/mm²) o poliméricos. Los ladrillos y cascotes son porosos, se trituran al pisar y permiten la entrada de humedad exterior oxidando la armadura."
    },
    {
      id: 11,
      question: "Según el Código Estructural (Cap. 11 Art. 49.4), ¿cómo debe realizarse el atado de las armaduras en vigas y pilares?",
      options: [
        "Las barras de esquina se atan en todos los estribos, y las restantes barras cada 50 Ø o al tresbolillo",
        "Basta con atar un estribo cada metro lineal",
        "Solo se atan las barras traccionadas, dejando libres las comprimidas",
        "El atado con alambre es voluntario si se utiliza hormigón autocompactante"
      ],
      correct: 0,
      slideRef: 19,
      explanation: "El Código Estructural exige: 'Las barras de esquina de los cercos o estribos se atarán en todos los puntos de cruce. Las restantes barras longitudinales se atarán, como mínimo, cada dos estribos'."
    },
    {
      id: 12,
      question: "En el caso real NC-05, ¿qué consecuencia estructural irreparable tiene colocar la ferralla sobre el hormigón de limpieza en estado fresco?",
      options: [
        "El acero se calienta y pierde su límite elástico",
        "La ferralla se hunde por su peso propio en la masa blanda, anulando el recubrimiento inferior de hormigón",
        "Aumenta la adherencia entre el acero y el hormigón de limpieza",
        "Impide que el hormigón de limpieza fragüe adecuadamente"
      ],
      correct: 1,
      slideRef: 35,
      explanation: "El hormigón de limpieza fresco carece de capacidad portante. El peso de la ferralla y el tránsito de los operarios hunden los separadores, dejando el acero pegado a la tierra y desprotegido frente a la corrosión."
    },
    {
      id: 13,
      question: "En el protocolo de gestión de No Conformidades (diapositiva 38), ¿cuál es la primera acción preceptiva de la D.E.O. tras detectar un defecto que coincide con un Punto de Parada (PP)?",
      options: [
        "Permitir el hormigonado y subsanar después mediante inyecciones",
        "Marcar la casilla NO en el PPI, ordenar la suspensión inmediata del vertido y levantar el parte formal de NC",
        "Llamar al laboratorio de control para que haga probetas adicionales",
        "Pedir al jefe de obra que firme una declaración jurada de exención de culpa"
      ],
      correct: 1,
      slideRef: 38,
      explanation: "Un Punto de Parada (PP) no conforme genera el bloqueo operativo instantáneo de los trabajos. Se suspende el vertido de hormigón y no se reanuda hasta que la contrata subsana el defecto y la D.E.O. firma el levantamiento."
    },
    {
      id: 14,
      question: "En una inspección de cimentación, ¿qué tipo de fisura en la tabiquería de plantas inferiores es síntoma inequívoco de un asiento diferencial por fallo del estrato de apoyo?",
      options: [
        "Fisuras horizontales de retracción en el encuentro con el forjado",
        "Fisuras inclinadas a aproximadamente 45° convergentes hacia el apoyo que desciende",
        "Fisuras en forma de tela de araña por exceso de agua de amasado en el mortero",
        "Microfisuras verticales aleatorias de menos de 0,1 mm"
      ],
      correct: 1,
      slideRef: 29,
      explanation: "El asiento diferencial de un pilar o zapata induce tensiones de tracción diagonal en los paños de albañilería rígida, manifestándose como grietas escalonadas a 45° que apuntan hacia el punto de descenso."
    },
    {
      id: 15,
      question: "¿Cuál es el tiempo mínimo de espera recomendado entre el vertido del hormigón de limpieza y la colocación de la ferralla de cimentación?",
      options: [
        "2 horas",
        "Al menos 24 horas para que el HL alcance resistencia suficiente para soportar el tránsito y el peso de las jaulas",
        "7 días completos obligatoriamente",
        "No es necesario esperar: se colocan a la vez"
      ],
      correct: 1,
      slideRef: 21,
      explanation: "Se debe permitir que el hormigón de limpieza fragüe durante al menos 24 horas (o hasta alcanzar resistencia adecuada) para evitar que los calzos se hundan y garantizar una superficie de trabajo limpia y rígida."
    }
  ]
};
