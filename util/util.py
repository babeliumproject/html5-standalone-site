#!/usr/bin/python

from string import *

# Prints a 's' pharagraph with 't' indentation
# index into an 'o' output file
def tabln(s, t, o):
   lines = split(s, '\n')
   for line in lines:
       o.write(('\t'*t)+line+'\n')

# Converts MXML attributes to CSS3
def parseAttrs(attrs, outcss, chrome, firefox):
    if "width" in attrs:
        tabln("width: " + checkLen(attrs["width"]) + ";", 1, outcss)

    if "minWidth" in attrs:
        tabln("min-width: " + checkLen(attrs["minWidth"]) + ";", 1, outcss)

    if "height" in attrs:
        tabln("height: " + checkLen(attrs["height"]) + ";", 1, outcss)


def checkLen(s):
    if s[-1].isdigit():
        return s+"px"
    else:
        return s


def printHeader(out, cssfile):
    out.write("""<!DOCTYPE html> 
<html> 
<head> 
	<meta charset="UTF-8" /> 
	<title>Output Title</title> 
 
	<!-- CSS --> 
	<link rel="stylesheet" type="text/css" media="screen" href=\""""+cssfile+"""\" />
</head>
</body>
<!-- Start of generated content -->

""")

def printFooter(out):
    out.write("""
<!-- End of generated content -->
</body>
</html>""")
