articleController.js:

-TODO: Middleware for grabbing one article by ID:

We create a function that takes in two arguments, ctx and next. These are both from page.js. ctx is the context object, which has context from the URL in ctx.params.(theURLparam). next is the next function in the callback queue, set in routes.js.

Inside loadById we create a closure, articleData. articleData is a function that takes in an argument, article, and sets it equal to ctx.articles. (ctx being, again, the context object from page.js) Then it calls next(), which is the next we passed in to loadById.

Once the closure has been created we call Article.findWhere with the arguments String 'id', ctx.params.id, and our closure articleData. Article.findWhere takes the arguments field, value, and callback. It then calls webDB to run a SQL query, SELECT * FROM articles WHERE $field = value. webDB uses html5sql to run this query against the SQL database in the browser, which has already been loaded with articles. html5sql returns an array of row objects, webDB returns that array of row objects and calls the callback we passed in. The callback is our closure, articleData.

articleData then takes in the results of the SQL query, that array of row objects. It sets that array of row objects equal to ctx.articles. Then it calls next() from its original context, of being the next object in page.js' callback queue. This is articlesController.index.

articlesController.index is a function that takes in ctx and next. We attached articles to the ctx object in the previous step to be able to pass this data around. articlesController.index does one thing: it calls articleView.index with the argument ctx.articles.

articleView.index then runs our standard hiding all other sections, appending the articles to the #articles element, and setting the event handlers. Then the stack is finished and the user can view the articles.

-TODO: Middleware for loading up articles by a certain author:

This is broadly the same as loadById, except it uses the URL parameter authorName and looks up articles by author in the SQL database. It also replaces all spaces in the author name with +'s so that it can be used in the query. Other than that, the stack remains the same as loadById.

-TODO: Middleware for grabbing all articles with a certain category:

This is broadly the same as the other two functions, except that it grabs articles based on category instead of author or id. Categories apparently has no spaces, so there is no reason to strip the spaces like we do for author names.

-TODO: Middleware for grabbing ALL articles:

We start off with our familiar closure, except for  one difference: we do not use the results anywhere in the function. Instead we use the Article parameter, Article.all.

Then we evaluate an id statement. If Article.all has a length (on other words, if it is not an empty array), set ctx.articles equal to Article.all and call next immedietely. This is exactly what we do inside the closure, but we do it right away. After all, if we already have all the articles in memory, why make another slow and costly DB call to get them? Memory is much faster.

But if we do not already have Article.all, we have to get it. So we go to Article.fetchAll, called with the argument of our closure (articleData).

Article.fetchAll runs a SQL query, SELECT * FROM articles ORDER BY publishedOn DESC. It then passes an anonymous function as a callback to webDB. webDB calls html5sql to get the results, then runs the anonymous function.

The function says that if we have results, then we call Article.loadAll on those results. Article.loadAll sets Article.all equal to the results of a map() call on rows that creates a new Article for each item in the rows array. Then it returns to fetchAll.

Then fetchAll calls the callback function, our closure articleData. articleData sets ctx.articles as Article.all, then calls its own callback of articlesController.index, which passes control to articleView.index.

But if we don't have results we do something else. We use an AJAX call to get the data from /data/hackerIpsum.json, with a callback that takes in the data gotten from that AJAX call. The callback goes over each item in the JSON and creates a new Article based on it, then calls Article.insertRecord.

Article.insertRecord takes in an article object and runs a webDB query to insert the data from that object into the database. webDB calls html5sql, and both return. They can take callbacks, but we haven't passed any in this case.

When we get back to Article.fetchAll, we run another webDB query that selects all the rows in the database, which goes to html5sql, which returns all the rows in the database, and when we get back we we call Article.loadAll with the results passed as an argument. loadAll does as detailed above, and then we call our callback, articleData, which puts the articles in teh ctx object, calls articleController.index, which calls articleView.index.

articleView.js

-TODO: Combine both filter functions to a single event handler, which simply redirects to a url like: /category/skateboarding or /author/Kevin+Bacon

This sets a .one() handler through jQuery so that when filters change. one() is similar to .on(), but it only runs once per event per handler. So first we select #filters (HTML ul element consisting of two filters) through jQuery, then we bind an event to them that fires when they change or are selected.

When such an event occurs, the event handler fires and runs an anonymous function. The anonymous function sets resource as the id of the element that fired the event minus the string '-filter', using the JS function replace(). Then there's a call to page(), that redirects the user to a URL that is formed from '/' + resource + '/' + the value of the selected option with all whitespace replaced with +s. 

-TODO: Refactor this method so it works with any number of articles. Also, it should be idempotent, so it can be run multiple times with identical results.

articleView.index takes in an arbitrary number of articles from whatever called it. It then uses a jQuery selector to grab the section with an id of articles, show it, run another selector to get the siblings of #articles, then hides those siblings.

Then we select, with jQuery, all the article elements that are descendents of #article, and remove() them (with jQuery). Then we go over our passed-in articles and for each of them, append to #articles the results of the function render with the argument of the current article.

Render is the standard Handlebars stuff we've been using. It calls to Handlebars to compile the template, does some logic, then returns the HTML article.

Then we call populateFilters. It calls to article.js with two functions, one that gets a unique array of authors with functional programming, the other that gets a list of distinct category names from the database. The functional programming is synchronous and blocking, plus it only works for the articles in the DOM, but it may be faster than the DB call depending on how fast your DB is. The DB is asynchronous and allows other processing while the call returns, but you're still going to be waiting for the categories filter to populate while it works.
