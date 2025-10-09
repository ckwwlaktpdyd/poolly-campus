import React, { useState } from 'react';
import { Calendar, HelpCircle, Lightbulb, Settings as SettingsIcon, ChevronRight, Send, ArrowLeft, Check, X, Star, Sparkles, Loader, Bell, Heart, Home, Clock, MapPin, AlertCircle, BookOpen, FileText, Trophy } from 'lucide-react';

import CourseSchedule from './components/CourseSchedule';
import FocusTools from './components/FocusTools';
import Settings from './components/Settings';
import HomeScreen from './components/HomeScreen';

type Tab = 'home' | 'schedule' | 'ask' | 'help' | 'settings';
type QuestionScene = 'subject-select' | 'ask-question' | 'ai-analysis' | 'success' | 'question-list' | 'answer-detail';

interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

interface Question {
  id: number;
  subject: string;
  question: string;
  timestamp: string;
  answerCount: number;
  isAnswered: boolean;
  preview?: string;
}

interface Answer {
  id: number;
  question: string;
  answer: string;
  author: string;
  timestamp: string;
  rating: number;
  subject: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [questionScene, setQuestionScene] = useState<QuestionScene>('subject-select');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState({
    summary: '',
    keyPoints: [] as string[],
    refinedQuestion: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const subjects: Subject[] = [
    { id: 'clinical', name: '임상심리학', description: '정신건강, 심리치료', color: 'from-blue-500 to-cyan-500', icon: '🧠' },
    { id: 'developmental', name: '발달심리학', description: '아동발달, 전생애', color: 'from-green-500 to-emerald-500', icon: '👶' },
    { id: 'cognitive', name: '인지심리학', description: '기억, 사고, 언어', color: 'from-purple-500 to-pink-500', icon: '💭' },
    { id: 'social', name: '사회심리학', description: '관계, 태도, 집단', color: 'from-orange-500 to-amber-500', icon: '👥' },
    { id: 'biological', name: '생물심리학', description: '뇌과학, 신경계', color: 'from-red-500 to-rose-500', icon: '🧬' },
    { id: 'stats', name: '심리통계', description: 'SPSS, 데이터분석', color: 'from-indigo-500 to-blue-500', icon: '📊' },
  ];

  const myQuestions: Question[] = [
    {
      id: 1,
      subject: '임상심리학',
      question: 'DSM-5에서 우울증 진단기준이 정확히 어떻게 되나요?',
      timestamp: '2시간 전',
      answerCount: 3,
      isAnswered: true,
      preview: '좋은 질문이네요. DSM-5의 주요우울장애 진단기준은...'
    },
    {
      id: 2,
      subject: '발달심리학',
      question: '피아제의 구체적 조작기 특징에 대해 설명해주세요',
      timestamp: '5시간 전',
      answerCount: 1,
      isAnswered: true,
      preview: '구체적 조작기는 7-11세 아동에게 나타나는...'
    },
    {
      id: 3,
      subject: '심리통계',
      question: 'ANOVA와 t-test의 차이점이 뭔가요?',
      timestamp: '1일 전',
      answerCount: 0,
      isAnswered: false
    },
  ];

  const sampleAnswers: Answer[] = [
    {
      id: 1,
      question: 'DSM-5에서 우울증 진단기준이 정확히 어떻게 되나요?',
      answer: '좋은 질문이네요. DSM-5의 주요우울장애(Major Depressive Disorder) 진단기준은 다음과 같습니다:\n\n1. 우울한 기분 또는 흥미/즐거움의 상실이 거의 매일, 하루 중 대부분 나타남\n2. 2주 이상 지속\n3. 다음 증상 중 5개 이상:\n   - 우울한 기분\n   - 흥미/즐거움 감소\n   - 체중/식욕 변화\n   - 불면 또는 과다수면\n   - 정신운동 초조/지체\n   - 피로감\n   - 무가치감/죄책감\n   - 집중력 저하\n   - 죽음/자살 사고\n\n중요한 것은 이러한 증상이 사회적, 직업적 기능에 심각한 고통이나 손상을 일으켜야 한다는 점입니다.',
      author: '임상심리 전공 대학원생',
      timestamp: '1시간 전',
      rating: 4.8,
      subject: '임상심리학'
    },
    {
      id: 2,
      question: 'DSM-5에서 우울증 진단기준이 정확히 어떻게 되나요?',
      answer: '추가로 설명하자면, DSM-5에서는 이전 버전과 달리 사별(bereavement) 제외 기준이 삭제되었어요. 즉, 사랑하는 사람을 잃은 후에도 주요우울장애로 진단할 수 있게 되었습니다.\n\n또한 감별진단도 중요한데, 양극성장애, 물질/약물로 인한 우울, 다른 의학적 상태로 인한 우울 등을 배제해야 합니다.',
      author: '심리학과 4학년',
      timestamp: '45분 전',
      rating: 4.5,
      subject: '임상심리학'
    }
  ];

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setQuestionScene('ask-question');
  };

  const handleQuestionSubmit = () => {
    if (questionText.trim()) {
      setIsAnalyzing(true);
      setQuestionScene('ai-analysis');

      setTimeout(() => {
        const analysis = {
          summary: '학생이 DSM-5의 우울증 진단기준에 대해 정확한 정보를 요청하고 있습니다.',
          keyPoints: [
            '주요우울장애의 공식 진단기준을 묻고 있음',
            '임상심리학 수업 내용과 관련된 질문',
            '구체적이고 명확한 답변이 필요한 질문'
          ],
          refinedQuestion: `${selectedSubject?.name} - DSM-5 주요우울장애 진단기준\n\n${questionText}\n\n답변자님께: 이 질문은 DSM-5의 공식적인 진단기준을 명확히 알고 싶어하는 학생의 질문입니다. 구체적인 증상 목록과 진단 절차를 포함해서 답변해주시면 도움이 될 것 같습니다.`
        };
        setAiAnalysis(analysis);
        setIsAnalyzing(false);
      }, 2500);
    }
  };

  const handleConfirmQuestion = () => {
    setQuestionScene('success');
  };

  const handleAnswerClick = () => {
    setSelectedAnswer(sampleAnswers[0]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={(tab) => setActiveTab(tab as Tab)} />;
      case 'schedule':
        return <CourseSchedule onBack={() => setActiveTab('home')} />;
      case 'ask':
        return renderQuestionContent();
      case 'help':
        return <FocusTools onBack={() => setActiveTab('home')} />;
      case 'settings':
        return <Settings onBack={() => setActiveTab('home')} />;
      default:
        return <HomeScreen onNavigate={(tab) => setActiveTab(tab as Tab)} />;
    }
  };

  const renderQuestionContent = () => {
    if (questionScene === 'subject-select') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
          <div className="px-6 pt-16 pb-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">질문하기</h1>
            <p className="text-lg text-slate-600 mb-8">어떤 과목에 대해 질문하시나요?</p>

            <div className="space-y-3">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectSelect(subject)}
                  className="w-full bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {subject.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-slate-900">{subject.name}</h3>
                        <p className="text-sm text-slate-600">{subject.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-slate-400" />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setQuestionScene('question-list')}
              className="w-full mt-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-semibold hover:bg-slate-200 transition-colors active:scale-[0.98]"
            >
              내 질문 보기
            </button>
          </div>
        </div>
      );
    }

