# Habit Tracker APP

# Tech Stack

NodeJS , ExpressJS,MongoDB

# Feature

- SignUp

```
- User can registered themselves
```

- Login

```
- Enter email and Password of registered User

```

- DashBoard

```
- can add a new habit
- check the status of habit:
     Done - Mark the habit as done for a day
    Not done - Mark the habit as not done for a day
    None - User did not take any action on a habit for a day

- can delete the habit
- add/remove the habit to/from favourite
- check the daily and weekly view

```

- daily view

```
- counter of Done ,NotDone and None Habits


```

- weekly view

```
- displaying the 7 days of each habit

```

# How to use

#### Clone the repo

https://github.com/Rk344300/Habit_Tracker_App

#### to install the dependences

```
npm install
```

#### to run the application

```
npm start
```

#### applocation run on port 8080

# folder structure

```
.gitignore
README.md
├── assets
│   └── css
│       ├── dashboard.css
│       ├── navbar.css
│       ├── user_sign_in.css
│       └── user_sign_up.css
├── config
│   ├── flash-middleware.js
│   └── mongoose.js
├── controllers
│   ├── habit_controller.js
│   └── user_controller.js
├── models
│   ├── habit.js
│   └── user.js
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── partials
    │   ├── _daily.ejs
    │   ├── _navbar.ejs
    │   └── _weekly.ejs
    ├── dashboard.ejs
    ├── layout.ejs
    ├── user_sign_in.ejs
    └── user_sign_up.ejs


```
