#!/bin/bash

echo "URL" > posts.csv

for file in ./posts/*; do
 slug=$(basename "$file" .md)
 echo "https://blog.replit.com/$slug" >> posts.csv
done
