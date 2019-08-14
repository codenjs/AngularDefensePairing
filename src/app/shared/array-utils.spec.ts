import { ArrayUtils } from './array-utils';

describe('arraysEqual given arrays of value objects', () => {
  it('both arrays empty', () => {
    const result = ArrayUtils.arraysEqual([], []);
    expect(result).toBe(true);
  });

  it('first array empty', () => {
    const result = ArrayUtils.arraysEqual([], ['aaa']);
    expect(result).toBe(false);
  });

  it('second array empty', () => {
    const result = ArrayUtils.arraysEqual(['aaa'], []);
    expect(result).toBe(false);
  });

  it('first array has more elements', () => {
    const result = ArrayUtils.arraysEqual(['aaa', 'bbb'], ['aaa']);
    expect(result).toBe(false);
  });

  it('second array has more elements', () => {
    const result = ArrayUtils.arraysEqual(['aaa'], ['aaa', 'bbb']);
    expect(result).toBe(false);
  });

  it('matching string arrays with one element', () => {
    const result = ArrayUtils.arraysEqual(['aaa'], ['aaa']);
    expect(result).toBe(true);
  });

  it('matching string arrays with two elements', () => {
    const result = ArrayUtils.arraysEqual(['aaa', 'bbb'], ['aaa', 'bbb']);
    expect(result).toBe(true);
  });

  it('mismatching string arrays with one element', () => {
    const result = ArrayUtils.arraysEqual(['aaa'], ['bbb']);
    expect(result).toBe(false);
  });

  it('mismatching string arrays with two elements', () => {
    const result = ArrayUtils.arraysEqual(['aaa', 'bbb'], ['aaa', 'b']);
    expect(result).toBe(false);
  });

  it('matching numeric arrays with one element', () => {
    const result = ArrayUtils.arraysEqual([1], [1]);
    expect(result).toBe(true);
  });

  it('matching numeric arrays with two elements', () => {
    const result = ArrayUtils.arraysEqual([1, 2], [1, 2]);
    expect(result).toBe(true);
  });

  it('mismatching numeric arrays with one element', () => {
    const result = ArrayUtils.arraysEqual([1], [2]);
    expect(result).toBe(false);
  });

  it('mismatching numeric arrays with two elements', () => {
    const result = ArrayUtils.arraysEqual([1, 2], [1, 3]);
    expect(result).toBe(false);
  });
});

describe('arraysEqual given arrays of custom objects', () => {
  const customValueFn = (item) => {
    return item.name;
  };

  it('matching object arrays with one element', () => {
    const result = ArrayUtils.arraysEqual([{ name: 'aaa' }], [{ name: 'aaa' }], customValueFn);
    expect(result).toBe(true);
  });

  it('matching object arrays with two elements', () => {
    const result = ArrayUtils.arraysEqual([{ name: 'aaa' }, { name: 'bbb' }], [{ name: 'aaa' }, { name: 'bbb' }], customValueFn);
    expect(result).toBe(true);
  });

  it('mismatching object arrays with one element', () => {
    const result = ArrayUtils.arraysEqual([{ name: 'aaa' }], [{ name: 'bbb' }], customValueFn);
    expect(result).toBe(false);
  });

  it('mismatching object arrays with two elements', () => {
    const result = ArrayUtils.arraysEqual([{ name: 'aaa' }, { name: 'bbb' }], [{ name: 'aaa' }, { name: 'b' }], customValueFn);
    expect(result).toBe(false);
  });
});
