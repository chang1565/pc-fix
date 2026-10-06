# PC FIX languages

Supported languages: Korean (`/`), English (`/en`), Japanese (`/ja`), Simplified Chinese (`/zh-CN`).

The language selector keeps the current problem/error slug, search query and URL fragment. Category names are mapped through `data/categoryLocales.json`. Navigation within each language stays in that language. Language changes use a full navigation so the correct root layout and HTML `lang` attribute are served.

Korean page sources live in `app/(ko)`. The route group does not change existing public URLs. `data/problems.ts` and `data/errorCodes.ts` remain the content sources.

Translations are stored in `data/locales/en.json`, `ja.json` and `zh-CN.json`. They include the UI, all 217 problems, all 80 errors, instructions, FAQs and SEO text. Identifiers, commands and related slugs are preserved. `uiOverrides.json` contains reviewed wording and manual corrections. The full body translations are machine-generated drafts and have not received native-language editorial review.

On 2026-10-07, a first technical translation review corrected symptom titles, categories, error descriptions, selected troubleshooting instructions and recurring terms throughout the dictionaries. Corrections include memory/driver terminology, crash and sleep wording, missing runtime components, powered-on/no-display descriptions, per-app audio symptoms, and diagnostic checks incorrectly translated into commands to change settings. PC FIX remains untranslated in all locales. This is a technical review and targeted corpus correction, not a line-by-line native-language editorial certification of all body text. Regression checks cover known meaning inversions, brand preservation and incorrect technical terminology in addition to commands, links and search.

Generated files in `app/en`, `app/ja`, `app/zh-CN`, `components/locales` and `lib/locales` should not be edited directly. Update the Korean source or translation dictionaries and regenerate:

```text
node scripts/generate-locales.mjs
node scripts/check-locales.mjs
npx tsc --noEmit
npm run lint
npm run build
```

For new Korean content, `node scripts/translate-content.mjs` fills missing dictionary entries, then the generator applies manual overrides. This development tool uses a public Google translation endpoint that is not a contracted Cloud Translation API; availability during regeneration is not guaranteed. Pages serve saved translations without contacting any translation service at runtime.

Each page has a language-specific canonical URL, links to other languages through hreflang, and localized article language metadata. The sitemap contains 1,284 public URLs across four languages. This makes foreign-language pages crawlable; indexing is determined by search engines.
