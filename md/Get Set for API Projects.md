## Get Set for Our API Development Projects

These are the first block of backend projects.
They are also referred to as "Backend Challenges".

fCC recommend using `glitch.com`,
which is a powerful browser based development environment.
It has nothing to do with the defunct on-line gaming site.

fCC also point out that this saves you time since
you do not need to install Node.js or MongoDB.

These notes cover the 'set-up' before attempting any project.
Each 'section' below covers a step from the fCC challenge.

You get to install some fCC specific boiler plate and, for some exercises,
also MongpDB, a 'no sql', document oriented database manager.

The fCC challenge is short, much shorter than the next set-up challenge, but I suspect that
the challenge author assumes you know what you are doing rather than the setup is shorter or simpler.


### Start a New Project

Go to [Glitch](https://gitch.com) and click on the 'New Project' button

It claims:
"Glitch is the friendly community where you'll build the app of your dreams."

There is a free "How it works in 2 minutes" that looks like a video but does not work at home.

There is a 'Sign In' button top right and the 'Start a New Project' button just under the "How it works in 2 minutes".

The 'Start a New Project' button offers a choice.
I selected 'Create a Node App'.

This offers another page:
[https://glitch.con/edit/#!/mica-radio?path=README.md:1:0](https://glitch.con/edit/#!/mica-radio?path=README.md:1:0).

On the second attempt I got:
[https://glitch.con/edit/#!/cut-quit?path=README.md:1:0](https://glitch.con/edit/#!/cut-quit?path=README.md:1:0).

Looks like `mica-radio` and `cut-quit` are project names but I certainly did not choose them.


###  Sign-In to GitHub

I wonder if this should not have come first.

Apparently without signing in you are an Anonymous User.
Any project you create will expire after 5 days.

By signing in with GitHub you create a free (Glitch) account.
So what happens when you return ?
I guess you just sign in again.

The first sign in involves authorisation with GitHub.

I found the project changed from `cut-quit` to `mica-radio`.
Don't ask.


###  Starting freeCodeCamp Projects

This involves importing some freeCodeCamp boiler-plate using, I guess,
a common mechanism for setting up new projects quickly.

There are two ways you can do this but neither is obvious from the UI.

The first method is to click (where?) on the link (on the fCC challenge page, silly):
[https://glitch.com/#!/import/github/freeCodeCamp/boilerplate-npm](https://glitch.com/#!/import/github/freeCodeCamp/boilerplate-npm).

This appeared to create yet another new project (`peach-suit`) that contains the freeCodeCamp template.

The alternative method is cloning a (GitHub) repository
[https://github/freeCodeCamp/boilerplate-npm](https://github/freeCodeCamp/boilerplate-npm).

This process is not as simple but I recommend it:

  * click project name to get the drop-down box
  * select Advanced Options at the bottom
  * click on the Grant Access to GitHub
    * more GitHub authorisation may be required
    * the project redraws itself
  * go through the rigmarole again
  * select Import From GitHub
  * paste just `username/reponame` into the pop-up box
    * e.g freeCodeCamp/boilerplate-npm [ed: bad choice]
    * do not paste the full URL
  * this does not create a new project with a new name.

It recommends saving the link to your project somewhere safe.
What link, you may ask ?

It seems I have:

  * on aspen [https://glitch.com/edit/#!/cut-quit?path=README.md:1:0]]
  * on maple [https://glitch.com/edit/#!/peach-suit?path=README.md:1:0]

There are ways and means of 'renaming' the workspace (and description) oo something of your choice.
You may well want to the save the URL in the corresponding GitHub repository (at the top, along side the repository description).


### How to Connect to MongoDB

If MongoDB is needed, use the hosting service `mLab`.

mLab (formally MongoLab) is a fully managed cloud database service that hosts MongoDB databases.
It runs on cloud providers Amazon, Google, and Microsoft Azure and
has partnered with platform-as-a-service providers such as Heroku.

Sign up for a new account here: [https://mlab.com/signup/](https://mlab.com/signup/).
No credit card required.

I created an account and named it `AtelesPaniscus`.

Sign up requires e-mail account verification.
It e-mails you a link that you click-on.
It was not necessary to sign-in again.

To connect to your database(s),
use the connection info supplied on each database's home page.

Apparently I can create 'deployments' from my home page.
No need to do that at this time.


### Public Visibility

After completing each challenge you can copy your public Glitch url
(to the homepage of your app) and submit it.

Optionally you may choose to write your project on another platform but
it must be visible to all.
