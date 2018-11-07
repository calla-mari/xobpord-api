#!/bin/bash

API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Authorization: Bearer ${TOKEN}" \
  -F "image=@/Users/zack/wdi/projects/Project 3/third-project-api/data/padawan.png" \
  -F "title=${TITLE}" \
  -F "tag=${TAG}" \

echo
