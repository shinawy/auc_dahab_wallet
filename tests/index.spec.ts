import 'mocha';
import { assert } from 'chai';

import  {helloNpm} from '../src/index';



describe('Hello NPM Function', () => {
  it('should be a function', () => {
    assert.isFunction(helloNpm);
  });

  it('should return hello NPM', () => {
    const expected = 'hello NPM';
    const actual = helloNpm();
    assert.equal(actual, expected);
  });
});