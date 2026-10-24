(() => {
  const cfg = window.SIJALO_CONFIG || {};
  const track = (name, data) => { try { window.umami && window.umami.track(name, data); } catch (_) {} };

  // Keep UTM params from the landing URL so the WhatsApp message tells us where the visitor came from.
  const params = new URLSearchParams(location.search);
  const source = params.get("utm_source");
  const campaign = params.get("utm_campaign");
  const originTag = source ? ` [${source}${campaign ? "/" + campaign : ""}]` : "";

  const waUrl = (text) => cfg.whatsapp
    ? `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text + originTag)}`
    : null;

  document.querySelectorAll(".wa-link").forEach((a) => {
    const url = waUrl(a.dataset.waText || "Hola, quiero cotizar un viaje con Sijalo");
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  });

  const ig = document.getElementById("ig-link");
  if (ig && cfg.instagram) ig.href = cfg.instagram;
  const mail = document.getElementById("mail-link");
  if (mail && cfg.email) mail.href = `mailto:${cfg.email}`;
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("quote-form");
  const err = document.getElementById("form-error");
  const list = document.getElementById("dest-list");

  // Destination ideas prefill the form and feed the datalist.
  document.querySelectorAll("[data-dest]").forEach((a) => {
    const opt = document.createElement("option");
    opt.value = a.dataset.dest;
    list.appendChild(opt);
    a.addEventListener("click", () => {
      form.elements.destino.value = a.dataset.dest;
      setTimeout(() => form.elements.nombre.focus({ preventScroll: true }), 400);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = form.elements;
    const nombre = f.nombre.value.trim();
    if (!nombre) {
      err.textContent = "Escribe tu nombre para que sepamos a quién responder.";
      err.hidden = false;
      f.nombre.focus();
      return;
    }
    err.hidden = true;

    const lines = [`Hola, soy ${nombre} y quiero cotizar un viaje con Sijalo.`];
    if (f.destino.value.trim()) lines.push(`Destino: ${f.destino.value.trim()}`);
    if (f.fechas.value.trim()) lines.push(`Fechas: ${f.fechas.value.trim()}`);
    if (f.personas.value.trim()) lines.push(`Personas: ${f.personas.value.trim()}`);
    if (f.tipo.value) lines.push(`Tipo de viaje: ${f.tipo.value}`);
    if (f.presupuesto.value) lines.push(`Presupuesto por persona: ${f.presupuesto.value}`);

    const url = waUrl(lines.join("\n"));
    if (!url) {
      err.textContent = "Todavía no configuramos el número de WhatsApp. Escríbenos a " + (cfg.email || "nuestro correo") + ".";
      err.hidden = false;
      return;
    }
    track("cotizar-whatsapp", { tipo: f.tipo.value || "sin-tipo", presupuesto: f.presupuesto.value || "sin-dato" });
    window.open(url, "_blank", "noopener");
  });
})();
