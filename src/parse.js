import { parseAttr } from './parseAttrs';

export default function parse(templateStr) {
  let index = 0;
  let tailStr = templateStr;

  // 开始标记
  const startReg = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
  // 结束标记
  const endReg = /^\<\/([a-z]+[1-6]?)\>/;
  // 抓取开始标记之前的文字
  const wordReg = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;

  let tagStack = [];
  let contentStack = [{ children: [] }];
  let wordStack = [];

  while (index < templateStr.length - 1) {
    tailStr = templateStr.substring(index);
    if (startReg.test(tailStr)) {
      // 匹配开始标签
      const tag = tailStr.match(startReg)[1];
      const attrs = parseAttr(tailStr.match(startReg)[2]);
      tagStack.push(tag);
      contentStack.push({ tag: tag, children: [] , attrs});
      // 指针后移tag的length,同时加上<>
      index += tag.length + 2 + attrs.length || 0;
    } else if (endReg.test(tailStr)) {
      // 匹配结束标签
      const tag = tailStr.match(endReg)[1];
      if (tag === tagStack[tagStack.length - 1]) {
        const tag_pop = tagStack.pop();
        const content_pop = contentStack.pop();
        if (contentStack.length > 0) {
          contentStack[contentStack.length - 1].children.push(content_pop);
        }
      } else {
        throw new Error(`${tagStack[tagStack.length - 1]}标签不匹配`);
      }
      index += tag.length + 3;
    } else if (wordReg.test(tailStr)) {
      let word = tailStr.match(wordReg)[1];
      if (!/^\s+$/.test(word)) {
        wordStack.push(word);
        contentStack[contentStack.length - 1].children.push({ text: word, type: 3 });
      }
      index += word.length;
    } else {
      index++;
    }
  }
  console.log('tagStack', tagStack);
  console.log('contentStack', contentStack);
  return contentStack[0];
}
