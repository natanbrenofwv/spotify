// Função para carregar músicas curtidas
function carregarMusicasCurtidas() {
    const musicasCurtidas = JSON.parse(localStorage.getItem("musicasCurtidas")) || [];
    const listaMusicasCurtidas = document.getElementById("musicas-curtidas");

    listaMusicasCurtidas.innerHTML = '';

    if (musicasCurtidas.length === 0) {
        listaMusicasCurtidas.innerHTML = '<p>Nenhuma música curtida.</p>';
        return;
    }

    musicasCurtidas.forEach(musica => {
        const musicaDiv = document.createElement("div");
        musicaDiv.innerHTML = `
            <p>${musica.titulo} - ${musica.artista}</p>
        `;
        listaMusicasCurtidas.appendChild(musicaDiv);
    });
}

// Função para criar uma playlist
function criarPlaylist() {
    const nomePlaylist = prompt("Digite o nome da nova playlist:");

    if (!nomePlaylist) {
        alert("O nome da playlist é obrigatório.");
        return;
    }

    // Recupera as músicas curtidas
    const musicasCurtidas = JSON.parse(localStorage.getItem("musicasCurtidas")) || [];

    if (musicasCurtidas.length === 0) {
        alert("Não há músicas curtidas para adicionar à playlist.");
        return;
    }

    // Permite ao usuário selecionar músicas para a playlist
    const musicasSelecionadas = prompt(
        `Selecione músicas para adicionar à playlist "${nomePlaylist}":\n` +
        musicasCurtidas.map((musica, index) => `${index + 1}. ${musica.titulo}`).join("\n")
    );

    if (!musicasSelecionadas) {
        alert("Nenhuma música selecionada.");
        return;
    }

    // Filtra as músicas selecionadas
    const indicesSelecionados = musicasSelecionadas.split(",").map(num => parseInt(num.trim()) - 1);
    const musicasDaPlaylist = indicesSelecionados
        .filter(index => musicasCurtidas[index]) // Filtra índices válidos
        .map(index => musicasCurtidas[index]);

    if (musicasDaPlaylist.length === 0) {
        alert("Nenhuma música válida foi selecionada.");
        return;
    }

    // Recupera playlists existentes ou inicializa um array vazio
    let playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    // Adiciona a nova playlist ao localStorage
    playlists.push({
        nome: nomePlaylist,
        musicas: musicasDaPlaylist
    });

    localStorage.setItem("playlists", JSON.stringify(playlists));
    alert(`Playlist "${nomePlaylist}" criada com sucesso!`);
    exibirPlaylists();
}

// Função para exibir as playlists
function exibirPlaylists() {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    const playlistsDiv = document.getElementById("playlists");

    playlistsDiv.innerHTML = '';

    if (playlists.length === 0) {
        playlistsDiv.innerHTML = '<p>Você ainda não possui playlists.</p>';
        return;
    }

    playlists.forEach(playlist => {
        const playlistDiv = document.createElement("div");
        playlistDiv.classList.add("playlist");
        playlistDiv.innerHTML = `
            <h4>${playlist.nome}</h4>
            <ul>
                ${playlist.musicas.map(musica => `<li>${musica.titulo} - ${musica.artista}</li>`).join('')}
            </ul>
        `;
        playlistsDiv.appendChild(playlistDiv);
    });
}

// Carrega músicas curtidas e playlists ao abrir a página
window.onload = function () {
    carregarMusicasCurtidas();
    exibirPlaylists();

    // Adiciona evento ao botão de criar playlists
    document.getElementById("criar-playlist").addEventListener("click", criarPlaylist);
};
