## Get Set for Our Dynamic Web Application Projects

These are the second block of backend projects.
They are also referred to as "Basejump Challenges".

fCC recommend using `c9/io`, aka `cloud9` aka `AWS cloud9`.

fCC also point out that this saves you time since you do not need to install Node.js or MongoDB.

These notes cover the 'set-up' before attempting any project.
Each 'section' below covers a step from the fCC challenge.

You also get to set up the Clementine framework and MongoDB.
The former is an fCC special so may not be much use in the real world.
The latter is a 'no SQL', document oriented database manager.


### Create An Account

The fCC instruction describe a big GitHub symbol you click to create an account.
There is no such button.

The recommendation on how to start seems dated - basically it thinks all you have to do is authenticate via GitHub and enter an e-mail address.

This makes sense since you already have a GitHub account if you have done the Front End Development programme.

However, you should also have a Cloud 9 account, so just log in and move to the next 'step'.


### Clementine

Clementine is fCC's own 'framework', whatever that means.
It needs to be installed in a new 'virtual machine' and I expect you'll need a new one for each exercise.

There is a Clementine tutorial but we skipped that first time around.

The instructions recommend creating a 'workspace' with a custom stack but this is not an option so I went for the blank template.

This allows you to paste the URL of a repository to clone in the field named "Clone from Git or Mercurial URL".

