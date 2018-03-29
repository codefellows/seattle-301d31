![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 13: Middleware
===
## Code Wars Challenge

Complete [today's Kata](https://www.codewars.com/kata/mutate-my-strings) and follow the submission instructions from Lab 01.

## Lab 13 Submission Instructions
- Continue working in the same repository from the previous class
- Check out a new branch for today's lab assignment, semantically named `middleware` or something similar. It should include all of the completed code from the previous assignment.
- Complete your **Feature Tasks for the day**
- Create a Pull Request back to `master`
- On Canvas, submit a link to your PR and a link to your deployed application on Heroku. **Make sure to include the following:**
  - A question within the context of today's lab assignment
  - An observation about the lab assignment, or related 'Ah-hah!' moment
  - How long you spent working on this assignment

## Resources
<!-- This needs more content for student resources -->
- [Book Store Wireframe](./wireframes)

## Configuration

- `ENV VARS` - Paste the following code snippet into your terminal window:
  * _Reminder: these will be temporary while the current shell session (window) is open_

```
export PORT=3000
export CLIENT_URL=http://localhost:8080
export TOKEN=1234 # Please make your own PIN
Mac:     export DATABASE_URL=postgres://localhost:5432/books_app
Windows: export DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/books_app
```

```sh
book_app_week_3/
├── book-list-client
│   ├── data
│   │   └── books.json
|   ├── .eslintrc.json
|   ├── .gitignore
│   ├── index.html
|   ├── README.md
│   ├── scripts
│   │   ├── models
│   │   │   └── book.js
│   │   └── views
│   │       ├── admin-view.js
│   │       ├── book-view.js
│   │       ├── error-view.js
│   │       └── routes.js
│   └── styles
│       ├── base.css
│       ├── fonts
│       │   ├── icomoon.eot
│       │   ├── icomoon.svg
│       │   ├── icomoon.ttf
│       │   └── icomoon.woff
│       ├── icons.css
│       ├── layout.css
│       ├── modules
│       │   ├── admin-main.css
│       │   ├── book-main.css
│       │   ├── detail-main.css
│       │   ├── error.css
│       │   ├── footer.css
│       │   ├── form-main.css
│       │   └── header.css
│       └── reset.css
└── book-list-server
  ├── .eslintrc.json
  ├── .gitignore
  ├── package-lock.json
  ├── package.json
  ├── README.md
  └── server.js
```

## User Stories & Feature Tasks

#### Overview

Today will add the functionality of removing and updating records from your database through the use of middleware. It will also include the additional feature of an administrator interface, which will only allow modifications to the database when the user is 'authenticated'.

*1. As a user, I want to have buttons in my detail view so that I can easily update or delete a single book with the click of a button.*

- Add two new buttons to appear alongside any book rendered in the detail view: a button for Updating and a button for Deleting.
  - Provide each with a `data-id` attribute that sets the ID of the book as the value, as well as a unique `id` attribute that will identify each button for use in your JS.
- Add a new form View for updating an existing record in the database. This should look identical to your Create form, with the exception of any ID and class attributes that identify this form as an update view (as opposed to a create view).

*2. As a user, I want to be able to delete a single book so that my list is always current.*

- Add an endpoint for a `DELETE` request to `/api/v1/books/:id`.
  - This should use the provided ID in the URL to delete the given record from the database.
  - The ID provided should only be a number. The handler for this route should not be triggered with a non-numeric value for the ID.
  - After a successful update, a response should be sent back to the user in the form of a 204 status code.
- Add a new method called `Book.destroy` to your `Book` model for deletion. This method will interact with your API through the use of AJAX requests.

*3. As a user, I want to be able to update a single book so that my list is accurate and can be modified as needed.*

- Add an endpoint for a `PUT` request to `/api/v1/books/:id`.
  - This should use the provided ID in the URL to update the given record in the database.
  - The ID provided should only be a number. The handler for this route should not be triggered with a non-numeric value for the ID.
  - After a successful update, a response should be sent back to the user in the form of a 200 status code.
- Add a new method called `Book.update` to your `Book` model for updating a single book. This method will interact with your API through the use of AJAX requests.
- Add a new method to your `bookView` object called `initUpdateFormPage`.
  - Your Update form should take in a `ctx` parameter, which will give you access to the book object you want to take action on.
  - Using jQuery, target each of the form inputs and pre-populate with their respective values from the book object passed through via `ctx`.
  - Set up an event listener for form submission to capture the current form state and pass it to the `Book.update` method.
- Add functionality in your `routes.js` file for updating a book.
  - Create a new route in your PageJS route definitions, which will handle two callbacks at the `/books/:book_id/update` route.
  - The first callback should take `ctx` and `next` as arguments when invoked (passed by PageJS), and will in turn invoke the `Book.fetchOne` method and pass both previous arguments through the invocation.
  - The second callback should take `ctx` as an argument when invoked (passed by PageJS), and will in turn invoke the `bookView.initUpdateFormPage` method and pass the `ctx` argument through the invocation.
- Redeploy your application.

*4. As a user, I want to have admin-only routes so that I can control access to updating and deleting books from my app.*

- Create a new file named `adminView.js` which includes the following:
  - Enclose your code in an IFFE.
  - Define a global variable called `adminView` and assign an empty object literal as its value.
  - Define a method on `adminView` called `initAdminPage` which shows the admin view and has a form field for entering the passphrase.
  - Define a method on `adminView` called `verify` which will validate the passphrase and, if it is valid, show the admin-only portion of your app
- Create a new route in your PageJS route definitions, which will handle the callbacks at the `/admin` route.
  - This should handle the view for your passphrase form.
  - This method should take `ctx` as an argument when invoked (passed by PageJS), and will in turn invoke the `bookView.initUpdateFormPage` method
- Redeploy your application.

## Documentation

_Your README.md must include:_
```md
# Project Name

**Author**: Your Name Goes Here
**Version**: 1.1.0 (increment the patch/fix version number up if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) -->

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log
<!-- Use this are to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with GET and POST routes for the book resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

-->
```
