# Casa Menina Mulher – Landing Page

Landing page estática para a ONG Casa Menina Mulher, com destaque para formas de doação, carrossel de fotos e modal de conteúdo carregado via `fetch()`. Todo o conteúdo editável fica separado em arquivos simples (HTML/JSON) para manutenção fácil.

## Estrutura rápida
- `index.html` – página principal com header, hero, carrossel, cards de doação, contato e modal.
- `assets/css/style.scss` – ponto de entrada SCSS que importa os módulos em `assets/css/components/`. **Edite aqui e recompile o CSS.**
- `assets/css/style.css` – CSS gerado (não edite manualmente).
- `assets/img/` – imagens e ícones.
- `assets/data/carrossel.json` – itens do carrossel (imagem, título, descrição).
- `assets/data/doacao-financeira.html` e `assets/data/doacao-itens.html` – fragmentos HTML usados pelo modal.

## Requisitos
- Node.js + npm (para compilar o SCSS com `sass`) ou extensão Live SASS no VS Code

## Desenvolvimento (pode pular esse passo se estiver usando live sass)
1) Instale as dependências do Sass (usa o Sass embutido via `npx`, não precisa instalar global):
```bash
npx sass assets/css/style.scss assets/css/style.css --style=compressed --source-map
```
2) Para desenvolver assistindo mudanças:
```bash
npx sass assets/css/style.scss assets/css/style.css --style=compressed --source-map --watch
```
3) Abra `index.html` no navegador (basta clicar/duplo clique ou servir com qualquer servidor estático).

## Como editar conteúdo (leigo-friendly)
- **Doação Financeira:** edite `assets/data/doacao-financeira.html`.
- **Doação de Itens:** edite `assets/data/doacao-itens.html`.
- Salve e recarregue a página; o modal buscará esses arquivos via `fetch()`.

## Carrossel
- Os slides vêm de `assets/data/carrossel.json`.
- Cada item precisa de:
  ```json
  {
    "titulo": "Título do slide",
    "descricao": "Texto curto",
    "imagem": "assets/img/carrossel/arquivo.jpg"
  }
  ```
- Mantenha caminhos de imagem válidos em `assets/img/carrossel/`.

## Modal de doações
- Há um único modal em `index.html` que carrega o arquivo definido em `data-file` do botão clicado.
- Botões configurados:
  - Doação Financeira → `assets/data/doacao-financeira.html`
  - Doação de Itens → `assets/data/doacao-itens.html`

## Deploy
- Por ser estático, basta publicar o conteúdo do diretório em qualquer serviço de hospedagem estática (GitHub Pages, Netlify, Vercel ou servidor próprio).

## Notas de acessibilidade e UX
- Navegação suave para âncoras.
- Modal fecha via X ou clique fora.
- Carrossel pausa no hover e faz loop suave quando há espaço para deslizar.
