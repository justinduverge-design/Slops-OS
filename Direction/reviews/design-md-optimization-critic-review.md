# design-md_ optimization-critic-review.md  
## Phase 1 — Immediate Critique  
### What Looks Strong  
 * **Repo-Native Context:** Placing design.md at the root for tools like Claude Code or Cursor is a highly practical, low-friction win. It leverages how modern coding agents natively pull system context.  
 * **Semantic Over Raw Hex:** Forcing the LLM to think in roles (primary, on-surface) rather than raw hex codes is excellent. LLMs excel at functional relationships, and semantic tokens give them the "why" behind a design choice.  
 * **The Power of Negative Constraints:** Highlighting that "Do's and Don'ts" (especially "Never") are load-bearing aligns perfectly with established LLM steering behavior. Negative prompts consistently prevent agent drifting better than open-ended positive guidelines.  
### Weak Assumptions  
 * **The "40-Minute" Draft Time:** The claim that a high-quality design.md takes roughly 40 minutes to write is wildly optimistic. For any non-trivial application, auditing a Figma file, resolving design debt, translating choices into semantic tokens, and writing crisp negative constraints will take hours—if not days.  
 * **Local Models Closing the Gap:** The idea that a 2-page Markdown file will elevate local models (like Qwen or Gemma) to frontier-level UI performance is fragile. UI generation requires deep spatial reasoning and complex code layout capabilities; a token list cannot fully compensate for a model's underlying architectural limitations in layout logic.  
### Research Gaps  
 * **The Engineering Glue:** The research notes a tension between token references and structured code snippets, but leaves it completely unresolved. If our codebase uses Tailwind CSS or shadcn/ui, how does the agent bridge the gap between a markdown token and an actual utility class without blowing past its context token budget?  
 * **Multi-Theme Architecture:** Acknowledging that "sources disagree" on dark/light mode isn't enough. Leaving this as an open question creates a high risk of implementation failure, as agents will easily confuse theme-switching logic if the document structure is ambiguous.  
### Complexity Bias Check  
 * **The CI/CD Linter Trap:** The research glosses over the phrase "verifiable infrastructure via @google/design.md CLI." Integrating automated design linting into a CI/CD pipeline sounds elegant, but parsing dynamic, AI-generated code components to ensure they strictly map to a static Markdown spec is a massive engineering headache that requires complex Abstract Syntax Tree (AST) parsing.  
### Overbuilding Risk  
 * **The Three-Layer Architecture:** Suggesting a strict split between Behavior (CLAUDE.md), Task (requirements.md), and Appearance (design.md) creates significant documentation overhead. For small teams or solo developers, managing three separate files increases the risk of documentation drift and cognitive load, neutralizing the exact speed advantages of "vibe coding."  
## Phase 2 — Interview Questions  
 1. **[Maintenance]** If a designer updates a padding value or a color hex in Figma tomorrow, what is the *exact* operational workflow to update design.md before a developer runs an AI coding agent? Who owns that update?  
 2. **[Feasibility]** You mention a strict 2-page "focus limit" to prevent the agent from losing track of instructions. How do you plan to compress an overview, colors, typography, layout, elevation, shapes, components, and a "Do's and Don'ts" list into that space without stripping out the actual details the AI needs to build?  
 3. **[MVP Reality]** If we are aiming for speed, why should we invest time setting up emerging automation tools like Google Stitch or Banani AI rather than simply writing a single, static 1-page Markdown file by hand and iterating?  
 4. **[Missing Context]** How does design.md interface with our existing component library? Does the AI write raw CSS variables, or does it need to map these tokens directly to a pre-configured configuration file like tailwind.config.js?  
 5. **[Business Value]** Given that a senior developer can manually fix a minor UI hallucination or layout bug in a few minutes, does spending hours drafting and maintaining a comprehensive design schema provide a measurable return on investment for an MVP?  
## Phase 3 — Effectiveness Review  
### Is This:  
 * **Moderate-value research**  
> *Critique:* The core premise is excellent—giving AI agents a localized "visual brain" radically improves consistency. However, the current research relies too heavily on optimistic time estimates (40 minutes) and theoretical toolchains (CLI linting) rather than the messy reality of code integration.  
>   
### Should This Be:  
 * **REDUCE**  
> *Action:* Strip away the complex automated syncing, the 3-layer document split, and the CI/CD linting infrastructure. Focus exclusively on a single, ultra-lean, root-level Markdown file optimized for context windows.  
>   
### Biggest Risk  
 * **Token Drift Fatigue:** The file will likely be treated as a "set and forget" asset. Within three weeks of rapid product iteration, the codebase will evolve, the design.md will become a legacy contract, and the AI agent will start generating technical debt based on outdated tokens.  
### Missing Decision  
 * **The Framework Translation Standard:** You must decide *how* the tokens are represented. Will the file list raw CSS custom properties (e.g., --color-primary), Tailwind configuration keys, or purely abstract functional names that require a secondary configuration file to function?  
## DBS Routing  
Recommend path: Direction/Reviews/design-md-optimization-critic-review.md  
