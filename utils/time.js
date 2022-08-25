const renderAbsoluteTime = (time) => {
  const date = new Date(time);
  return date.toDateString();
};

const renderRelativeTime = (time) => {
  const now = new Date().getTime();
  let difference = now - time;
  difference = (((difference / 1000) / 60) / 60) / 24;
  difference = Math.round(difference);
  if (difference === 0) {
    return 'today';
  }
  if (difference === 1) {
    return 'yesterday';
  }
  if (difference > 1 && difference < 365) {
    return `${difference} days ago`;
  }
  difference = Math.round(difference / 365);
  if (difference >= 1 && difference < 2) {
    return 'a year ago';
  }
  if (difference >= 2) {
    return `${difference} years ago`;
  }
  return 'invalid time provided';
};

export {
  renderAbsoluteTime,
  renderRelativeTime,
};
