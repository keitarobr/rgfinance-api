#!/bin/sh
npm run build
npm run migration:generate --name=$1
npm run build
npm run migration:run 