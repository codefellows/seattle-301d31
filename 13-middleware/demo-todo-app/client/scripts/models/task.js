'use strict';

var app = {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'insert cloud API server URL here';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Task(taskObject) {
    Object.keys(taskObject).forEach(key => this[key] = taskObject[key]);
  }

  Task.prototype.toHtml = function() {
    let template = Handlebars.compile($('#task-template').text());
    return template(this);
  }

  Task.all = [];

  Task.loadAll = rows => {
    Task.all = rows.map(task => new Task(task));
  }

  Task.fetchAll = callback =>
    $.get(`${ENV.apiUrl}/tasks`)
    .then(Task.loadAll)
    .then(callback)
    .catch(errorCallback);

  Task.createTask = task =>
    $.post(`${ENV.apiUrl}/tasks/add`, task)
    .then(() => page('/'))
    .catch(errorCallback);


  module.Task = Task;
})(app)