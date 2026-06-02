# App Scaffold — Usage

This is the canonical **Layer 2 (product/app)** DBS scaffold. Copy it to start a new app
under a division so the new repo is DBS-conformant from the first commit — instead of
cloning Corvus and stripping out its source, secrets, and `node_modules`.

## How to instantiate a new app

1. Copy this folder to the target division:

   ```text
   SLOPS/<division>/<app-slug>/
   ```

   Example: `SLOPS/slops-saloon/my-new-app/`

2. Delete `USAGE.md` from the copy (it is scaffold meta, not app content).

3. Replace every placeholder token across the copied files:

   | Token               | Meaning                                 | Example                           |
   | :------------------ | :-------------------------------------- | :-------------------------------- |
   | `{{APP_NAME}}`      | Human-readable product name             | `Corvus`                          |
   | `{{app-slug}}`      | Folder/repo slug                        | `corvus`                          |
   | `{{DIVISION}}`      | Parent Layer 1 division name            | `Slops Saloon`                    |
   | `{{division-slug}}` | Parent division folder slug             | `slops-saloon`                    |
   | `{{ONE_LINER}}`     | One-sentence description of the product | `Fantasy football decision layer` |

4. Initialize the app's own git repo (Layer 2 stays a **separate** git decision lane):

   ```text
   cd SLOPS/<division>/<app-slug>/
   git init
   ```

5. Add the new app path to the SLOPS root `.gitignore` so the OS repo does not track app source:

   ```text
   <division-slug>/<app-slug>/
   ```

## DBS baseline this scaffold guarantees

Root files: `context.md`, `DBS_INDEX.md`, `README.md`, `AGENTS.md`, `CLAUDE.md`
DBS folders: `Direction/`, `Blueprints/`, `Solutions/`, `References/`, `Archive/`

App-specific folders (`src/`, `frontend/`, `sql/`, `scripts/`, `.github/`, etc.) are added
later by the app and do not replace these baseline context files.
