async function fazerPergunta() {
  const input = document.getElementById("pergunta");
  const pergunta = input.value.trim();
  if (!pergunta) return;

  // Adiciona pergunta no chat
  adicionarMensagem(pergunta, "pergunta");
  input.value = "";

  // Mostra spinner de carregamento
  const chat = document.getElementById("chat");
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  chat.appendChild(spinner);
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("http://127.0.0.1:8000/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: pergunta })
    });

    const data = await response.json();

    // Remove spinner
    spinner.remove();

    // Adiciona resposta
    adicionarMensagem(data.resposta, "resposta");
  } catch (error) {
    spinner.remove();
    adicionarMensagem("Erro ao conectar com o servidor.", "resposta");
  }
}

function adicionarMensagem(texto, tipo) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.classList.add("mensagem", tipo);
  msg.textContent = texto;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight; // rola para última mensagem
}
