export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return `${string[0].toUpperCase()}${string.slice(1)}`;
}


export function range(start, end) {
  const arrayOfElements = [];
  if (start > end) {
    [start, end] = [end, start];
  }

  for (let i = start; i <= end; i++) {
    arrayOfElements.push(i);
  }

  return arrayOfElements;
}

