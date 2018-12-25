#!/bin/sh

cp server/utils/US.yaml node_modules/date-holidays/data/countries/

npm run build:holidays
