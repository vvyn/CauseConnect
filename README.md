# CauseConnect
Senior Design Project

# load app
- cd cause-connect
- cd client
- npm start

- # IF pull doesnt work to reflect changes on main
- git fetch origin main (on ur personal branch)

# pull new changes
- cd cause-connect
- git commit -m "save your current changes"
- git checkout main
- git fetch (maybe if the it doesnt work without it?)
- git pull
- git checkout "branch-with-your-changes"
- git pull
- npm install (need to reinstall in both client and server directories)
- cd client
- npm start

# create your own branch for your code
- cd cause-connect
- cd client (for frontend)
- git branch "your-name-changes-or-whatever-you-want-to-call-it"
- npm install (for the first time you load your code, need to reinstall in both client and server directories)
- npm start
