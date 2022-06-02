export function parseAttr(attrString) {
  if (attrString == undefined) return [];

  let pointer = 0;
  let isInner = false;
  let result = [];

  for (let i = 0; i < attrString.length; i++) {
    let char = attrString[i];
    if (char === '"' || char === "'") {
      isInner = !isInner;
    } else if (char === ' ' && !isInner) {
      if (!/^\s*$/.test(attrString.substring(pointer, i))) {
        result.push(attrString.substring(pointer, i).trim());
        pointer = i;
      }
    }
  }
  result.push(attrString.substring(pointer).trim());

  result = result.map((item) => {
    let [key, value] = item.split('=');
    return {
      key: key.trim(),
      value: value
    };
  });

  return result;
}
