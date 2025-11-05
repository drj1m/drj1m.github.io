import markdownIt from 'markdown-it';

export default function(eleventyConfig) {
  // Assets passthrough
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'src/favicon.ico': 'favicon.ico' });
  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': 'robots.txt' });

  // Markdown engine + a markdownify filter for Nunjucks
  const md = markdownIt({ html: true, linkify: true, typographer: true });
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addFilter('markdownify', (content) => md.render(content || ''));

  // Collections
  eleventyConfig.addCollection('projects', c => c.getFilteredByGlob('src/projects/*.md'));
  eleventyConfig.addCollection('publications', c => c.getFilteredByGlob('src/publications/*.md'));
  eleventyConfig.addCollection('talks', c => c.getFilteredByGlob('src/talks/*.md'));

  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
}