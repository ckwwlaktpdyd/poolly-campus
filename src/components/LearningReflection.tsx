import { useState } from 'react';
import { Brain, TrendingUp, Target, AlertTriangle, Lightbulb, ArrowLeft, Calendar, BookOpen } from 'lucide-react';

interface LearningReflectionProps {
  onBack: () => void;
}

export default function LearningReflection({ onBack }: LearningReflectionProps) {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const weeklyData = {
    totalHours: 12.5,
    sessionsCompleted: 18,
    subjectsStudied: ['일반심리학', '심리통계', '발달심리'],
    questionsAsked: 24,
    averageDifficulty: 'medium',
  };

  const aiAnalysis = {
    learningLevel: {
      general: { level: 'intermediate', score: 75, trend: 'up' },
      statistics: { level: 'beginner', score: 62, trend: 'up' },
      developmental: { level: 'advanced', score: 82, trend: 'stable' },
    },
    strengths: [
      '발달심리 이론 이해가 빠르세요',
      '심리학 용어 정리를 잘하고 있어요',
      '규칙적인 학습 패턴을 유지하고 있어요',
    ],
    challenges: [
      '심리통계 공식 적용에 어려움을 겪고 있어요',
      '연구방법론 개념에서 헷갈려요',
      '오후 시간대 집중력이 떨어져요',
    ],
    recommendations: [
      '심리통계는 예제 문제를 많이 풀어보세요',
      '연구방법론은 실제 연구 사례로 공부하면 이해가 쉬워요',
      '오후 학습 전에 짧은 휴식을 취하세요',
      '주말에 통계 연습문제 시간을 따로 만드세요',
    ],
  };

  const dailyReflections = [
    {
      date: '2025-10-02',
      day: '오늘',
      focusTime: 145,
      subjects: ['일반심리학', '발달심리'],
      achievement: '발달단계 이론 정리 완료',
      challenge: '집중력 유지가 어려웠음',
    },
    {
      date: '2025-10-01',
      day: '어제',
      focusTime: 120,
      subjects: ['심리통계', '연구방법론'],
      achievement: '기술통계 기초 개념 학습',
      challenge: '통계 공식 적용이 어려움',
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'advanced': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-blue-600 bg-blue-100';
      case 'beginner': return 'text-orange-600 bg-orange-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'advanced': return '우수';
      case 'intermediate': return '보통';
      case 'beginner': return '기초';
      default: return '평가중';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <span className="text-green-500">↗</span>;
    if (trend === 'down') return <span className="text-red-500">↘</span>;
    return <span className="text-slate-400">→</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">학습 회고</h1>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedWeek('current')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              selectedWeek === 'current'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            이번 주
          </button>
          <button
            onClick={() => setSelectedWeek('last')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              selectedWeek === 'last'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            지난 주
          </button>
          <button
            onClick={() => setSelectedWeek('month')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              selectedWeek === 'month'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            이번 달
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="text-sm text-slate-600 mb-1">총 학습 시간</div>
            <div className="text-3xl font-bold text-orange-600">{weeklyData.totalHours}시간</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="text-sm text-slate-600 mb-1">완료한 세션</div>
            <div className="text-3xl font-bold text-orange-600">{weeklyData.sessionsCompleted}개</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="text-sm text-slate-600 mb-1">학습한 과목</div>
            <div className="flex gap-2 mt-2">
              {weeklyData.subjectsStudied.map((subject, index) => (
                <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium">
                  {subject}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <div className="text-sm text-slate-600 mb-1">질문 개수</div>
            <div className="text-3xl font-bold text-orange-600">{weeklyData.questionsAsked}개</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 shadow-lg mb-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Brain size={28} />
            </div>
            <h2 className="text-2xl font-bold">AI 학습 분석</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-lg">과목별 수준 평가</h3>
              <div className="space-y-3">
                {Object.entries(aiAnalysis.learningLevel).map(([subject, data]) => (
                  <div key={subject} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold capitalize">{subject === 'general' ? '일반심리학' : subject === 'statistics' ? '심리통계' : '발달심리'}</span>
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getLevelColor(data.level)}`}>
                          {getLevelText(data.level)}
                        </span>
                        <span className="text-lg">{getTrendIcon(data.trend)}</span>
                      </div>
                      <span className="text-2xl font-bold">{data.score}점</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-500 rounded-full"
                        style={{ width: `${data.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">강점</h3>
            </div>
            <ul className="space-y-2">
              {aiAnalysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-700">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">개선 필요</h3>
            </div>
            <ul className="space-y-2">
              {aiAnalysis.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-700">
                  <span className="text-red-500 mt-1">!</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Lightbulb size={24} className="text-yellow-600" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">AI 추천</h3>
          </div>
          <ul className="space-y-3">
            {aiAnalysis.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600 font-bold text-lg">{index + 1}</span>
                <span className="text-slate-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">일일 회고</h3>
          </div>

          <div className="space-y-3">
            {dailyReflections.map((reflection, index) => (
              <div key={index} className="border border-slate-200 rounded-xl p-4 hover:border-orange-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-800">{reflection.day}</span>
                      <span className="text-sm text-slate-500">{reflection.date}</span>
                    </div>
                    <div className="flex gap-2 mb-2">
                      {reflection.subjects.map((subject, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{reflection.focusTime}분</div>
                    <div className="text-xs text-slate-500">집중 시간</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Target size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{reflection.achievement}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{reflection.challenge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
            <BookOpen size={20} />
            오늘의 회고 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}
