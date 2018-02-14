# Timestamp Microservice

This is the first of five microservice projects.

It is a very simple microservice that accepts/converts/returns date stamps.

For the fCC instructions see <https://www.freecodecamp.org/challenges/timestamp-microservice>.

## Set Up - My Way

The fCC instructions tell you to set up on `glitch`.
The video monologue recommends Clementine - but I can see no reason why this would be helpful.

I created my own 'clone' of the Clementine repository the other day.
Since I cannot 'fork' by own project on GitHub, it is necessary to clone it locally.

I cloned it and renamed the clone to `fcc-timestamp-microservice`.
I created an empty GutHub repository of the same name and pushed the clone to it.

I imported (cloned) the new GitHub repository into a `glitch` project and struggled to give it a name of my choice.

After I had successfully renamed the repository, I copied its URL to the the GitHub repository's meta-data.
I also pinned the repository in `glitch`.

## The Application

The application is trivial - it should take no more than 3 hours but I spent a whole day on this because I am thick.

My solution is one file (`server.js`) that comprises 39 lines - 2 bits of framework and one routine of 16 lines.
It uses the `strftime` module.

It was inspired by several of the Node School exercises but not the ones I expected.

I then noted that the example-reference project has a 'landing' page - it's own `index.html`.

So I added the second bit of framework to serve up my own 'landing' page as a 'static web site'.
I confess to still being confused as to what the 'root' of this 'static web site' is.

I then added a simple CSS script just to prove I could do that.
Adding this embellishment was more effort than the exercise itself.


## At the End

Using Clementine installed a load of stuff I did not need that I deleted before the final commit.
I should have used the simple fCC boiler plate.

The READ.md (and the licence file) both stated my project was Clementine so I redid them.

I also revised `package.json`.
I did this by hand rather than use `npm init`.
This was perhaps a mistake.

Lists in `package.json` must **NOT** have a final comma.
This is JSON, not JavaScript (where the comma is optional).
A lot of time was spent searching for an error in `server.js` that was, in fact, in `package.json`.

I used the `Export to GitHub` option in `glitch` to `push` the final project back to my GitHub repository.
In GitHub I generated a pull request, merged it and then deleted the `glitch` branch.
