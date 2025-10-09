import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, TrendingUp, ArrowLeft, Users, BookOpen, Calendar, Trash2, Check, Zap } from 'lucide-react';

interface FocusToolsProps {
  onBack: () => void;
}

export default function FocusTools({ onBack }: FocusToolsProps) {
  const [activeTab, setActiveTab] = useState<'timer' | 'body-doubling' | 'journal' | 'timeline'>('timer');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');
  const [todayFocusTime, setTodayFocusTime] = useState(0);

  const [activeStudiers] = useState(23);
  const [isStudying, setIsStudying] = useState(false);
  const [studySubject, setStudySubject] = useState('');

  const [distractions, setDistractions] = useState([
    { id: 1, note: '심리학 레포트 자료 더 찾아보기', handled: false, time: '10:23' },
    { id: 2, note: '친구한테 연락하기', handled: true, time: '10:15' },
  ]);
  const [newDistraction, setNewDistraction] = useState('');


  const [scheduleBlocks, setScheduleBlocks] = useState([
    { id: 1, time: '09:00-10:30', subject: '심리통계', completed: true, color: 'bg-blue-500' },
    { id: 2, time: '10:45-12:00', subject: '일반심리학', completed: true, color: 'bg-green-500' },
    { id: 3, time: '14:00-15:30', subject: '발달심리', completed: false, color: 'bg-purple-500' },
    { id: 4, time: '16:00-17:00', subject: '기말 레포트', completed: false, color: 'bg-orange-500' },
  ]);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (sessionType === 'focus') {
              setTodayFocusTime((prev) => prev + 25);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = sessionType === 'focus'
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === 'focus' ? 25 * 60 : 5 * 60);
  };

  const switchSession = (type: 'focus' | 'break') => {
    setSessionType(type);
    setIsRunning(false);
    setTimeLeft(type === 'focus' ? 25 * 60 : 5 * 60);
  };

  const addDistraction = () => {
    if (newDistraction.trim()) {
      const now = new Date();
      setDistractions([
        {
          id: Date.now(),
          note: newDistraction,
          handled: false,
          time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
        },
        ...distractions
      ]);
      setNewDistraction('');
    }
  };

  const toggleDistraction = (id: number) => {
    setDistractions(distractions.map(d =>
      d.id === id ? { ...d, handled: !d.handled } : d
    ));
  };

  const deleteDistraction = (id: number) => {
    setDistractions(distractions.filter(d => d.id !== id));
  };

  const toggleScheduleBlock = (id: number) => {
    setScheduleBlocks(scheduleBlocks.map(block =>
      block.id === id ? { ...block, completed: !block.completed } : block
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">집중력 도구</h1>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('timer')}
            className={`py-3 px-6 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'timer'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            타이머
          </button>
          <button
            onClick={() => setActiveTab('body-doubling')}
            className={`py-3 px-6 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'body-doubling'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            같이 공부
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`py-3 px-6 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'journal'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            기록장
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-6 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            타임라인
          </button>
        </div>

        {activeTab === 'timer' && (
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => switchSession('focus')}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  sessionType === 'focus'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                집중 (25분)
              </button>
              <button
                onClick={() => switchSession('break')}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  sessionType === 'break'
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                휴식 (5분)
              </button>
            </div>

            <div className="relative w-64 h-64 mx-auto mb-8">
              <svg className="transform -rotate-90 w-64 h-64">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke={sessionType === 'focus' ? '#3b82f6' : '#10b981'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-slate-800 mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-slate-500">
                    {sessionType === 'focus' ? '집중 시간' : '휴식 시간'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`p-6 rounded-full ${
                  sessionType === 'focus' ? 'bg-blue-500' : 'bg-green-500'
                } text-white hover:opacity-90 transition-all shadow-lg hover:scale-105`}
              >
                {isRunning ? <Pause size={32} /> : <Play size={32} />}
              </button>
              <button
                onClick={resetTimer}
                className="p-6 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all shadow-lg hover:scale-105"
              >
                <RotateCcw size={32} />
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">오늘의 집중 시간</span>
                <span className="text-2xl font-bold text-blue-600">{todayFocusTime}분</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'body-doubling' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 shadow-xl text-white">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Users size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-2">바디 더블링</h2>
                <p className="text-white/90 mb-6">혼자가 아니에요. 지금 함께 공부하고 있어요!</p>

                <div className="flex items-center justify-center gap-2 text-5xl font-bold mb-2">
                  <Users size={48} />
                  <span>{activeStudiers}</span>
                </div>
                <p className="text-white/80">명이 지금 집중하고 있어요</p>
              </div>

              {!isStudying ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="무엇을 공부하나요? (선택)"
                    value={studySubject}
                    onChange={(e) => setStudySubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border-2 border-white/30 focus:border-white/60 focus:outline-none"
                  />
                  <button
                    onClick={() => setIsStudying(true)}
                    className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-white/90 transition-colors"
                  >
                    공부 시작하기
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-center text-lg">
                      {studySubject || '열심히'} 공부 중... 💪
                    </p>
                  </div>
                  <button
                    onClick={() => setIsStudying(false)}
                    className="w-full py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-colors"
                  >
                    공부 종료
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">바디 더블링이란?</h3>
              <div className="space-y-3 text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-purple-600" />
                  </div>
                  <p className="text-sm">다른 사람이 함께 있을 때 집중력이 높아지는 현상</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-purple-600" />
                  </div>
                  <p className="text-sm">연구로 입증된 집중력 향상 기법</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-purple-600" />
                  </div>
                  <p className="text-sm">카메라 없이도 "함께한다"는 느낌만으로 효과</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={16} className="text-purple-600" />
                  </div>
                  <p className="text-sm">과제 시작의 어려움(initiation paralysis) 극복</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen size={24} className="text-blue-600" />
                산만함 기록장
              </h2>
              <p className="text-slate-600 mb-6 text-sm">
                공부 중 떠오르는 생각을 빠르게 적고 나중에 처리하세요. 집중력을 유지할 수 있어요!
              </p>

              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newDistraction}
                  onChange={(e) => setNewDistraction(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDistraction()}
                  placeholder="지금 무슨 생각이 났나요?"
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={addDistraction}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  추가
                </button>
              </div>

              <div className="space-y-2">
                {distractions.map((distraction) => (
                  <div
                    key={distraction.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      distraction.handled
                        ? 'bg-green-50 border-green-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => toggleDistraction(distraction.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        distraction.handled
                          ? 'bg-green-500 border-green-500'
                          : 'border-slate-300 hover:border-blue-500'
                      }`}
                    >
                      {distraction.handled && <Check size={16} className="text-white" />}
                    </button>
                    <div className="flex-1">
                      <p className={`${distraction.handled ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                        {distraction.note}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{distraction.time}</p>
                    </div>
                    <button
                      onClick={() => deleteDistraction(distraction.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <Zap size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-800 mb-1">사용 팁</h3>
                  <p className="text-blue-700 text-sm">
                    공부 중 "나중에 봐야지"라는 생각이 들면 바로 적으세요.
                    머릿속에서 지우고 집중할 수 있어요. 휴식 시간에 처리하면 됩니다!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Calendar size={24} className="text-blue-600" />
                  오늘의 타임라인
                </h2>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <Plus size={20} />
                  블록 추가
                </button>
              </div>

              <div className="space-y-3">
                {scheduleBlocks.map((block) => (
                  <div
                    key={block.id}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                      block.completed
                        ? 'border-green-300 bg-green-50'
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-4 p-4">
                      <button
                        onClick={() => toggleScheduleBlock(block.id)}
                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          block.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300 hover:border-blue-500'
                        }`}
                      >
                        {block.completed && <Check size={20} className="text-white" />}
                      </button>

                      <div className={`w-1 h-12 rounded-full ${block.color}`} />

                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${block.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                          {block.subject}
                        </h3>
                        <p className="text-sm text-slate-500">{block.time}</p>
                      </div>

                      {block.completed && (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          완료
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-slate-800 mb-4 text-lg">진행 상황</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600">오늘의 완료율</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {Math.round((scheduleBlocks.filter(b => b.completed).length / scheduleBlocks.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                      style={{ width: `${(scheduleBlocks.filter(b => b.completed).length / scheduleBlocks.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-sm text-slate-600 mb-1">완료</div>
                    <div className="text-3xl font-bold text-blue-600">
                      {scheduleBlocks.filter(b => b.completed).length}
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="text-sm text-slate-600 mb-1">남음</div>
                    <div className="text-3xl font-bold text-orange-600">
                      {scheduleBlocks.filter(b => !b.completed).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-5 border-2 border-purple-200">
              <div className="flex items-start gap-3">
                <TrendingUp size={24} className="text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-purple-800 mb-1">시각적 타임라인 효과</h3>
                  <p className="text-purple-700 text-sm">
                    하루를 블록으로 나누면 큰 목표가 작은 단계로 나뉘어 부담이 줄어들어요.
                    완료한 블록을 체크하면 성취감도 느낄 수 있어요!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
