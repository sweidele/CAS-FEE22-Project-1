Handlebars.registerHelper('formatDate', function (data) {
    let options = {
        year: 'numeric', month: 'numeric', day: 'numeric'
    };
    return new Date(data).toLocaleString('de-DE', options); //ES6
});

Handlebars.registerHelper('loop', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});