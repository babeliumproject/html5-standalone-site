#!/usr/bin/python2.7

#-----------------------------------------
# 
# Created for: babeliumproject.com
#-----------------------------------------

import cssutils
import string
import getopt
import sys
import os
from util import tabln, checkLen

#---------------
# Main Method 

def usage():
    print("""Usage: python style2css3.py [options] [input file]

Options:
---------
    -t --target=<file>  destination directory: default = _out
    -c --chrome         enables chrome support
    -f --firefox        enables firefox support
    -i --input=<file>   set input mxml file: default = Main.css
    -l --layout=<file>  set layout output file: default = layout.css
    -s --style=<file>   set style output file: default = style.css
    -h --help           show usage
""")


# Default initialization
inFileStr = "Main.css"
outLayoutFileStr = "layout.css"
outStyleFileStr = "style.css"
outDirStr = "_out"
tabindex = 0
outHtmlFile = 0
outCssFile = 0
chromeSupport = False
firefoxSupport = False

# Get command line arguments
try:
    opts, args = getopt.getopt(sys.argv[1:], "hfcils", ["help", "firefox",\
                "chrome", "input=", "layout=", "style="])
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
    elif opt in ("-l", "--layout"):
        outLayoutFileStr = arg
    elif opt in ("-s", "--style"):
        outStyleFileStr = arg 
    elif opt in ("-t", "--target"):
        outDirStr = arg

if len(args) == 1:
    inFileStr = args[0]

# Try open output files
try:
    if not(os.path.isdir(outDirStr)):
        os.mkdir(outDirStr)
    
    outLayoutFile = open(outDirStr+"/"+outLayoutFileStr, "w+")
    outStyleFile = open(outDirStr+"/"+outStyleFileStr, "w+")
except:
    print("Output dir does not exist or cannot create output files: "\
                + outDirStr + ", " + outLayoutFileStr + ", " + outStyleFileStr)
    sys.exit(2)

# Parse input file
cssutils.log.setLevel(100)
css = cssutils.parseFile(inFileStr)

#--------------------------------------------------------------
# Atribute binding
#--------------------------------------------------------------

layoutAttrMap = dict()
styleAttrMap = dict() 
nonStandardAttrMap = dict() # non-standard css3
otherAttrMap = dict() # Over and Down
notSupported = list() # Dont repeat warning messages
overlist = list() # on mouse over style

# fastmap functions
def lm(s,y):
    layoutAttrMap[s] = y

def sm(s,y):
    styleAttrMap[s] = y

def nsm(s,y):
    nonStandardAttrMap[s] = y

def om(s,y):
    otherAttrMap[s] = y

# Attributes

lm("verticalalign", "vertical-align")

lm("paddingtop", "padding-top")
lm("paddingbottom", "padding-bottom")
lm("paddingleft", "padding-left")
lm("paddingright", "padding-right")

sm("fontfamily", "font-family")
sm("fontsize", "font-size")
sm("fontweight", "font-weight")
sm("color", "color")

sm("backgroundcolor", "background-color")
om("backgroundimage", "background-image") #Embed() -> url()
sm("backgroundimagefillmode", "background-repeat")
om("backgroundalpha", "alpha")
om("alpha", "alpha")

sm("borderweight", "border-width")
sm("borderstyle", "border-style")
sm("bordercolor", "border-color")
nsm("cornerradius", "border-radius") # chrome and firefox support needed
om("bordercolors", "border-color")

om("colorover", "") # :hover and :focus needed
om("underlineover", "") # same

#-------------------------------------------------------------------
# Converts MXML attributes to CSS3
#-------------------------------------------------------------------

for rule in css:
    if rule.type == rule.STYLE_RULE:

        overlist = list() # reset list

        tabln(rule.selectorText+"\n{", 0, outLayoutFile)
        tabln(rule.selectorText+"\n{", 0, outStyleFile)        

        for p in rule.style:
            k = p.name
            v = p.value

            if k in layoutAttrMap:
                tabln(layoutAttrMap[k]+": "+checkLen(v)+";", 1, outLayoutFile)
            elif k in styleAttrMap:
                tabln(styleAttrMap[k]+": "+checkLen(v)+";", 1, outStyleFile)
            elif k in nonStandardAttrMap:
                if chromeSupport:
                    tabln("-webkit-"+nonStandardAttrMap[k]+": "+checkLen(v)+";", 1, outStyleFile)
                if firefoxSupport:
                    tabln("-moz-"+nonStandardAttrMap[k]+": "+checkLen(v)+";", 1, outStyleFile)
                tabln(nonStandardAttrMap[k]+": "+checkLen(v)+";", 1, outStyleFile)
            elif k in otherAttrMap:
                if k == "colorover":
                    overlist.append("color: "+v+";")
                elif k == "underlineover" and string.lower(v) == "true":
                    overlist.append("text-decoration: underline;")
                else:
                    print("Warnning: " + k + " is not supported yet")
            elif k not in notSupported:
                print("Warnning: " + k + " is not supported")
                notSupported.append(k)

        # end of style
        tabln("}\n", 0, outLayoutFile)
        tabln("}\n", 0, outStyleFile)

        # on mouse over style
        if len(overlist) > 0:
            tabln(rule.selectorText+":hover\n{", 0, outStyleFile)
            for s in overlist:
                tabln(s, 1, outStyleFile)
            tabln("}\n", 0, outStyleFile)

        

#--------------------------------------------------------------------
# Parses special attributes

def parseOthers(k,v):
    return

