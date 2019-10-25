#!/bin/bash
echo
echo "----------------------------------------------------------------------------------"

curl --verbose \
	--request POST \
	--header 'Content-Type: application/json' \
	--data @testemployeecrawl.json \
	http://13.59.63.33:5001/api/v1/cloud/employee/copy
echo
echo "----------------------------------------------------------------------------------"