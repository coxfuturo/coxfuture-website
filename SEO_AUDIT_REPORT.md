# CoxFuture SEO Audit and Remediation Report

## Scope and baseline

The complete local website was inventoried before changes. The crawl identified **45 HTML pages** across the homepage, services, domestic services, industries, company pages, the blog index, and 13 blog articles. A Git rollback checkpoint was created before edits at commit `2523aed` (`chore: checkpoint before SEO audit`). Existing URLs, visual presentation, navigation structure, content, and functionality were preserved.

## Key findings

| Area | Finding | Priority |
|---|---|---:|
| Sitemap | `sitemap.xml` was malformed and contained only a partial URL set, including legal pages that should not be promoted in search. | High |
| Internal links | Many navigation links used lowercase `gmb.html` while the actual production filename is `GMB.html`; root `blog.html` also used parent-relative paths that resolve outside the site. | High |
| Indexing | The privacy policy had an `index, follow` directive. Terms and privacy pages are utility/legal pages and should not be indexed. | High |
| Headings | The contact page had no H1; its existing primary section heading was promoted without changing the copy or layout. | Medium |
| Structured data | Most service pages and the homepage had no structured data; one article also lacked article markup. | Medium |
| Existing strengths | All 45 pages already had titles, descriptions, self-referencing HTTPS canonicals, and—after the contact correction—one H1. | — |

## Changes applied

The remediation was intentionally narrow. All existing URLs and page content were retained. The site now has a valid sitemap containing **43 canonical, useful HTML URLs**, excluding privacy and terms pages. `robots.txt` already allowed crawling and declared `https://coxfuture.com/sitemap.xml`, so it was left unchanged.

Internal links were corrected for case-sensitive hosting and for the root blog page. The privacy and terms pages now use `noindex,follow`; no automatic noindex rules were applied to other pages. The contact page now has exactly one H1 using its existing text, “Let's Build Something Great.”

The homepage now includes Organization and WebSite JSON-LD based only on existing brand, logo, and visible social-profile information. Service pages now include Service JSON-LD derived from their existing page titles, descriptions, canonical URLs, and the CoxFuture brand. The older website-features article now includes BlogPosting JSON-LD using its existing title, description, featured image, author label, publisher logo, and canonical URL. No ratings, reviews, awards, pricing, locations, or other unsupported claims were added.

## Validation

The final checks produced the following results:

- **45 HTML pages** inventoried.
- **0 broken local internal links** reported by the post-change validator.
- **0 pages missing a canonical tag**.
- **43 sitemap URLs** parsed successfully as XML.
- **41 JSON-LD blocks** parsed successfully; no JSON syntax errors.
- **45 pages** retain one H1 after the contact-page correction.
- Privacy and terms are excluded from the sitemap; both use `noindex,follow`.

## Recommended next steps outside this code change

After deployment, submit or re-submit the sitemap in Google Search Console, verify the preferred HTTPS/non-www host and redirects at the server/CDN layer, and run PageSpeed Insights or Lighthouse against production. Core Web Vitals work should be guided by field data; no speculative visual or asset changes were made in this minimal-change pass.
