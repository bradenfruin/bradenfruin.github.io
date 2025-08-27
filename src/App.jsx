// before (was getting split into multiple lines by accident)
// const cleaned = text.replace(/\r/g, '').trim();

// after (no regex => no build error)
const cleaned = text.split('\r').join('').trim();
const lines = cleaned ? cleaned.split('\n') : [];
