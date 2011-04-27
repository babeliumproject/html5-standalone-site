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
import util
import string

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

#-------------------------
# Create function bindings

funcmap = dict()

# For each imported plugin
funcmap[box.name] = box

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
        idstr = string.split(name, ":")[1] + str(idcount)
        idcount = idcount + 1
        # print as a div
        util.tabln('<div id="'+idstr+'">', tabindex, outHtmlFile)
        # parse styles
        util.tabln('.'+idstr+'\n{', 0, outCssFile)
        util.parseAttrs(attrs, outCssFile, chromeSupport, firefoxSupport)
        util.tabln("}\n", 0, outCssFile)
    
    # update tab index
    tabindex = tabindex + 1



 
def endElement(name):
    global outHtmlFile, tabindex

    # update tab index
    tabindex = tabindex - 1

    if name in funcmap:
        funcmap[name].end(outHtmlFile, tabindex)
    else:
        util.tabln('</div>', tabindex, outHtmlFile)



    
def charData(data):
    global tabindex, outHtmlFile
    data = data.strip(" \n\t")
    if len(data) > 0:
        util.tabln(data, tabindex, outHtmlFile)

#---------------
# Main Method 

def usage():
    print("""Usage: python main.py [options] [input file]

Options:
---------
    -t --target=<file>  destination directory: default = _out
    -c --chrome         enables chrome support
    -f --firefox        enables firefox support
    -i --input=<file>   set input mxml file: default = input.mxml
    -5 --html5=<file>   set html5 output file: default = out.html
    -3 --css3=<file>    set css3 output file: default = out.css
    -h --help           show usage
""")

def main(argv):
    # Default initialization
    inFileStr = "input.mxml"
    outHtmlFileStr = "out.html"
    outCssFileStr = "out.css"
    outDirStr = "_out"
    global tabindex
    global outHtmlFile
    global outCssFile
    global chromeSupport
    global firefoxSupport

    # Get command line arguments
    try:
        opts, args = getopt.getopt(argv, "hfci53", ["help", "firefox",\
                    "chrome", "input=", "html5=", "css3="])
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
            inFileStr = arg
        elif opt in ("-5", "--html5"):
            outHtmlFileStr = arg
        elif opt in ("-3", "--css3"):
            outCssFileStr = arg 
        elif opt in ("-t", "--target"):
            outDirStr = arg

    if len(args) == 1:
        inFileStr = args[0]

    # Setup parser
    p = xml.parsers.expat.ParserCreate()
    p.StartElementHandler = startElement
    p.EndElementHandler = endElement
    p.CharacterDataHandler = charData

    # Try load input file
    try:
        inputFile = open(inFileStr, "r")
    except:
        print("No such file or directory: input file: " + inFileStr)
        sys.exit(2)

    # Try open output files
    try:
        if not(os.path.isdir(outDirStr)):
            os.mkdir(outDirStr)

        
        outHtmlFile = open(outDirStr+"/"+outHtmlFileStr, "w+")
        outCssFile = open(outDirStr+"/"+outCssFileStr, "w+")
    except:
        print("Output dir does not exist or cannot create output files:"\
                    + outDirStr)
        sys.exit(2)

    # Start parsing
    util.printHeader(outHtmlFile, outCssFileStr)
    p.ParseFile(inputFile)
    util.printFooter(outHtmlFile)


if __name__ == "__main__":
    main(sys.argv[1:])
