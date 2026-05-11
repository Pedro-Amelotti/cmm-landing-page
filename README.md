# Casa Menina Mulher — Eleventy i18n

Landing page estática com internacionalização em build-time usando **Eleventy + Nunjucks**, com três versões:

- `/pt/` (pt-BR)
- `/en/` (English)
- `/de/` (Deutsch)

## Stack

- Eleventy (11ty)
- Nunjucks
- SCSS (Sass CLI)
- JavaScript vanilla
- GitHub Pages (deploy por GitHub Actions)

## Estrutura

```text
.
├── src/
│   ├── _data/
│   │   ├── site.json
│   │   └── locales.json
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk
│   │   └── sections/
│   ├── pt/index.njk
│   ├── en/index.njk
│   ├── de/index.njk
│   ├── index.njk
│   └── assets/
├── .eleventy.js
├── package.json
└── .github/workflows/pages.yml
```

## Instalação e execução local

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

Saída gerada em `_site/`.

## Como funciona i18n

- Todas as strings de interface estão em `src/_data/locales.json`.
- As páginas de idioma usam o mesmo conjunto de seções Nunjucks e apenas trocam `locale`.
- Conteúdos dinâmicos também são por idioma:
  - Modais: `src/assets/data/modals/{pt|en|de}/*.html`
  - Carrossel: `src/assets/data/carrossel/{pt|en|de}.json`

## Adicionar novo idioma

1. Adicione um novo bloco em `src/_data/locales.json`.
2. Crie a página `src/{novo-locale}/index.njk`.
3. Atualize `src/_data/site.json` com o novo locale.
4. Adicione o link no seletor de idioma (`src/_includes/sections/header.njk`).
5. Crie os modais e o JSON do carrossel para o novo locale.
6. Atualize `hreflang` em `src/_includes/layouts/base.njk`.

## GitHub Pages (Project Pages)

Repositório alvo:

- `https://pedro-amelotti.github.io/cmm-landing-page/`

O prefixo é injetado no CI:

- `ELEVENTY_PATH_PREFIX=/cmm-landing-page/`

No ambiente local, o prefixo padrão é `/`.

Configuração necessária no GitHub:

1. `Settings > Pages`
2. `Source: GitHub Actions`

O workflow em `.github/workflows/pages.yml` publica `_site/` automaticamente em push na branch `main`.

## SEO internacional

O layout base já inclui:

- `lang` por idioma
- `title` e `description` traduzidos
- Open Graph e Twitter traduzidos
- `canonical`
- `hreflang` (`pt-BR`, `en`, `de`, `x-default`)

## Observações de manutenção

- Não editar `_site/` manualmente.
- Editar SCSS em `src/assets/css/components/`; o build gera `src/assets/css/style.css`.
- Assets são estáticos e copiados por passthrough do Eleventy.
