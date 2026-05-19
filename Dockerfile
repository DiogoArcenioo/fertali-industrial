FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ["Fertali Industrial.html", "/usr/share/nginx/html/index.html"]
COPY ["styles.css", "app.jsx", "components.jsx", "tweaks-panel.jsx", "/usr/share/nginx/html/"]
COPY assets /usr/share/nginx/html/assets
COPY fonts /usr/share/nginx/html/fonts
COPY uploads /usr/share/nginx/html/uploads

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
