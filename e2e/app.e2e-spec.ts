import { PokeBreeder2.0Page } from './app.po';

describe('poke-breeder2.0 App', () => {
  let page: PokeBreeder2.0Page;

  beforeEach(() => {
    page = new PokeBreeder2.0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
