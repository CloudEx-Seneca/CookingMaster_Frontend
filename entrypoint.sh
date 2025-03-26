#!/bin/sh
echo "window.env = { API_URL: \"$REACT_APP_API_URL\", RECIPE_API_URL: \"$REACT_APP_RECIPE_API_URL\", SHOPLIST_API_URL: \"$REACT_APP_SHOPLIST_API_URL\" };" > /usr/share/nginx/html/env.js
exec "$@"
