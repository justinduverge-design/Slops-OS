design-md-patterns   
## Research Goal  
**What are the structural patterns and practical implementation realities of using `design.md` to guide AI agents in generating brand-consistent user interfaces?**  
  
---  
  
### 1. Repeated Patterns  
*   **The Hybrid Structure:** Trustworthy sources consistently define `design.md` as a two-layer document combining **machine-readable YAML front matter** (tokens) and **human-readable Markdown prose** (rationale) [1-3].   
*   **Token-Role Mapping:** A recurring signal is that **semantic naming** (e.g., `primary`, `on-surface`) is more effective than raw hex codes because it teaches the AI the *role* a value plays rather than just the value itself [4-7].  
*   **Canonical Section Order:** Sources converge on a specific sequence for ## headings: **Overview**, **Colors**, **Typography**, **Layout**, **Elevation**, **Shapes**, **Components**, and **Do's and Don'ts** [8-10].  
*   **Negative Constraints:** The "Do's and Don'ts" section, particularly the **"Avoid" or "Never" lines**, is repeatedly cited as being more "load-bearing" for steering AI behavior than positive instructions [11-14].  
*   **Repo-Native Context:** There is a strong pattern of placing the file at the **repository root** so coding agents like Claude Code or Cursor can automatically ingest it as persistent context [15-18].  
  
### 2. Contradictions  
*   **Dual Theme Implementation:** Sources disagree on the standard for expressing **dual dark/light themes**; some recommend splitting the Colors section into subsections, while others note a established standard has not yet emerged [19, 20].  
*   **Component Specification Granularity:** There is tension between defining components as **simple token references** (e.g., `button-primary`) versus providing **structured code snippets** or React/Tailwind definitions [21-23].  
*   **Scope Boundaries:** While most agree `design.md` is for "looks" and `CLAUDE.md` is for "works," some sources suggest merging them for smaller teams, while others insist on a strict **three-layer split** (Behavior, Task, Appearance) [4, 24, 25].  
  
### 3. Tradeoffs  
*   **Specificity vs. Flexibility:** Writing actual numbers (e.g., `16px`) instead of Figma style names ensures the agent can implement immediately, but increases the **maintenance burden** when the source design system changes [11, 26, 27].  
*   **Upfront Effort vs. Generation Accuracy:** Creating a high-quality `design.md` requires roughly **forty minutes of focused drafting**, but reportedly cuts the rate of "bad generations" by more than half [28, 29].  
*   **File Length vs. Agent Focus:** Documents longer than two pages are noted to cause **loss of agent focus**, necessitating a tradeoff between comprehensive documentation and effective AI steering [11, 30].  
  
### 4. Risk Signals  
*   **Design System Drift:** Without version control (Git) and regular audits every six months, the `design.md` file risks becoming an **outdated contract**, leading the AI to generate legacy UI patterns [11, 31, 32].  
*   **Hallucination of Details:** Even with a spec, AI agents may still **misapply colors or mutate corner radii** if the tokens are not defined as absolute values rather than ranges [13, 33].  
*   **Licensing and Compliance:** Automatically extracting a `design.md` from a URL can lead to the accidental use of **proprietary fonts** (e.g., SF Pro) or non-compliant **WCAG contrast ratios** if the linter is not used [31, 34, 35].  
  
### 5. Small Company / Solo Developer Outlook  
*   **Closing the Model Gap:** For solo developers, a structured `design.md` allows **smaller or local models** (like Qwen or Gemma) to perform at a level near frontier models on UI tasks [36, 37].  
*   **MVP-First Benefits:** Using community libraries (e.g., *awesome-design-md*) allows small teams to **"drop in" a brand's taste** immediately, bypassing the need for a dedicated designer [16, 38].  
*   **Operational Overhead:** While helpful, manual maintenance is a risk; tools like **Google Stitch** or **Banani AI** are emerging to automate the generation and syncing of these files to reduce the burden [39-41].  
  
### 6. Deep Research Takeaways  
*   **"Vibe Coding" Fix:** The primary research signal is that `design.md` serves as a **"visual brain"** that prevents AI agents from defaulting to generic, off-brand styles [15, 38, 42].  
*   **Verifiable Design:** The release of the **@google/design.md CLI** transforms design systems from passive references into **verifiable infrastructure** that can be linted in CI/CD pipelines [34, 43-45].  
*   **The "Roles" Concept:** Advanced implementation treats tokens as **"named decisions"** or roles (e.g., `neutral` is the color the user is emotionally neutral to) rather than just CSS variables [46-48].  
  
### 7. Open Questions  
*   **Large-Scale Decomposition:** It remains unclear how to best manage `design.md` for **multi-brand or extremely complex systems** once the file exceeds the two-page "focus limit" [11, 49].  
*   **Cross-Reference Standards:** The pattern for **transient feature specs** (like `requirements.md`) referencing persistent tokens in `design.md` is theorized but lacks widespread public examples [50, 51].  
*   **Unified Component Schema:** While color and typography schemas are stabilizing, the **Component Tokens section** is still documented as a "work in progress" and "actively evolving" [23, 48, 52].  
  
---  
  
## Output Rule  
This analysis surfaced repeated patterns regarding the dual-layer YAML/Markdown structure, the critical role of negative constraints, and the emergence of verification tooling. It avoids recommendations for specific projects.  
