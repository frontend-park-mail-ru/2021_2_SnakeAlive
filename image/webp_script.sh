#!/bin/bash
for file in ./*
do
    # filename=`echo "${file}" | cut -d '.' -f 1`
    my_array=($(echo $file | tr "." "\n"))
    # echo $filename
    # cwebp -q 100 "$file" -o "$filename".webp
    filename=($(echo ${my_array[0]} | tr "/" "\n"))
    cwebp -q 100 "$file" -o "$filename".webp
done











timiryazevskiy_park_3.webp






















