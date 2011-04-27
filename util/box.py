#!/usr/bin/python

###################################
# MXML Box -> HTML5
#----------------------------------
# Created for: babeliumproject.com
###################################

# Required function
from util import tabln, parseAttrs

# Variables
name = "s:Group"
box = False
idcount = 0

# Start box
def start(attrs, outhtml, outcss, tabindex, chrome, firefox):
    global idcount
    
    # define box layout
    css(outcss, tabindex, chrome, firefox)
    
    idstr = ""

    # get box id
    if "id" in attrs:
        idstr = attrs['id']
    else:
        idstr = "box"+str(idcount)
        idcount = idcount + 1

    # start new box
    tabln('<div class="box ' + idstr + '">', tabindex, outhtml)
    
    # box style
    tabln('.'+idstr+'\n{', 0, outcss)
    parseAttrs(attrs, outcss, chrome, firefox)
    tabln("}\n", 0, outcss)


# End box
def end(outhtml, tabindex):
    tabln('</div>', tabindex, outhtml)

# Box css layout
def css(outcss, tabindex, chrome, firefox):
    global box
    if not(box):
        box = True

        # block start
        tabln(".box\n{", tabindex, outcss)
        # chrome support
        if chrome:
            tabln("chrome", tabindex+1, outcss)
        # firefox support
        if firefox:
            tabln("firefox", tabindex+1, outcss)
        # standard
        tabln("box", tabindex+1, outcss)
        # end of block
        tabln("}\n", tabindex, outcss)
