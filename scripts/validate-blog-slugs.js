#!/usr/bin/env node

/**
 * Validates that blog post filenames match their frontmatter slugs
 * This prevents 404 errors from slug/filename mismatches
 *
 * Usage:
 *   node scripts/validate-blog-slugs.js
 *   npm run validate:slugs
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

function validateBlogSlugs() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  const errors = [];

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    const filenameSlug = path.basename(file, '.mdx');
    const frontmatterSlug = data.slug;

    if (!frontmatterSlug) {
      errors.push({
        file,
        error: 'Missing slug in frontmatter'
      });
    } else if (filenameSlug !== frontmatterSlug) {
      errors.push({
        file,
        filenameSlug,
        frontmatterSlug,
        error: 'Filename does not match frontmatter slug'
      });
    }
  }

  return errors;
}

function main() {
  console.log('🔍 Validating blog post slugs...\n');

  const errors = validateBlogSlugs();

  if (errors.length === 0) {
    console.log('✅ All blog post filenames match their slugs!');
    process.exit(0);
  } else {
    console.error(`❌ Found ${errors.length} validation error(s):\n`);

    errors.forEach((err, i) => {
      console.error(`${i + 1}. ${err.file}`);
      if (err.filenameSlug && err.frontmatterSlug) {
        console.error(`   Filename slug: ${err.filenameSlug}`);
        console.error(`   Frontmatter slug: ${err.frontmatterSlug}`);
        console.error(`   → Rename file to: ${err.frontmatterSlug}.mdx`);
      } else {
        console.error(`   ${err.error}`);
      }
      console.error('');
    });

    console.error('💡 Fix these issues before deploying to prevent 404 errors.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateBlogSlugs };
