import parse from './parse';

let str = `
<div>
  <div class="12122">
    <ul id='222'>
      <li>TestTEST</li>
      <li>TestTEST</li>
      <li>TestTEST</li>
      <li>TestTEST</li>
      <li>TestTEST</li>
    </ul>
  </div>
  <div>hello</div>
</div>
`;
parse(str)