    if (questionScene === 'ask-question') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
            <div className="px-6 py-4">
              <button
                onClick={() => setQuestionScene('subject-select')}
                className="flex items-center gap-2 text-blue-600 font-medium active:opacity-70 transition-opacity"
              >
                <ArrowLeft size={24} />
                <span>뒤로</span>
              </button>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${selectedSubject?.color} text-white mb-6`}>
              <span className="text-lg">{selectedSubject?.icon}</span>
              <span className="font-semibold">{selectedSubject?.name}</span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">질문을 작성하세요</h2>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="예: DSM-5에서 우울증 진단기준이 정확히 어떻게 되나요?"
                className="w-full min-h-[200px] text-lg text-slate-900 placeholder-slate-400 focus:outline-none resize-none"
              />
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200 mb-6">
              <h3 className="font-bold text-blue-900 mb-2">💡 좋은 질문 작성 팁</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 구체적으로 질문하세요</li>
                <li>• 이해가 안 되는 부분을 명확히 하세요</li>
                <li>• 어떤 부분까지 알고 있는지 말씀해주세요</li>
              </ul>
            </div>

            <button
              onClick={handleQuestionSubmit}
              disabled={!questionText.trim()}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send size={20} />
              질문 등록하기
            </button>
          </div>
        </div>
      );
    }

    if (questionScene === 'ai-analysis') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
            <div className="px-6 py-4">
              <h1 className="text-3xl font-bold text-slate-900">AI 분석 중</h1>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${selectedSubject?.color} text-white mb-6`}>
              <span className="text-lg">{selectedSubject?.icon}</span>
              <span className="font-semibold">{selectedSubject?.name}</span>
            </div>

            {isAnalyzing ? (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
                <div className="flex justify-center mb-4">
                  <Loader className="w-12 h-12 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">질문을 분석하고 있어요</h3>
                <p className="text-slate-600">답변자가 이해하기 쉽게 정리 중입니다...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 shadow-lg text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={24} />
                    <h3 className="text-xl font-bold">AI 분석 완료</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {aiAnalysis.summary}
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Check size={20} className="text-green-600" />
                    핵심 포인트
                  </h3>
                  <ul className="space-y-3">
                    {aiAnalysis.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-700">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">정리된 질문</h3>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {aiAnalysis.refinedQuestion}
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
                  <p className="text-sm text-amber-900">
                    💡 이 정리된 질문이 답변자들에게 전달됩니다. 더 명확하고 구체적인 답변을 받을 수 있어요!
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setQuestionScene('ask-question')}
                    className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-colors active:scale-[0.98]"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={handleConfirmQuestion}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    질문 등록
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (questionScene === 'success') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg animate-bounce">
                <Check size={48} className="text-white" strokeWidth={3} />
              </div>

              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                질문이 잘 등록되었습니다!
              </h1>

              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                기다려주시면 답변 알람이 올 거에요
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Bell size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">알림 받기</h3>
                  <p className="text-slate-600 leading-relaxed">
                    답변이 도착하면 푸시 알림으로 바로 알려드릴게요
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center">
                  <Heart size={24} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">선배들이 도와줄게요</h3>
                  <p className="text-slate-600 leading-relaxed">
                    전공 선배들이 정성껏 답변을 준비하고 있어요
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-5 mb-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} />
                <h3 className="font-bold">등록된 질문</h3>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                {selectedSubject?.name} - {questionText.substring(0, 60)}
                {questionText.length > 60 ? '...' : ''}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setQuestionText('');
                  setQuestionScene('question-list');
                }}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-colors active:scale-[0.98] shadow-lg"
              >
                내 질문 보러 가기
              </button>

              <button
                onClick={() => {
                  setQuestionText('');
                  setSelectedSubject(null);
                  setQuestionScene('subject-select');
                }}
                className="w-full py-4 bg-white text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-colors active:scale-[0.98] border border-slate-200"
              >
                새 질문 작성하기
              </button>
            </div>

            <p className="text-center text-sm text-slate-500 mt-6">
              평균 답변 시간: 2-4시간
            </p>
          </div>
        </div>
      );
    }

    if (questionScene === 'question-list') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
            <div className="px-6 py-4">
              <button
                onClick={() => setQuestionScene('subject-select')}
                className="flex items-center gap-2 text-blue-600 font-medium active:opacity-70 transition-opacity"
              >
                <ArrowLeft size={24} />
                <span>뒤로</span>
              </button>
              <h1 className="text-3xl font-bold text-slate-900 mt-2">내 질문</h1>
            </div>
          </div>

          <div className="px-6 py-6 space-y-3">
            {myQuestions.map((q) => (
              <button
                key={q.id}
                onClick={q.isAnswered ? handleAnswerClick : undefined}
                className="w-full bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-[0.98] text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {q.subject}
                  </span>
                  <span className="text-sm text-slate-500">{q.timestamp}</span>
                </div>

                <p className="text-slate-900 font-semibold mb-3 leading-relaxed">
                  {q.question}
                </p>

                {q.isAnswered ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Check size={16} className="text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        답변 {q.answerCount}개
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 line-clamp-2">
                      {q.preview}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    답변 대기 중
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  if (selectedAnswer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
          <div className="px-6 py-4">
            <button
              onClick={() => setSelectedAnswer(null)}
              className="flex items-center gap-2 text-blue-600 font-medium active:opacity-70 transition-opacity"
            >
              <ArrowLeft size={24} />
              <span>뒤로</span>
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="bg-slate-100 rounded-2xl p-4 mb-6">
            <div className="text-sm font-semibold text-blue-600 mb-2">{selectedAnswer.subject}</div>
            <p className="text-slate-900 font-semibold leading-relaxed">{selectedAnswer.question}</p>
          </div>

          <div className="space-y-4">
            {sampleAnswers.map((answer) => (
              <div key={answer.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-semibold text-slate-900">{answer.author}</div>
                    <div className="text-sm text-slate-500 mt-1">{answer.timestamp}</div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                    <Star size={16} className="text-amber-500 fill-current" />
                    <span className="text-sm font-bold text-amber-700">{answer.rating}</span>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {answer.answer}
                </p>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors active:scale-95">
                    도움됐어요
                  </button>
                  <button className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors active:scale-95">
                    추가질문
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 pb-20">
      {renderContent()}

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 safe-area-inset-bottom z-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-around px-2 py-2">
            <TabButton
              icon={<Calendar size={24} />}
              label="시간표"
              isActive={activeTab === 'schedule'}
              onClick={() => setActiveTab('schedule')}
            />
            <TabButton
              icon={<HelpCircle size={24} />}
              label="질문하기"
              isActive={activeTab === 'ask'}
              onClick={() => {
                setActiveTab('ask');
                setQuestionScene('subject-select');
              }}
            />
            <TabButton
              icon={<Home size={28} />}
              label="홈"
              isActive={activeTab === 'home'}
              onClick={() => setActiveTab('home')}
              isCenter
            />
            <TabButton
              icon={<Lightbulb size={24} />}
              label="학습도움"
              isActive={activeTab === 'help'}
              onClick={() => setActiveTab('help')}
            />
            <TabButton
              icon={<SettingsIcon size={24} />}
              label="설정"
              isActive={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isCenter?: boolean;
}

function TabButton({ icon, label, isActive, onClick, isCenter }: TabButtonProps) {
  if (isCenter) {
    return (
      <button
        onClick={onClick}
        className="relative flex flex-col items-center justify-center transition-all active:scale-95"
      >
        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
          isActive
            ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg scale-110'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}>
          {icon}
        </div>
        <span className={`text-xs mt-1 font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center min-w-[70px] py-2 px-3 transition-all active:scale-95"
    >
      <div className={`transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
        {icon}
      </div>
      <span className={`text-xs mt-1 font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
        {label}
      </span>
    </button>
  );
}

export default App;
