Handlebars.registerHelper('formatDate', function (data) {
    let options = {
        year: 'numeric', month: 'numeric', day: 'numeric'
    };
    return new Date(data).toLocaleString('de-DE', options); //ES6
});