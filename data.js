// Content for the site. Edit here to add destinations, seasons or styles.
window.SIJALO_DATA = {
  styles: {
    amigos: {
      name: "Con amigos",
      img: "tolantongo",
      title: "El viaje que siempre se queda en el chat, ahora sí.",
      text: "Una persona nos escribe, nosotros armamos todo y cada quien aparta su lugar. Cabañas, campamento o casa completa; carretera, música y planes para el día y la noche.",
      perks: ["Pagos por persona", "Hospedaje para grupos", "Planes de día y de noche"],
    },
    mujeres: {
      name: "Entre mujeres",
      img: "bernal",
      title: "Con amigas, mamá o hermanas, a su ritmo.",
      text: "Hospedaje y transporte de confianza, horarios cómodos y alguien de Sijalo pendiente todo el viaje. Viñedos, pueblos, playas tranquilas y spas.",
      perks: ["Transporte privado", "Acompañamiento todo el viaje", "Lugares bien ubicados"],
    },
    familia: {
      name: "En familia",
      img: "huasca",
      title: "De los abuelos a los más chiquitos.",
      text: "Itinerarios sin prisas, trayectos cortos, comidas a buena hora y actividades para todas las edades. Ustedes disfrutan; nosotros resolvemos.",
      perks: ["Ritmo para niños y adultos mayores", "Habitaciones familiares", "Actividades para todos"],
    },
    aventura: {
      name: "De aventura",
      img: "huasteca",
      title: "Cascadas, grutas, cañones y caminos de tierra.",
      text: "Rappel, kayak, senderismo, nado en ríos y campamento con guías locales y el equipo que haga falta. Tú pones las ganas.",
      perks: ["Guías locales", "Equipo incluido", "Rutas según tu nivel"],
    },
  },

  destinations: [
    { id: "dunas", name: "Dunas Rojas", state: "Hidalgo", styles: ["aventura", "amigos", "mujeres"], days: "1 a 2 días", season: "Todo el año; con neblina en temporada de lluvias", text: "Lomas de tierra roja entre bosque y neblina. Poco conocido, perfecto para caminar y tomar las mejores fotos del viaje.", own: true },
    { id: "huasteca", name: "Huasteca Potosina", state: "San Luis Potosí", styles: ["aventura", "amigos"], days: "3 a 4 días", season: "Agua turquesa de febrero a mayo", text: "Tamul en panga, saltos en Micos, Puente de Dios y la Cueva del Agua. El clásico de aventura de México." },
    { id: "tolantongo", name: "Grutas de Tolantongo", state: "Hidalgo", styles: ["amigos", "familia", "aventura"], days: "1 a 2 días", season: "Todo el año; entre semana hay menos gente", text: "Pozas termales en la ladera, río azul, túnel de vapor y campamento junto al río." },
    { id: "huasca", name: "Huasca y Real del Monte", state: "Hidalgo", styles: ["familia", "amigos"], days: "1 a 2 días", season: "Todo el año; precioso en temporada de lluvias", text: "Prismas basálticos, haciendas, pastes y pueblos mágicos a dos horas de la CDMX." },
    { id: "bernal", name: "Peña de Bernal y viñedos", state: "Querétaro", styles: ["mujeres", "amigos"], days: "1 a 2 días", season: "Vendimia en verano; todo el año", text: "Uno de los monolitos más grandes del mundo, catas de vino y queso en la ruta de Querétaro." },
    { id: "xilitla", name: "Xilitla", state: "San Luis Potosí", styles: ["mujeres", "amigos"], days: "Combínalo con la Huasteca", season: "Todo el año", text: "El jardín surrealista de Edward James: escaleras que no llevan a ningún lado en plena selva." },
    { id: "cuetzalan", name: "Cuetzalan", state: "Puebla", styles: ["mujeres", "familia"], days: "2 a 3 días", season: "Feria del Café en octubre", text: "Pueblo de niebla y cascadas en la Sierra Norte, café de altura y tianguis los domingos." },
    { id: "sma", name: "San Miguel de Allende", state: "Guanajuato", styles: ["mujeres", "amigos"], days: "2 a 3 días", season: "Todo el año", text: "Calles empedradas, terrazas, galerías y una de las mejores escenas de comida del país." },
    { id: "catorce", name: "Real de Catorce", state: "San Luis Potosí", styles: ["amigos", "aventura"], days: "2 a 3 días", season: "Todo el año; frío en invierno", text: "Se entra por un túnel de 2 km a un pueblo minero en el desierto. Paseo a caballo y en Willys." },
    { id: "janitzio", name: "Pátzcuaro y Janitzio", state: "Michoacán", styles: ["familia", "mujeres"], days: "2 a 3 días", season: "Noche de Muertos, 1 y 2 de noviembre", text: "Velas, cempasúchil y tradiciones purépechas en el lago. La celebración más famosa de Día de Muertos." },
    { id: "monarca", name: "Santuarios de la mariposa monarca", state: "Michoacán y Edomex", styles: ["familia", "aventura"], days: "1 a 2 días", season: "Noviembre a marzo", text: "Millones de mariposas cubren los oyameles. Caminata o cabalgata hasta el santuario." },
    { id: "tequila", name: "Tequila", state: "Jalisco", styles: ["amigos", "mujeres"], days: "2 días", season: "Todo el año", text: "Campos de agave azul, destilerías con cata y el pueblo mágico donde nació el tequila." },
    { id: "sierragorda", name: "Sierra Gorda", state: "Querétaro", styles: ["aventura"], days: "2 a 3 días", season: "Todo el año", text: "Reserva de la biosfera: misiones franciscanas, sótanos, cascadas y miradores de montaña." },
    { id: "hierve", name: "Oaxaca y Hierve el Agua", state: "Oaxaca", styles: ["mujeres", "amigos", "familia"], days: "3 a 5 días", season: "Guelaguetza en julio; todo el año", text: "Cascadas petrificadas sobre el valle, mezcal, mercados y la mejor comida de México." },
    { id: "mazunte", name: "Mazunte", state: "Oaxaca", styles: ["amigos", "mujeres"], days: "3 a 5 días", season: "Liberación de tortugas de julio a diciembre", text: "Playa tranquila, atardeceres en Punta Cometa, liberación de tortugas y comida frente al mar." },
    { id: "bacalar", name: "Bacalar", state: "Quintana Roo", styles: ["amigos", "mujeres", "familia"], days: "3 a 5 días", season: "Mejor de noviembre a abril", text: "La laguna de los siete colores: velero, kayak, cenotes y estromatolitos." },
    { id: "sumidero", name: "Cañón del Sumidero", state: "Chiapas", styles: ["familia", "aventura"], days: "4 a 6 días con San Cristóbal", season: "Todo el año", text: "Paredes de más de mil metros en lancha, y San Cristóbal de las Casas para el resto del viaje." },
    { id: "ballena", name: "Ballenas en Baja California Sur", state: "Baja California Sur", styles: ["familia", "aventura"], days: "4 a 5 días", season: "Diciembre a abril", text: "Ballena gris en las lagunas del Pacífico: de las pocas experiencias así de cerca en el mundo." },
  ],

  // m = month index (0 = enero). Each entry links to a destination when possible.
  seasons: [
    { m: [0, 1, 2, 10, 11], title: "Mariposa monarca", where: "Michoacán y Edomex", dest: "monarca" },
    { m: [0, 1, 2, 3, 11], title: "Ballena gris", where: "Baja California Sur", dest: "ballena" },
    { m: [0, 1, 2, 3, 10, 11], title: "Laguna de Bacalar", where: "Temporada seca", dest: "bacalar" },
    { m: [1, 2, 3, 4], title: "Huasteca turquesa", where: "San Luis Potosí", dest: "huasteca" },
    { m: [2, 3], title: "Semana Santa en la playa", where: "Mazunte, Bacalar", dest: "mazunte" },
    { m: [5, 6, 7], title: "Luciérnagas", where: "Bosques de Tlaxcala", dest: null },
    { m: [6], title: "Guelaguetza", where: "Oaxaca", dest: "hierve" },
    { m: [5, 6, 7, 8], title: "Dunas con neblina", where: "Hidalgo", dest: "dunas" },
    { m: [6, 7, 8, 9, 10, 11], title: "Tortugas en Mazunte", where: "Oaxaca", dest: "mazunte" },
    { m: [6, 7, 8], title: "Vendimia", where: "Querétaro", dest: "bernal" },
    { m: [8], title: "Fiestas patrias", where: "San Miguel de Allende", dest: "sma" },
    { m: [9], title: "Campos de cempasúchil", where: "Puebla y Edomex", dest: null, img: "cempasuchil" },
    { m: [9], title: "Feria del Café", where: "Cuetzalan", dest: "cuetzalan" },
    { m: [10], title: "Noche de Muertos", where: "Pátzcuaro y Janitzio", dest: "janitzio" },
    { m: [11], title: "Navidad en pueblos mágicos", where: "Real del Monte, Huasca", dest: "huasca" },
  ],

  itinerary: {
    title: "Huasteca Potosina en 3 días",
    note: "Ejemplo para un grupo que sale de la CDMX. Cada viaje lo ajustamos a tus fechas, tu ritmo y tu presupuesto.",
    days: [
      { d: "Día 1", t: "Salida y cascadas de Micos", x: "Salimos de madrugada. Por la tarde, saltos y nado en las cascadas de Micos con guía y chaleco. Noche en Ciudad Valles." },
      { d: "Día 2", t: "Tamul en panga y Puente de Dios", x: "Remamos río arriba hasta la cascada de Tamul, nadamos en la Cueva del Agua y terminamos en las pozas de Puente de Dios." },
      { d: "Día 3", t: "Jardín surrealista de Xilitla", x: "Recorrido por Las Pozas de Edward James, comida huasteca (zacahuil y enchiladas) y regreso a casa." },
    ],
    includes: ["Transporte redondo", "2 noches de hospedaje", "Guías y equipo", "Entradas", "Coordinador de Sijalo"],
  },
};
