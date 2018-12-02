
const truncate = (text = '', length) => {
  if (!text) {
    return null;
  }

  if (text.length > length) {
    return text.substring(0, length) + '...';
  }

  return text;
}

export default {
  truncate,
}
