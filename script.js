document.addEventListener('DOMContentLoaded', () => {
  let fontSizePercent = 100;
  const step = 10;
  const maxPercent = 150;
  const minPercent = 90;

  const html = document.documentElement;
  const btnAumentar = document.getElementById('btn-aumentar-fonte');
  const btnDiminuir = document.getElementById('btn-diminuir-fonte');
  const btnReset = document.getElementById('btn-reset-fonte');
  const btnAltoContraste = document.getElementById('btn-alto-contraste');

  // 1. Aplica o Alto Contraste salvo previamente
  const isAltoContraste = localStorage.getItem('altoContraste') === 'true';
  if (isAltoContraste) {
    document.body.classList.add('alto-contraste');
    if (btnAltoContraste) {
      btnAltoContraste.setAttribute('aria-pressed', 'true');
    }
  }

  // 2. Aplica o Tamanho de Fonte salvo previamente
  const savedFontSize = localStorage.getItem('fontSizePercent');
  if (savedFontSize) {
    fontSizePercent = parseInt(savedFontSize, 10);
    html.style.fontSize = `${fontSizePercent}%`;
  }

  // 3. Evento: Aumentar Fonte
  if (btnAumentar) {
    btnAumentar.addEventListener('click', () => {
      if (fontSizePercent < maxPercent) {
        fontSizePercent += step;
        html.style.fontSize = `${fontSizePercent}%`;
        localStorage.setItem('fontSizePercent', fontSizePercent);
      }
    });
  }

  // 4. Evento: Diminuir Fonte
  if (btnDiminuir) {
    btnDiminuir.addEventListener('click', () => {
      if (fontSizePercent > minPercent) {
        fontSizePercent -= step;
        html.style.fontSize = `${fontSizePercent}%`;
        localStorage.setItem('fontSizePercent', fontSizePercent);
      }
    });
  }

  // 5. Evento: Resetar Fonte
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      fontSizePercent = 100;
      html.style.fontSize = '100%';
      localStorage.setItem('fontSizePercent', fontSizePercent);
    });
  }

  // 6. Evento: Alternar Alto Contraste
  if (btnAltoContraste) {
    btnAltoContraste.addEventListener('click', () => {
      document.body.classList.toggle('alto-contraste');
      const isContrast = document.body.classList.contains('alto-contraste');
      btnAltoContraste.setAttribute('aria-pressed', isContrast);
      localStorage.setItem('altoContraste', isContrast);
    });
  }
});