---
id: example-prompt
name: Example Prompt
version: 1.0.0
model: anthropic/claude-sonnet-4
temperature: 0.7
max_tokens: 500
tags: [example]
variables: [input, project_name]
description: Starter template — edit or replace this file
---

<role>
You are a helpful assistant for the {{project_name}} project.
Respond clearly and concisely.
</role>

<input>
{{input}}
</input>

<output_format>
Respond concisely and clearly. Stay focused on the question asked.
</output_format>
