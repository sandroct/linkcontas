import glob, re

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    if 'DOMContentLoaded' in content and 'linkcontas-tema' in content:
        print(f'Já OK: {f}')
        continue
    
    if "var salvo = localStorage.getItem('linkcontas-tema');" not in content:
        print(f'Sem script tema: {f}')
        continue
    
    start_marker = "var salvo = localStorage.getItem('linkcontas-tema');"
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print(f'Não encontrado: {f}')
        continue
    
    script_start = content.rfind('<script>', 0, start_idx)
    if script_start == -1:
        print(f'Sem <script>: {f}')
        continue
    
    script_end = content.find('</script>', start_idx)
    if script_end == -1:
        print(f'Sem </script>: {f}')
        continue
    script_end += len('</script>')
    
    old_script = content[script_start:script_end]
    
    new_script = '''  <script>
    document.addEventListener('DOMContentLoaded', function () {
      var salvo = localStorage.getItem('linkcontas-tema');
      var sistema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
      var tema = salvo || sistema;
      var html = document.documentElement;
      var icone = document.querySelector('.icone-tema');
      function aplicar(t) {
        if (t === 'escuro') { html.setAttribute('data-tema', 'escuro'); if(icone) icone.textContent = '☀'; }
        else { html.removeAttribute('data-tema'); if(icone) icone.textContent = '🌙'; }
      }
      aplicar(tema);
      var btn = document.getElementById('tema-toggle');
      if(btn) btn.addEventListener('click', function () {
        var escuro = html.getAttribute('data-tema') === 'escuro';
        if (escuro) { aplicar('claro'); localStorage.setItem('linkcontas-tema', 'claro'); }
        else { aplicar('escuro'); localStorage.setItem('linkcontas-tema', 'escuro'); }
      });
    });
  </script>'''
    
    content = content.replace(old_script, new_script)
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print(f'Corrigido: {f}')