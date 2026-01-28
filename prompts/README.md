# Prompts

This folder is managed by **Prompt Forge**.

Add your prompt files here as `.md` files with YAML frontmatter and XML content tags.
They'll appear in the Prompt Forge file tree automatically.

## Format

Each prompt is a `.md` file with:
- **YAML frontmatter** — `id`, `model`, `temperature`, `variables`, etc.
- **XML tags** — `<role>`, `<input>`, `<output_format>` for structured content
- **Variables** — `{{variable_name}}` syntax for dynamic values

## Getting Started

1. Create a new prompt file (e.g., `my-prompt.md`)
2. Open Prompt Forge to view, edit, and improve your prompts
3. Run evals directly from the UI

See [Prompt Standards](https://github.com/your-org/prompt-forge/blob/main/docs/prompt-standards.md) for the full specification.

---
*Created by Prompt Forge*
