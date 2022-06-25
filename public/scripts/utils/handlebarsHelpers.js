/* eslint-disable no-undef */
Handlebars.registerHelper("formatDueDate", (data) => {
  let message = "";
  if (data === undefined) {
    return message;
  }

  const dueDate = new Date(data);
  const curreentDate = new Date();
  const difference = dueDate.getTime() - curreentDate.getTime();
  const differneceDays = Math.ceil(difference / (1000 * 3600 * 24));

  if (differneceDays < -1) {
    message = `${differneceDays} days ago`;
  } else if (differneceDays === -1) {
    message = "a day ago";
  } else if (differneceDays === 0) {
    message = "today";
  } else if (differneceDays === 1) {
    message = "in a day";
  } else {
    message = `in ${differneceDays} days`;
  }

  return message;
});

Handlebars.registerHelper("loop", (n, block) => {
  let accum = "";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
});
