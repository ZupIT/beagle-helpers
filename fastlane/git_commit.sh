#!/bin/bash

if [[ -n $(git status --porcelain) ]]; then
    git config user.email 'hernand.azevedo@zup.com.br'
    git config user.name 'Hernand Azevedo'
    git add "$2"
    git commit -sm "$1"
fi