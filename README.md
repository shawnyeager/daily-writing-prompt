# Daily Writing Prompt

A single-file HTML app that provides one thought-provoking writing prompt each day. Designed for reflective, analytical, non-fiction writing practice.

![Daily Writing Prompt Screenshot](screenshot.png)

## Features

- **365 unique prompts** - One for every day of the year
- **Automatic daily rotation** - Shows today's prompt based on day of year
- **Works offline** - No internet connection required
- **Zero dependencies** - Pure HTML/CSS/JavaScript
- **One-click copy** - Copy prompts to clipboard instantly
- **Navigation controls** - Browse forward, back, or random
- **Categories** - Prompts organized by theme (Predictions, Ethics, Systems Thinking, etc.)

## How to Download and Use

### Step 1: Download the File
1. **Click this link**: [daily-prompt.html](https://raw.githubusercontent.com/shawnyeager/daily-writing-prompt/master/daily-prompt.html)
2. **Save the file**: Your browser will either download it automatically or ask where to save it
   - Choose a location you'll remember (like Desktop or Documents)
   - Make sure it saves as `daily-prompt.html` (not `.txt`)

### Step 2: Open the App
1. **Find the downloaded file** on your computer
2. **Double-click** `daily-prompt.html` to open it in your web browser
3. **Bookmark it** for easy access each day

### Alternative Download Method
If the direct link doesn't work:
1. Go to the [project page](https://github.com/shawnyeager/daily-writing-prompt)
2. Click on `daily-prompt.html`
3. Click the "Raw" button
4. Right-click on the page and select "Save As..."
5. Save the file to your computer

**That's it!** The app works completely offline - no internet needed after downloading.

## Usage

Open the page daily to see today's prompt. Use the buttons to navigate between prompts or copy to clipboard.

## Prompt Categories

- Predictions & Future Thinking
- Changing Your Mind
- Ideas Worth Reconsidering
- Personal Philosophy
- Values & Priorities
- Self-Analysis
- Decision-Making
- Society & Culture
- Technology & Progress
- Ethics & Morality
- Contrarian Thinking
- Comparative Analysis
- Resource Allocation
- Systems Thinking
- Personal Experience
- Ideas & Innovation
- Information & Knowledge
- Meta-Questions
- Historical Analysis
- Work & Career
- Relationships & Community
- Learning & Growth
- Risk & Uncertainty
- Trade-offs & Paradoxes
- Money & Economics
- Power & Influence
- Success & Failure
- Conflict Resolution
- Health & Mortality
- Communication & Persuasion
- Identity & Self
- Justice & Fairness
- Attention & Focus

## Prompt Distribution Algorithm

Version 1.1 introduces an intelligent prompt distribution system designed to optimize your daily writing experience. The distribution algorithm ensures:

### Key Features
- **No category clustering**: Prevents consecutive prompts from the same category
- **Cognitive rhythm**: Balances mental load throughout the week
- **Weekly pattern**: Lighter topics on Mondays/Fridays, deeper thinking mid-week
- **Optimal spacing**: Heavy topics (mortality, ethics) are appropriately distributed
- **Complete coverage**: All original prompts maintained, just intelligently reordered

### Cognitive Intensity Levels
- **Light**: Predictions, Innovation, Learning, Communication
- **Medium**: Philosophy, Decision-Making, Career, Relationships, Economics
- **Heavy**: Self-Analysis, Ethics, Systems Thinking, Identity, Mortality

### Weekly Distribution Pattern
- **Monday**: Light (energizing start)
- **Tuesday**: Medium (practical topics)
- **Wednesday**: Heavy (deep thinking mid-week)
- **Thursday**: Medium (practical/relational)
- **Friday**: Light (lighter end to work week)
- **Saturday**: Light (weekend reflection)
- **Sunday**: Medium (moderate preparation for week)

### Using the Distribution Script
The `scripts/distribute_prompts.py` tool can redistribute any prompt collection:

```bash
# Redistribute prompts for optimal daily variety
python3 scripts/distribute_prompts.py input_prompts.txt output_prompts.txt
```

Input format: `Category | Prompt text` (one per line)

## Customization

All prompts are stored in a simple format inside the HTML file. To edit:

1. Open `daily-prompt.html` in a text editor
2. Find the `promptData` section (around line 90)
3. Edit prompts in the format: `Category | Prompt text`
4. Save and reload

Example:
```javascript
const promptData = `
Your Category | Your prompt here?
Another Category | Another prompt here?
`;
```

For large collections, use the distribution script to optimize the order before embedding in the HTML file.

## Philosophy

Prompts focus on reflective, analytical writing about ideas, beliefs, predictions, systems thinking, and ethical reasoning. Not creative fiction or generic journaling.

## Technical Details

- **File size:** ~50KB
- **Browser compatibility:** Any modern browser (Chrome, Firefox, Safari, Edge)
- **Mobile friendly:** Responsive design works on phones/tablets
- **Privacy:** No tracking, no analytics, no external requests
- **Data storage:** All prompts are embedded in the HTML file

## License

MIT License - do whatever you want with it.

## Contributing

Want to add prompts? Edit the `promptData` section and submit a PR. 

**Guidelines for new prompts:**
- Must be analytical/reflective, not creative fiction
- Should provoke thinking about ideas, not emotions
- Avoid generic questions ("How was your day?")
- Keep the format: `Category | Prompt text`

## Support

This is a simple tool. If it works, great. If it doesn't, check that you're using a modern browser.