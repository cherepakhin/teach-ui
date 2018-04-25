import ReportToolBar from '../toolbar';

describe('Test Reports.toolbar', () => {
  it('getMenuItems', () => {
    const menuitems = ReportToolBar.getMenuItems();
    expect(menuitems.length).toBe(3);
  });
});
