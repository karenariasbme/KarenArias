// Menú móvil
var burger = document.getElementById('burger');
burger.addEventListener('click', function(){
  var open = document.getElementById('navLinks').classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

// Sub-pestañas de Certificaciones (Certificaciones / Estudio / Idiomas / Enfoque)
document.querySelectorAll('.subtab-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var group = btn.closest('.wrap');
    var target = btn.getAttribute('data-subtab');
    group.querySelectorAll('.subtab-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    group.querySelectorAll('.subtab-panel').forEach(function(p){
      p.hidden = (p.getAttribute('data-panel') !== target);
    });
  });
});

// Generar trazo ECG (una franja de "cycles" latidos, se repite dos veces para loop continuo)
function buildECG(cycles, cycleWidth, baseline){
  var d = 'M0,' + baseline;
  for (var i = 0; i < cycles; i++){
    var x0 = i * cycleWidth;
    d += ' L' + (x0+40) + ',' + baseline;
    d += ' L' + (x0+55) + ',' + (baseline-10);
    d += ' L' + (x0+70) + ',' + baseline;
    d += ' L' + (x0+95) + ',' + baseline;
    d += ' L' + (x0+105) + ',' + (baseline+8);
    d += ' L' + (x0+113) + ',' + (baseline-45);
    d += ' L' + (x0+121) + ',' + (baseline+45);
    d += ' L' + (x0+130) + ',' + baseline;
    d += ' L' + (x0+160) + ',' + baseline;
    d += ' L' + (x0+180) + ',' + (baseline-15);
    d += ' L' + (x0+200) + ',' + baseline;
    d += ' L' + (x0+cycleWidth) + ',' + baseline;
  }
  return d;
}

var cycles = 4, cw = 300, baseline = 38, totalWidth = cycles*cw;
var d = buildECG(cycles, cw, baseline);
var svgNS = 'http://www.w3.org/2000/svg';

function makeSVG(){
  var svg = document.createElementNS(svgNS,'svg');
  svg.setAttribute('viewBox','0 0 ' + totalWidth + ' 76');
  svg.setAttribute('preserveAspectRatio','none');
  var path = document.createElementNS(svgNS,'path');
  path.setAttribute('d', d);
  path.setAttribute('class','ecg-path');
  svg.appendChild(path);
  return svg;
}

var track = document.getElementById('ecgTrack');
if (track){
  track.appendChild(makeSVG());
  track.appendChild(makeSVG());
}
