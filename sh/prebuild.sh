#!/bin/bash

NAME=$(cat NAME)
[ -n '$NAME' ] || exit

VER=$(cat VER)
[ -n '$VER' ] || exit

echo -e "export let name = '$NAME'\nexport let ver = '$VER'\n" > .manifest.ts
