# BestAI

SEO-focused AI-tool guide site for `bestai.website`.

## Guides

- `/articles/best-ai-image-generators`
- `/articles/best-free-ai-image-generators`
- `/articles/best-free-ai-video-generators`
- `/articles/best-ai-video-generators`
- `/articles/best-free-ai-image-expanders`

Each article renders a server-generated title, description, canonical URL, top-10 list, FAQ, sitemap entry, and `Article` structured data that identifies the gated section. Full guide text is in the HTML so search engines can crawl the same article visitors unlock.

## Lead capture and search tracking

The guide unlock form requires an explicit acknowledgement before sending a phone number to `/api/leads`. Numbers are stored as private JSON blobs with the guide and timestamp. Submitted site searches are stored separately at `/api/events` and do not include a phone number. The site sends no SMS messages. Private storage requires `BLOB_READ_WRITE_TOKEN`; attach a **private** Vercel Blob store to the Vercel project to turn on storage. Without that variable, the site fails closed and clearly reports that capture is not configured.

Deletion requests are directed to `asherb@lurid.dev` on the privacy page. Search terms may include personal information; the search UI warns visitors not to enter sensitive or confidential data.

## Run locally

```sh
npm install
npm run dev
```

Without a Vercel Blob token, the guide page and search UI render, but phone unlock submission will report that storage is not configured.

## Editorial note

Free plans, quotas, and model availability change often. The current editorial review date is in each guide. The linked product pages are the source of truth for each provider's current limits; review the comparisons regularly.
