/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Trophy, 
  AlertCircle,
  Filter,
  GraduationCap
} from 'lucide-react';
import { questions } from './data/questions';
import { Difficulty, GrammarCategory, Question } from './types';

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [filterCategory, setFilterCategory] = useState<GrammarCategory | 'All'>('All');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All');

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const catMatch = filterCategory === 'All' || q.category === filterCategory;
      const diffMatch = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
      return catMatch && diffMatch;
    });
  }, [filterCategory, filterDifficulty]);

  const currentQuestion = filteredQuestions[currentIdx];

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctOptionId) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowSummary(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowSummary(false);
  };

  const getEncouragement = (score: number, total: number) => {
    const ratio = score / total;
    if (ratio === 1) return "太棒了！你是语法大师！";
    if (ratio >= 0.8) return "非常出色！继续保持！";
    if (ratio >= 0.6) return "做得不错，再接再厉！";
    return "别灰心，多练习一定会进步的！";
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
        <div className="text-center space-y-4">
          <Filter className="w-16 h-16 text-slate-300 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-700">没有找到符合条件的题目</h2>
          <button 
            onClick={() => { setFilterCategory('All'); setFilterDifficulty('All'); }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          >
            重置筛选
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">GrammarMaster</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>进度:</span>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${((currentIdx + 1) / filteredQuestions.length) * 100}%` }}
                />
              </div>
              <span>{currentIdx + 1}/{filteredQuestions.length}</span>
            </div>
            <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold border border-amber-100">
              得分: {score}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        <AnimatePresence mode="wait">
          {!showSummary ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Filters & Tags */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {currentQuestion.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  currentQuestion.difficulty === Difficulty.Beginner ? 'bg-emerald-50 text-emerald-700' :
                  currentQuestion.difficulty === Difficulty.Intermediate ? 'bg-blue-50 text-blue-700' :
                  'bg-rose-50 text-rose-700'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                
                <div className="ml-auto flex gap-2">
                  <select 
                    value={filterCategory}
                    onChange={(e) => { setFilterCategory(e.target.value as any); setCurrentIdx(0); }}
                    className="text-xs border-none bg-white shadow-sm rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="All">所有分类</option>
                    {Object.values(GrammarCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select 
                    value={filterDifficulty}
                    onChange={(e) => { setFilterDifficulty(e.target.value as any); setCurrentIdx(0); }}
                    className="text-xs border-none bg-white shadow-sm rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="All">所有难度</option>
                    {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-serif leading-relaxed text-slate-800 mb-12">
                    {currentQuestion.sentence.split('______').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className={`inline-block min-w-[120px] border-b-2 mx-2 text-center transition-all duration-300 ${
                            isSubmitted 
                              ? (selectedOption === currentQuestion.correctOptionId ? 'text-emerald-600 border-emerald-600' : 'text-rose-600 border-rose-600')
                              : (selectedOption ? 'text-indigo-600 border-indigo-600' : 'text-slate-300 border-slate-300')
                          }`}>
                            {selectedOption ? currentQuestion.options.find(o => o.id === selectedOption)?.text : '______'}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option) => {
                      const isCorrect = option.id === currentQuestion.correctOptionId;
                      const isSelected = option.id === selectedOption;
                      
                      let buttonClass = "flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 text-lg font-medium ";
                      
                      if (isSubmitted) {
                        if (isCorrect) {
                          buttonClass += "bg-emerald-50 border-emerald-500 text-emerald-700";
                        } else if (isSelected) {
                          buttonClass += "bg-rose-50 border-rose-500 text-rose-700";
                        } else {
                          buttonClass += "bg-white border-slate-100 text-slate-400 opacity-50";
                        }
                      } else {
                        if (isSelected) {
                          buttonClass += "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md";
                        } else {
                          buttonClass += "bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50";
                        }
                      }

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOptionSelect(option.id)}
                          disabled={isSubmitted}
                          className={buttonClass}
                        >
                          <span>{option.text}</span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                          {isSubmitted && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-50 p-6 flex items-center justify-between border-t border-slate-100">
                  {!isSubmitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedOption}
                      className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                        selectedOption 
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      提交答案
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
                    >
                      {currentIdx < filteredQuestions.length - 1 ? '下一题' : '查看结果'}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Explanation Card */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden"
                  >
                    <div className="p-8 space-y-6">
                      <div className="flex items-center gap-3 text-indigo-600">
                        <BookOpen className="w-6 h-6" />
                        <h3 className="text-xl font-bold">详解卡片</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">正确答案</h4>
                            <p className="text-lg font-bold text-emerald-600">{currentQuestion.explanation.correctAnswer}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">语法规则</h4>
                            <p className="text-slate-700 leading-relaxed">{currentQuestion.explanation.rule}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">经典例句</h4>
                            <div className="bg-slate-50 p-3 rounded-xl border-l-4 border-indigo-400 italic text-slate-600">
                              "{currentQuestion.explanation.example}"
                            </div>
                          </div>
                          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                            <div className="flex items-center gap-2 text-rose-600 mb-1">
                              <AlertCircle className="w-4 h-4" />
                              <h4 className="text-sm font-bold uppercase tracking-wider">常见错误辨析</h4>
                            </div>
                            <p className="text-rose-700 text-sm">{currentQuestion.explanation.commonMistake}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] shadow-2xl p-12 text-center space-y-8 border border-slate-100"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-amber-100 rounded-full blur-2xl opacity-50 animate-pulse" />
                <Trophy className="w-24 h-24 text-amber-500 mx-auto relative animate-float" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-800">测试完成！</h2>
                <p className="text-xl text-slate-500">{getEncouragement(score, filteredQuestions.length)}</p>
              </div>

              <div className="flex justify-center gap-8 py-8">
                <div className="text-center">
                  <div className="text-5xl font-black text-indigo-600">{score}</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">得分</div>
                </div>
                <div className="w-px bg-slate-100" />
                <div className="text-center">
                  <div className="text-5xl font-black text-slate-800">{filteredQuestions.length}</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">总题数</div>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-3xl space-y-4">
                <h4 className="font-bold text-indigo-800">推荐复习</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {Array.from(new Set(filteredQuestions.map(q => q.category))).map(cat => (
                    <a 
                      key={cat}
                      href={`https://www.google.com/search?q=English+grammar+${cat}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-indigo-600 rounded-xl text-sm font-medium hover:shadow-md transition-all"
                    >
                      {cat} 专题复习
                    </a>
                  ))}
                </div>
              </div>

              <button
                onClick={resetQuiz}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-200"
              >
                <RotateCcw className="w-5 h-5" />
                重新开始
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
