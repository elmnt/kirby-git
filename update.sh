#!/bin/bash

git submodule foreach --recursive git checkout master
git submodule foreach --recursive git pull

git add -A
git commit -am "Kirby Update"
git push
