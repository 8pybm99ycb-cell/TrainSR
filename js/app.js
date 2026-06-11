var EX = [
  {name:"Ausfallschritte",         focus:"Unterkörper Push",   bg:"#FFF7ED", img:"lunge",       desc:"Aufrecht stehen, großen Schritt nach vorne, hinteres Knie Richtung Boden absenken. Abwechselnd links/rechts.",        tips:["Vorderes Knie über dem Fußgelenk","Oberkörper aufrecht, kein Vorbeugen","Ferse des vorderen Fußes fest am Boden"]},
  {name:"Romanian Deadlift",       focus:"Hinge / Posterior",  bg:"#D1FAE5", img:"rdl",         desc:"Hanteln vor den Oberschenkeln, Hüfte nach hinten schieben, Rücken gerade halten.",                                    tips:["Knie leicht gebeugt","Hüfte ist der Motor, nicht der Rücken","Dehnung in der Hamstring spüren"]},
  {name:"Kurzhantel Bankdrücken",  focus:"Oberkörper Push",    bg:"#FCE7F3", img:"bench",       desc:"Auf Bank liegen, Kurzhanteln auf Brusthöhe, kontrolliert drücken und absenken.",                                      tips:["Schulterblätter zusammenziehen","Ellbogen ca. 45° zum Körper","Langsam absenken (3 Sek)"]},
  {name:"Schulterdrücken",         focus:"Oberkörper Push",    bg:"#FCE7F3", img:"shoulder",    desc:"Stehend, Kurzhanteln auf Schulterhöhe, senkrecht nach oben drücken.",                                                tips:["Core anspannen, kein Hohlkreuz","Nicht ganz durchstrecken","Kontrolliert absenken"]},
  {name:"Einarmiges Rudern",       focus:"Oberkörper Pull",    bg:"#FEF3C7", img:"row",         desc:"Knie und Hand auf Bank abstützen, Hantel zur Hüfte ziehen.",                                                          tips:["Ellbogen nah am Körper","Schulterblatt am Ende einziehen","Rumpf stabil halten"]},
  {name:"Lat Pulldown / Kabelzug", focus:"Oberkörper Pull",    bg:"#FEF3C7", img:"lat",         desc:"Breiter Griff, Stange zur Brust ziehen, Ellbogen nach unten-hinten führen.",                                          tips:["Nicht nach hinten lehnen","Latissimus bewusst anspannen","Langsam zurück"]},
  {name:"Reverse Fly",             focus:"Posteriore Schulter",bg:"#EFF6FF", img:"reverse_fly", desc:"Vorgebeugt stehen (45°), Kurzhanteln hängen vor dem Körper, Arme seitlich bis Schulterhöhe anheben.",                  tips:["Arme leicht gebeugt, keine Rotation","Schulterblätter am höchsten Punkt zusammendrücken","Kontrolliert absenken, kein Schwung"]},
  {name:"Plank / Dead Bug",        focus:"Core",               bg:"#F3E8FF", img:"plank",       desc:"Plank: Unterarme auf dem Boden, Körper gerade. Dead Bug: Rücken flach, Arme und Beine kontrolliert absenken.",        tips:["Keine Hüfte hängen lassen","Bauch aktiv anspannen","Gleichmäßig atmen"], unit:"s", label:"Meine Zeit"}
];

var HIIT_EX = [
  {name:"Burpees",           focus:"Ganzkörper",    desc:"Aus dem Stand in die Liegestützposition springen, Liegestütz, zurückspringen und hochspringen.",          tips:["Hüfte beim Absprung voll strecken","Weich landen, Knie leicht gebeugt","Tempo gleichmäßig halten"]},
  {name:"Mountain Climbers", focus:"Core / Cardio",  desc:"Liegestützposition, Beine abwechselnd explosiv zur Brust ziehen – wie Laufen in der Horizontalen.",       tips:["Hüfte nicht hochziehen","Core die ganze Zeit angespannt","Schultern über den Handgelenken"]},
  {name:"Jump Squats",       focus:"Unterkörper",    desc:"Normale Kniebeuge, am tiefsten Punkt explosiv hochspringen, weich landen und direkt in die nächste Beuge.", tips:["Tief genug in die Knie","Arme beim Absprung mitnehmen","Weich landen, Fersen zuerst"]},
  {name:"Kettlebell Swing",  focus:"Hinge / Cardio", desc:"Kettlebell zwischen den Beinen nach hinten schwingen, Hüfte explosiv nach vorne strecken bis Hüfthöhe.",   tips:["Kraft kommt aus der Hüfte, nicht den Armen","Rücken gerade, kein Rundrücken","Glutes am höchsten Punkt anspannen"]}
];

