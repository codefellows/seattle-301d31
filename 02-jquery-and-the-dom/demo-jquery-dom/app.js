//*****basic selectors*****//

//element
// vanillaJS
document.getElementsByTagName('li');
// jQuery
// jQuery();
$('li');

//class
// vanillaJS
document.getElementsByClassName('container');
// jQuery
$('.container');

//id
// vanillaJS
let vanilla = document.getElementById('nav');
// jQuery
let $jQ = $('#nav');

//parent descendant
$('#nav li');

// parent > child
$('ul > li');

//attribute
// $('input[name="textbox"]');
// $('input[type="number"]');

//get text of the matched element(s)
// $('h2').text();

//set text of the matched element(s)
// $('h2').text('Sam is awesome!!!!!');

//get the html of the matched element(s)
// $('p').html();

//set the html of the matched element(s)
// $('p').html('new content');

//get the data attribute of a p
// $('p').data('rank');

//set the data attribute of a p
// $('p').attr('data-category', 'paragraph');

//make a new <li> and append it to the <ul>
// vanillaJS
// Create element
// Give it content
// Append it
// jQuery
// $('ul').append('<li>One</li>');
// $('ul').append('<li>Two</li>');
// $('ul').append('<li>Three</li>');

//make a clone
// let $ulClone = $('ul').clone();
// $('header').append($ulClone);

//remove an element from the DOM, returns the removed element
// $('h2').remove();

//empty out the contents of the element
// $('main').empty();

//run a command as soon as the DOM loads
// $(document.ready(function() {
//   alert('DOM is ready');
// })

//shorthand
// $(function() {
//   alert('DOM is ready');
// })