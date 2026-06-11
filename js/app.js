var EX = [
  {name:"Goblet Squat",               focus:"Unterkörper Push", bg:"#DBEAFE", img:"goblet",   desc:"Hantel vor der Brust halten, Füße schulterbreit, tief in die Knie gehen.",                                     tips:["Knie über Zehen drücken","Rücken gerade, Brust hoch","Fersen bleiben am Boden"]},
  {name:"Kurzhantel Bankdrücken",      focus:"Oberkörper Push",  bg:"#FCE7F3", img:"bench",    desc:"Auf Bank liegen, Kurzhanteln auf Brusthöhe, kontrolliert drücken und absenken.",                                tips:["Schulterblätter zusammenziehen","Ellbogen ca. 45° zum Körper","Langsam absenken (3 Sek)"]},
  {name:"Romanian Deadlift",           focus:"Hinge",            bg:"#D1FAE5", img:"rdl",      desc:"Hanteln vor den Oberschenkeln, Hüfte nach hinten schieben, Rücken gerade halten.",                              tips:["Knie leicht gebeugt","Hüfte ist der Motor, nicht der Rücken","Dehnung in der Hamstring spüren"]},
  {name:"Einarmiges Rudern",           focus:"Oberkörper Pull",  bg:"#FEF3C7", img:"row",      desc:"Knie und Hand auf Bank abstützen, Hantel zur Hüfte ziehen.",                                                    tips:["Ellbogen nah am Körper","Schulterblatt am Ende einziehen","Rumpf stabil halten"]},
  {name:"Schulterdrücken",             focus:"Oberkörper Push",  bg:"#FCE7F3", img:"shoulder", desc:"Stehend, Kurzhanteln auf Schulterhöhe, senkrecht nach oben drücken.",                                          tips:["Core anspannen, kein Hohlkreuz","Nicht ganz durchstrecken","Kontrolliert absenken"]},
  {name:"Lat Pulldown / Kabelzug",     focus:"Oberkörper Pull",  bg:"#FEF3C7", img:"lat",      desc:"Breiter Griff, Stange zur Brust ziehen, Ellbogen nach unten-hinten führen.",                                    tips:["Nicht nach hinten lehnen","Latissimus bewusst anspannen","Langsam zurück"]},
  {name:"Farmers Carry",               focus:"Core / HYROX",     bg:"#F3E8FF", img:"farmers",  desc:"Schwere Kurzhanteln in beiden Händen halten und 30m zügig gehen.",                                              tips:["Schultern zurück und unten","Blick geradeaus","Gewicht progressiv steigern"]},
  {name:"Plank / Dead Bug",            focus:"Core",             bg:"#F3E8FF", img:"plank",    desc:"Plank: Unterarme auf dem Boden, Körper gerade. Dead Bug: Rücken flach, Arme und Beine kontrolliert absenken.", tips:["Keine Hüfte hängen lassen","Bauch aktiv anspannen","Gleichmäßig atmen"]}
];

var DAYS = [
  {day:"Mo", label:"Montag",     type:"Kraft",      color:"#E8F4FD", accent:"#2563EB", icon:"💪", dur:"60-75 Min", kind:"workout", note:"Ins Versagen trainieren. Gewicht so wählen, dass nach 8-12 Wdh Schluss ist."},
  {day:"Di", label:"Dienstag",   type:"Lauf",       color:"#FFF7ED", accent:"#EA580C", icon:"🏃", dur:"40-50 Min", kind:"run",     note:"Kerneinheit für Tempoverbesserung. Nicht schneller als angegeben.",
    runs:[{p:"Einlaufen",d:"10 Min bei 6:30-7:00 /km",h:0},{p:"Intervalle",d:"6 x 400m bei ~5:00 /km mit 90 Sek. Trabpause",h:1},{p:"Auslaufen",d:"10 Min locker",h:0}]},
  {day:"Mi", label:"Mittwoch",   type:"Kraft+HIIT", color:"#F0FDF4", accent:"#16A34A", icon:"🔥", dur:"75-90 Min", kind:"hiit",    note:"Gleiche Übungen wie Mo/Fr, plus HIIT-Finish am Ende."},
  {day:"Do", label:"Donnerstag", type:"Erholung",   color:"#FDF4FF", accent:"#9333EA", icon:"🧘", dur:"30-45 Min", kind:"recovery",note:"Kein intensives Training. Recovery ist Teil des Plans.",
    opts:["Lockeres Gehen","Mobility und Stretching","Schwimmen","Bei Zeitmangel: komplett frei"]},
  {day:"Fr", label:"Freitag",    type:"Kraft",      color:"#E8F4FD", accent:"#2563EB", icon:"💪", dur:"60-75 Min", kind:"workout", note:"Ins Versagen trainieren. Gewicht so wählen, dass nach 8-12 Wdh Schluss ist."},
  {day:"Sa", label:"Samstag",    type:"Lauf",       color:"#FFF7ED", accent:"#EA580C", icon:"🏃", dur:"50-60 Min", kind:"run",     note:"Alle 2 Wochen zwischen Option A und B wechseln.",
    runs:[{p:"Option A: Tempolauf",d:"10 Min einlaufen, 25-30 Min bei 5:20-5:30 /km, 10 Min auslaufen",h:1},{p:"Option B: Langer Lauf",d:"8-10 km bei 6:00-6:30 /km, ruhig",h:0}]},
  {day:"So", label:"Sonntag",    type:"Ruhetag",    color:"#F8FAFC", accent:"#94A3B8", icon:"😴", dur:"--",        kind:"rest",    note:"Komplett frei. Kein Training."}
];

