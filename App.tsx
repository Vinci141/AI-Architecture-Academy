
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ArchitectureType, LessonContent, ARCHITECTURE_ROADMAP } from './types';
import { INITIAL_LESSON, Icons } from './constants';
import { Roadmap } from './components/Roadmap';
import { RuleSimulator } from './components/RuleSimulator';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentLesson, setCurrentLesson] = useState<LessonContent>(INITIAL_LESSON);
  const [isTeacherTyping, setIsTeacherTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNextArchitecture = useCallback(async () => {
    const nextIdx = currentStep + 1;
    if (nextIdx >= ARCHITECTURE_ROADMAP.length) return;

    setIsTeacherTyping(true);
    setError(null);

    const nextType = ARCHITECTURE_ROADMAP[nextIdx];
    
    // In a real environment, we'd call Gemini to generate the next lesson content 
    // based on the teacher's persona and the predefined structure.
    // For this prototype, we'll use a helper to prompt Gemini or mock the response.
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a senior AI architect and teacher. Explain the architecture: ${nextType}.
      Use this EXACT JSON structure for the response:
      {
        "id": "${nextType}",
        "title": "${nextIdx + 1}. ${nextType}",
        "problem": "...",
        "diagramDescription": "...",
        "components": {
          "model": "...",
          "dataFlow": "...",
          "memory": "...",
          "orchestration": "..."
        },
        "previousDifference": "...",
        "currentUseCases": ["case1", "case2"],
        "analogy": "...",
        "whenNotToUse": "...",
        "pythonSnippet": "..."
      }
      Follow the roadmap: Rule-based -> Classical ML -> Deep Learning -> Transformer -> RAG -> Agent-based -> Multi-agent -> Tool-using -> Autonomous -> End-to-end.
      The previous architecture was ${ARCHITECTURE_ROADMAP[currentStep]}.
      Ensure the tone is generic, visual, and intuitive.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const nextLesson: LessonContent = JSON.parse(response.text || '{}');
      setCurrentLesson(nextLesson);
      setCurrentStep(nextIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError("The architect is busy thinking. Please try again in a moment.");
    } finally {
      setIsTeacherTyping(false);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen pb-20 selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg text-black">
            <Icons.Brain />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">AI Architect Academy</h1>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-medium">Mastering Systems Step-by-Step</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-medium text-zinc-400">
          <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Step {currentStep + 1} of 10</span>
          <span className="text-zinc-700">|</span>
          <span className="hover:text-emerald-400 transition-colors cursor-pointer">Curriculum Roadmap</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-10">
        <Roadmap current={currentLesson.id} />

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          {/* Lesson Content - Left Column */}
          <div className="lg:col-span-7 space-y-12">
            <section className={`${isTeacherTyping ? 'opacity-40 animate-pulse' : 'opacity-100'} transition-opacity duration-500`}>
              <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                {currentLesson.title}
              </h2>

              <div className="space-y-10">
                <div className="space-y-3">
                  <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-widest">The Problem it Solves</h4>
                  <p className="text-zinc-300 text-lg leading-relaxed">{currentLesson.problem}</p>
                </div>

                <div className="bg-zinc-900/50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Icons.Code /> The Mental Diagram
                  </h4>
                  <p className="text-zinc-400 italic leading-relaxed">"{currentLesson.diagramDescription}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
                    <span className="text-xs text-zinc-500 uppercase block mb-2">Model</span>
                    <p className="text-sm text-zinc-300 font-medium">{currentLesson.components.model}</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
                    <span className="text-xs text-zinc-500 uppercase block mb-2">Data Flow</span>
                    <p className="text-sm text-zinc-300 font-medium">{currentLesson.components.dataFlow}</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
                    <span className="text-xs text-zinc-500 uppercase block mb-2">Memory</span>
                    <p className="text-sm text-zinc-300 font-medium">{currentLesson.components.memory}</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
                    <span className="text-xs text-zinc-500 uppercase block mb-2">Orchestration</span>
                    <p className="text-sm text-zinc-300 font-medium">{currentLesson.components.orchestration}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold">Key Distinction</h4>
                  <p className="text-zinc-400 bg-zinc-800/30 p-4 rounded-lg border border-zinc-800">
                    <span className="text-emerald-500 font-bold mr-2">vs. Previous:</span> {currentLesson.previousDifference}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold">Where it's used today</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentLesson.currentUseCases.map((useCase, idx) => (
                      <span key={idx} className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-700">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="pt-10 border-t border-zinc-800 space-y-6">
              <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl">
                <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                  <span className="text-xl">💡</span> Practical Analogy
                </h4>
                <p className="text-zinc-300 leading-relaxed italic">
                  {currentLesson.analogy}
                </p>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                  <span className="text-xl">⚠️</span> When NOT to use it
                </h4>
                <p className="text-zinc-300 leading-relaxed">
                  {currentLesson.whenNotToUse}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar / Interactive - Right Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="sticky top-28 space-y-8">
              {/* Python Snippet */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">architecture_impl.py</span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="code-font text-sm text-emerald-300 whitespace-pre">
                    {currentLesson.pythonSnippet}
                  </pre>
                </div>
              </div>

              {/* Interactive Component - specific to lesson */}
              {currentLesson.id === ArchitectureType.RULE_BASED && (
                <RuleSimulator />
              )}

              {/* Call to Action */}
              <div className="bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-3xl text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <Icons.Brain />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ready to advance?</h3>
                  <p className="text-zinc-400 text-sm px-4">
                    The next step is to understand how we move from explicit rules to learning patterns from data.
                  </p>
                </div>
                <button 
                  onClick={handleNextArchitecture}
                  disabled={isTeacherTyping || currentStep >= ARCHITECTURE_ROADMAP.length - 1}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                  {isTeacherTyping ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Teacher is thinking...
                    </span>
                  ) : (
                    <>
                      I'm ready for the next architecture <Icons.ArrowRight />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Teacher Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-zinc-800 px-8 py-4 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xl">
                👨‍🏫
              </div>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Senior AI Architect</p>
              <p className="text-sm text-white font-medium">
                {isTeacherTyping ? "Excellent progress. Let me prepare the next stage..." : "Any questions about Rule-Based systems before we move to ML Pipelines?"}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex gap-3">
            <button className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors">Ask a Question</button>
            <button className="px-4 py-2 text-xs font-bold bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">Deep Dive (15m)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
