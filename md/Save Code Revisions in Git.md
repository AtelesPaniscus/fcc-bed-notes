# Save Code Revisions in Git

`git` is a version control system with good support for distributed non-linear workflows.
GitHub is a web-based hosting service for version control using `git`.

The fcc waypoint delegates to the Node School [Git It](https://github.com/jlord/git-it) tutorial.

Before you start, it is suggested you add a new `ssh` key to you account.

Note:  both Cloud9 and CodeAnywhere automatically create containers with an RSA key for use with SSH.
By default you get the same RSA key each time you create a container.
Whether this is a good idea or not is besides the point:
create your container(s) and add their RSA key(s) to GitHub to the purposes of this tutorial
(an exercise left to the reader).

---

The Node School tutorial covers only a few basics of `git` and GitHub and briefly at that.
However, I was astonished how much new stuff I learnt (some on, some off the curriculum).

Each exercise has an 'official' solution:  study these as they offer further insight.

The tutorial has `html` reference documentation you might find handy.
See [Learn You Node](Learn%20You%20Node.html) for how you might browse the documentation comfortably.

The tutorial has the same naff interface as all the other Node School tutorials.
Maximise the small console viewing area at the bottom of the Cloud9 virtual desktop before use.


To install the tutorial:

```bash
    $ npm install -g git-it
```

To run it:

```bash
    $ git-it
```

After doing each 'challenge' check your work with:

```bash
    $ git-it verify
```

On Cloud9 the choice of colours means you cannot actually see the tutorial instructions.
No such problem on CodeAnywhere.
So I worked through the tutorial(s) on CodeAnywhere and Cloud9 in parallel.


## Get git

This section ensures `git` is installed and your name and e-mail are configured.

Well, git `was` already installed.
Cloud9 has version 2.14.1 installed and CodeAnywhere only version 1.9.1.


There is already a good (global) `git` configuration, but it may not be what you want need:

```sh
    $ git config --global -l
```

The Cloud 9 configuration was good:

```
    user.name=Ateles Paniscus
    user.email=pbronline-fcc@yahoo.co.uk
    core.editor=nano
    core.whitespace=off
    core.excludesfile=~/.gitignore
    advice.statusuoption=false
    color.ui=true
    push.default=current
```

The last entry I have not seen before.
It looks useful.

I have private e-mail restriction in place on GitHub so I needed to set:

```sh
    $ git config --global user.email "AtelesPaniscus@user.noreply.github.com"
```

before making a first commit.

The CodeAnywhere configuration was not OK.  So I corrected it with the 'usual':

```sh
    $ git config --global user.name "Ateles Paniscus"
    $ git config --global user.email "AtelesPaniscus@user.noreply.github.com"
```

Make sure there is no `=`.


## Repository

In this section you create a new (empty and local) repository:

```sh
    $ git init gitshop
    $ cd gitshop
```

You need to create an empty directory rather than turn the current directory into a repository otherwise `git-it verify` will want you to add and commit everything.
Note this is not compatible with the fcc directions to 'always' be in your project's "workspace" directory.


## Commit to it

In this section you create a new file and add it to the repository:

```sh
    $ cat > candles.txt
    I want 35mm diameter candles
    $ git add candles.txt
    $ git commit -m "My first commit"
```

This fails under Cloud9 if you are not using an RSA key because the ssh config file says to use the RSA key:

```sh
    $ cd ~/.ssh
    $ sed -e 's/id_rsa/id_ecdsa/' -i config
    $ cd -
```

and try again.


## Githubbin

In this section, you create a GitHub account.

I am already signed up so it was just a case of updating the config:

```sh
    $ git config --global user.username "AtelesPaniscus"
```

I did not realise there was a difference between `user.name` and `user.username`
(and I still do not know what that difference is).
It seems also there is no (cannot be) a space in the GitHub user name.


## Remote Control

In this section you create an empty GitHub repository, link it and your 'local' respository and push you 'local' repository to GitHub.

Create an empty GitHub repository (no README.md or anything).

GitHub helpfully shows you the URL to use to 'connect' the local and GitHub repositories.
Use the 'ssh', not the 'html' URL.


```sh
    $ git remote add github git@github.com:AtelesPaniscus/codeanywhere.git
```

Oops, if you forgot the e-mail restrictions bit earlier,
you may need to 'amend' your local commit(s) before you can push them to GitHub.

```sh
    $ git commit --amend --reset-author
```

Note:  this changes the date too and is one commit at a time.

To push your local changes up to GitHub.

```sh
    git push origin master
```

The `git-it verify` will fail unless the remote is named `origin`.

A good idea is:

```sh
    $ git config --global push.default current
```

Then `git push` will push the current branch by default rather than master or whatever was indirectly defined using `push -u`.


## Forks and clones

In this section you will fork a repository on GitHub and then clone the fork.
The result is two copies of your own - one on GitHub and another in your 'workspace'.

I have plenty of forks on GitHub already so I thought I would just clone it.
That does not work:  the `git-it verify` looks for a specific repository of the author's.

So, read the 'course notes' and try again.
First you need to create a fork on GitHub, which can then be cloned:

```sh
    $ git clone git@github.com:AtelesPaniscus/patchwork.github
    $ git remote add upstream git@github.com:jlord/patchwork.git
```

only, it claims, you do not have to use `upstream`.  Hmm ...


## Branches are not just for birds

In this section you create a new branch in the local respository for what will be your contribution to the repository you forked.

Read the course notes and follow them closely.
In particular, use the branch name they suggest.

So the forked and cloned repository has a main branch named `gh_pages` because this repository is a static website.
As instructed:

```sh
    $ git branch add-AtelesPaniscus
    $ git checkout add-AtelesPaniscus

    $ cd Contributors
    $ echo add-AtelesPaniscus > add-AtelesPaniscus.txt

    $ git add add-AtelesPaniscus.txt
    $ git commit -m "add-AtelesPaniscus.txt"
```

Only it seems confused between the directories Contributors and contributors and directory depth too.


## It's a Small World

In this section you add a collaborator to your (forked GitHub) repository.

This gives them permission to alter your GitHub repository directly,

This I had not seen before.
I guess this is the basis of sharing repositories so that several people can collaborate.
In this tutorial the collaborator is a bot, not a human, but that is irrelevant - the named GitHub account is the collaborator.

The first problem is finding the right page on GitHub.
Go to the forked repository's GitHub page.
Click on `Settings` on the right hand side of the menu of which `Code` is the left-most choice.
Select `Collaborators` from the 'menu' on the left - second one down.

Alternatively, try this URL:

        <https://github.com/<user-name>/<repo-name>/settings/collaboration>


Type in the GitHub user name of your collaborator (`reporobot`) and click `Add`.


## Pull, Never out of Date

In this section you update your local respository that the bot collaborator has made to your (forked) GitHub repository.

```sh
    $ git pull origin add-AtelesPaniscus
```

This worked under Codeanywhere because it was consistent with the GitHub version.
Under Cloud 9, which was not consistent, the 'pull' overwrote the robot's changes with our version
and asked us to provide a comment for the merge.
In other words it lost the robot's change.

This may be why I've seen (elsewhere) the use of pull discouraged and the use of fetch + merge encouraged.
At least you may get a chance to control the merge.


## Requesting you Pull, Please

In this section you create a pull request on GitHub.

This is a purely GitHub step.
It is a request to merge the changes on your brach in your fork with the original repository.

Done.  It worked first time.

Apparently you should be able to launch the pull request from either end.


## Merge TA DA !

In this section you merge the changes on your branch into the 'main' branch, delete the branch (since it is not needed anymore)
and then push these changes to GitHub.

I've not seen this before but have been told to do this and, of course, my improvisation was something else.

```sh
    $ git checkout gh-pages
    $ git merge add-AtelesPaniscus
    $ git branch -d add-AtelesPaniscus
    $ git push origin --delete add-AtelesPaniscus
```

and finally:

```sh
    $ git pull upstream gh-pages
```

This last ensures your local copy is up to date with the original.
It may pull down more changes to push to GitHub.

Apparently if I open the (upstream) GitHub page, I will find my name among the collaborators listed there.
Fame at last.

<!-- EOF -->
