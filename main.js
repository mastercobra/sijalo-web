(() => {
  const cfg = window.SIJALO_CONFIG || {};
  const D = window.SIJALO_DATA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const h = (tag, attrs = {}, html = "") => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (html) el.innerHTML = html;
    return el;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const track = (name, data) => { try { window.umami && window.umami.track(name, data); } catch (_) {} };
  const img = (id, size = "s") => `img/${id}${size === "s" ? "-s" : ""}.webp`;
  const destById = Object.fromEntries(D.destinations.map((d) => [d.id, d]));

  // ---------- WhatsApp links (keep UTM so we know which post brought the visitor) ----------
  const params = new URLSearchParams(location.search);
  const src = params.get("utm_source"), camp = params.get("utm_campaign");
  const originTag = src ? `\n[origen: ${src}${camp ? "/" + camp : ""}]` : "";
  const waUrl = (text) => (cfg.whatsapp ? `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text + originTag)}` : null);
  $$(".wa-link").forEach((a) => {
    const url = waUrl(a.dataset.waText || "Hola, quiero cotizar un viaje con Sijalo");
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  });
  ["ig-link", "ig-about"].forEach((id) => { const a = document.getElementById(id); if (a && cfg.instagram) a.href = cfg.instagram; });
  const mail = $("#mail-link"); if (mail && cfg.email) mail.href = `mailto:${cfg.email}`;
  $("#year").textContent = new Date().getFullYear();

  // ---------- Header turns solid after the hero ----------
  const top = $("#top");
  const onScroll = () => top.classList.toggle("solid", window.scrollY > window.innerHeight * 0.6);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- Styles tabs ----------
  const tabs = $("#style-tabs"), panel = $("#style-panel");
  const showStyle = (key) => {
    const s = D.styles[key];
    $$(".tab", tabs).forEach((t) => t.setAttribute("aria-selected", t.dataset.key === key));
    const dests = D.destinations.filter((d) => d.styles.includes(key)).slice(0, 6);
    panel.innerHTML = `
      <div class="style-photo"><img src="${img(s.img, "l")}" alt="" loading="lazy"></div>
      <div class="style-copy">
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <ul class="perks">${s.perks.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <div class="style-dests">${dests.map((d) => `<a href="#destinos" data-open="${d.id}">${esc(d.name)}</a>`).join("")}</div>
        <div><a class="btn btn-anil" href="#arma" data-style-pick="${key}">Armar un viaje ${esc(s.name.toLowerCase())}</a></div>
      </div>`;
  };
  Object.entries(D.styles).forEach(([key, s], i) => {
    const b = h("button", { class: "tab", role: "tab", type: "button", "data-key": key, "aria-selected": i === 0 }, esc(s.name));
    b.addEventListener("click", () => { showStyle(key); track("estilo", { estilo: key }); });
    tabs.appendChild(b);
  });
  showStyle(Object.keys(D.styles)[0]);

  // ---------- Destinations grid + filters ----------
  const grid = $("#dest-grid"), filters = $("#dest-filters");
  const wideAt = new Set([0, 5, 9, 14]);
  D.destinations.forEach((d, i) => {
    const li = h("li", { class: `dcard${wideAt.has(i) ? " wide" : ""}${d.own ? " own" : ""}`, "data-styles": d.styles.join(" ") });
    li.innerHTML = `
      <img src="${img(d.id)}" srcset="${img(d.id)} 800w, ${img(d.id, "l")} 1600w" sizes="(min-width: 960px) ${wideAt.has(i) ? "66vw" : "33vw"}, 100vw" alt="" loading="lazy">
      ${d.own ? '<span class="dc-own">Foto nuestra</span>' : ""}
      <button type="button" data-open="${d.id}" aria-label="Ver ${esc(d.name)}, ${esc(d.state)}">
        <span class="dc-txt">
          <span class="dc-state">${esc(d.state)}</span>
          <span class="dc-name">${esc(d.name)}</span>
          <span class="dc-tags"><span>${esc(d.days)}</span></span>
        </span>
      </button>`;
    grid.appendChild(li);
  });
  const filterKeys = [["todos", "Todos"], ...Object.entries(D.styles).map(([k, s]) => [k, s.name])];
  filterKeys.forEach(([k, label], i) => {
    const b = h("button", { class: "filter", type: "button", "aria-pressed": i === 0, "data-f": k }, esc(label));
    b.addEventListener("click", () => {
      $$(".filter", filters).forEach((f) => f.setAttribute("aria-pressed", f === b));
      $$(".dcard", grid).forEach((c) => { c.hidden = k !== "todos" && !c.dataset.styles.split(" ").includes(k); });
      track("filtro-destinos", { estilo: k });
    });
    filters.appendChild(b);
  });

  // ---------- Destination dialog ----------
  let credits = {};
  fetch("img/credits.json").then((r) => r.json()).then((c) => (credits = c)).catch(() => {});
  const dlg = h("dialog", { class: "ddialog", "aria-labelledby": "dd-title" });
  document.body.appendChild(dlg);
  const openDest = (id) => {
    const d = destById[id]; if (!d) return;
    const c = credits[id];
    const credit = d.own ? "Foto: equipo Sijalo" : c ? `Foto: ${esc(c.artist || "Wikimedia Commons")}, ${esc(c.lic)}` : "";
    dlg.innerHTML = `
      <button class="dd-close" type="button" aria-label="Cerrar">×</button>
      <img src="${img(d.id, "l")}" alt="">
      <div class="dd-body">
        <p class="dd-state">${esc(d.state)}</p>
        <h3 id="dd-title">${esc(d.name)}</h3>
        <p>${esc(d.text)}</p>
        <dl class="dd-facts">
          <div><dt>Ideal para</dt><dd>${d.styles.map((s) => D.styles[s].name).join(", ")}</dd></div>
          <div><dt>Duración sugerida</dt><dd>${esc(d.days)}</dd></div>
          <div style="grid-column:1/-1"><dt>Mejor temporada</dt><dd>${esc(d.season)}</dd></div>
        </dl>
        <div class="dd-actions">
          <a class="btn btn-sun" href="#arma" data-pick="${d.id}">Cotizar ${esc(d.name)}</a>
        </div>
        <p class="dd-credit">${credit}</p>
      </div>`;
    $(".dd-close", dlg).addEventListener("click", () => dlg.close());
    dlg.showModal();
    track("destino", { id });
  };
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

  // ---------- Seasons ----------
  const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const monthsEl = $("#months"), seasonList = $("#season-list");
  const showMonth = (m) => {
    $$(".month", monthsEl).forEach((b, i) => b.setAttribute("aria-selected", i === m));
    const items = D.seasons.filter((s) => s.m.includes(m));
    seasonList.innerHTML = items.map((s) => {
      const pic = s.img || s.dest;
      return `<li class="scard">
        ${pic ? `<img src="${img(pic)}" alt="" loading="lazy">` : '<div class="ph" aria-hidden="true"></div>'}
        <div><h3>${esc(s.title)}</h3><p>${esc(s.where)}</p>
        ${s.dest ? `<button type="button" data-open="${s.dest}">Ver destino</button>` : `<button type="button" data-pick-text="${esc(s.title)}">Cotizar</button>`}</div>
      </li>`;
    }).join("");
  };
  MONTHS.forEach((name, i) => {
    const count = D.seasons.filter((s) => s.m.includes(i)).length;
    const b = h("button", { class: "month", role: "tab", type: "button", "aria-selected": "false", "aria-label": `${name}, ${count} opciones` }, `${name.slice(0, 3)}<small>${count}</small>`);
    b.addEventListener("click", () => { showMonth(i); track("temporada", { mes: i + 1 }); });
    monthsEl.appendChild(b);
  });
  showMonth(new Date().getMonth());

  // ---------- Itinerary ----------
  const it = D.itinerary;
  $("#itin-title").textContent = it.title;
  $("#itin-note").textContent = it.note;
  $("#itin-days").innerHTML = it.days.map((d) => `<li><span class="tl-day">${esc(d.d)}</span><h3>${esc(d.t)}</h3><p>${esc(d.x)}</p></li>`).join("");
  $("#itin-includes").innerHTML = it.includes.map((x) => `<li>${esc(x)}</li>`).join("");

  // ---------- Trip builder ----------
  const form = $("#builder");
  const INTERESTS = ["Cascadas y ríos", "Pueblos mágicos", "Playa", "Comida y bebida", "Naturaleza y bosque", "Cultura y tradiciones", "Descanso", "Adrenalina", "Fotos increíbles", "Fiestas y festivales"];
  const DAYS = ["1 día", "Fin de semana", "3 a 4 días", "5 días o más"];
  const BUDGET = ["Menos de $2,000", "$2,000 a $5,000", "$5,000 a $10,000", "Más de $10,000", "Que me propongan"];

  $("#b-styles").innerHTML = Object.entries(D.styles).map(([k, s]) =>
    `<label class="ocard"><input type="radio" name="estilo" value="${k}"><span style="background-image:url(${img(s.img)})"><b>${esc(s.name)}</b></span></label>`).join("");
  const chips = (el, name, items, type) => { el.innerHTML = items.map((x) => `<label class="chip"><input type="${type}" name="${name}" value="${esc(x)}"><span>${esc(x)}</span></label>`).join(""); };
  chips($("#b-interests"), "intereses", INTERESTS, "checkbox");
  chips($("#b-days"), "dias", DAYS, "radio");
  chips($("#b-budget"), "presupuesto", BUDGET, "radio");
  $("#b-dest-list").innerHTML = D.destinations.map((d) => `<option value="${esc(d.name)}">`).join("");

  const personas = form.elements.personas;
  $("[data-dec]", form).addEventListener("click", () => { personas.value = Math.max(1, (+personas.value || 1) - 1); update(); });
  $("[data-inc]", form).addEventListener("click", () => { personas.value = Math.min(99, (+personas.value || 0) + 1); update(); });

  const steps = $$(".step", form), prog = $$(".progress li", form);
  const back = $("#b-back"), next = $("#b-next"), send = $("#b-send"), err = $("#b-error");
  let cur = 0;
  const go = (n) => {
    cur = Math.max(0, Math.min(steps.length - 1, n));
    steps.forEach((s, i) => (s.hidden = i !== cur));
    prog.forEach((p, i) => { p.classList.toggle("on", i === cur); p.classList.toggle("done", i < cur); });
    back.hidden = cur === 0;
    next.hidden = cur === steps.length - 1;
    send.hidden = cur !== steps.length - 1;
    err.hidden = true;
  };
  next.addEventListener("click", () => {
    if (cur === 0 && !form.elements.estilo.value) { err.textContent = "Elige con quién viajas para seguir."; err.hidden = false; return; }
    track("armador-paso", { paso: cur + 1 });
    go(cur + 1);
    steps[cur].querySelector("input, textarea")?.focus({ preventScroll: true });
  });
  back.addEventListener("click", () => go(cur - 1));

  const tDest = $("#t-dest"), tImg = $("#t-img");
  const findDest = (name) => D.destinations.find((d) => d.name.toLowerCase() === name.trim().toLowerCase());
  const values = () => {
    const f = form.elements;
    return {
      estilo: f.estilo.value, personas: f.personas.value,
      intereses: $$('input[name="intereses"]:checked', form).map((i) => i.value),
      destino: f.destino.value.trim(), fechas: f.fechas.value.trim(), dias: f.dias.value,
      presupuesto: f.presupuesto.value, origen: f.origen.value.trim(), nombre: f.nombre.value.trim(), notas: f.notas.value.trim(),
    };
  };
  function update() {
    const v = values();
    const d = v.destino && findDest(v.destino);
    tDest.textContent = v.destino || "Destino por definir";
    const pic = d ? d.id : v.estilo ? D.styles[v.estilo].img : "dunas";
    if (!tImg.src.endsWith(img(pic))) tImg.src = img(pic);
    $("#t-who").textContent = v.estilo ? `${D.styles[v.estilo].name}, ${v.personas} ${+v.personas === 1 ? "persona" : "personas"}` : "—";
    $("#t-what").textContent = v.intereses.length ? v.intereses.join(", ") : "—";
    $("#t-when").textContent = [v.fechas, v.dias].filter(Boolean).join(" · ") || "—";
    $("#t-budget").textContent = v.presupuesto || "—";
  }
  form.addEventListener("input", update);
  form.addEventListener("change", update);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = values();
    if (!v.nombre) { err.textContent = "Escribe tu nombre para saber a quién responder."; err.hidden = false; form.elements.nombre.focus(); return; }
    const lines = [`Hola, soy ${v.nombre} y quiero armar un viaje con Sijalo.`];
    if (v.estilo) lines.push(`Viaje: ${D.styles[v.estilo].name.toLowerCase()}, ${v.personas} personas`);
    if (v.destino) lines.push(`Destino: ${v.destino}`);
    if (v.intereses.length) lines.push(`Nos late: ${v.intereses.join(", ")}`);
    if (v.fechas) lines.push(`Fechas: ${v.fechas}`);
    if (v.dias) lines.push(`Duración: ${v.dias}`);
    if (v.presupuesto) lines.push(`Presupuesto por persona: ${v.presupuesto}`);
    if (v.origen) lines.push(`Salimos desde: ${v.origen}`);
    if (v.notas) lines.push(`Notas: ${v.notas}`);
    const url = waUrl(lines.join("\n"));
    if (!url) { err.textContent = `Todavía no configuramos el número de WhatsApp. Escríbenos a ${cfg.email || "nuestro correo"}.`; err.hidden = false; return; }
    track("armador-enviar", { estilo: v.estilo || "-", dias: v.dias || "-", presupuesto: v.presupuesto || "-", destino: v.destino ? "si" : "no" });
    window.open(url, "_blank", "noopener");
  });

  // ---------- Global clicks: open destination, prefill builder ----------
  const builder = $("#arma");
  const prefill = ({ dest, style, text }) => {
    if (dest) form.elements.destino.value = destById[dest]?.name || dest;
    if (text) form.elements.destino.value = text;
    if (style) { const r = $(`input[name="estilo"][value="${style}"]`, form); if (r) r.checked = true; }
    update();
    if (dlg.open) dlg.close();
    builder.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); openDest(o.dataset.open); return; }
    const p = e.target.closest("[data-pick], [data-style-pick], [data-pick-text]");
    if (p) { e.preventDefault(); prefill({ dest: p.dataset.pick, style: p.dataset.stylePick, text: p.dataset.pickText }); track("prefill", { from: p.dataset.pick || p.dataset.stylePick || "temporada" }); }
  });

  go(0); update();

  // ---------- Motion: hero slideshow, marquee, card reveal, video reel ----------
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const slides = $$("#hero-slides .slide"), dots = $("#hero-dots");
  const place = $("#hero-place"), to = $("#hero-to");
  const small = window.innerWidth < 900;
  slides.forEach((s) => { dots.appendChild(document.createElement("i")); });
  const dotEls = $$("i", dots);
  let si = 0;
  const loadSlide = (s) => { if (s.dataset.src && !s.src) s.src = img(s.dataset.src, small ? "s" : "l"); };
  const showSlide = (n) => {
    slides[si].classList.remove("on"); dotEls[si].classList.remove("on");
    si = n % slides.length;
    const s = slides[si];
    s.classList.remove("on"); void s.offsetWidth; s.classList.add("on");
    dotEls[si].classList.add("on");
    place.textContent = s.dataset.place;
    to.textContent = s.dataset.to; to.classList.remove("swap"); void to.offsetWidth; to.classList.add("swap");
    loadSlide(slides[(si + 1) % slides.length]);
  };
  dotEls[0].classList.add("on");
  if (!reduce && slides.length > 1) {
    loadSlide(slides[1]);
    let timer = setInterval(() => showSlide(si + 1), 6500);
    document.addEventListener("visibilitychange", () => { clearInterval(timer); if (!document.hidden) timer = setInterval(() => showSlide(si + 1), 6500); });
  }

  const marquee = $("#marquee");
  const names = D.destinations.map((d) => d.name.toUpperCase());
  marquee.innerHTML = [...names, ...names].map((n) => `<span>${esc(n)}</span>`).join("");

  document.documentElement.classList.add("js");
  const cards = $$(".dcard", grid);
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -10% 0px" });
    cards.forEach((c, i) => { c.style.setProperty("--i", i % 3); io.observe(c); });
  } else cards.forEach((c) => c.classList.add("in"));

  const videos = $$(".clip video");
  const attach = (v) => {
    if (v.dataset.ready) return;
    v.innerHTML = `<source src="${v.dataset.src}.mp4" type="video/mp4">`;
    v.dataset.ready = "1"; v.load();
  };
  if ("IntersectionObserver" in window && !reduce) {
    const vo = new IntersectionObserver((entries) => entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { attach(v); v.play().catch(() => {}); } else v.pause();
    }), { threshold: 0.35 });
    videos.forEach((v) => vo.observe(v));
  }
})();
