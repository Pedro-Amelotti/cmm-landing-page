# Casa Menina Mulher - Landing Page

Landing page estatica institucional da Casa Menina Mulher.

O projeto foi estruturado para facilitar manutencao de conteudo por arquivo (HTML/JSON) e manter o layout modular em SCSS.

## Visao geral atual

A pagina principal esta em `index.html` e contem:

- Header com menu desktop e mobile
- Hero principal
- Secao Missao
- Secao Norteadores Institucionais
  - Politica de Salvaguarda
  - Plano Municipal de Enfrentamento a Violencia e Exploracao Sexual de Criancas e Adolescentes (Recife)
  - Destaque sutil do ECA (micro-callout de base legal)
  - Grade de ODS 1 a 17 + banner ODS
- Secao Nosso Impacto com contadores animados
- Carrossel de imagens carregado via JSON
- Secao Como Ajudar
- Modal unico com conteudo remoto via `fetch()`
- Secao Nossos Patrocinadores
- Secao Contato
- Footer com menu, CTAs e mapa incorporado

## Stack

- HTML5
- CSS compilado a partir de SCSS (`assets/css/style.scss`)
- JavaScript vanilla (sem framework e sem bundler)

## Estrutura de arquivos

- `index.html`: pagina principal
- `assets/css/style.scss`: entrada de estilos (importa os modulos em `assets/css/components/`)
- `assets/css/style.css`: CSS compilado e usado no site
- `assets/css/components/`: modulos de estilo por secao
- `assets/js/`: scripts de comportamento da pagina
- `assets/data/`: conteudos de modal e dados do carrossel
- `assets/img/`: imagens, logos e icones

## Scripts e comportamentos

### Navegacao e interacao

- `assets/js/scroll.js`
  - Faz scroll suave em links com classe `.scroll-link` usando `data-target`.
- `assets/js/mobile-menu.js`
  - Controla abrir/fechar menu mobile, overlay, estado ARIA e fechamento ao rolar/clicar fora.

### Modal dinamico

- `assets/js/modal.js`
  - Abre modal para botoes `.btn-open-modal`
  - Carrega conteudo externo com `fetch(filePath)`
  - Fecha por botao `X` ou clique no overlay

Arquivos hoje usados no modal:

- `assets/data/doacao-financeira.html`
- `assets/data/doacao-itens.html`
- `assets/data/salvaguarda-reporte.html`

### Impacto e carrosseis

- `assets/js/impact-counters.js`
  - Anima os numeros da secao de impacto quando a secao entra na viewport (IntersectionObserver).
- `assets/js/carrossel.js`
  - Carrega slides de `assets/data/carrossel.json`
  - Monta cards dinamicamente
  - Implementa autoplay, pausa no hover e loop com clones
- `assets/js/colaboradores.js`
  - Controla scroll horizontal dos patrocinadores
  - Mostra/esconde setas por breakpoint e area rolavel

## Como rodar localmente

Importante: como ha `fetch()` para arquivos locais (`assets/data/*.html` e `carrossel.json`), abra com servidor HTTP local. Abrir o `index.html` direto por `file://` pode quebrar modal/carrossel.

### Opcao 1 (Python)

```bash
python -m http.server 5500
```

Depois acesse:

`http://localhost:5500`

### Opcao 2 (Node - sem instalar global)

```bash
npx serve .
```

## Fluxo de estilos (SCSS -> CSS)

Edite os modulos em `assets/css/components/` e/ou `assets/css/style.scss`.

Compile para `assets/css/style.css`:

```bash
npx sass assets/css/style.scss assets/css/style.css --style=compressed --source-map
```

Modo watch:

```bash
npx sass assets/css/style.scss assets/css/style.css --style=compressed --source-map --watch
```

## Guia de manutencao de conteudo

### Secao Norteadores

Edite em `index.html`:

- textos dos cards
- links de leitura (Drive/externos)
- callout do ECA (`.norteadores-eca-link`)

Estilo relacionado:

- `assets/css/components/_norteadores.scss`

### Conteudo dos modais

Edite os arquivos em `assets/data/`:

- `doacao-financeira.html`
- `doacao-itens.html`
- `salvaguarda-reporte.html`

Para apontar um botao para outro conteudo, ajuste o atributo `data-file` no botao correspondente em `index.html`.

### Carrossel principal

Edite `assets/data/carrossel.json`.

Formato esperado por item:

```json
{
  "titulo": "Titulo do slide",
  "descricao": "Descricao curta",
  "imagem": "assets/img/carrossel/arquivo.jpg"
}
```

### Patrocinadores

Cards de patrocinadores estao direto no `index.html` (secao `#colaboradores`) e usam imagens em `assets/img/colaboradores/`.

## Deploy

Projeto 100% estatico.

Pode publicar em:

- GitHub Pages
- Netlify
- Vercel
- Qualquer servidor HTTP estatico

Checklist rapido antes de publicar:

1. Compilar SCSS para atualizar `assets/css/style.css`
2. Validar links externos (Drive, redes, ECA)
3. Testar modal, carrossel e menu mobile
4. Testar responsividade (mobile/desktop)
5. Testar carregamento em ambiente HTTP (nao `file://`)

## Observacoes do estado atual

- Existem arquivos com texto usando encoding inconsistente (mojibake) em alguns conteudos legados de `assets/data/` e em mensagens de erro JS.
- O carrossel JSON atual possui um item repetido (duplicado de "Oficina de Arte Educacao").
- Nao ha `package.json` com scripts de build; os comandos de Sass sao executados manualmente via `npx`.

