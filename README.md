# Your Project's Title...
Your project's description...

---

## Lottie animations

This project uses **Lottie** for vector animations in AEM Edge Delivery Services. Animations are authored in After Effects, exported as JSON, and rendered in the browser by the lottie-web library (SVG renderer only).

### How Lottie works (technical flow)

```text
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  After Effects      │     │  Bodymovin plugin   │     │  JSON file          │
│  (designer creates  │ ──► │  (export)            │ ──► │  (animation data +   │
│   animation)        │     │                     │     │   keyframes, paths)  │
└─────────────────────┘     └─────────────────────┘     └──────────┬──────────┘
                                                                     │
                                                                     ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  Browser            │     │  lottie-web         │     │  Website loads      │
│  draws animation    │ ◄── │  (JS library       │ ◄── │  JSON + script      │
│  (vector, scalable) │     │   renders via      │     │                     │
└─────────────────────┘     │   SVG / Canvas /    │     └─────────────────────┘
                            │   HTML)             │
                            └─────────────────────┘
```

| Step | What happens |
|------|----------------|
| 🎨 | Designer creates animation in **After Effects** |
| 📦 | Exports as **JSON** using **Bodymovin** (LottieFiles AE) |
| 🌐 | Website loads the JSON (from block folder or URL) |
| ⚡ | **lottie-web** renders in the browser using **SVG** (default here), Canvas, or HTML |
| 👉 | Animation is **vector-based** → lightweight, scalable, interactive, controllable via JS |

### Implementation in this project (EDS)

- **Blocks:** `lottie-animation`, `lottie-animation-v1` … `lottie-animation-v8` (each has a default JSON; authors can override via block table `animation` column).
- **Renderer:** **SVG only** (Canvas/HTML not used; avoids CSP and reduces payload).
- **Script:** `lottie_light.min.js` (SVG-only build) loaded **async** when a Lottie block enters the viewport (lazy).
- **JSON:** Stored in block folders (e.g. `blocks/lottie-animation/dop.json`, `blocks/lottie-animation-v1/swivel.json`) so no cross-origin fetch; cache-friendly.

### Best practices (EDS)

| Practice | Reason |
|----------|--------|
| Use **local JSON** in block folders | No CORS; works with EDS preview/live; cacheable. |
| Use **lottie_light** (SVG-only) | Smaller bundle, less unused JS, better TBT/Lighthouse. |
| Load script **when block is in view** | Defers parse/execute; better LCP and TBT. |
| **Strip/expand AE expressions** in JSON before play | Expression evaluator can fail on EDS; we expand `loopOut('cycle')` and strip `.x` in code. |
| **Text vs outlines** | Editable text → change strings in JSON. Logo/outlined text → vector paths; edit in AE or hide layer (`"hd": true`) in JSON. |
| **Cache** | After editing JSON, hard refresh or use `?v=2` on the animation path to avoid stale cache. |

### Editing animations (JSON only)

- **Text layers:** Replace the string in the JSON (e.g. find `"Gigamon"` → `"LorenIpsum"`).
- **Logo / outlined text:** Rendered as shape paths; no string to replace. Hide the layer in JSON (`"hd": true` on that layer) or re-export from AE with new art.
- **Colors, opacity, numbers:** Safe to tweak in JSON; keep valid JSON (no trailing commas).

---

## Environments
- Preview: https://main--lottie-animation--meejain.aem.page/
- Live: https://main--lottie-animation--meejain.aem.live/

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
