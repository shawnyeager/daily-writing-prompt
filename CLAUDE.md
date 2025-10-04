# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file HTML application that provides daily writing prompts for reflective, analytical, non-fiction writing. The entire application is contained in `daily-prompt.html` with no external dependencies or build process required.

## Architecture

- **Single-file application**: All HTML, CSS, and JavaScript are contained in `daily-prompt.html`
- **Pure client-side**: No server, no external dependencies, works offline
- **Data structure**: 568 writing prompts stored as a template literal string at line 147 in format: `Category | Prompt text`
- **Daily rotation**: Uses day-of-year calculation to show a different prompt each day
- **Navigation**: Previous/Next/Random buttons allow browsing all prompts

## Key Components

- **Prompt data** (lines 147-568): Template literal containing all prompts in pipe-delimited format
- **Parsing logic** (lines 571-578): Converts raw prompt data into structured objects
- **Display logic** (lines 590-604): Updates DOM with current prompt information
- **Navigation functions** (lines 620-633): Handle prompt switching
- **Copy functionality** (lines 606-618): Clipboard integration with user feedback

## Development Guidelines

### Adding New Prompts
- Edit the `promptData` template literal (around line 147)
- Follow format: `Category | Prompt text`
- Focus on analytical/reflective questions, not creative fiction
- Categories should match existing themes (see README for full list)

### Code Style
- Uses modern JavaScript (ES6+)
- Vanilla JavaScript, no frameworks
- Responsive CSS with CSS Grid/Flexbox
- Mobile-first design approach

### Testing
Since this is a single HTML file with no build process:
- Open `daily-prompt.html` in a web browser to test
- Test navigation buttons, copy functionality, and responsive design
- Verify prompt rotation by changing system date or checking day calculation

## File Structure
```
daily-writing-prompt/
├── README.md           - Project documentation
└── daily-prompt.html   - Complete application (HTML/CSS/JS)
```

## No Build Process
This project intentionally has no build tools, package.json, or external dependencies. It's designed to be a simple, portable HTML file that works in any modern browser.
- Do not push a commit without asking about bumping the release number