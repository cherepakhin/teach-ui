const f = function () {
  return {
    actions: [1, 2],
    childs: [3, 4],
  };
};

describe('spread', () => {
  it('Передача в переменные', () => {
    const { actions, childs } = f();
    expect(actions, [1, 2]);
    expect(childs, [3, 4]);
  });
});
