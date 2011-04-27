#!/usr/bin/python

#####################################
# MXML -> HMTL5 Structure migration
#-----------------------------------
# Created for: babeliumproject.com
# Version: 0.1
#####################################

#---------------------------
# Import required libraries

import sys
import os
import getopt
import xml.parsers.expat
from util import tabln, parseAttrs
from string import split, strip, replace

#---------------------------
# Create required variables

tabindex = 0
outHtmlFile = 0
outCssFile = 0
chromeSupport = False
firefoxSupport = False
idcount = 0

#------------------------------------
# Import available structure plugins

import box
#import vbox

#-------------------------
# Create function bindings

funcmap = dict()

# For each imported plugin
funcmap[box.name] = box
funcmap[vbox.name] = vbox

#----------------------------------
# Define handlers for mxml parsing
# 3 handler functions

def startElement(name, attrs):
    global outHtmlFile, outCssFile, tabindex, chromeSupport, firefoxSupport, idcount
    # if plugin exists for that type of token
    if name in funcmap:
        funcmap[name].start(attrs, outHtmlFile, outCssFile, tabindex, chromeSupport, firefoxSupport)
    
    # if plugin does not exist
    else:
        # generate new id
        idstr = split(name, ":")[1] + str(idcount)
        idcount = idcount + 1
        # print as a div
        tabln('<div id="'+idstr+'">', tabindex, outHtmlFile)
        # parse styles
        tabln('.'+idstr+'\n{', 0, outCssFile)
        parseAttrs(attrs, outCssFile, chromeSupport, firefoxSupport)
        tabln("}\n", 0, outCssFile)
    
    # update tab index
    tabindex = tabindex + 1



 
def endElement(name):
    global outHtmlFile, tabindex

    # update tab index
    tabindex = tabindex - 1

    if name in funcmap:
        funcmap[name].end(outHtmlFile, tabindex)
    else:
        tabln('</div>', tabindex, outHtmlFile)



    
def charData(data):
    global tabindex, outHtmlFile
    data = data.strip(" \n\t")
    if len(data) > 0:
        tabln(data, tabindex, outHtmlFile)

#---------------
# Main Method 

def usage():
    print """Usage: python main.py [options]"

Options:
---------
    -t --target=<file>  destination directory: default = _out
    -c --chrome         enables chrome support
    -f --firefox        enables firefox support
    -i --input=<file>   set input mxml file: default = input.mxml
    -5 --html5=<file>   set html5 output file: default = out.html
    -3 --css3=<file>    set css3 output file: default = out.css
    -h --help           show usage
"""

def main(argv):
    # Default initialization
    inFilestr = "input.mxml"
    outDirStr = "_out"
    global tabindex
    global outHtmlFile
    global outCssFile
    global chromeSupport
    global firefoxSupport

    # Get command line arguments
    try:
        opts, args = getopt.getopt(argv, "hfci53", ["help", "firefox", "chrome", "input=", "html5=", "css3="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)

    # Parse command line arguments
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            usage()
            sys.exit()
        elif opt in ('-c', "--chrome"):
            chromeSupport = True
        elif opt in ("-f", "--firefox"):
            firefoxSupport = True
        elif opt in ("-i", "--input"):
            inFilestr = arg
        elif opt in ("-5", "--html5"):
            outHtmlFile = open(arg, "w+")
        elif opt in ("-3", "--css3"):
            outCssFile = open(arg, "w+")
        elif opt in ("-t", "--target"):
            outDirStr = arg

    # Setup parser
    p = xml.parsers.expat.ParserCreate()
    p.StartElementHandler = startElement
    p.EndElementHandler = endElement
    p.CharacterDataHandler = charData

    # Try load input file
    try:
        inputFile = open(inFilestr, "r")
    except:
        print "No such file or directory: input file: ", inFilestr
        sys.exit(2)

    # Try open output files
    try:
        if not(os.path.isdir(outDirStr)):
            os.mkdir(outDirStr)

        if outHtmlFile == 0:
            outHtmlFile = open(outDirStr+"/out.html", "w+")
        if outCssFile == 0:
            outCssFile = open(outDirStr+"/out.css", "w+")
    except:
        print "Output dir does not exist or cannot create output files:" + outDirStr
        sys.exit(2)

    # Start parsing
    p.ParseFile(inputFile)


if __name__ == "__main__":
    main(sys.argv[1:])
