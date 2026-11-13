/* =====================================
   LINKCONTAS — Relógio (hora de Brasília)
   Atualiza #relogio-hora e #relogio-data
   ===================================== */
(function () {
  var elHora = document.getElementById('relogio-hora');
  var elData = document.getElementById('relogio-data');
  if (!elHora || !elData) return;
  var meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  function atualizar() {
    var agora = new Date();
    var br = new Date(agora.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    var h = String(br.getHours()).padStart(2, '0');
    var m = String(br.getMinutes()).padStart(2, '0');
    var s = String(br.getSeconds()).padStart(2, '0');
    var d = String(br.getDate()).padStart(2, '0');
    var mes = meses[br.getMonth()];
    var ano = br.getFullYear();
    elHora.textContent = h + ':' + m + ':' + s;
    elData.textContent = d + '/' + mes + '/' + ano;
  }
  atualizar();
  setInterval(atualizar, 1000);
})();
