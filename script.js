document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. RECURSOS DE ACESSIBILIDADE
  // ==========================================
  let fontSizePercent = 100;
  const step = 10;
  const maxPercent = 150;
  const minPercent = 90;

  const html = document.documentElement;
  const btnAumentar = document.getElementById('btn-aumentar-fonte');
  const btnDiminuir = document.getElementById('btn-diminuir-fonte');
  const btnReset = document.getElementById('btn-reset-fonte');
  const btnAltoContraste = document.getElementById('btn-alto-contraste');

  // Aplica o Alto Contraste salvo previamente
  const isAltoContraste = localStorage.getItem('altoContraste') === 'true';
  if (isAltoContraste) {
    document.body.classList.add('alto-contraste');
    if (btnAltoContraste) {
      btnAltoContraste.setAttribute('aria-pressed', 'true');
    }
  }

  // Aplica o Tamanho de Fonte salvo previamente
  const savedFontSize = localStorage.getItem('fontSizePercent');
  if (savedFontSize) {
    fontSizePercent = parseInt(savedFontSize, 10);
    html.style.fontSize = `${fontSizePercent}%`;
  }

  // Evento: Aumentar Fonte
  if (btnAumentar) {
    btnAumentar.addEventListener('click', () => {
      if (fontSizePercent < maxPercent) {
        fontSizePercent += step;
        html.style.fontSize = `${fontSizePercent}%`;
        localStorage.setItem('fontSizePercent', fontSizePercent);
      }
    });
  }

  // Evento: Diminuir Fonte
  if (btnDiminuir) {
    btnDiminuir.addEventListener('click', () => {
      if (fontSizePercent > minPercent) {
        fontSizePercent -= step;
        html.style.fontSize = `${fontSizePercent}%`;
        localStorage.setItem('fontSizePercent', fontSizePercent);
      }
    });
  }

  // Evento: Resetar Fonte
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      fontSizePercent = 100;
      html.style.fontSize = '100%';
      localStorage.setItem('fontSizePercent', fontSizePercent);
    });
  }

  // Evento: Alternar Alto Contraste
  if (btnAltoContraste) {
    btnAltoContraste.addEventListener('click', () => {
      document.body.classList.toggle('alto-contraste');
      const isContrast = document.body.classList.contains('alto-contraste');
      btnAltoContraste.setAttribute('aria-pressed', isContrast);
      localStorage.setItem('altoContraste', isContrast);
    });
  }

  // ==========================================
  // 2. FORMULÁRIO + GOOGLE PLANILHAS
  // ==========================================
  const formContato = document.getElementById('form-contato');
  const statusEnvio = document.getElementById('status-envio');
  const btnEnviar = document.getElementById('btn-enviar');

  // URL DO SEU GOOGLE APPS SCRIPT
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwrJrs2w8s44o4v17ecTAQVV5sES_RzhfMCx_QSGMFw8VTJuYF3QN9sQ_1Dv83do4PxAQ/exec';

  if (formContato) {
    formContato.addEventListener('submit', (e) => {
      e.preventDefault();

      if (btnEnviar) {
        btnEnviar.disabled = true;
        btnEnviar.textContent = 'Enviando...';
      }

      if (statusEnvio) {
        statusEnvio.style.display = 'block';
        statusEnvio.style.color = 'var(--text-color)';
        statusEnvio.textContent = 'Enviando sua mensagem, aguarde...';
      }

      const formData = new FormData(formContato);

      fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (statusEnvio) {
          statusEnvio.style.color = '#15803d'; // Verde
          statusEnvio.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
        }
        formContato.reset();
      })
      .catch(error => {
        if (statusEnvio) {
          statusEnvio.style.color = '#dc2626'; // Vermelho
          statusEnvio.textContent = 'Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.';
        }
        console.error('Erro no envio:', error);
      })
      .finally(() => {
        if (btnEnviar) {
          btnEnviar.disabled = false;
          btnEnviar.textContent = 'Enviar Mensagem';
        }
      });
    });
  }
});