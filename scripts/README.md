# Prompt Distribution Algorithm

This directory contains the script used to redistribute writing prompts for optimal daily variety.

## Overview

The distribution algorithm ensures that writers get maximum variety and balanced cognitive load throughout the year by:

- **No category clustering**: Prevents consecutive prompts from the same category
- **Cognitive rhythm**: Balances mental load throughout the week
- **Weekly pattern**: Lighter topics on Mondays/Fridays, deeper thinking mid-week
- **Optimal spacing**: Heavy topics (mortality, ethics) are appropriately distributed
- **Complete coverage**: All original prompts maintained, just intelligently reordered

## Cognitive Intensity Levels

- **Light**: Predictions, Innovation, Learning, Communication
- **Medium**: Philosophy, Decision-Making, Career, Relationships, Economics
- **Heavy**: Self-Analysis, Ethics, Systems Thinking, Identity, Mortality

## Weekly Distribution Pattern

- **Monday**: Light (energizing start)
- **Tuesday**: Medium (practical topics)
- **Wednesday**: Heavy (deep thinking mid-week)
- **Thursday**: Medium (practical/relational)
- **Friday**: Light (lighter end to work week)
- **Saturday**: Light (weekend reflection)
- **Sunday**: Medium (moderate preparation for week)

## Usage

```bash
# Redistribute prompts for optimal daily variety
python3 distribute_prompts.py input_prompts.txt output_prompts.txt
```

**Input format**: `Category | Prompt text` (one per line)

The script will intelligently reorder all prompts to create the optimal daily writing experience while preserving every original prompt.

## Algorithm Details

1. **Parse prompts** by category from input file
2. **Classify categories** by cognitive intensity level
3. **Apply weekly rhythm** to prefer appropriate intensity each day
4. **Avoid repetition** by tracking recently used categories
5. **Ensure coverage** by guaranteeing all prompts are included
6. **Output redistributed** prompts ready for embedding in HTML

This ensures writers never get stuck with weeks of similar prompts and instead experience thoughtful variety that enhances their writing practice.