var DAYS = [
  {day:"Mo", label:"Montag",     type:"Kraft",     color:"#E8F4FD", accent:"#2563EB", icon:"💪", dur:"60-75 Min", kind:"workout",   note:"8-12 Wiederholungen pro Satz bis nah ans Versagen. Gewicht progressiv steigern."},
  {day:"Di", label:"Dienstag",   type:"Intervalle",color:"#FFF7ED", accent:"#EA580C", icon:"🏃", dur:"40-50 Min", kind:"run",       note:"Kerneinheit für Tempoverbesserung. Nicht schneller als angegeben – Qualität vor Quantität.",
    runs:[{p:"Einlaufen",d:"10 Min bei 6:30-7:00 /km",h:0},{p:"Intervalle",d:"6 × 400m bei ~5:00 /km mit 90 Sek. Trabpause",h:1},{p:"Auslaufen",d:"10 Min locker",h:0}]},
  {day:"Mi", label:"Mittwoch",   type:"Kraft",     color:"#E8F4FD", accent:"#2563EB", icon:"💪", dur:"60-75 Min", kind:"workout",   note:"Gleiche Übungen wie Mo und Fr. Gewichte aus der letzten Einheit als Ausgangspunkt nehmen."},
  {day:"Do", label:"Donnerstag", type:"HIIT",      color:"#F0FDF4", accent:"#16A34A", icon:"🔥", dur:"25-30 Min", kind:"hiit_only", note:"Eigenständige HIIT-Einheit – volle Energie, kein Kraftteil davor. 4 Runden durch alle Übungen."},
  {day:"Fr", label:"Freitag",    type:"Kraft",     color:"#E8F4FD", accent:"#2563EB", icon:"💪", dur:"60-75 Min", kind:"workout",   note:"Letzte Krafteinheit der Woche. Alle 2 Wochen Gewichte erhöhen wenn 12 Wdh sauber möglich."},
  {day:"Sa", label:"Samstag",    type:"Langer Lauf",color:"#FFF7ED", accent:"#EA580C", icon:"🏃", dur:"50-65 Min", kind:"run",      note:"Ruhiges Tempo, du solltest dich noch unterhalten können. Ausdauerbasis aufbauen.",
    runs:[{p:"Einlaufen",d:"5-10 Min sehr locker",h:0},{p:"Hauptteil",d:"35-45 Min bei 6:00-6:30 /km – gleichmäßiges Tempo",h:1},{p:"Auslaufen",d:"5 Min gehen + dehnen",h:0}]},
  {day:"So", label:"Sonntag",    type:"Ruhetag",   color:"#F8FAFC", accent:"#94A3B8", icon:"😴", dur:"--",        kind:"rest",      note:"Komplett frei. Erholung ist Bestandteil des Trainings – nicht überspringen."}
];

var sel = (new Date().getDay() + 6) % 7; // 0=Mo … 6=So
var openEx = null;
var openHiit = null;
var deferredPrompt = null;

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(function(){});
}

// Install prompt
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').style.display = 'block';
});

function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function() { deferredPrompt = null; document.getElementById('installBanner').style.display = 'none'; });
}

// ── Storage helpers ──────────────────────────────────────────────────────────

function getW() { try { return JSON.parse(localStorage.getItem("wts") || "{}"); } catch(e) { return {}; } }
function setW(k, v) { var w = getW(); if (v === "") { delete w[k]; } else { w[k] = v; } localStorage.setItem("wts", JSON.stringify(w)); }
function getDone(day) { try { return JSON.parse(localStorage.getItem("done_" + day) || "{}"); } catch(e) { return {}; } }

function todayKey() {
  var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function saveToHistory(day) {
  var done = getDone(day);
  var total = Object.keys(done).length;
  if (total === 0) return;
  try {
    var hist = JSON.parse(localStorage.getItem("history") || "[]");
    var dateKey = todayKey();
    var dayLabel = DAYS[day].label;
    var dayType  = DAYS[day].type;
    // remove existing entry for same day+date if re-saving
    hist = hist.filter(function(e){ return !(e.date === dateKey && e.day === day); });
    hist.push({ date: dateKey, day: day, label: dayLabel, type: dayType, done: total });
    // keep only last 90 days
    var cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 90);
    hist = hist.filter(function(e){ return new Date(e.date) >= cutoff; });
    hist.sort(function(a,b){ return b.date.localeCompare(a.date); });
    localStorage.setItem("history", JSON.stringify(hist));
  } catch(e) {}
}

