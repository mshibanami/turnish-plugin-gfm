import { describe, it, expect } from 'vitest';
import Turnish from 'turnish';
import { gfm } from '../src/index';

// Helper function to create a turndown service with GFM plugin
function createTurnishService(): Turnish {
  const turndownService = new Turnish();
  turndownService.use(gfm);
  return turndownService;
}

// Helper function to convert HTML to Markdown
function htmlToMarkdown(html: string): string {
  const turnish = createTurnishService();
  return turnish.render(html);
}

describe('Strikethrough', () => {
  it('should convert <strike> to ~~text~~', () => {
    const input = '<strike>Lorem ipsum</strike>';
    const expected = '~~Lorem ipsum~~';
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should convert <s> to ~~text~~', () => {
    const input = '<s>Lorem ipsum</s>';
    const expected = '~~Lorem ipsum~~';
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should convert <del> to ~~text~~', () => {
    const input = '<del>Lorem ipsum</del>';
    const expected = '~~Lorem ipsum~~';
    expect(htmlToMarkdown(input)).toBe(expected);
  });
});

describe('Task List Items', () => {
  it('should convert unchecked checkbox inputs', () => {
    const input = '<ul><li><input type=checkbox>Check Me!</li></ul>';
    const expected = '- [ ] Check Me!';
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should convert checked checkbox inputs', () => {
    const input = '<ul><li><input type=checkbox checked>Checked!</li></ul>';
    const expected = '- [x] Checked!';
    expect(htmlToMarkdown(input)).toBe(expected);
  });
});

describe('Tables', () => {
  it('should convert a basic table', () => {
    const input = `
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Column 1</td>
            <td>Row 1, Column 2</td>
          </tr>
          <tr>
            <td>Row 2, Column 1</td>
            <td>Row 2, Column 2</td>
          </tr>
        </tbody>
      </table>
    `;
    const expected = `| Column 1 | Column 2 |
| --- | --- |
| Row 1, Column 1 | Row 1, Column 2 |
| Row 2, Column 1 | Row 2, Column 2 |`;
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should handle cell alignment', () => {
    const input = `
      <table>
        <thead>
          <tr>
            <th align="left">Column 1</th>
            <th align="center">Column 2</th>
            <th align="right">Column 3</th>
            <th align="foo">Column 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Column 1</td>
            <td>Row 1, Column 2</td>
            <td>Row 1, Column 3</td>
            <td>Row 1, Column 4</td>
          </tr>
          <tr>
            <td>Row 2, Column 1</td>
            <td>Row 2, Column 2</td>
            <td>Row 2, Column 3</td>
            <td>Row 2, Column 4</td>
          </tr>
        </tbody>
      </table>
    `;
    const expected = `| Column 1 | Column 2 | Column 3 | Column 4 |
| :--- | :---: | ---: | --- |
| Row 1, Column 1 | Row 1, Column 2 | Row 1, Column 3 | Row 1, Column 4 |
| Row 2, Column 1 | Row 2, Column 2 | Row 2, Column 3 | Row 2, Column 4 |`;
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should handle th in first row', () => {
    const input = `
      <table>
        <tr>
          <th>Heading</th>
        </tr>
        <tr>
          <td>Content</td>
        </tr>
      </table>
    `;
    const expected = `| Heading |
| --- |
| Content |`;
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should handle th first row in tbody', () => {
    const input = `
      <table>
        <tbody>
          <tr>
            <th>Heading</th>
          </tr>
          <tr>
            <td>Content</td>
          </tr>
        </tbody>
      </table>
    `;
    const expected = `| Heading |
| --- |
| Content |`;
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should handle table with two tbodies', () => {
    const input = `
      <table>
        <tbody>
          <tr>
            <th>Heading</th>
          </tr>
          <tr>
            <td>Content</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>Heading</th>
          </tr>
          <tr>
            <td>Content</td>
          </tr>
        </tbody>
      </table>
    `;
    const expected = `| Heading |
| --- |
| Content |
| Heading |
| Content |`;
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should handle heading cells in both thead and tbody', () => {
    const input = `
      <table>
        <thead><tr><th>Heading</th></tr></thead>
        <tbody><tr><th>Cell</th></tr></tbody>
      </table>
    `;
    const expected = `| Heading |
| --- |
| Cell |`;
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should handle non-definitive heading row (converted but with empty header)', () => {
    const input = `
      <table>
        <tr><td>Row 1 Cell 1</td><td>Row 1 Cell 2</td></tr>
        <tr><td>Row 2 Cell 1</td><td>Row 2 Cell 2</td></tr>
      </table>
    `;
    const expected = `|     |     |
| --- | --- |
| Row 1 Cell 1 | Row 1 Cell 2 |
| Row 2 Cell 1 | Row 2 Cell 2 |`;
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should handle non-definitive heading row with th (converted but with empty header)', () => {
    const input = `
      <table>
        <tr>
          <th>Heading</th>
          <td>Not a heading</td>
        </tr>
        <tr>
          <td>Heading</td>
          <td>Not a heading</td>
        </tr>
      </table>
    `;
    const expected = `|     |     |
| --- | --- |
| Heading | Not a heading |
| Heading | Not a heading |`;
    expect(htmlToMarkdown(input)).toBe(expected);
  });
});

