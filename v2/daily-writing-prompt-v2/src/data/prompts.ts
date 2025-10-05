export interface WritingPrompt {
  id: number;
  category: string;
  text: string;
}

// 365 daily writing prompts for reflective, analytical, non-fiction writing
export const promptsData = `Ideas & Innovation | What existing technology is misapplied?
Money & Economics | When is saving money more expensive in the long run?
Self-Analysis | What lie do you tell yourself?
Resource Allocation | What does society spend too much money on?
Communication & Persuasion | How do you communicate bad news effectively?
Predictions & Future | Predict three ways climate change will alter your local area in the next 20 years.
Money & Economics | What purchase improved your life the most?
Information & Knowledge | What's obvious to you that others don't see?
Success & Failure | How do you define success for yourself?
Conflict Resolution | How do you disagree without being disagreeable?
Comparative Analysis | Which generates better outcomes: rules or principles?
Ideas & Innovation | What needs to be uninvented?
Ideas Worth Reconsidering | What advice from previous generations should we take more seriously?
Values & Priorities | What do you spend money on that reveals what you actually care about?
Communication & Persuasion | When is silence more powerful than words?
Decision-Making | When should you decide quickly vs. slowly?
Contrarian Thinking | What does everyone worry about that doesn't matter?
Personal Philosophy | What's the difference between confidence and arrogance?
Ideas Worth Reconsidering | What collective wisdom have we lost?
Communication & Persuasion | What makes a message memorable?
Attention & Focus | What are you avoiding by staying busy?
Predictions & Future | Which country or region will become unexpectedly influential in the next 30 years?
Money & Economics | What's worth going into debt for?
Trade-offs & Paradoxes | What gets worse when you try to optimize it?
Comparative Analysis | What's the difference between popularity and quality?
Predictions & Future | What industry will be unrecognizable in a decade?
Ideas Worth Reconsidering | What old or ancient idea do you think is super good, actually, and should be brought back into fashion?
Money & Economics | When should you spend money to save time?
Ideas & Innovation | What's possible now that wasn't five years ago?
Personal Philosophy | What principle guides your decisions?
Trade-offs & Paradoxes | When does strength become weakness?
Attention & Focus | What deserves more attention than it gets?
Ethics & Moral Reasoning | What do you believe that you can't prove?
Decision-Making | How do you know when you're wrong?
Systems Thinking | What system breaks down when it scales?
Predictions & Future | What change seems impossible now but might happen anyway?
Contrarian Thinking | What conventional wisdom is actually wrong?
Resource Allocation | What do you underinvest in?
Communication & Persuasion | How do you change someone's mind?
Values & Priorities | What matters that can't be measured?
Ideas & Innovation | What problem are we solving the wrong way?
Money & Economics | What's expensive that should be cheap?
Self-Analysis | What do you know but don't act on?
Predictions & Future | What trend will reverse?
Trade-offs & Paradoxes | What improves when you do less?
Success & Failure | What's the difference between giving up and letting go?
Systems Thinking | What creates its own problem?
Communication & Persuasion | When do examples work better than explanations?
Information & Knowledge | What do experts get wrong about their field?
Decision-Making | What decisions have you been putting off?
Ethics & Moral Reasoning | When is fairness unfair?
Ideas Worth Reconsidering | What skill did people have in the past that we've lost?
Attention & Focus | What commands your attention that shouldn't?
Contrarian Thinking | What does nobody talk about but everyone should know?
Personal Philosophy | How do you define a life well-lived?
Resource Allocation | What's worth spending more on?
Money & Economics | What creates lasting wealth?
Predictions & Future | What will people in 2050 think was obvious that we're missing now?
Systems Thinking | What fixes one problem but creates another?
Ideas & Innovation | What's an old solution to a new problem?
Trade-offs & Paradoxes | What gets easier when you make it harder?
Communication & Persuasion | How do you say no diplomatically?
Self-Analysis | What do you resist that would help you?
Values & Priorities | What do you value in others that you don't cultivate in yourself?
Decision-Making | When is consensus overrated?
Attention & Focus | Where do you focus that yields little return?
Contrarian Thinking | What advice sounds good but backfires?
Ideas Worth Reconsidering | What tradition do we follow without questioning?
Information & Knowledge | What do you wish you had learned earlier?
Success & Failure | What's the difference between persistence and stubbornness?
Ethics & Moral Reasoning | When should rules be broken?
Predictions & Future | What behavior will future generations judge us for?
Systems Thinking | What works in small groups but fails at scale?
Money & Economics | What's cheap now but will be expensive later?
Personal Philosophy | What's your theory of human nature?
Resource Allocation | What deserves more resources?
Communication & Persuasion | How do you listen to understand rather than reply?
Trade-offs & Paradoxes | What appears broken but actually works?
Ideas & Innovation | What should we stop improving?
Attention & Focus | What patterns do you notice that others miss?
Decision-Making | How do you decide when information is incomplete?
Self-Analysis | What motivates you more than it should?
Contrarian Thinking | What does everyone think they want but actually don't?
Values & Priorities | What do you believe strongly but hold loosely?
Predictions & Future | What new norm will emerge from current chaos?
Information & Knowledge | What questions reveal the most about someone?
Success & Failure | What failure taught you the most?
Ethics & Moral Reasoning | When is tolerance intolerance?
Systems Thinking | What appears simple but is complex?
Money & Economics | What's the real cost of free things?
Communication & Persuasion | When do you say more by saying less?
Ideas Worth Reconsidering | What practice should we bring back?
Personal Philosophy | What do you believe that others find uncomfortable?
Resource Allocation | What investment pays off slowly but surely?
Trade-offs & Paradoxes | What strengthens when you share it?
Attention & Focus | What signal do you miss in the noise?
Decision-Making | What decisions improve with delay?
Contrarian Thinking | What do people overestimate about themselves?
Predictions & Future | What technology will peak and decline?
Ideas & Innovation | What's a solution in search of a problem?
Self-Analysis | What do you judge in others but excuse in yourself?
Values & Priorities | What standard do you hold yourself to?
Communication & Persuasion | How do you give feedback that sticks?
Information & Knowledge | What do you think you know but don't?
Success & Failure | What looks like luck but is actually skill?
Ethics & Moral Reasoning | What principle would you never compromise?
Systems Thinking | What causes the opposite of its intention?
Money & Economics | What's the difference between price and value?
Attention & Focus | What do you notice when you stop looking?
Trade-offs & Paradoxes | What becomes valuable when scarce?
Ideas Worth Reconsidering | What wisdom have we discarded too quickly?
Personal Philosophy | What would you do if you couldn't fail?
Predictions & Future | What will we be nostalgic for?
Resource Allocation | What do you optimize that doesn't matter?
Communication & Persuasion | When does complexity clarify?
Decision-Making | What choice would your future self thank you for?
Contrarian Thinking | What does everyone rush toward that you avoid?
Self-Analysis | What emotion do you trust least?
Ideas & Innovation | What's an innovation disguised as tradition?
Values & Priorities | What do you prioritize that you shouldn't?
Information & Knowledge | What truth is hard to accept?
Success & Failure | What achievement left you feeling empty?
Systems Thinking | What appears random but follows patterns?
Ethics & Moral Reasoning | When is helping actually hurting?
Money & Economics | What do you buy that you could create?
Attention & Focus | What deserves deeper examination?
Trade-offs & Paradoxes | What gets simpler when you complicate it?
Predictions & Future | What won't exist in 20 years?
Communication & Persuasion | How do you apologize effectively?
Ideas Worth Reconsidering | What assumption should we question?
Personal Philosophy | What would you defend at any cost?
Resource Allocation | What time investment compounds?
Decision-Making | What requires a decision you're avoiding?
Contrarian Thinking | What popular goal is actually harmful?
Self-Analysis | What pattern repeats in your life?
Values & Priorities | What matters most when everything falls apart?
Information & Knowledge | What do you need to learn to unlearn?
Ideas & Innovation | What combination creates something new?
Success & Failure | What's the difference between good and great?
Systems Thinking | What feedback loop needs interrupting?
Ethics & Moral Reasoning | What's right but feels wrong?
Money & Economics | What's your relationship with money?
Attention & Focus | What story do you tell yourself that limits you?
Trade-offs & Paradoxes | What costs more than it's worth?
Predictions & Future | What preparation will prove valuable?
Communication & Persuasion | When does disagreement strengthen relationships?
Ideas Worth Reconsidering | What conventional approach needs updating?
Personal Philosophy | What do you believe about human potential?
Resource Allocation | What energy drain could you eliminate?
Decision-Making | What choice defines who you become?
Contrarian Thinking | What obvious thing is everyone ignoring?
Self-Analysis | What do you fear that you shouldn't?
Values & Priorities | What do you stand for when no one's watching?
Information & Knowledge | What question would reveal everything?
Ideas & Innovation | What's possible with current constraints?
Success & Failure | What's worth failing at?
Systems Thinking | What unintended consequence surprises you?
Ethics & Moral Reasoning | What line would you never cross?
Money & Economics | What financial advice do you wish you'd followed?
Attention & Focus | What details reveal the bigger picture?
Trade-offs & Paradoxes | What weakness is actually strength?
Predictions & Future | What will remain constant as everything changes?
Communication & Persuasion | How do you influence without authority?
Ideas Worth Reconsidering | What old technology is actually superior?
Personal Philosophy | What gives your life meaning?
Resource Allocation | What investment has the highest leverage?
Decision-Making | What decision would you make again?
Contrarian Thinking | What does everyone believe that's false?
Self-Analysis | What truth about yourself do you resist?
Values & Priorities | What principle would you die for?
Information & Knowledge | What do you pretend to understand?
Ideas & Innovation | What breakthrough is hiding in plain sight?
Success & Failure | What's your definition of enough?
Systems Thinking | What small change creates large effects?
Ethics & Moral Reasoning | When is the greater good actually lesser?
Money & Economics | What would you do if money were no object?
Attention & Focus | What do you see that others overlook?
Trade-offs & Paradoxes | What problem is its own solution?
Predictions & Future | What trend are you betting against?
Communication & Persuasion | How do you build trust quickly?
Ideas Worth Reconsidering | What dismissed idea deserves reconsideration?
Personal Philosophy | What truth do you live by?
Resource Allocation | What capacity could you build?
Decision-Making | What choice would surprise people who know you?
Contrarian Thinking | What does the majority get backward?
Self-Analysis | What motivates you that you don't admit?
Values & Priorities | What compromise reveals your values?
Information & Knowledge | What expertise do you wish you had?
Ideas & Innovation | What's an elegant solution to a messy problem?
Success & Failure | What's worth pursuing even if you fail?
Systems Thinking | What constraint actually creates freedom?
Ethics & Moral Reasoning | What's legal but wrong?
Money & Economics | What's the best money you've ever spent?
Attention & Focus | What demands your attention that doesn't deserve it?
Trade-offs & Paradoxes | What abundance creates scarcity?
Predictions & Future | What will we wonder how we lived without?
Communication & Persuasion | When does silence communicate more than words?
Ideas Worth Reconsidering | What outdated rule should be broken?
Personal Philosophy | What do you believe about change?
Resource Allocation | What could you do with unlimited time?
Decision-Making | What choice are you grateful you made?
Contrarian Thinking | What's obviously true that isn't?
Self-Analysis | What do you avoid because it's uncomfortable?
Values & Priorities | What would you regret not doing?
Information & Knowledge | What would you teach if you had to?
Ideas & Innovation | What's ripe for disruption?
Success & Failure | What failure would you repeat?
Systems Thinking | What virtuous cycle could you start?
Ethics & Moral Reasoning | What's your ethical boundary?
Money & Economics | What's too expensive not to buy?
Attention & Focus | What pattern connects seemingly unrelated things?
Trade-offs & Paradoxes | What advantage disguises disadvantage?
Predictions & Future | What will historians say about our era?
Communication & Persuasion | How do you deliver difficult truths?
Ideas Worth Reconsidering | What ancient practice is actually advanced?
Personal Philosophy | What do you hope to be remembered for?
Resource Allocation | What deserves your full attention?
Decision-Making | What would you choose if everyone would know?
Contrarian Thinking | What do successful people believe that's wrong?
Self-Analysis | What strength becomes a weakness for you?
Values & Priorities | What do you value that can't be bought?
Information & Knowledge | What would you like to know before you die?
Ideas & Innovation | What innovation would improve everything?
Success & Failure | What's worth starting even if you won't finish?
Systems Thinking | What creates the conditions for its own success?
Ethics & Moral Reasoning | What's your biggest moral blind spot?
Money & Economics | What's expensive in the short term but cheap in the long term?
Attention & Focus | What story dominates your attention?
Trade-offs & Paradoxes | What appears wasteful but is efficient?
Predictions & Future | What will be common that seems impossible now?
Communication & Persuasion | When does complexity help rather than hurt?
Ideas Worth Reconsidering | What should we stop taking for granted?
Personal Philosophy | What would you do with a second lifetime?
Resource Allocation | What investment would benefit everyone?
Decision-Making | What would you choose with perfect information?
Contrarian Thinking | What trend will everyone regret following?
Self-Analysis | What do you resist that would liberate you?
Values & Priorities | What principles guide your toughest decisions?
Information & Knowledge | What mystery would you solve?
Ideas & Innovation | What's the next logical step everyone's missing?
Success & Failure | What's worth risking everything for?
Systems Thinking | What scales in unexpected ways?
Ethics & Moral Reasoning | What's wrong that feels right?
Money & Economics | What financial truth do people resist?
Attention & Focus | What detail would change everything?
Trade-offs & Paradoxes | What appears effortless but requires enormous effort?
Predictions & Future | What capability will we develop out of necessity?
Communication & Persuasion | How do you make the complex simple?
Ideas Worth Reconsidering | What concept needs a new name?
Personal Philosophy | What would you sacrifice for growth?
Resource Allocation | What would you fund if resources were unlimited?
Decision-Making | What choice would make all other choices easier?
Contrarian Thinking | What does conventional wisdom miss?
Self-Analysis | What do you do when no one's watching?
Values & Priorities | What's worth defending even when unpopular?
Information & Knowledge | What would you study if you had forever?
Ideas & Innovation | What's the most elegant solution you can imagine?
Success & Failure | What would you attempt if you knew you'd succeed?
Systems Thinking | What creates resilience in complex systems?
Ethics & Moral Reasoning | What's your highest value?
Money & Economics | What investment always pays dividends?
Attention & Focus | What signal emerges from the noise when you wait?
Trade-offs & Paradoxes | What appears to be an ending but is actually a beginning?
Predictions & Future | What will we master that we're still learning?
Communication & Persuasion | When does showing work better than telling?
Ideas Worth Reconsidering | What wisdom tradition offers practical guidance today?
Personal Philosophy | What legacy do you want to leave?
Resource Allocation | What would you optimize if you could optimize only one thing?
Decision-Making | What decision are you most proud of?
Contrarian Thinking | What does everyone think is complex but is actually simple?
Self-Analysis | What truth about yourself are you still discovering?
Values & Priorities | What would you choose if you had to choose again?
Information & Knowledge | What question unlocks the most understanding?
Ideas & Innovation | What's waiting to be discovered?
Success & Failure | What does excellence look like in your field?
Systems Thinking | What creates its own momentum?
Ethics & Moral Reasoning | What's your moral North Star?
Money & Economics | What's the real cost of not investing in yourself?
Attention & Focus | What pattern emerges when you connect the dots?
Trade-offs & Paradoxes | What becomes stronger when it appears weakest?
Predictions & Future | What transformation is already underway but not yet visible?
Communication & Persuasion | How do you communicate what can't be said directly?
Ideas Worth Reconsidering | What practice would solve multiple problems?
Personal Philosophy | What truth sustains you through difficulty?
Resource Allocation | What deserves more of your time than you give it?
Decision-Making | What choice would honor your deepest values?
Contrarian Thinking | What's hiding behind what everyone agrees on?
Self-Analysis | What pattern in your life needs breaking?
Values & Priorities | What matters most when nothing else matters?
Information & Knowledge | What understanding would change how you live?
Ideas & Innovation | What innovation would create the most good?
Success & Failure | What would success look like if you defined it completely?
Systems Thinking | What generates abundance rather than scarcity?
Ethics & Moral Reasoning | What would you do if no one would ever know?
Money & Economics | What's the most valuable thing that can't be purchased?
Attention & Focus | What emerges when you give something your complete attention?
Trade-offs & Paradoxes | What appears to be the end but is really the beginning?
Predictions & Future | What will matter most when everything else fades away?`;

// Parse the prompt data into structured objects
export const prompts: WritingPrompt[] = promptsData
  .split('\n')
  .filter(line => line.trim())
  .map((line, index) => {
    const [category, text] = line.split(' | ');
    return {
      id: index + 1,
      category: category.trim(),
      text: text.trim()
    };
  });

// Get today's prompt based on day of year
export function getTodaysPrompt(): WritingPrompt {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = (dayOfYear - 1) % prompts.length;
  return prompts[index];
}

// Get prompt by index
export function getPromptByIndex(index: number): WritingPrompt {
  if (index < 0 || index >= prompts.length) {
    throw new Error(`Invalid prompt index: ${index}`);
  }
  return prompts[index];
}

// Get random prompt
export function getRandomPrompt(): WritingPrompt {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}

// Get prompt for specific date
export function getPromptForDate(date: Date): WritingPrompt {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = (dayOfYear - 1) % prompts.length;
  return prompts[index];
}