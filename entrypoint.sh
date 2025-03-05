#!/bin/sh
echo "window.env = { API_URL: \"$REACT_APP_API_URL\" };" > /usr/share/nginx/html/env.js
exec "$@"
