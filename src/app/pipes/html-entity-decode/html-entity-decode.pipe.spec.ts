import { HtmlEntityDecodePipe } from './html-entity-decode.pipe';

describe('HtmlEntityDecodePipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlEntityDecodePipe();
    expect(pipe).toBeTruthy();
  });
});