function togDone(day, key) {
  var d = getDone(day);
  if (d[key]) { delete d[key]; } else { d[key] = 1; }
  localStorage.setItem("done_" + day, JSON.stringify(d));
  saveToHistory(day);
  renderCard();
}

function handleW(i, v) {
  setW("w" + i, v);
  var unit = EX[i].unit || "kg";
  var rows = document.querySelectorAll(".ex-row");
  if (!rows[i]) { return; }
  var right = rows[i].querySelector(".ex-right");
  var badge = right.querySelector(".w-badge");
  if (v !== "") {
    if (badge) { badge.textContent = v + " " + unit; }
    else { var s = document.createElement("span"); s.className = "w-badge"; s.textContent = v + " " + unit; right.appendChild(s); }
  } else {
    if (badge) { badge.remove(); }
  }
}

function getHiit() { try { return JSON.parse(localStorage.getItem("hiit_s") || "{}"); } catch(e) { return {}; } }
function handleHiit(i, v) {
  var h = getHiit(); if (v === "") { delete h["s" + i]; } else { h["s" + i] = v; }
  localStorage.setItem("hiit_s", JSON.stringify(h));
  var rows = document.querySelectorAll(".hiit-ex-row");
  if (!rows[i]) return;
  var badge = rows[i].querySelector(".w-badge");
  if (v !== "") {
    if (badge) { badge.textContent = v + " s"; }
    else { var span = document.createElement("span"); span.className = "w-badge"; span.style.background = "#16A34A"; span.textContent = v + " s"; rows[i].querySelector(".ex-right").appendChild(span); }
  } else { if (badge) badge.remove(); }
}

// ── Export / Import ──────────────────────────────────────────────────────────

function exportData() {
  var data = {
    version: 1,
    exported: new Date().toISOString(),
    weights: getW(),
    history: JSON.parse(localStorage.getItem("history") || "[]"),
    notes: {}
  };
  // collect all done states
  for (var i = 0; i < 7; i++) {
    var done = getDone(i);
    if (Object.keys(done).length) data.notes["done_" + i] = done;
  }
  var blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "trainsr-backup-" + todayKey() + ".json";
  a.click();
}

