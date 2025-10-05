import { useSeoMeta } from '@unhead/react';
import { PromptDisplay } from '@/components/PromptDisplay';
import { StreakDisplay } from '@/components/StreakDisplay';

const Index = () => {
  useSeoMeta({
    title: 'Daily Writing Prompts - Analytical & Reflective Questions',
    description: '365 thought-provoking daily writing prompts for analytical and reflective non-fiction writing. Explore ideas about innovation, economics, philosophy, and more.',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            Daily Writing Prompts
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            365 thought-provoking questions for analytical and reflective writing.
            Each prompt is designed to explore ideas, beliefs, systems thinking, and ethical reasoning.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <PromptDisplay />
          </div>
          <div className="lg:col-span-1">
            <StreakDisplay />
          </div>
        </div>

        <footer className="text-center text-sm text-slate-500 dark:text-slate-400">
          <p>
            Built with{' '}
            <a
              href="https://soapbox.pub/mkstack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              MKStack
            </a>
            {' '}• Perfect for daily reflection and analytical writing practice
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