describe('Tables kept as HTML (turnish-complex-table-wrapper)', () => {
  it('should keep table with code block as HTML', () => {
    const input = `
      <table>
        <tr>
          <th>Code</th>
        </tr>
        <tr>
          <td><pre><code>console.log('hello');</code></pre></td>
        </tr>
      </table>
    `;
    const result = htmlToMarkdown(input);
    expect(result).toContain('<div class="turnish-complex-table-wrapper">');
    expect(result).toContain('<table>');
  });

  it('should keep table with unordered list as HTML', () => {
    const input = `
      <table>
        <tr>
          <th>Items</th>
        </tr>
        <tr>
          <td><ul><li>Item 1</li><li>Item 2</li></ul></td>
        </tr>
      </table>
    `;
    const result = htmlToMarkdown(input);
    expect(result).toContain('<div class="turnish-complex-table-wrapper">');
    expect(result).toContain('<table>');
  });

  it('should keep table with ordered list as HTML', () => {
    const input = `
      <table>
        <tr>
          <th>Steps</th>
        </tr>
        <tr>
          <td><ol><li>Step 1</li><li>Step 2</li></ol></td>
        </tr>
      </table>
    `;
    const result = htmlToMarkdown(input);
    expect(result).toContain('<div class="turnish-complex-table-wrapper">');
    expect(result).toContain('<table>');
  });

  it('should keep table with heading as HTML', () => {
    const input = `
      <table>
        <tr>
          <th>Content</th>
        </tr>
        <tr>
          <td><h2>Section Title</h2></td>
        </tr>
      </table>
    `;
    const result = htmlToMarkdown(input);
    expect(result).toContain('<div class="turnish-complex-table-wrapper">');
    expect(result).toContain('<table>');
  });

  it('should keep table with blockquote as HTML', () => {
    const input = `
      <table>
        <tr>
          <th>Quote</th>
        </tr>
        <tr>
          <td><blockquote>Famous quote here</blockquote></td>
        </tr>
      </table>
    `;
    const result = htmlToMarkdown(input);
    expect(result).toContain('<div class="turnish-complex-table-wrapper">');
    expect(result).toContain('<table>');
  });

  it('should keep table with horizontal rule as HTML', () => {
    const input = `
      <table>
        <tr>
          <th>Content</th>
        </tr>
        <tr>
          <td>Before<hr>After</td>
        </tr>
      </table>
    `;
    const result = htmlToMarkdown(input);
    expect(result).toContain('<div class="turnish-complex-table-wrapper">');
    expect(result).toContain('<table>');
  });

  it('should keep nested table as HTML when preserveNestedTables is true', () => {
    const turnish = new Turnish({ preserveNestedTables: true });
    turnish.use(gfm);
    const input = `
      <table>
        <tr>
          <th>Outer</th>
        </tr>
        <tr>
          <td>
            <table>
              <tr><td>Inner</td></tr>
            </table>
          </td>
        </tr>
      </table>
    `;
    const result = turnish.render(input);
    expect(result).toContain('<div class="turnish-complex-table-wrapper">');
    expect(result).toContain('<table>');
  });

  it('should not double-wrap table already in turnish-complex-table-wrapper', () => {
    const input = `
      <div class="turnish-complex-table-wrapper">
        <table>
          <tr>
            <th>Content</th>
          </tr>
          <tr>
            <td><ul><li>Item</li></ul></td>
          </tr>
        </table>
      </div>
    `;
    const result = htmlToMarkdown(input);
    // When already wrapped, it should output table HTML without adding another wrapper
    expect(result).toContain('<table>');
    // Should NOT have double-wrapped with new turnish-complex-table-wrapper
    expect(result).not.toContain('<div class="turnish-complex-table-wrapper"><div class="turnish-complex-table-wrapper">');
  });

  it('should convert simple table to Markdown (not kept as HTML)', () => {
    const input = `
      <table>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Foo</td>
          <td>Bar</td>
        </tr>
      </table>
    `;
    const result = htmlToMarkdown(input);
    expect(result).not.toContain('<div class="turnish-complex-table-wrapper">');
    expect(result).toContain('| Name | Value |');
    expect(result).toContain('| --- | --- |');
    expect(result).toContain('| Foo | Bar |');
  });
});

describe('Highlighted Code Blocks', () => {
  it('should convert highlighted code block with html', () => {
    const input = `
      <div class="highlight highlight-text-html-basic">
        <pre>&lt;<span class="pl-ent">p</span>&gt;Hello world&lt;/<span class="pl-ent">p</span>&gt;</pre>
      </div>
    `;
    const expected = `\`\`\`html
<p>Hello world</p>
\`\`\``;
    expect(htmlToMarkdown(input)).toBe(expected);
  });

  it('should convert highlighted code block with js', () => {
    const input = `
      <div class="highlight highlight-source-js">
        <pre>;(<span class="pl-k">function</span> () {})()</pre>
      </div>
    `;
    const expected = `\`\`\`js
;(function () {})()
\`\`\``;
    expect(htmlToMarkdown(input)).toBe(expected);
  });
});
