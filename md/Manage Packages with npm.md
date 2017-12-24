# Manage Packages with npm

`npm` (Node Package Manager) is a package manager for JavaScript particularly associated with Node.js.
It is a command line client and an on-line database for packages called the `npm registry`.
It provides similar feature to the PEAR and CPAN of PHP and Perl but aimed to do the job properly.
It therefore contains features for creating and publishing packages as well as install etc packages from the registry.

The fcc waypoint delegates to the Node School [How To npm](https://github.com/npm/how-to-npm) tutorial.

First it suggests you sign up with Cloud9 and create yourself a 'blank' container.
This gives you a container with version 6.11.2 of `node.js` and 3.10.10 of `npm`.

Note: do not create a 'node.js' container.
This comes with what you need but also with an example application that will confuse you as you progress through the tutorial and
will eventually confuse `npm` into letting you go no further.

A blank CodeAnywhere has neither installed and a lot of other stuff is missing so choose the Node.js Ubuntu 14.04 stack option.
This give you version 8.4.0 of node.js and 5.3.0 of npm.

Note:  the Cloud9 and CodeAnywhere OS is old ... it is Ubuntu Trusty LTS from 2014.
If you were to install from the Ubuntu repositories you would get version 0.10.25 of of node.js and 1.3.10 of npm.

Cloud9 was 123 'security' updates short and CodeAnywhere 146.
Upgrading eats into your disk quota.

---

The tutorial, however briefly, probably covers more ground that you will need.

It has a naff interface (as do all the other Node School tutorials).
Maximise the small viewing area at the bottom of the Cloud9 virtual desktop **before** use.

To install the tutorial:

```bash
    $ npm install -g how-to-npm
```

To run it:

```bash
    $ how-to-npm
```

After doing each 'challenge' check your work with:

```bash
    $ how-to-npm verify
```

On Cloud9 the choice of colours means you cannot actually see the tutorial instructions.
No such problem on CodeAnywhere.
So I worked through the tutorial(s) on CodeAnywhere and Cloud9 in parallel.


#### Install npm

You may use the chicken and egg principle to deduce that `npm` is already installed but is it up to date ?

```bash
$ how-to-npm                    # start the exercise
$ how-to-npm verify             # check `npm` version
```

For CodeAnywhere, I had 5.3.0 but 5.6.0 was more recent.  So

```bash
$ npm install -g npm
$ how-to-npm verify             # check `npm` version
```

On Cloud9, I had 3.10.10 but after upgrading `npm`, attempting to check the version crashed.
In essence it was necessary to create a new container and start again.

Do not attempt to upgrade `npm` but skip the exercise with:

```bash
$ how-to-npm verify skip        # `npm` cannot be upgraded safely
```

#### Dev Environment

This is the directory in which, over time, a project is developed.

The instructions say to create a new directory and `cd` into it.
This is not necessary.

On the first pass, I did.
Eventually I ran into trouble because I was, in effect, ignoring the advice in step 12 of the the fcc instructions
to always be in my project's "workspace" directory.

Run `npm init` and press return to accept the default for each question.
This creates a `package.json` file and so sets up the development environment.

```bash
$ npm init
```

```json
{
  "name": "workspace",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
}
```

#### Login

This steps is mock:  nothing really happens.

It mocks your creation of a user id on `npmjs.com` so that you can publish `node.js` modules that others can use.


```bash
$ npm adduser
Username: atelespaniscus        # must be lower case
Password:                       # none of your business
Email: (this IS public)         # ouch - too much spam
```

The mocking does not save this information anywhere but, in real life, I suspect it may do.


#### Start A Project

This is about using `npm init` to change or add information in `package.json`.
What that has to do with a project is not explained.

```bash
$ npm init --scope=ateles
```

This adds `scope` (whatever that means in this context) to the `name` of the project.
It also walks you through all the current settings.
This include some not seen before, like `repository`.

```json
{
  "name": "@ateles/workspace",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "repository": {
    "type": "git"
    "url": "git@github/ateles/nodeschool.git"
  },
  "description": "",
}
```

It is also common practice to make the current directory the local clone of the repository:

```bash
$ git init
```


#### Install A Module

The most common use of `npm` is to install packages from the 'registry' that your application / project / whatever depends on.
These are called dependencies although I am sure this is not right the around.

```bash
$ npm install '@linclark/pkg'            # for tutorial purposes only
```

This installs the module `locally` (I guess local to this `project`, as opposed to globally (available to all projects of all users on this machine).
It also adds information to `package.json` that records the dependency.
Presumably this helps either with package creation or later with installation.


#### Listing Dependencies

The (local) dependencies you have created for this `project` may be listed.

```bash
$ npm ls
```

With the older, Cloud9, `npm` the module installed but this is not recorded in `package.json`.
The `npm ls` command lists the module as 'extraneous'.
This is to support trial installation because node development is guess work.

To install a package 'permanently', install it with the `--save` flag:

```bash
$ npm install '@linclark/pkg' --save
```

or, since the 'save' is just an update to `package.json`, use an editor.

```json
{
  "name": "@ateles/workspace",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "repository": {
    "type": "git"
    "url": "git@github/ateles/nodeschool.git"
  },
  "description": "",
  "dependencies": {
    "@linclark/pkg": "^1.0.2"
  }
}
```


#### npm Test

You can use `npm` as a (simple) test runner by exploiting its `script` property.
The test, I guess, is a sanity check rather than something exhaustive.

The default, by design, always fails:

```bash
$ npm test
> @ateles/workspace@1.0.0 test /home/cabox/workspace
> node test.js
> echo 'Error: no test specified'

Error: no test specified
```

To add a test, edit `package.json`.
The test script is in the form of a command to be run from the shell.

```bash
$ touch test.js
$ nano package.json
$ npm test

> @ateles/workspace@1.0.0 test /home/cabox/workspace
> node test.js

```

Note: the syntax suggests you can add other scripts and run them by name with `npm`.

```json
{
  "name": "@ateles/workspace",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "node test.js"
  },
  "author": "",
  "license": "ISC",
  "repository": {
    "type": "git"
    "url": "git@github/ateles/nodeschool.git"
  },
  "description": "",
  "dependencies": {
    "@linclark/pkg": "^1.0.2"
  }
}
```

There is a documentation link to treasure: [https://docs.npmjs.com/misc/scripts](https://docs.npmjs.com/misc/scripts).


#### Package Niceties

Apparently a good package should have:

  * a description
  * a repository field
  * a README file

The first two can go into `package.json` so that `npm install` can complain when they are not.

```bash
cat > README.md
# The last word in software
^D
```

```json
{
  "name": "@ateles/workspace",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "node test.js"
  },
  "author": "",
  "license": "ISC",
  "description": "The first node",
  "repository": {
    "type": "git"
    "url": "git@github/ateles/nodeschool.git"
  },
  "dependencies": {
    "@linclark/pkg": "^1.0.2"
  }
}
```

The exercise verification step will tell you to look sharp whether you create a read me or not.
Probably another case of the tutorial being every so slightly obsolescent.


#### Publish

Publishing is pushing your application / project / whatever to the global repository everyone installs packages from.

```
npm publish
npm view '@ateles/workspace'
```

During the first pass, the second command hung for a while before giving 'connection' refused on 127.0.0.1:15443.

During the second pass, this worked under both Cloud9 and CodeAnywhere.  It even knew about the read me.


#### Version

Node uses [semantic versioning](http://semver.org).
You cannot publish a new version of your project / whatever without 'bumping' the version number.

There is an `npm version` command that will bump the version number for you and check your code into `git`.

```bash
$ npm version 1.0.1
v1.0.1
$ cat package.json
```

```json
{
  "name": "@ateles/workspace",
  "version": "1.0.1",
  "main": "index.js",
  "scripts": {
    "test": "node test.js"
  },
  "author": "",
  "license": "ISC",
  "description": "The first node",
  "repository": "https://nowhere",
  "dependencies": {
    "@linclark/pkg": "^1.0.2"
  }
}
```

This example sets the version number.
You can increment the major, minor or patch number.
For more information:

```bash
$ npm help version
```

Use this trick to find out more about other `npm` commands.

The interaction with `git` is not as clever as you might think.
The `npm` command will run `git tag`, not `git commit`.
The example above tags the empty `git` clone:  nothing had been checked in and nothing still is.


#### Publish Again

Now that the version number has been bumped, it is possible to publish a new version of the package.

```bash
npm publish
```


#### Dist Tag

By default, each new publication is labelled (or tagged) 'latest'.
You can add/rm/list tags with the `npm dist-tag` command.

```bash
$ npm dist-tag ls
$ npm dist-tag add '@ateles/workspace@1.0.1' beta
$ npm dist-tag ls
```

A publication / whatever can have more than one label so you might want to move 'latest' when that it not pertinent as 'latest' is what gets installed.

I did not understand the remarks about 'next'.


#### Dist Tag Removal

You can delete any tag except 'latest':  you can move 'latest' by adding it somewhere else:

```bash
$ npm dist-tag ls
beta: 1.0.1
latest: 1.0.1
```

```bash
$ npm dist-tag add '@ateles/workspace@1.0.0' latest
+latest: @ateles/workspace@1.0.0
$npm dist-tag ls
beta: 1.0.1
latest: 1.0.0
```

and since each tag occurs only once you do not need a version number to delete it:

```bash
$ npm dist-tag rm '@ateles/workspace' beta
-beta: @ateles/workspace@1.0.1
$ npm dist-tag ls
latest: 1.0.0
```


#### Outdated

When the author of a package on which your whatever depends bumps their version number, you need to respond.

To find out if any of the packages on which we depend are out-of-date:

```bash
$ npm outdated
Package        Current  Wanted  Latest  Location
@linclark/pkg    1.0.2   1.0.3   1.0.3  @ateles/workspace
```

OK, but what does the tutorial mean by 'compatible' ?


#### Update

You can update a package that you know is out of date with `npm install` package.
Alternatively you can ensure all packages are up to date without even knowing which are out-of-date beforehand with:

```bash
npm update
```

The lazy update everything.


#### Rm

What has been installed can be removed.

```bash
$ npm ls
@ateles/workspace@1.0.1 /home/cabox/workspace
 -- @linclark/pkg@1.0.3
$ npm rm '@linclark/pkg'
removed 1 package
```

The newer version of `npm` in CodeAnywhere does not need the `--save` option to remove the dependency from `package.json`.
The older version in `Cloud9` does.

```bash
$ how-to-npm verify
You removed the files, but not the entries in package.json
$ npm rm '@linclark/pkg' --save
$ how-to-npm verify
```


#### Finale

There is a lot more:

  * splitting a larger app into several modules
  * sharing private code within a team using scoped modules
  * other `npm` commands such as `edit`, `bugs`, `explore` ...

Start at [https://npmjs.com](https://npmjs.com).
