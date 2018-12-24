#!/bin/sh
if [ -z "$DISPLAY" ]; then
	export DISPLAY=:0
fi
electron electron/main.js $1
