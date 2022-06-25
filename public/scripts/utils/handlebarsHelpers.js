/* eslint-disable no-undef */
Handlebars.registerHelper("formatDate", (data) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return new Date(data).toLocaleString("de-DE", options); // ES6
});

Handlebars.registerHelper("loop", (n, block) => {
  let accum = "";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
});
