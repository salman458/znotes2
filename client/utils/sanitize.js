const sanitizeName = (name) => name.split(' ').join('').toLowerCase();

export default sanitizeName;
