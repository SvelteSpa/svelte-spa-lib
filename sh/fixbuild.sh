#!/bin/bash

NAME=$(cat NAME)
[ -n '$NAME' ] || exit

VER=$(cat VER)
[ -n '$VER' ] || exit

# process the dist folder
cd dist || exit

# replace hashes with VER
for ext in js css; do
  for f in assets/*.*.$ext; do
    mv $f ${f%.*.$ext}.$VER.$ext
  done
done

sed -i "s/vendor.\([^\.]*\).js/vendor.$VER.js/g" assets/index.$VER.js

# process index

rm index.html

NAME=$(printf '%q' "$NAME")
VER=$(printf '%q' "$VER")

sed -i "s/\#NAME\#/$NAME/g" index.php
sed -i "s/\#VER\#/$VER/g" index.php

# eof
