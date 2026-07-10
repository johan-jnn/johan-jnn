#!/usr/bin/env sh
# ? See https://github.com/rafamel/yaml-import

if [ ! $(which bun) ];
then
  echo "::error:: Bun not installed, but required to use the .pages.yml builder (npm not supported yet)"
  exit 1
fi

DIRNAME=$(dirname $0)
FILENAME=".pages.built.yml"

if [ -n "$1" ];
then
  FILENAME=$1
fi

tree $DIRNAME

bunx --bun --silent -p yaml-import yimp $DIRNAME/.pages.yml -o $DIRNAME/../$FILENAME