var sel = 0;
var openEx = null;
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
  var rows = document.querySelectorAll(".ex-row");
  if (!rows[i]) { return; }
  var right = rows[i].querySelector(".ex-right");
  var badge = right.querySelector(".w-badge");
  if (v !== "") {
    if (badge) { badge.textContent = v + " kg"; }
    else { var s = document.createElement("span"); s.className = "w-badge"; s.textContent = v + " kg"; right.appendChild(s); }
  } else {
    if (badge) { badge.remove(); }
  }
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
    h += '<div class="ex-row' + (isDone ? ' done' : '') + '">';
    h += '<div class="ex-top">';
    h += '<div class="chk-box" onclick="togDone(' + sel + ',\'c' + i + '\')">' + (isDone ? '&#10003;' : '') + '</div>';
    h += '<div class="ex-info" onclick="togEx(' + i + ')">';
    h += '<div class="ex-name">' + ex.name + '</div>';
    h += '<div class="ex-focus">' + ex.focus + '</div>';
    h += '</div>';
    h += '<div class="ex-right" onclick="togEx(' + i + ')">';
    if (wval !== "") { h += '<span class="w-badge">' + wval + ' kg</span>'; }
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
      h += '<span class="w-label">Mein Gewicht</span>';
      h += '<div class="w-group">';
      h += '<input type="number" class="w-input" value="' + wval + '" placeholder="0" min="0" max="999" step="0.5" onclick="event.stopPropagation()" oninput="handleW(' + i + ',this.value)">';
      h += '<span class="w-unit">kg</span>';
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
  if (d.kind === "workout" || d.kind === "hiit") {
    h += '<div class="sec">Aufwärmen</div>';
    h += '<div class="warmup">5-10 Min lockeres Einlaufen oder Bike</div>';
    h += '<div class="sec">Übungen — Abhaken wenn erledigt · Antippen für Details</div>';
    h += renderExRows(d.accent);
    if (d.kind === "hiit") {
      h += '<div class="sec">HIIT-Finish</div>';
      h += '<div class="hiit-box"><div class="hiit-title">4 Runden · 40 Sek an / 20 Sek Pause · 15 Min</div>';
      h += '<div class="hiit-sub">Direkt nach dem Kraftteil</div>';
      h += '<div class="hiit-tags"><span class="hiit-tag">Burpees</span><span class="hiit-tag">Mountain Climbers</span><span class="hiit-tag">Jump Squats</span><span class="hiit-tag">Kettlebell Swing</span></div></div>';
    }
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
function selDay(i) { sel = i; openEx = null; renderTabs(); renderCard(); }

function renderTabs() {
  var h = "";
  for (var i = 0; i < DAYS.length; i++) {
    var d = DAYS[i];
    var active = (i === sel);
    h += '<button class="day-btn" onclick="selDay(' + i + ')" style="border-color:' + (active ? d.accent : 'transparent') + ';background:' + (active ? d.color : '#fff') + ';">';
    h += '<div class="icon">' + d.icon + '</div>';
    h += '<div class="dname" style="color:' + (active ? d.accent : '#374151') + '">' + d.day + '</div>';
    h += '<div class="dtype">' + d.type + '</div>';
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
