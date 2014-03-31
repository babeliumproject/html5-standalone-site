This repository is the code for [Babelium's][] HTML5 standalone site.

[Babelium's]: http://babeliumproject.com

Here you will find the latest version of the HTML5 site.

The site is currently available in 3 languages: English, Spanish and Basque.

Cloning the repository
----------------------
To run the development version of Babelium HTML5 site first clone the git repository.

	$ git clone git://github.com/babeliumproject/html5-standalone-site.git babelium-html5-standalone-site

Now the project should be in the `babelium-html5-standalone-site/` directory.


Building the HTML5 standalone site
-------------------------------------
Fill the `build.properties` file for the HTML5 site:

	$ cd babelium-html5-standalone-site
	$ cp build.properties.template build.properties
	$ vi build.properties

Ant builds the project automatically performing several js optimization tasks along the way

	$ ant

The built files are placed in the `dist` folder.

Copy the HTML5 site files to the target directory

	$ cd babelium-html5-standalone-site/dist
	$ cp * <target_directory>/


MXML to HTML5 guidelines
------------------------
MXML to HTML5 elements and attribute bindings.

- [Style template](#style-template)
	- [Box / Group](#box--group)
	- [HBox / HGroup](#hbox--hgroup)
	- [VBox / VGroup](#vbox--vgroup)
	- [Box element's alignment](#box-elements-alignment)
- [Flex components](#flex-components)
	- [MX components](#mx-components)
		- [BorderContainer](#bordercontainer)
		- [LinkButton](#linkbutton)
	- [Spark components](#spark-components)
		- [Group](#group)
		- [HGroup](#hgroup)
		- [VGroup](#vgroup)
- [Stylesheet](#stylesheet)
	- [Attributes](#attributes)
	- [Mouse event selectors](#mouse-event-selectors)
- [More information](#more-information)

##Style template

###Box / Group

```css
.box, .hbox, .vbox {
	display: -webkit-box;
	-webkit-box-align: stretch;

	display: -moz-box;
	-moz-box-align: stretch;
 
	display: box;
	box-align: stretch;
}
```

###HBox / HGroup

```css
.hbox {
	-webkit-box-orient: horizontal;
	-moz-box-orient: horizontal;
	box-orient: horizontal;
}
 
.hbox > * {
	-webkit-box-flex: 0;
	-moz-box-flex: 0;
	box-flex: 0;
	display: block;
}
```

**Problems:** Firefox does not display it as a horizontal box if the cointainer is floating.

###VBox / VGroup

```css
.vbox {
	-webkit-box-orient: vertical;
	-moz-box-orient: vertical;
	box-orient: vertical;
}
 
.vbox > * {
	-webkit-box-flex: 0;
	-moz-box-flex: 0;
	box-flex: 0;
	display: block;
}
```

###Box element's alignment

Align to the left, centered or to the right of box.

```css
.start {
	-webkit-box-pack: start;
	-moz-box-pack: start;
	box-pack: start;
}
 
.end {
	-webkit-box-pack: end;
	-moz-box-pack: end;
	box-pack: end;
}
 
.center {
	-webkit-box-pack: center;
	-moz-box-pack: center;
	box-pack: center;
}
```

##Flex Components

###MX Components

####BorderCointainer

Containers are just like html layers.

```html
<element></element>
```

####Link Button

```html
<a href="#" onClick="javascript:xxx()">Label</a>
```

###Spark Components

####Group

```html
<element class="box"></element>
```

####HGroup

```html
<element class="hbox"></element>
```

####VGroup

```html
<element class="vbox"></element>
```

##Stylesheet

###Attributes

<table>
 <tr><th><strong>MXML</strong></th><th><strong>CSS</strong></th><th><strong>Comments</strong></th><th><strong>Chrome</strong></th><th><strong>Firefox</strong></th></tr>
 <tr><td> backgroundAlpha </td><td> background-color: rgba(x,y,z, a) </td><td> Not supported yet </td><td> </td><td> </td></tr>
 <tr><td> backgroundColor </td><td> background-color </td><td> </td><td> </td><td> </td></tr>
 <tr><td> backgroundImage </td><td> background-image </td><td> Embed() -> url() </td><td> </td><td> </td></tr>
 <tr><td> backgroundImageFillMode </td><td> background-repeat </td><td> </td><td> </td><td> </td></tr>
 <tr><td> borderColor </td><td> border-color </td><td> </td><td> </td><td> </td></tr>
 <tr><td> cornerRadius </td><td> border-radius </td><td> </td><td> -webkit- </td><td> -moz- </td></tr>
 <tr><td> borderSides </td><td> - </td><td> not supported </td><td> </td><td> </td></tr>
 <tr><td> borderSize </td><td> border-width </td><td> </td><td> </td><td> </td></tr>
 <tr><td> borderStyle </td><td> border-style </td><td> </td><td> </td><td> </td></tr>
 <tr><td> borderVisible </td><td> - </td><td> if false, set border: none; </td><td> </td><td> </td><td> </td></tr>
 <tr><td> borderWeight </td><td> border-width </td><td> </td><td> </td><td> </td></tr>
 <tr><td> color </td><td> color </td><td> </td><td> </td><td> </td></tr>
 <tr><td> fontFamily </td><td> font-family </td><td> </td><td> </td><td> </td></tr>
 <tr><td> fontSize </td><td> font-size </td><td> </td><td> </td><td> </td></tr>
 <tr><td> fontWeight </td><td> font-weight </td><td> </td><td> </td><td> </td></tr>
 <tr><td> height </td><td> height </td><td> </td><td> </td><td> </td></tr>
 <tr><td> minHeight </td><td> min-height </td><td> </td><td> </td><td> </td></tr>
 <tr><td> minWidth </td><td> min-width </td><td> </td><td> </td><td> </td></tr>
 <tr><td> paddingBottom </td><td> padding-bottom </td><td> </td><td> </td><td> </td></tr>
 <tr><td> paddingLeft </td><td> padding-left </td><td> </td><td> </td><td> </td></tr>
 <tr><td> paddingRight </td><td> padding-right </td><td> </td><td> </td><td> </td></tr>
 <tr><td> paddingTop </td><td> padding-top </td><td> </td><td> </td><td> </td></tr>
 <tr><td> roundedBottomCorners </td><td> - </td><td> False is not supported. If true, set border-radius to 0 and add <strong>border-bottom-radius: x;</strong> </td><td> -webkit- </td><td> -moz- </td></tr>
 <tr><td> roundedTopCorners </td><td> - </td><td> False is not supported. If true, set border-radius to 0 and add <strong>border-top-radius: x;</strong> </td><td> -webkit- </td><td> -moz- </td></tr>
 <tr><td> verticalAlign </td><td> vertical-align </td><td> </td><td> </td><td> </td></tr>
 <tr><td> width </td><td> width </td><td> </td><td> </td><td> </td></tr>
</table>

####Mouse Event Selectors

Flex provides Over and Down attributes to catch mouse events. Example:

```
colorOver:#2d89a4;
colorDown:#2d89a4;
underlineOver:true;
underlineDown:false;
```
In css3 this feature is applied directly to the main style as a selectors. Example:

```css
a, a:active, a:visited {
	color: #666666;
	text-decoration: none;
}

a:hover {
	color: #2d89a4;
	text-decoration: underline;
}
```
##More information
Box css styles from: http://infrequently.org/2009/08/css-3-progress/
