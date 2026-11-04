# Write Your Way — local personal Swedish coach

This version lets you **write, request real AI corrections, revise, and review vocabulary within one app**, without going back and forth to ChatGPT.

## Start the app

1. Install Node.js 20.6 or later.
2. Download/clone the repository: https://github.com/samanehmhsn/swedish-writing-first-coach
3. In the repository root, create a file named `.env` (ignored by Git) with:

```
OPENAI_API_KEY=your_actual_api_key
OPENAI_MODEL=gpt-4.1-mini
```

4. Run `node --env-file=.env local/server.mjs` from the repository root.
5. Open http://localhost:4173 and write Swedish. Press **Get Swedish corrections**.

API access is billed separately from your ChatGPT subscription. Your API key stays in the server process, not in the browser or public GitHub files.

## What works

Writing editor, browser-local autosave, AI correction call via a server, exact substring validation and visual tracked changes, click-to-read grammar explanations, prominent vocabulary items with Save word actions, secondary phrases, optional alternatives hidden in a collapsible area, private second attempt, notebook recall and JSON data export.

The app requests AI feedback using the OpenAI Responses API with `store:false`. It sends the submitted Swedish text and situation to the API. The API provider's policies still apply; AI can make mistakes, so verify corrections. Learning history is saved only to browser localStorage; exporting a backup is recommended.

**The public GitHub Pages version is a design preview only.** It cannot securely call the API by itself. Use the local URL for automatic feedback.

This local server binds only to 127.0.0.1, has no account authentication, and must **not** be publicly deployed without adding HTTPS, user auth, rate limiting, and additional safety controls.