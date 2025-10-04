#!/usr/bin/env python3
"""
Prompt Distribution Algorithm

This script redistributes writing prompts to ensure optimal daily variety for writers.
It creates a structured distribution that avoids category clustering and provides
balanced cognitive load throughout the week.

Usage: python3 distribute_prompts.py input_prompts.txt output_prompts.txt
"""

import random
import sys
from collections import defaultdict

def distribute_prompts(input_file, output_file=None):
    """
    Redistributes prompts for optimal daily writing experience.

    Strategy:
    - No two consecutive prompts from same category
    - Weekly cognitive rhythm (energizing Monday start, balanced throughout)
    - Heavy topics (mortality, ethics) appropriately spaced
    - Maintains all original prompts, just reordered
    """

    # Read all prompts
    with open(input_file, 'r') as f:
        lines = [line.strip() for line in f if line.strip()]

    # Parse prompts by category
    prompts_by_category = defaultdict(list)
    for line in lines:
        if ' | ' in line:
            category, prompt = line.split(' | ', 1)
            prompts_by_category[category.strip()].append(prompt.strip())

    # Define cognitive intensity levels for weekly rhythm
    LIGHT = ['Predictions & Future', 'Ideas Worth Reconsidering', 'Ideas & Innovation',
             'Information & Knowledge', 'Learning & Growth', 'Communication & Persuasion']

    MEDIUM = ['Personal Philosophy', 'Values & Priorities', 'Decision-Making', 'Work & Career',
              'Relationships & Community', 'Money & Economics', 'Success & Failure',
              'Comparative Analysis', 'Resource Allocation', 'Attention & Focus']

    HEAVY = ['Self-Analysis', 'Changing Your Mind', 'Society & Culture', 'Technology & Progress',
             'Ethics & Morality', 'Contrarian Thinking', 'Systems Thinking', 'Personal Experience',
             'Meta-Questions', 'Historical Analysis', 'Risk & Uncertainty', 'Trade-offs & Paradoxes',
             'Power & Influence', 'Conflict Resolution', 'Health & Mortality', 'Identity & Self',
             'Justice & Fairness']

    # Weekly pattern for cognitive load distribution
    weekly_pattern = [
        LIGHT,    # Monday - energizing start
        MEDIUM,   # Tuesday - practical topics
        HEAVY,    # Wednesday - deep thinking mid-week
        MEDIUM,   # Thursday - practical/relational
        LIGHT,    # Friday - lighter end to work week
        LIGHT,    # Saturday - weekend reflection
        MEDIUM    # Sunday - moderate preparation for week
    ]

    # Create the distribution
    distributed_prompts = []
    category_usage = {cat: 0 for categories in [LIGHT, MEDIUM, HEAVY] for cat in categories}
    used_categories = set()
    total_prompts = sum(len(prompts) for prompts in prompts_by_category.values())

    for day in range(total_prompts):
        day_of_week = day % 7
        intensity_level = weekly_pattern[day_of_week]

        # Find available categories for this intensity level
        available_cats = [cat for cat in intensity_level
                         if cat in prompts_by_category
                         and category_usage[cat] < len(prompts_by_category[cat])
                         and cat not in used_categories]

        # If no available categories at this level, try other levels
        if not available_cats:
            all_cats = [cat for cat in prompts_by_category.keys()
                       if category_usage[cat] < len(prompts_by_category[cat])
                       and cat not in used_categories]
            available_cats = all_cats

        # If we've used all categories recently, reset the constraint
        if not available_cats:
            used_categories.clear()
            available_cats = [cat for cat in prompts_by_category.keys()
                             if category_usage[cat] < len(prompts_by_category[cat])]

        # Select category and prompt
        if available_cats:
            category = random.choice(available_cats)
            prompt = prompts_by_category[category][category_usage[category]]
            distributed_prompts.append(f"{category} | {prompt}")
            category_usage[category] += 1
            used_categories.add(category)

            # Clear used categories every few days to prevent long droughts
            if len(used_categories) >= min(5, len(prompts_by_category)):
                used_categories.clear()

    # Write the redistributed prompts
    if output_file:
        with open(output_file, 'w') as f:
            for prompt in distributed_prompts:
                f.write(prompt + '\n')
    else:
        for prompt in distributed_prompts:
            print(prompt)

    print(f"Redistributed {len(distributed_prompts)} prompts with optimal daily variety", file=sys.stderr)
    return distributed_prompts

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 distribute_prompts.py input_prompts.txt [output_prompts.txt]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    distribute_prompts(input_file, output_file)