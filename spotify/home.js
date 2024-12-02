function adicionarMusica() {
  const titulo = document.getElementById("titulo").value;
  const artista = document.getElementById("artista").value;
  const genero = document.getElementById("genero").value;
  const duracao = document.getElementById("duracao").value;
  const link = document.getElementById("link").value;

  if (!titulo || !artista || !genero || !duracao || !link) {
      alert("Por favor, preencha todos os campos.");
      return;
  }

  const musica = {
      id: Date.now(),
      titulo,
      artista,
      genero,
      duracao,
      link
  };

  let catalogoMusicas = JSON.parse(localStorage.getItem("catalogoMusicas")) || [];
  catalogoMusicas.push(musica);
  localStorage.setItem("catalogoMusicas", JSON.stringify(catalogoMusicas));

  document.getElementById("formMusica").reset();
  exibirCatalogo();
}
function exibirCatalogo() {
  const catalogoMusicas = JSON.parse(localStorage.getItem("catalogoMusicas")) || [];
  const catalogoDiv = document.getElementById("catalogoMusicas");

  catalogoDiv.innerHTML = '';

  if (catalogoMusicas.length === 0) {
      catalogoDiv.innerHTML = '<p>Nenhuma música cadastrada.</p>';
      return;
  }

  catalogoMusicas.forEach(musica => {
      const musicaDiv = document.createElement("div");
      musicaDiv.classList.add("musica");

      musicaDiv.innerHTML = `
          <h4>${musica.titulo}</h4>
          <p><strong>Artista:</strong> ${musica.artista}</p>
          <p><strong>Gênero:</strong> ${musica.genero}</p>
          <p><strong>Duração:</strong> ${musica.duracao} minutos</p>
          <p><strong>Link:</strong> <a href="${musica.link}" target="_blank">Ouvir</a></p>
          <button onclick="curtirMusica(${musica.id})">Curtir</button>
          <button onclick="excluirMusica(${musica.id})">Excluir</button>
      `;

      catalogoDiv.appendChild(musicaDiv);
  });
}
function curtirMusica(id) {
  const catalogoMusicas = JSON.parse(localStorage.getItem("catalogoMusicas")) || [];
  const musicasCurtidas = JSON.parse(localStorage.getItem("musicasCurtidas")) || [];

  const musica = catalogoMusicas.find(m => m.id === id);

  if (!musica) {
      alert("Música não encontrada.");
      return;
  }

  if (musicasCurtidas.some(m => m.id === id)) {
      alert("Você já curtiu esta música!");
      return;
  }

  musicasCurtidas.push(musica);
  localStorage.setItem("musicasCurtidas", JSON.stringify(musicasCurtidas));
  alert("Música curtida com sucesso!");
}
function excluirMusica(id) {
  let catalogoMusicas = JSON.parse(localStorage.getItem("catalogoMusicas")) || [];
  catalogoMusicas = catalogoMusicas.filter(musica => musica.id !== id);
  localStorage.setItem("catalogoMusicas", JSON.stringify(catalogoMusicas));
  exibirCatalogo();
}
window.onload = exibirCatalogo;

// Função para converter música para MP3
async function converterParaMP3(linkOriginal) {
  try {
      // Simula a conversão e download (substitua isso por uma chamada à API real)
      alert("Iniciando a conversão para MP3...");

      // Aqui você pode enviar uma requisição para uma API que faça a conversão
      // Exemplo de uma API fictícia
      const response = await fetch(`https://api.conversao.com/convert?url=${encodeURIComponent(linkOriginal)}`);
      if (!response.ok) {
          throw new Error("Erro ao converter a música.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Cria um link para download
      const a = document.createElement("a");
      a.href = url;
      a.download = "musica_convertida.mp3";
      a.click();

      alert("Conversão concluída e música baixada com sucesso!");
  } catch (error) {
      console.error("Erro na conversão:", error);
      alert("Não foi possível converter a música.");
  }
}
const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("audio"), (req, res) => {
    const inputPath = req.file.path;
    const outputPath = `musicas_baixadas/${req.file.originalname}.mp3`;

    ffmpeg(inputPath)
        .toFormat("mp3")
        .on("end", () => {
            res.download(outputPath, () => {
                // Limpa arquivos temporários
                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPath);
            });
        })
        .on("error", (err) => {
            console.error("Erro na conversão:", err);
            res.status(500).send("Erro ao converter o arquivo.");
        })
        .save(outputPath);
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

