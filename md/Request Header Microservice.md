# Request Header Parser Microservice

This is the second of five microservice projects.

It is a very simple microservice that returns in JSON format part of the header of an incoming request.

For the fCC instructions see <https://www.freecodecamp.org/challenges/request-header-parser-microservice>.

## Set Up - My Way

No mention of using Clementine.js this time so I used the simple fCC boilerplate.

I created my own 'clone' of the fCC boilerplate repository the other day.
Since I cannot 'fork' by own project on GitHub, it is necessary to clone it locally.

I cloned it as itself so that I could rearrange the hidden files.
Having pushed those changes back, I renamed the local repository to `fcc-request-header-microservice`.

I created an empty GutHub repository of the same name and pushed the clone again.

This time I kept the clone since local editing of README.md and other boilerplate files is less painful than using the `glitch` editor.

I imported (cloned) the new GitHub repository into a `glitch` project and renamed it (after another struggle),
set the description, copied the project URL to the GitHub repository meta-data and pinned the project in `glitch`.

## The Application

Another trivial application that should take someone who knows what they are doing only a couple of hours.

My solution is one file (`server.js`) that comprises 35 lines and the function that does the real work only 15 lines.

I added a landing page to explain what was going on.  That was 27 lines of HTML.
I reused the 8 lines CSS script from the last exercise.
It clearly could be improved.


## At the End

I revised READ.md and LICENCE.md.

I again revised `package.json` by hand but was lucky this time.

I used the `Export to GitHub` option in `glitch` to `push` the final project back to my GitHub repository.
In GitHub I generated a pull request, merged it and then deleted the `glitch` branch.
