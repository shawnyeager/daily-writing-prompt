import { useSeoMeta } from '@unhead/react';
import { PromptDisplay } from '@/components/PromptDisplay';
import { StreakDisplay } from '@/components/StreakDisplay';

const Index = () => {
  useSeoMeta({
    title: 'Daily Writing Prompts - Analytical & Reflective Questions',
    description: '365 thought-provoking daily writing prompts for analytical and reflective non-fiction writing. Explore ideas about innovation, economics, philosophy, and more.',
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Daily Writing Prompts
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            365 thought-provoking questions for analytical and reflective writing.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6 mb-8 items-start">
          <div>
            <PromptDisplay />
          </div>
          <div className="lg:sticky lg:top-8">
            <StreakDisplay />
          </div>
        </div>

        <footer className="text-center text-sm text-gray-500 mt-12">
          <p>
            Built with{' '}
            <a
              href="https://soapbox.pub/mkstack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              MKStack
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
