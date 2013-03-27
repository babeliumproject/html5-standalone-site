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