function importData() {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      try {
        var data = JSON.parse(ev.target.result);
        if (data.weights) localStorage.setItem("wts", JSON.stringify(data.weights));
        if (data.history) localStorage.setItem("history", JSON.stringify(data.history));
        if (data.notes) {
          Object.keys(data.notes).forEach(function(k) {
            localStorage.setItem(k, JSON.stringify(data.notes[k]));
          });
        }
        alert("Import erfolgreich!");
        renderTabs();
        renderCard();
      } catch(err) {
        alert("Fehler beim Import: " + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ── Render helpers ───────────────────────────────────────────────────────────

function renderExRows(accent) {
  var w = getW();
  var done = getDone(sel);
  var h = "";
  for (var i = 0; i < EX.length; i++) {
    var ex = EX[i];
    var isOpen = (openEx === i);
    var isDone = done["c" + i] ? true : false;
    var wval = w["w" + i] || "";
    var unit = ex.unit || "kg";
    var inputLabel = ex.label || "Mein Gewicht";
    h += '<div class="ex-row' + (isDone ? ' done' : '') + '">';
    h += '<div class="ex-top">';
    h += '<div class="chk-box" onclick="togDone(' + sel + ',\'c' + i + '\')">' + (isDone ? '&#10003;' : '') + '</div>';
    h += '<div class="ex-info" onclick="togEx(' + i + ')">';
    h += '<div class="ex-name">' + ex.name + '</div>';
    h += '<div class="ex-focus">' + ex.focus + '</div>';
    h += '</div>';
    h += '<div class="ex-right" onclick="togEx(' + i + ')">';
    if (wval !== "") { h += '<span class="w-badge">' + wval + ' ' + unit + '</span>'; }
    h += '</div>';
    h += '<div class="ex-chev' + (isOpen ? ' open' : '') + '" onclick="togEx(' + i + ')">&#9660;</div>';
    h += '</div>';
    if (isOpen) {
      h += '<div class="ex-detail open">';
      h += '<img src="./assets/' + ex.img + '.jpg" alt="' + ex.name + '">';
      h += '<div class="ex-desc">' + ex.desc + '</div>';
      h += '<div class="ex-tips">';
      for (var t = 0; t < ex.tips.length; t++) { h += '<div class="ex-tip">' + ex.tips[t] + '</div>'; }
      h += '</div>';
      h += '<div class="w-row">';
      h += '<span class="w-label">' + inputLabel + '</span>';
      h += '<div class="w-group">';
      h += '<input type="number" class="w-input" value="' + wval + '" placeholder="0" min="0" max="999" step="' + (unit === 's' ? '5' : '0.5') + '" onclick="event.stopPropagation()" oninput="handleW(' + i + ',this.value)">';
      h += '<span class="w-unit">' + unit + '</span>';
      h += '</div></div>';
      h += '</div>';
    } else {
      h += '<div class="ex-detail"></div>';
    }
    h += '</div>';
  }
  return h;
}

function renderHiitRows() {
  var svals = getHiit();
  var done = getDone(sel);
  var h = "";
  for (var i = 0; i < HIIT_EX.length; i++) {
    var ex = HIIT_EX[i];
    var isOpen = (openHiit === i);
    var isDone = done["h" + i] ? true : false;
    var sval = svals["s" + i] || "";
    h += '<div class="ex-row hiit-ex-row' + (isDone ? ' done' : '') + '">';
    h += '<div class="ex-top">';
    h += '<div class="chk-box" onclick="togDone(' + sel + ',\'h' + i + '\')">' + (isDone ? '&#10003;' : '') + '</div>';
    h += '<div class="ex-info" onclick="togHiit(' + i + ')">';
    h += '<div class="ex-name">' + ex.name + '</div>';
    h += '<div class="ex-focus">' + ex.focus + '</div>';
    h += '</div>';
    h += '<div class="ex-right" onclick="togHiit(' + i + ')">';
    if (sval !== "") { h += '<span class="w-badge" style="background:#16A34A">' + sval + ' s</span>'; }
    h += '</div>';
    h += '<div class="ex-chev' + (isOpen ? ' open' : '') + '" onclick="togHiit(' + i + ')">&#9660;</div>';
    h += '</div>';
    if (isOpen) {
      h += '<div class="ex-detail open">';
      h += '<div class="ex-desc">' + ex.desc + '</div>';
      h += '<div class="ex-tips">';
      for (var t = 0; t < ex.tips.length; t++) { h += '<div class="ex-tip">' + ex.tips[t] + '</div>'; }
      h += '</div>';
      h += '<div class="w-row">';
      h += '<span class="w-label">Arbeitszeit</span>';
      h += '<div class="w-group">';
      h += '<input type="number" class="w-input" value="' + sval + '" placeholder="40" min="5" max="300" step="5" onclick="event.stopPropagation()" oninput="handleHiit(' + i + ',this.value)">';
      h += '<span class="w-unit">s</span>';
      h += '</div></div>';
      h += '</div>';
    } else {
      h += '<div class="ex-detail"></div>';
    }
    h += '</div>';
  }
  return h;
}

function simpleChk(day, key, text) {
  var isDone = getDone(day)[key] ? true : false;
  return '<div class="chk-row' + (isDone ? ' done' : '') + '" onclick="togDone(' + day + ',\'' + key + '\')">' +
    '<div class="chk-box2">' + (isDone ? '&#10003;' : '') + '</div>' +
    '<div class="chk-text">' + text + '</div>' +
    '</div>';
}

function renderCard() {
  var d = DAYS[sel];
  var header = '<div class="card-header" style="background:' + d.color + ';border-bottom:3px solid ' + d.accent + '">';
  header += '<div><div class="card-title">' + d.label + '</div><div class="card-type" style="color:' + d.accent + '">' + d.type + '</div></div>';
  header += '<div><div class="card-icon">' + d.icon + '</div><div class="card-dur">' + d.dur + '</div></div>';
  header += '</div>';
  var h = "";
  if (d.kind === "workout") {
    h += '<div class="sec">Aufwärmen</div>';
    h += '<div class="warmup">5-10 Min lockeres Einlaufen oder Bike</div>';
    h += '<div class="sec">Übungen — Abhaken wenn erledigt · Antippen für Details</div>';
    h += renderExRows(d.accent);
  } else if (d.kind === "hiit_only") {
    h += '<div class="sec">Aufwärmen</div>';
    h += '<div class="warmup">5 Min lockeres Einlaufen oder Jumping Jacks</div>';
    h += '<div class="sec">HIIT · 4 Runden · 20 Sek Pause zwischen Übungen</div>';
    h += '<div class="hiit-box"><div class="hiit-title">Alle 4 Übungen = 1 Runde · 60 Sek Pause nach jeder Runde</div>';
    h += '<div class="hiit-sub">Antippen für Details & eigene Arbeitszeit einstellen</div></div>';
    h += renderHiitRows();
  } else if (d.kind === "run") {
    h += '<div class="sec">Abhaken wenn erledigt</div>';
    h += simpleChk(sel, "warmup", "Einlaufen");
    h += simpleChk(sel, "main", "Haupteinheit abgeschlossen");
    h += simpleChk(sel, "cool", "Auslaufen / Dehnen");
    h += '<div class="sec">Struktur</div>';
    for (var r = 0; r < d.runs.length; r++) {
      var run = d.runs[r];
      h += '<div class="run-row ' + (run.h ? 'run-hi' : 'run-lo') + '">';
      h += '<div class="run-phase" style="color:' + (run.h ? '#EA580C' : '#374151') + '">' + run.p + '</div>';
      h += '<div class="run-detail" style="color:' + (run.h ? '#92400E' : '#6B7280') + '">' + run.d + '</div>';
      h += '</div>';
    }
  } else if (d.kind === "recovery") {
    h += '<div class="sec">Optionen</div>';
    for (var o = 0; o < d.opts.length; o++) { h += '<div class="rec-row">' + d.opts[o] + '</div>'; }
    h += simpleChk(sel, "rec", "Erholungseinheit gemacht");
  } else {
    h += '<div class="rest-c"><div style="font-size:48px;margin-bottom:12px">😴</div>';
    h += '<div style="font-size:18px;font-weight:700;color:#1E293B;margin-bottom:8px">Ruhetag</div>';
    h += '<div style="font-size:14px;color:#64748B">Komplett frei. Kein Training.</div></div>';
  }
  h += '<div class="note">💡 ' + d.note + '</div>';
  document.getElementById("card").innerHTML = header + '<div class="card-body">' + h + '</div>';
}

function togEx(i) { openEx = (openEx === i) ? null : i; renderCard(); }
function togHiit(i) { openHiit = (openHiit === i) ? null : i; renderCard(); }
function selDay(i) { sel = i; openEx = null; openHiit = null; renderTabs(); renderCard(); }

function renderTabs() {
  var today = (new Date().getDay() + 6) % 7;
  var h = "";
  for (var i = 0; i < DAYS.length; i++) {
    var d = DAYS[i];
    var active = (i === sel);
    var isToday = (i === today);
    h += '<button class="day-btn" onclick="selDay(' + i + ')" style="border-color:' + (active ? d.accent : 'transparent') + ';background:' + (active ? d.color : '#fff') + ';">';
    h += '<div class="icon">' + d.icon + '</div>';
    h += '<div class="dname" style="color:' + (active ? d.accent : '#374151') + '">' + d.day + '</div>';
    h += '<div class="dtype">' + d.type + '</div>';
    if (isToday) { h += '<div class="today-dot" style="background:' + d.accent + '"></div>'; }
    h += '</button>';
  }
  document.getElementById("tabs").innerHTML = h;
}

// ── History view ─────────────────────────────────────────────────────────────

function showHistory() {
  var hist = [];
  try { hist = JSON.parse(localStorage.getItem("history") || "[]"); } catch(e) {}
  var overlay = document.getElementById("historyOverlay");
  if (!hist.length) {
    overlay.querySelector(".hist-list").innerHTML = '<p style="color:#94A3B8;text-align:center;padding:32px 0">Noch keine Einträge.<br>Markiere deine ersten Übungen als erledigt!</p>';
  } else {
    var grouped = {};
    hist.forEach(function(e) {
      if (!grouped[e.date]) grouped[e.date] = [];
      grouped[e.date].push(e);
    });
    var h = "";
    Object.keys(grouped).sort(function(a,b){ return b.localeCompare(a); }).forEach(function(date) {
      var d = new Date(date + "T12:00:00");
      var dateStr = d.toLocaleDateString("de-DE", {weekday:"long", day:"numeric", month:"long"});
      h += '<div class="hist-date">' + dateStr + '</div>';
      grouped[date].forEach(function(e) {
        h += '<div class="hist-entry"><span class="hist-label">' + e.label + '</span><span class="hist-type">' + e.type + '</span><span class="hist-done">' + e.done + ' ✓</span></div>';
      });
    });
    overlay.querySelector(".hist-list").innerHTML = h;
  }
  overlay.style.display = "flex";
}

function hideHistory() {
  document.getElementById("historyOverlay").style.display = "none";
}

// ── Init ─────────────────────────────────────────────────────────────────────

renderTabs();
renderCard();
