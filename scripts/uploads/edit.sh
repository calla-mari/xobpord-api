#!/bin/bash

API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  -F "image=@/home/callamari/winhome/wdi/projects/xobpord/Xobpord/data/images/padawan.png" \
  -F "title=${TITLE}" \
  -F "tags[]=${TAG1}" \
  -F "tags[]=${TAG2}"


echo
