# Casa Menina Mulher - Eleventy i18n

Landing page estatica com internacionalizacao em build-time usando **Eleventy + Nunjucks**, com tres versoes:

- `/pt/` (pt-BR)
- `/en/` (English)
- `/de/` (Deutsch)

## Stack

- Eleventy (11ty)
- Nunjucks
- SCSS (Sass CLI)
- JavaScript vanilla
- Cloudflare Pages

## Estrutura

```text
.
|-- src/
|   |-- _data/
|   |   |-- site.json
|   |   |-- siteBaseUrl.js
|   |   `-- locales.json
|   |-- _includes/
|   |   |-- layouts/
|   |   |   `-- base.njk
|   |   `-- sections/
|   |-- pt/index.njk
|   |-- en/index.njk
|   |-- de/index.njk
|   |-- index.njk
|   `-- assets/
|-- .eleventy.js
|-- wrangler.jsonc
`-- package.json
```

## Instalacao e execucao local

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
```

Saida gerada em `_site/`.

## Como funciona i18n

- Todas as strings de interface estao em `src/_data/locales.json`.
- As paginas de idioma usam o mesmo conjunto de secoes Nunjucks e apenas trocam `locale`.
- Conteudos dinamicos tambem sao por idioma:
- Modais: `src/assets/data/modals/{pt|en|de}/*.html`
- Carrossel: `src/assets/data/carrossel/{pt|en|de}.json`

## Adicionar novo idioma

1. Adicione um novo bloco em `src/_data/locales.json`.
2. Crie a pagina `src/{novo-locale}/index.njk`.
3. Atualize `src/_data/site.json` com o novo locale.
4. Adicione o link no seletor de idioma (`src/_includes/sections/header.njk`).
5. Crie os modais e o JSON do carrossel para o novo locale.
6. Atualize `hreflang` em `src/_includes/layouts/base.njk`.

## Cloudflare Pages

Deploy recomendado:

- Build command: `npm run build`
- Build output directory: `_site`

Variaveis de ambiente:

- `SITE_URL` (recomendado em producao): dominio canonico completo, por exemplo `https://seu-dominio.com`
- `CF_PAGES_URL` (fallback automatico): usado quando `SITE_URL` nao estiver definido

Resolucao de URL base para SEO:

1. Usa `SITE_URL` quando definido.
2. Senao, usa `CF_PAGES_URL`.
3. Senao, fallback local para `http://localhost:8080`.

## SEO internacional

O layout base inclui:

- `lang` por idioma
- `title` e `description` traduzidos
- Open Graph e Twitter traduzidos
- `canonical`
- `hreflang` (`pt-BR`, `en`, `de`, `x-default`)

## Observacoes de manutencao

- Nao editar `_site/` manualmente.
- Editar SCSS em `src/assets/css/components/`; o build gera `src/assets/css/style.css`.
- Assets sao estaticos e copiados por passthrough do Eleventy.
