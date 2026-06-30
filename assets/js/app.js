/* ===== PMRR Porto Alegre — interações, mapa e gráficos ===== */
(function () {
  const D = window.PMRR;
  const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const NUM = new Intl.NumberFormat("pt-BR");

  /* ---------- Nav ---------- */
  const nav = document.getElementById("nav");
  const navLinks = document.getElementById("navLinks");
  document.getElementById("navToggle").addEventListener("click", () => navLinks.classList.toggle("is-open"));
  navLinks.addEventListener("click", (e) => { if (e.target.tagName === "A") navLinks.classList.remove("is-open"); });
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll); onScroll();

  /* ---------- Conteúdo dinâmico ---------- */
  // Timeline (etapas)
  document.getElementById("timeline").innerHTML = D.etapas.map(e => `
    <div class="tl-item reveal">
      <div class="tl-item__n">${e.n}</div>
      <h3>${e.titulo}</h3>
      <p>${e.desc}</p>
    </div>`).join("");

  // Critérios
  document.getElementById("criterios-grid").innerHTML = D.criterios.map((c, i) => `
    <article class="criterio reveal">
      <div class="criterio__top"><span class="criterio__icone">${c.icone}</span><span class="criterio__n">${i + 1}</span></div>
      <h4>${c.titulo}</h4>
      <p>${c.desc}</p>
    </article>`).join("");

  // Regiões prioritárias (clicáveis -> abrem o detalhe no mapa)
  document.getElementById("regioes-grid").innerHTML = D.regioes.map(r => `
    <article class="regiao reveal" data-regiao="${r.id}">
      <span class="regiao__badge">${r.setores} setores</span>
      <h4>${r.nome}</h4>
      <p class="regiao__local">${r.local}</p>
      <div class="regiao__nums">
        <div><b data-count="${r.pessoas}">0</b><span>pessoas</span></div>
        <div><b data-count="${r.edificacoes}">0</b><span>edificações</span></div>
      </div>
      <p class="regiao__tipo">${r.processo}</p>
      <span class="regiao__link">Ver detalhes no mapa →</span>
    </article>`).join("");
  document.getElementById("regioes-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".regiao"); if (!card) return;
    document.getElementById("mapa").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => focusRegiao(card.dataset.regiao), 600);
  });

  // Processo participativo
  const P = D.processo;
  document.getElementById("processo-grid").innerHTML = `
    <div class="proc proc--big reveal"><span class="proc__num" data-count="${P.total}">0</span><span class="proc__txt">atividades com as comunidades</span></div>
    <div class="proc reveal"><span class="proc__num" data-count="${P.audiencias}">0</span><span class="proc__txt">audiências públicas</span></div>
    <div class="proc reveal"><span class="proc__num" data-count="${P.oficinas}">0</span><span class="proc__txt">oficinas e reuniões preparatórias</span></div>
    <div class="proc reveal"><span class="proc__num" data-count="${P.caminhadas}">0</span><span class="proc__txt">caminhadas comunitárias e inspeções em campo</span></div>`;

  // Produtos
  document.getElementById("produtos-grid").innerHTML = D.produtos.map(p => `
    <article class="produto reveal">
      <div class="produto__icone">${p.icone}</div>
      <span class="produto__publico">${p.publico}</span>
      <h3>${p.titulo}</h3>
      <p>${p.desc}</p>
    </article>`).join("");

  // Contatos
  document.getElementById("contatos-grid").innerHTML = D.contatos.map(c => `
    <div class="contato reveal">
      <span class="contato__tel">${c.tel}</span>
      <span class="contato__nome">${c.nome}</span>
    </div>`).join("");

  // Materiais
  document.getElementById("materiais-grid").innerHTML = D.materiais.map(m => `
    <a class="material reveal" href="${m.url}" target="_blank" rel="noopener">
      <span class="material__icon">📄</span>
      <span>${m.titulo}<small>Abrir no Google Drive</small></span>
    </a>`).join("");

  // Mapeia bairro -> região
  function regiaoDoBairro(b) {
    if (/Bom Jesus|Jardim Carvalho/.test(b)) return "Região Leste";
    if (/Partenon|Aparício Borges|São José|João Pessoa/.test(b)) return "Região Partenon";
    if (/Santa Rosa/.test(b)) return "Região Norte";
    if (/Marinheiros|Ilha/.test(b)) return "Região das Ilhas";
    return "";
  }

  // Ilustrações animadas (SVG) dos processos perigosos
  const ANIM = {
    inundacao: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Inundação">
      <rect x="23" y="22" width="18" height="24" fill="#e8e2d5"/><polygon points="21,22 32,12 43,22" fill="#b5651d"/>
      <rect x="29" y="30" width="6" height="16" fill="#9bbcd0"/>
      <g class="a-rise"><path d="M0 40 q8 -4 16 0 t16 0 t16 0 t16 0 V64 H0Z" fill="#2f8f9d" opacity=".55"/>
      <path d="M0 46 q8 -4 16 0 t16 0 t16 0 t16 0 V64 H0Z" fill="#1b7a5a" opacity=".7"/></g></svg>`,
    enxurrada: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Enxurrada">
      <polygon points="0,52 64,16 64,64 0,64" fill="#b5651d"/><polygon points="0,60 64,28 64,64 0,64" fill="#8a6d3b"/>
      <g transform="rotate(-28 11 49)"><rect x="6" y="44" width="9" height="7" fill="#e8e2d5"/><polygon points="5,44 10.5,39 16,44" fill="#9c4f2a"/></g>
      <g transform="rotate(-28 22 41)"><rect x="18" y="37" width="8" height="6" fill="#e8e2d5"/><polygon points="17,37 22,32.5 27,37" fill="#9c4f2a"/></g>
      <g class="a-torrent2" stroke-linecap="round" fill="none">
        <line x1="60" y1="13" x2="52" y2="24" stroke="#2f8f9d" stroke-width="2.6"/>
        <line x1="56" y1="18" x2="48" y2="29" stroke="#1b7a5a" stroke-width="2"/>
        <line x1="51" y1="22" x2="43" y2="33" stroke="#3aa6b5" stroke-width="2.4"/>
        <line x1="46" y1="27" x2="38" y2="38" stroke="#2f8f9d" stroke-width="2.6"/>
        <line x1="41" y1="32" x2="33" y2="43" stroke="#1b7a5a" stroke-width="2"/>
        <line x1="36" y1="37" x2="28" y2="48" stroke="#3aa6b5" stroke-width="2.4"/></g></svg>`,
    alagamento: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Alagamento">
      <rect x="2" y="12" width="17" height="34" fill="#d8d0c0"/><rect x="6" y="17" width="4" height="4" fill="#9bbcd0"/><rect x="12" y="17" width="4" height="4" fill="#9bbcd0"/>
      <rect x="45" y="8" width="17" height="38" fill="#cfc7b6"/><rect x="49" y="13" width="4" height="4" fill="#9bbcd0"/><rect x="55" y="13" width="4" height="4" fill="#9bbcd0"/>
      <rect x="0" y="46" width="64" height="18" fill="#b9b2a4"/><rect x="28" y="52" width="9" height="3" fill="#5c5c5c"/>
      <rect x="0" y="47" width="64" height="7" fill="#2f8f9d" opacity=".6"/>
      <g class="a-rain" fill="#2f8f9d"><path d="M14 2 q2 4 0 6 q-2 -2 0 -6Z"/><path d="M24 0 q2 4 0 6 q-2 -2 0 -6Z"/><path d="M34 3 q2 4 0 6 q-2 -2 0 -6Z"/><path d="M44 1 q2 4 0 6 q-2 -2 0 -6Z"/><path d="M54 3 q2 4 0 6 q-2 -2 0 -6Z"/></g></svg>`,
    deslizamento: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Movimento de massa">
      <polygon points="0,64 0,30 40,8 64,8 64,64" fill="#b5651d"/><polygon points="0,64 6,40 40,18 64,28 64,64" fill="#8a6d3b"/>
      <g class="a-slide"><circle cx="26" cy="30" r="4" fill="#5c4326"/><circle cx="34" cy="38" r="3" fill="#43321c"/><rect x="18" y="36" width="6" height="6" rx="1" fill="#5c4326"/></g></svg>`,
    erosao: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Erosão">
      <rect x="0" y="46" width="64" height="18" fill="#2f8f9d" opacity=".6"/>
      <path d="M0 16 H34 V36 C30 40 30 47 18 48 C10 48.6 4 47 0 49 Z" fill="#b5651d"/>
      <rect x="0" y="16" width="34" height="6" fill="#7a9e5a"/>
      <line x1="0" y1="30" x2="33" y2="30" stroke="#9a6b3a" stroke-width="1.5"/>
      <g class="a-wash"><circle cx="22" cy="44" r="2.4" fill="#8a6d3b"/><circle cx="26" cy="50" r="2" fill="#b5651d"/><circle cx="19" cy="52" r="1.6" fill="#8a6d3b"/></g></svg>`
  };

  // Processos perigosos
  document.getElementById("processos-perigosos").innerHTML = D.processosPerigosos.map(p => `
    <article class="perigo reveal">
      <div class="perigo__anim">${ANIM[p.anim] || ""}</div>
      <h4>${p.nome}</h4>
      <p>${p.desc}</p>
    </article>`).join("");

  // Ilustrações animadas das soluções (como cada obra funciona)
  const SOLU_ANIM = {
    escada: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Escada de chuva">
      <path d="M6 16 H22 V28 H34 V40 H46 V52 H58 V58 H6 Z" fill="#cdbfa3"/>
      <g stroke="#2f8f9d" stroke-width="3" opacity=".35"><line x1="6" y1="18" x2="22" y2="18"/><line x1="22" y1="30" x2="34" y2="30"/><line x1="34" y1="42" x2="46" y2="42"/><line x1="46" y1="54" x2="58" y2="54"/></g>
      <g class="s-fall" fill="#2f8f9d"><ellipse cx="22" cy="22" rx="1.7" ry="3.6"/>
      <ellipse cx="34" cy="34" rx="1.7" ry="3.6"/><ellipse cx="46" cy="46" rx="1.7" ry="3.6"/></g></svg>`,
    bacia: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Bacia de amortecimento">
      <path d="M8 16 V44 a8 8 0 0 0 8 8 H48 a8 8 0 0 0 8 -8 V16" fill="none" stroke="#bcae90" stroke-width="5"/>
      <clipPath id="cl-bacia"><path d="M11 18 V44 a5 5 0 0 0 5 5 H48 a5 5 0 0 0 5 -5 V18 Z"/></clipPath>
      <g clip-path="url(#cl-bacia)"><rect class="b-fill" x="8" y="16" width="48" height="36" fill="#2f8f9d" opacity=".75"/></g></svg>`,
    armadilha: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Armadilha de lixo">
      <rect x="0" y="34" width="64" height="18" fill="#2f8f9d" opacity=".5"/>
      <g stroke="#5c5c5c" stroke-width="2.6" stroke-linecap="round"><line x1="44" y1="31" x2="44" y2="55"/><line x1="49" y1="31" x2="49" y2="55"/><line x1="54" y1="31" x2="54" y2="55"/></g>
      <rect x="37" y="40" width="5" height="5" fill="#b5651d"/><circle cx="40" cy="48" r="2.4" fill="#6a994e"/>
      <g class="t-trash"><rect x="2" y="42" width="5" height="5" fill="#8a6d3b"/></g>
      <g class="t-trash2"><circle cx="6" cy="47" r="2.5" fill="#b5651d"/></g></svg>`,
    muro: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Muro de contenção">
      <polygon points="0,64 0,24 38,12 64,12 64,64" fill="#b5651d"/><polygon points="0,64 0,34 30,22 50,32 50,64" fill="#8a6d3b"/>
      <rect x="46" y="32" width="9" height="32" fill="#9a9a9a"/>
      <g class="m-fall"><circle cx="30" cy="28" r="2.6" fill="#5c4326"/><circle cx="38" cy="34" r="2.2" fill="#43321c"/></g></svg>`,
    elevada: `<svg viewBox="0 0 64 64" class="psvg" role="img" aria-label="Moradia elevada">
      <rect x="21" y="34" width="3" height="16" fill="#8a6d3b"/><rect x="40" y="34" width="3" height="16" fill="#8a6d3b"/>
      <rect x="18" y="22" width="28" height="14" fill="#e8e2d5"/><polygon points="16,22 32,12 48,22" fill="#b5651d"/>
      <rect x="29" y="26" width="6" height="10" fill="#9bbcd0"/>
      <g class="a-rise"><path d="M0 50 q8 -3 16 0 t16 0 t16 0 t16 0 V64 H0Z" fill="#2f8f9d" opacity=".7"/></g></svg>`
  };

  // Soluções estruturais
  document.getElementById("solucoes-estruturais").innerHTML = D.solucoesEstruturais.map(s => `
    <article class="solu reveal">
      <div class="solu__anim">${SOLU_ANIM[s.anim] || ""}</div>
      <h4>${s.nome}</h4>
      <p>${s.desc}</p>
    </article>`).join("");

  // Não estruturais
  document.getElementById("solucoes-nao-estruturais").innerHTML =
    D.solucoesNaoEstruturais.map(s => `<li>${s}</li>`).join("");

  // Participação da comunidade
  document.getElementById("participacao-grid").innerHTML = D.participacao.map(p => `
    <div class="particip__item">
      <span class="particip__icone">${p.icone}</span>
      <div><b>${p.titulo}</b><p>${p.desc}</p></div>
    </div>`).join("");

  // Tabela filtrável das 24 medidas
  const filtroRegiao = document.getElementById("filtroRegiao");
  const filtroTipo = document.getElementById("filtroTipo");
  const filtroGrau = document.getElementById("filtroGrau");
  const tbody = document.getElementById("tabelaMedidasBody");
  const tabelaResumo = document.getElementById("tabelaResumo");

  const regioesComMedidas = [...new Set(D.medidas.map(m => regiaoDoBairro(m.bairro)))];
  filtroRegiao.innerHTML = `<option value="">Todas as regiões</option>` +
    regioesComMedidas.map(r => `<option value="${r}">${r}</option>`).join("");

  function renderTabela() {
    const fr = filtroRegiao.value, ft = filtroTipo.value, fg = filtroGrau.value;
    const rows = D.medidas.filter(m =>
      (!fr || regiaoDoBairro(m.bairro) === fr) &&
      (!ft || m.tipo === ft) &&
      (!fg || m.grau === fg)
    ).sort((a, b) => b.custo - a.custo);
    tbody.innerHTML = rows.map(m => `
      <tr>
        <td><span class="dot dot--${m.tipo === 'G' ? 'g' : 'h'}"></span>${m.intervencao}</td>
        <td>${m.local}</td>
        <td><span class="grau grau--${m.grau.toLowerCase()}">${m.grau}</span></td>
        <td class="num">${NUM.format(m.domicilios)}</td>
        <td class="num">${BRL.format(m.custo)}</td>
      </tr>`).join("");
    const totDom = rows.reduce((a, m) => a + m.domicilios, 0);
    const totCusto = rows.reduce((a, m) => a + m.custo, 0);
    tabelaResumo.textContent = `${rows.length} ${rows.length === 1 ? "medida" : "medidas"} · ${NUM.format(totDom)} domicílios · ${BRL.format(totCusto)}`;
  }
  [filtroRegiao, filtroTipo, filtroGrau].forEach(s => s.addEventListener("change", renderTabela));
  renderTabela();

  // Galeria de campo + filtro por área + lightbox
  const galGrid = document.getElementById("galeria-grid");
  if (galGrid) {
    const areas = ["Todas", ...new Set(D.galeria.map(g => g.area))];
    const filtrosEl = document.getElementById("galeria-filtros");
    filtrosEl.innerHTML = areas.map((a, i) =>
      `<button class="gal-btn${i === 0 ? " is-active" : ""}" data-area="${a}">${a}</button>`).join("");
    let visiveis = D.galeria;
    function renderGaleria(area) {
      visiveis = area === "Todas" ? D.galeria : D.galeria.filter(g => g.area === area);
      galGrid.innerHTML = visiveis.map((g, i) => `
        <figure class="foto" data-i="${i}">
          <img src="${g.img}" alt="${g.legenda}" loading="lazy" />
          <figcaption>${g.legenda}<span>${g.area}</span></figcaption>
        </figure>`).join("");
    }
    renderGaleria("Todas");
    filtrosEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".gal-btn"); if (!btn) return;
      filtrosEl.querySelectorAll(".gal-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderGaleria(btn.dataset.area);
    });

    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightboxImg");
    const lbCap = document.getElementById("lightboxCap");
    const openLb = (i) => {
      const g = visiveis[i];
      lbImg.src = g.img; lbImg.alt = g.legenda;
      lbCap.textContent = `${g.legenda} — ${g.area}`;
      lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
    };
    const closeLb = () => { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); lbImg.src = ""; };
    galGrid.addEventListener("click", (e) => {
      const fig = e.target.closest(".foto"); if (fig) openLb(+fig.dataset.i);
    });
    document.getElementById("lightboxClose").addEventListener("click", closeLb);
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });
  }

  // Guia "como agir" (abas por situação)
  const guiaTabs = document.getElementById("guia-tabs");
  const guiaCont = document.getElementById("guia-conteudo");
  if (guiaTabs) {
    guiaTabs.innerHTML = D.guia.map((g, i) =>
      `<button class="guia-tab${i === 0 ? " is-active" : ""}" data-i="${i}"><span>${g.icone}</span>${g.situacao}</button>`).join("");
    const bloco = (titulo, cls, itens) => `
      <div class="guia-col guia-col--${cls}">
        <h4>${titulo}</h4>
        <ul>${itens.map(t => `<li>${t}</li>`).join("")}</ul>
      </div>`;
    function renderGuia(i) {
      const g = D.guia[i];
      guiaCont.innerHTML = bloco("Antes", "antes", g.antes) + bloco("Durante", "durante", g.durante) + bloco("Depois", "depois", g.depois);
    }
    renderGuia(0);
    guiaTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".guia-tab"); if (!btn) return;
      guiaTabs.querySelectorAll(".guia-tab").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderGuia(+btn.dataset.i);
    });
  }

  // Porto Alegre em números
  const c = D.cidade;
  document.getElementById("cidade").innerHTML = `
    <div class="cidade__item"><b>${NUM.format(c.area)} km²</b><span>de área territorial</span></div>
    <div class="cidade__item"><b>${NUM.format(c.populacao)}</b><span>habitantes</span></div>
    <div class="cidade__item"><b>${NUM.format(c.densidade)}</b><span>hab./km²</span></div>
    <p class="cidade__fonte">Porto Alegre — IBGE, 2022</p>`;

  // Equipe
  document.getElementById("equipe-coord").innerHTML = D.equipe.coordenacao.map(n => `<li>${n}</li>`).join("");
  document.getElementById("equipe-univ").innerHTML = D.equipe.universidade.map(n => `<li>${n}</li>`).join("");
  document.getElementById("equipe-pmpa").innerHTML = D.equipe.pmpa.map(n => `<li>${n}</li>`).join("");

  // Footer
  document.getElementById("footerCreditos").textContent =
    `${D.creditos.instituicao} · ${D.creditos.parceria} · ${D.creditos.periodo}.`;

  // Resumo das medidas
  document.getElementById("investimentoTotal").textContent = BRL.format(D.medidasResumo.investimento);
  document.getElementById("custoMedio").textContent = BRL.format(D.medidasResumo.custoMedio);

  /* ---------- Contadores ---------- */
  const semMovimento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function animateCount(el) {
    const dec = el.dataset.decimal ? +el.dataset.decimal : 0;
    const raw = +el.dataset.count;
    const target = dec ? raw / Math.pow(10, dec) : raw;
    const fmt = dec
      ? (v) => v.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec })
      : (v) => NUM.format(Math.round(v));
    if (semMovimento) { el.textContent = fmt(target); return; }
    const dur = 1400, t0 = performance.now();
    function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-visible");
      en.target.querySelectorAll?.("[data-count]").forEach(animateCount);
      if (en.target.matches?.("[data-count]")) animateCount(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll(".reveal, [data-count]").forEach(el => io.observe(el));

  /* ---------- Charts ---------- */
  Chart.defaults.font.family = "Inter, sans-serif";
  Chart.defaults.color = "#4a5b53";
  let chartsBuilt = false;

  function buildCharts() {
    if (chartsBuilt) return; chartsBuilt = true;

    // Tipologia (doughnut)
    new Chart(document.getElementById("chartTipologia"), {
      type: "doughnut",
      data: {
        labels: D.tipologia.map(t => t.tipo),
        datasets: [{ data: D.tipologia.map(t => t.valor), backgroundColor: D.tipologia.map(t => t.cor), borderWidth: 2, borderColor: "#fff" }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: "62%",
        plugins: {
          legend: { position: "bottom", labels: { padding: 16, usePointStyle: true } },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.raw} setores` } }
        }
      }
    });

    // Grau de risco (bar)
    const g = D.sintese.grau;
    new Chart(document.getElementById("chartGrau"), {
      type: "bar",
      data: {
        labels: ["Risco Alto (R3)", "Risco Muito Alto (R4)"],
        datasets: [{ label: "Setores", data: [g.r3.setores, g.r4.setores], backgroundColor: ["#f0a847", "#d73027"], borderRadius: 6 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: {
            label: (c) => ` ${c.raw} setores`,
            afterLabel: (c) => {
              const d = c.dataIndex === 0 ? g.r3 : g.r4;
              return `${NUM.format(d.pessoas)} pessoas · ${NUM.format(d.edificacoes)} edificações`;
            }
          } }
        },
        scales: { y: { beginAtZero: true, grid: { color: "#eef0ec" } }, x: { grid: { display: false } } }
      }
    });

    // Faixas de vulnerabilidade social (IVS) — bar
    const ivsEl = document.getElementById("chartIvs");
    if (ivsEl && D.demografia) {
      const fx = D.demografia.faixas;
      const coresFx = ["#cfe0c4", "#9cc47e", "#e8a317", "#e07a2f", "#d73027"];
      new Chart(ivsEl, {
        type: "bar",
        data: {
          labels: fx.map(f => f.faixa),
          datasets: [{ label: "Setores", data: fx.map(f => f.n), backgroundColor: coresFx, borderRadius: 6 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: {
              label: (c) => ` ${c.raw} setores (${fx[c.dataIndex].pct}%)`,
              afterLabel: (c) => `IVS ${fx[c.dataIndex].intervalo}`
            } }
          },
          scales: { y: { beginAtZero: true, grid: { color: "#eef0ec" } }, x: { grid: { display: false }, ticks: { font: { size: 11 } } } }
        }
      });
    }

    // Investimento por tipo de obra (categoria) — doughnut
    const porCat = {};
    D.medidas.forEach(m => { porCat[m.categoria] = (porCat[m.categoria] || 0) + m.custo; });
    const cats = Object.entries(porCat).sort((a, b) => b[1] - a[1]);
    const coresCat = ["#1b7a5a", "#2f8f9d", "#b5651d", "#6a994e", "#e8a317", "#9b6a9e"];
    new Chart(document.getElementById("chartCategoria"), {
      type: "doughnut",
      data: { labels: cats.map(c => c[0]), datasets: [{ data: cats.map(c => c[1]), backgroundColor: coresCat, borderWidth: 2, borderColor: "#fff" }] },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: "58%",
        plugins: {
          legend: { position: "bottom", labels: { padding: 14, usePointStyle: true, font: { size: 11 } } },
          tooltip: { callbacks: { label: (c) => " " + BRL.format(c.raw) } }
        }
      }
    });

    // Investimento por bairro — horizontal bar
    const porBairro = {};
    D.medidas.forEach(m => {
      const b = m.bairro.split("/")[0].trim().replace("Cel.", "Cel.");
      porBairro[b] = (porBairro[b] || 0) + m.custo;
    });
    const bairros = Object.entries(porBairro).sort((a, b) => b[1] - a[1]);
    new Chart(document.getElementById("chartBairro"), {
      type: "bar",
      data: { labels: bairros.map(b => b[0]), datasets: [{ data: bairros.map(b => b[1]), backgroundColor: "#1b7a5a", borderRadius: 5 }] },
      options: {
        indexAxis: "y", responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => " " + BRL.format(c.raw) } } },
        scales: {
          x: { beginAtZero: true, grid: { color: "#eef0ec" }, ticks: { callback: (v) => "R$ " + (v / 1e6).toFixed(0) + "M" } },
          y: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
      }
    });
  }

  const chartObs = new IntersectionObserver((entries) => {
    if (entries.some(en => en.isIntersecting)) { buildCharts(); chartObs.disconnect(); }
  }, { threshold: 0.1 });
  chartObs.observe(document.getElementById("risco"));
  chartObs.observe(document.getElementById("perfil"));
  chartObs.observe(document.getElementById("acoes"));
  // fallback: garante a construção mesmo com salto direto via menu
  setTimeout(buildCharts, 2500);

  /* ---------- Mapa (Leaflet) — regiões ---------- */
  const map = L.map("map", { scrollWheelZoom: false }).setView([-30.03, -51.19], 11);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO", maxZoom: 19
  }).addTo(map);

  const side = document.getElementById("mapSide");
  function showSide(r) {
    const med = D.medidas.filter(m => regiaoDoBairro(m.bairro) === r.nome).sort((a, b) => b.custo - a.custo);
    const medHtml = med.length ? `
      <p class="map-side__sub">Medidas estruturais nesta região (${med.length})</p>
      <ul class="map-side__med">${med.map(m => `<li><span>${m.intervencao}</span><b>${BRL.format(m.custo)}</b></li>`).join("")}</ul>` : "";
    side.innerHTML = `
      <span class="map-side__id">${r.setores} setores</span>
      <h3>${r.nome}</h3>
      <p class="map-side__bairro">${r.local}</p>
      <div class="map-side__rows">
        <div class="map-side__row"><span>Pessoas em risco</span><b>${NUM.format(r.pessoas)}</b></div>
        <div class="map-side__row"><span>Edificações em risco</span><b>${NUM.format(r.edificacoes)}</b></div>
        <div class="map-side__row"><span>Risco alto (R3)</span><b>${r.r3} setores</b></div>
        <div class="map-side__row"><span>Risco muito alto (R4)</span><b>${r.r4} setores</b></div>
      </div>
      <p class="map-side__proc">${r.processo}</p>
      <p class="map-side__sub">Contexto</p>
      <p class="map-side__ctx">${r.contexto.caracterizacao}</p>
      <p class="map-side__ctx">${r.contexto.fisica}</p>
      <p class="map-side__ctx">${r.contexto.urbano}</p>
      ${medHtml}`;
  }

  // Cores por grau de risco
  function corGrau(grau) { return /Muito/.test(grau) ? "#d73027" : "#f0a847"; }
  function regiaoPorNomeBairro(b) {
    return D.regioes.find(r => r.nome === regiaoDoBairro(b));
  }

  // Legenda
  const legenda = L.control({ position: "bottomleft" });
  legenda.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legenda");
    div.innerHTML = `<span><i style="background:#d73027"></i> Risco Muito Alto (R4)</span><span><i style="background:#f0a847"></i> Risco Alto (R3)</span>`;
    return div;
  };
  legenda.addTo(map);

  const regionLayers = {}; // id -> array de layers
  let setoresLayer = null;
  let todasLayers = []; // {layer, props}

  // número-base do setor (ex.: "109/01-04" -> "109"; "094 (vários)" -> "94")
  const baseSetor = (s) => { const m = String(s).match(/\d+/); return m ? String(parseInt(m[0], 10)) : ""; };
  function medidasDoSetor(setor) {
    const b = baseSetor(setor);
    return D.medidas.filter(m => baseSetor(m.setor) === b);
  }

  // Detalhe de um setor (com as medidas previstas para ele)
  function showSetor(p) {
    const meds = medidasDoSetor(p.setor);
    const medHtml = meds.length ? `
      <p class="map-side__sub">Medidas previstas para este setor</p>
      <ul class="map-side__med">${meds.map(m => `<li><span>${m.intervencao}</span><b>${BRL.format(m.custo)}</b></li>`).join("")}</ul>`
      : `<p class="map-side__ctx">As medidas estruturais detalhadas estão organizadas por setor na seção “Medidas”.</p>`;
    side.innerHTML = `
      <span class="map-side__id">Setor ${p.setor}</span>
      <h3>${p.bairro}</h3>
      <p class="map-side__bairro">${p.grau} risco · ${p.tipo || "processos geo-hidrológicos"}</p>
      <div class="map-side__rows">
        ${p.pessoas != null ? `<div class="map-side__row"><span>Pessoas em risco</span><b>${NUM.format(p.pessoas)}</b></div>` : ""}
        ${p.edif != null ? `<div class="map-side__row"><span>Edificações em risco</span><b>${NUM.format(p.edif)}</b></div>` : ""}
      </div>
      ${medHtml}`;
  }

  fetch("assets/data/setores.geojson")
    .then(res => res.json())
    .then(geo => {
      setoresLayer = L.geoJSON(geo, {
        style: (f) => ({ color: "#7a1f1a", weight: .7, fillColor: corGrau(f.properties.grau), fillOpacity: .55 }),
        onEachFeature: (f, layer) => {
          const p = f.properties;
          const reg = regiaoPorNomeBairro(p.bairro);
          if (reg) (regionLayers[reg.id] = regionLayers[reg.id] || []).push(layer);
          todasLayers.push({ layer, props: p });
          layer.bindPopup(
            `<b>Setor ${p.setor}</b> · ${p.bairro}<br>${p.grau} risco` +
            (p.pessoas != null ? `<br>${NUM.format(p.pessoas)} pessoas · ${NUM.format(p.edif)} edificações` : "")
          );
          layer.on("click", () => showSetor(p));
          layer.on("mouseover", () => layer.setStyle({ fillOpacity: .85, weight: 1.6 }));
          layer.on("mouseout", () => setoresLayer.resetStyle(layer));
        }
      }).addTo(map);
      map.fitBounds(setoresLayer.getBounds(), { padding: [30, 30] });

      // ---- Busca por bairro ou setor ----
      const norm = (s) => (s || "").toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      const input = document.getElementById("mapSearch");
      input && input.addEventListener("input", () => {
        const q = norm(input.value.trim());
        if (!q) { setoresLayer.setStyle(f => ({ fillOpacity: .55, weight: .7 })); map.fitBounds(setoresLayer.getBounds(), { padding: [30, 30] }); return; }
        const hits = todasLayers.filter(({ props }) => norm(props.bairro).includes(q) || baseSetor(props.setor) === q.replace(/\D/g, "") || norm(props.setor).includes(q));
        todasLayers.forEach(({ layer }) => layer.setStyle({ fillOpacity: .12, weight: .5 }));
        hits.forEach(({ layer }) => layer.setStyle({ fillOpacity: .85, weight: 1.8 }).bringToFront());
        if (hits.length) {
          map.fitBounds(L.featureGroup(hits.map(h => h.layer)).getBounds(), { padding: [40, 40], maxZoom: 16 });
          if (hits.length === 1) showSetor(hits[0].props);
        }
      });
    })
    .catch(() => { map.setView([-30.03, -51.19], 11); });

  // Foco em uma região (chamado pelos cards)
  window.focusRegiao = function (id) {
    const reg = D.regioes.find(r => r.id === id); if (!reg) return;
    const layers = regionLayers[id];
    if (layers && layers.length) {
      map.fitBounds(L.featureGroup(layers).getBounds(), { padding: [40, 40], maxZoom: 15 });
    } else {
      map.setView([reg.lat, reg.lng], 13, { animate: true });
    }
    showSide(reg);
  };
})();
