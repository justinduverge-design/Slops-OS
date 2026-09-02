# Walkthrough format

One file per console step, written for someone who has never opened the console.
Assume competence, assume zero familiarity.

---

## <Step ID> — <what this accomplishes, in plain words>

**Console:** <App Store Connect / Play Console / provider portal>
**Verified against vendor docs:** YYYY-MM-DD — <primary source URL>
**Lead time:** <clicking time + any review wait, stated separately>
**Blocks:** <what cannot happen until this is done>
**Blocked by:** <what must be done first, or "nothing">

### What you are actually doing

<Two or three sentences, no jargon, before any field is named. Why this step exists
at all. A first-timer who understands the purpose recovers from a surprising screen;
one following clicks does not.>

### Getting there

<Exact navigation. "Sign in → the page that lists your apps → the + button at the
top left." Say what the page looks like on arrival, because consoles rename things
and a visual anchor survives a rename better than a label.>

### Field by field

| Field | What it wants | If you get it wrong | Changeable later? |
|---|---|---|---|
| | | | **This column is the most valuable one. Fill it in.** |

### What "done" looks like

<The observable state change. Not "the form submits" — the badge that appears, the
status that flips, the build that shows up in a list. If done means "wait for an
email," say so and say roughly how long.>

### If it goes wrong

<The two or three failures a first-timer actually hits here, and what each means.
An error message that names its real cause belongs here verbatim.>

### What breaks if you skip this

<The downstream failure. This is what makes the ordering obvious instead of arbitrary.>
