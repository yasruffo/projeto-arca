/* ============================================================
   PROGRAMA ARCA — script.js
   Prefeitura Municipal da Serra / ES
   ============================================================ */

/* ----------------------------------------------------------
   ESTADO DA APLICAÇÃO
   ---------------------------------------------------------- */
let isLoggedIn = false;

/* ----------------------------------------------------------
   NAVEGAÇÃO ENTRE PÁGINAS
   Todas as "telas" do site são divs com a classe .page.
   Apenas a que tiver .active fica visível.
   ---------------------------------------------------------- */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

/* ----------------------------------------------------------
   TELAS DE SUCESSO
   ---------------------------------------------------------- */
function showSuccess(pageId) {
  showPage(pageId);
}

/* ----------------------------------------------------------
   LOGIN / LOGOUT
   ---------------------------------------------------------- */
function doLogin() {
  isLoggedIn = true;
  updateAllNavs();
  showPage('page-home');
}

function logout() {
  isLoggedIn = false;
  updateAllNavs();
  showPage('page-home');
}

/* Atualiza dinamicamente os botões de nav em todas as páginas
   conforme o estado de autenticação */
function updateAllNavs() {
  const loginBtns    = document.querySelectorAll('.nav-btn.btn-entrar');
  const cadastroBtns = document.querySelectorAll('.nav-btn.btn-cadastrar');
  const sairBtns     = document.querySelectorAll('.nav-btn.btn-sair');

  if (isLoggedIn) {
    loginBtns.forEach(b    => b.style.display = 'none');
    cadastroBtns.forEach(b => b.style.display = 'none');
    sairBtns.forEach(b     => b.style.display = 'inline-flex');
  } else {
    loginBtns.forEach(b    => b.style.display = '');
    cadastroBtns.forEach(b => b.style.display = '');
    sairBtns.forEach(b     => b.style.display = 'none');
  }
}

/* ----------------------------------------------------------
   UPLOAD DE DOCUMENTOS (Agendamento step 2)
   Permite clicar nas caixas para simular seleção de arquivo.
   ---------------------------------------------------------- */
function initUploadBoxes() {
  document.querySelectorAll('.upload-box').forEach(box => {
    box.addEventListener('click', () => {
      // Cria um input file temporário e o "clica"
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,.pdf';
      input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;

        // Mostra nome do arquivo na caixa
        const span = box.querySelector('span');
        const originalText = span.textContent;
        span.textContent = '✅ ' + file.name;
        span.dataset.original = originalText;

        // Marca visualmente como enviado
        box.style.borderColor = 'var(--verde-medio)';
        box.style.background  = 'var(--bege-claro)';
      };
      input.click();
    });
  });
}

/* ----------------------------------------------------------
   INICIALIZAÇÃO
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Esconde botões "Sair" no estado inicial (não logado)
  updateAllNavs();

  // Ativa o upload interativo
  initUploadBoxes();
});
