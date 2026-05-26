function normalizeUrl(value) {
  if (!value) return "";
  const trimmed = String(value).trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withProtocol.replace(/\/+$/, "");
}

const explicitSiteUrl = normalizeUrl(process.env.SITE_URL);
const cloudflarePagesUrl = normalizeUrl(process.env.CF_PAGES_URL);

module.exports = explicitSiteUrl || cloudflarePagesUrl || "http://localhost:8080";
