# Swedish Writing-First Coach

**An instruction-driven AI language-learning prototype built around writing, realistic conversations, track-changes-style editing and active vocabulary retrieval.**

This project explores how a language coach can help adult learners turn *passive understanding* into *spontaneous communication*, especially in job interviews, workplace conversations and contemporary-art writing.

[Explore the case-study demo](docs/index.html) · [Read the skill instructions](SKILL.md) · [View the 24-lesson course](references/COURSE_PLAN.md)

## The problem

A learner may understand complex Swedish but struggle to produce it quickly or confidently. Traditional vocabulary lists can increase recognition without improving retrieval. The design challenge was to support genuine language production while preserving professional and artistic nuance.

## The solution

A reusable AI coaching workflow, expressed as a portable `SKILL.md` plus supporting curriculum and learning-log structure. It guides an AI coach to:

1. **Elicit first:** ask the learner to try before giving them the target Swedish vocabulary.
2. **Correct visibly:** reproduce the original text with only incorrect spans struck through and their replacements inserted immediately after.
3. **Explain contextually:** give thorough grammar, word-order, vocabulary and register feedback, without turning every lesson into a grammar lecture.
4. **Model and mimic:** offer adaptable sentences that the learner rewrites using their own content.
5. **Activate vocabulary:** track missing words and recurring patterns, then revisit them in later sessions.
6. **Stay practical:** combine job interviews, business/marketing/product communication, contemporary art and tiny everyday interactions.

## The learning experience

**24 lessons / six modules:**

| Module | Lessons | Focus |
|---|---:|---|
| Everyday interactions and first impressions | 1–3 | Café requests, office arrival, small talk |
| Job interviews and professional identity | 4–9 | Experience, achievements, difficult questions, full mock interviews |
| Marketing, content and business | 10–13 | Briefs, strategy, campaigns, measurement |
| Product marketing and product management | 14–17 | User needs, prioritization, launches, stakeholder conversations |
| Contemporary art and artistic practice | 18–22 | Artist statements, critique, funding applications, curator outreach |
| Advanced communication and simulations | 23–24 | Negotiation, difficult conversations, integrated assessments |

A typical session uses 5 minutes of everyday conversation, 10–15 minutes of scenario practice, 15–20 minutes of original writing, 10–15 minutes of corrections and 5 minutes of imitation or recall. Optional homework is available but never required.

## Example: editorial feedback

**Learner's original:**

> Jag också jobbar med min egna ide.

**Inline tracked correction:**

> Jag ~~också jobbar~~ **jobbar också** med ~~min egna ide~~ **min egen idé**.

The coach then explains the word order and agreement, highlights any new vocabulary and asks the learner to adapt one or two natural sentence patterns. It distinguishes errors from optional stylistic improvements.

**See the [full fictional lesson example](references/EXAMPLE_LESSON.md).**

## How the package is organized

```text
SKILL.md                          Core coaching instructions and correction rules
references/COURSE_PLAN.md         Full 24-lesson syllabus and exercise design
references/SESSION_TEMPLATE.md    Repeatable lesson and feedback template
references/LEARNING_LOG_TEMPLATE.md  Blank, privacy-safe progress record
references/EXAMPLE_LESSON.md      Fictional worked example
docs/index.html                   Static case-study/demo page
```

## Design decisions

- **Writing first, not writing only:** production and conversation reinforce each other.
- **Visible revisions instead of silent rewriting:** the learner sees exactly what changed.
- **Real work and real life:** the course includes both specialized professional language and small, high-frequency social interactions.
- **Mimicry as a bridge:** reusable sentence frames help transfer phrases into new contexts.
- **Privacy-aware by design:** the repository includes an empty log template, not learner data.
- **Honest state management:** a skill should never claim to have saved progress unless a connected file or tool actually did so.

## How to use

Provide `SKILL.md` and the reference documents to a compatible AI assistant or workspace that supports instruction files. Start with a lesson number or an urgent real-world task. Maintain a **private** copy of the learning log for ongoing progress. An instruction file alone does **not** guarantee cross-session persistence or automatic execution in every ChatGPT account.

## Status and limits

**Status: Portable skill prototype and curriculum design.** The package contains detailed runnable *instructions* and a fictional worked example. It is **not** a deployed learning platform, live AI API integration or tested outcomes study. The HTML demo is static and illustrates the proposed coaching experience. Actual long-term recordkeeping requires a suitable writable tool or document integration.

## Skills demonstrated

AI workflow design · Prompt/instruction design · Learning-experience design · Structured content systems · Editing and feedback design · Product thinking · UX writing · Documentation

---

Built collaboratively through iterative user requirements and AI-assisted development. The author led the requirements, priorities and iterative design decisions; an AI assistant helped structure and produce the curriculum and skill files.