Paste in the link [https://github.com/johnstonbl01/clementinejs-fcc.git](https://github.com/johnstonbl01/clementinejs-fcc.git).

So, Clementine.js is now installed.


### Hidden Files

Click on the gear icon in the upper right corner of the __file structure__.

It is not the gear in the upper right corner of the browser window.


### Create a .env file

Just a right click to create a new file.  But where ?

I assume the top level of the file structure so the new file ends up next to `.gitignore`.
So click on the project name at the top.


### Populate it

This was a copy paste - values are entered later:

```
    GITHUB_KEY=
    GITHUB_SECRET=
    MONGO_URI=mongodb://localhost:27017/clementinejs
    PORT=8080
    APP_URL=http://localhost:8080/
```


### Open the Application

This bit took a while.

The instructions say to open up your application in a preview tab by clicking:

```
Window > Share > Application > Open.
```

This is out-of-date.
There is a `Windows > Share` but that gets you to a page that suggests the Application is already shared.

Now what ?

I clicked on the `Application Link` to open a new browser tab and got:

```
    Welcome to the Cloud9 IDE Application Preview
```

The 'correct' alternative is:

```
    Tools > Preview > Preview Running Application.
```

This appears to take you to the same place but in the preview pane on the current page, not a new page.

At the top of the preview pane is an address bar and in it the 'URL of your application' that is required by later steps.

I found the preview pane less useful than the new page.


### Register the Application with GitHub

This step and the next step were a nightmare.

There is no explanation of what this is for.
I think it allows GitHub to be used for log-in to your application using GitHub credentials the same way that it allows log-in to FaceBook
without needing separate Facebook credentials.

Click on the link to unlock this step.
This opens a new browser tab/window at [https://github.com/settings/applications/new](https://github.com/settings/applications/new).
It is not obvious how to to find this page using just the GitHub UI.

Essentially:

  * select `Settings` (drop down from your avatar - top, far right, any page)
  * click on `Developer settings` (bottom left)
  * click on `New OAuthApp` (top right)

This gives you a form that requires four pieces of data:

  * Application name
    * _Something users will recognize and trust_
    * `fcc-aspen` (the name of the container)
  * Homepage URL
    * _The full URL to your application homepage_
    * `https://fcc-aspen-atelespaniscus.c9users.io/`
  * Application description
    * _This is displayed to all users of your application_
    * First steps with Dynamic Web Applications
  * Authorization callback URL
    * _Your application's callback URL. Read our OAuth documentation for more information.
    * `https://fcc-aspen-atelespaniscus.c9users.io/auth/github/callback`

I later read GitHub's OAuth documentation:  it made no sense.

For the callback URL, use just your application's URL: **do not add `/auth/github/callback`**.

After clicking on the 'Register Application' button you are presented with a page that has an `Update application` button at the bottom.
I do not think this is pertinent unless you change the application name or something.

What you want, for the next step, is the Client ID and Secret shown near the top of the page.


My first attempt (on _aspen_) was a screw up and I was unable to log in with the Client ID and Secret.
My application was not listed on the `Authorized OAuth Apps` tab of [https://github.com/settings/applications/](https://github.com/settings/applications/)
but was listed on [https://github.com/settings/developers](https://github.com/settings/developers).

It seemed GitHub had got its knickers in a twist.
Nothing I did seemed to change this and eventually I deleted everything (including the Cloud9) container and started again with **different** names.

My second attempt (on _maple_) was more successful and I was able to log on to the base Clementine application but I could not get that far using the 'preview pane':
only by opening my application in a new browser tab.

My third attempt (back on _aspen_) was even more successful in that I did manage to login in from the 'preview pane' although only after doing it successfully using
the new browser tab route.

I recommend:

  * double and treble checking everything __before__ you enter it for the first time;
  * be especially careful with the contents of `.env`;
  * consider logging in through the `preview pane` a bonus;
  * if you cannot log on using the new browser tab route just start again from scratch.


### GitHub Client Id and Secret

GitHub has now registered your application and presents you with
a Client ID and a Client Secret to be used to gain access to GitHub.

Set your `.env` file's GITHUB_KEY and GITHUB_SECRET to the Client ID and Client Secret.
Also copy/paste the URL of your preview tab into your `.env` file.

```
    APP_URL=https://fcc-aspen-atelespaniscus.c9users.io
    GITHUB_KEY=03f87679a64517d0bf61
    GITHUB_SECRET=66725a306cd0591623a1f822f844282bcbec8b16
    MONGO_URI=mongodb://localhost:27017/clementinejs
    PORT=8080
```

### Start MongoDB

Maximise your Cloud9 terminal window (the one at the bottom of the screen)
or open a new terminal in a new tab (the + button above your terminal).
If you don't, the MongoDB installation will skip something that might be important.

Install MongoDB by entering:

```bash
    sudo apt-get install mongodb-org
```

then start MongoDB by entering:

```bash
    mongod --smallfiles
```

### Upgrade ? Node.js Packages

Open a new terminal in a new tab and run:

```
    npm install
```

I think this ensures your Node.js packages are up to date.


### Start Your Node.js Server and Authorise with GitHub

I think I tried clicking the `Run` button but this failed.
Apparently `.env` was not found - perhaps the button was looking in the wrong directory.

In the same terminal windows, run:

```bash
    node server.js
```

to start the server.  This appears to work.

The instructions now say to refresh your preview tab and
you should see the Clementine.js logo.

This did not work until I allowed NoScript to allow `c9users.io` and
clicked on the "Enter Application" button again.

Now the Clementine.js logo was visible.

The instructions say click on the "Login with GitHub" button.

Authorisation failed.

A lot of time was spent confirming that the Authorization callback URL given to GitHib should be just the Application URL
**without** the `/auth/github/callback` that is described in the documentation.
However, that was not sufficient to save the day.


### Explore the application

This is simple ...

Click the "Click Me" button and you'll see that it increments the number clicks.

Click the profile button and you'll see that it has your GitHub information.

### Create New Repository

The last step creates a GitHub repository for your code.

In another browser tab, create a new GitHub repository.
Copy its .git URL.

Back on the Cloud9 browser tab ... in the terminal window tab ...
set the GitHub remote URL:

```bash
    git remote set-url github <URL>
```

by pasting in the copied URL.

Check this is OK by pushing your work:

```bash
    git push github master
```

This works if you are using the default RSA key because, it seems,
it is the same for all your containers.

If you are using something non-default, you either need to tar up you key
from another container and untar it again here or perhaps create a whole new
key and add it to GitHub.

Now go back to your GitHub browser tab and refresh.
You should now see you code in GitHub.
