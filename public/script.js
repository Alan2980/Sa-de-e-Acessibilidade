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
 
  if (localStorage.getItem('altoContraste') === 'true') {
    document.body.classList.add('alto-contraste');
    btnAltoContraste.setAttribute('aria-pressed', 'true');
  }
 
  const savedFontSize = localStorage.getItem('fontSizePercent');
  if (savedFontSize) {
    fontSizePercent = parseInt(savedFontSize, 10);
    html.style.fontSize = `${fontSizePercent}%`;
  }
 
  btnAumentar.addEventListener('click', () => {
    if (fontSizePercent < maxPercent) {
      fontSizePercent += step;
      html.style.fontSize = `${fontSizePercent}%`;
      localStorage.setItem('fontSizePercent', fontSizePercent);
    }
  });
 
  btnDiminuir.addEventListener('click', () => {
    if (fontSizePercent > minPercent) {
      fontSizePercent -= step;
      html.style.fontSize = `${fontSizePercent}%`;
      localStorage.setItem('fontSizePercent', fontSizePercent);
    }
  });
 
  btnReset.addEventListener('click', () => {
    fontSizePercent = 100;
    html.style.fontSize = '100%';
    localStorage.setItem('fontSizePercent', fontSizePercent);
  });
 
  btnAltoContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    const isContrast = document.body.classList.contains('alto-contraste');
    btnAltoContraste.setAttribute('aria-pressed', isContrast);
    localStorage.setItem('altoContraste', isContrast);
  });
});