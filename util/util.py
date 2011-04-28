#!/usr/bin/python

from string import *

# Prints a 's' pharagraph with 't' indentation
# index into an 'o' output file
def tabln(s, t, o):
   lines = split(s, '\n')
   for line in lines:
       o.write(('\t'*t)+line+'\n')

# 1000 -> 1000px by default
def checkLen(s):
    if s[-1].isdigit() and not(s[0] == "#"):
        return s+"px"
    else:
        return s
