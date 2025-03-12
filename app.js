//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
const amigos = new Set(JSON.parse(localStorage.getItem("amigos")) || []);
const sorteio = JSON.parse(localStorage.getItem("sorteio")) || [];

// Função para mostrar o sorteio da pessoa correta
function mostrarSorteio() {
    const nomePessoa = document.getElementById("nomePessoa").value.trim();
    
    // Valida se o nome foi preenchido
    if (!nomePessoa) {
        alert("Por favor, digite seu nome.");
        return;
    }

    const resultado = document.getElementById("resultado");
    if (!resultado) return;

    resultado.innerHTML = "";  // Limpar o resultado anterior

    // Busca pelo sorteio da pessoa
    const sorteioPessoa = sorteio.find(par => par.startsWith(nomePessoa));

    if (sorteioPessoa) {
        const li = document.createElement("li");
        li.textContent = sorteioPessoa;
        resultado.appendChild(li);
    } else {
        // Caso não tenha encontrado o nome na lista de sorteio
        const li = document.createElement("li");
        li.textContent = "Nome não encontrado no sorteio. Verifique se o nome está correto.";
        resultado.appendChild(li);
    }
}

// Função para sortear os amigos
function sortearAmigo() {
    if (amigos.size < 2) {
        alert("Adicione pelo menos 2 amigos para realizar o sorteio.");
        return;
    }

    const nomes = Array.from(amigos);
    const sorteados = [...nomes];
    let embaralhado = false;

    while (!embaralhado) {
        sorteados.sort(() => Math.random() - 0.5);
        embaralhado = nomes.every((nome, index) => nome !== sorteados[index]);
    }

    localStorage.setItem("sorteio", JSON.stringify(nomes.map((nome, index) => `${nome} → ${sorteados[index]}`)));

    // Agora redireciona para a página de resultado
    window.location.href = "indexdois.html";  // Pode substituir com o link correto da página de resultado
}

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Por favor, digite um nome válido.");
        return;
    }

    if (amigos.has(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    amigos.add(nome);
    localStorage.setItem("amigos", JSON.stringify([...amigos]));
    atualizarLista();
    input.value = "";
}

// Função para atualizar a lista de amigos
function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    if (!lista) return;

    lista.innerHTML = "";

    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

// Limpar o localStorage ao carregar a página inicial (reiniciar os dados)
if (window.location.pathname === "/index.html") {
    window.onload = function() {
        // Limpar as chaves específicas ao carregar a página inicial
        localStorage.removeItem("amigos");
        localStorage.removeItem("sorteio");
    };
}

// Verificar se o sorteio foi realizado na página de resultado
if (window.location.pathname === "/indexdois.html") {
    document.addEventListener("DOMContentLoaded", () => {
        // Limpar o resultado assim que a página for carregada
        const resultado = document.getElementById("resultado");
        if (resultado) {
            resultado.innerHTML = "";
        }
        
        // Verifica se o sorteio já foi feito
        if (sorteio.length === 0) {
            const li = document.createElement("li");
            li.textContent = "Nenhum sorteio realizado. Volte à página inicial e realize o sorteio!";
            if (resultado) resultado.appendChild(li);
        }
    });
}