import { Brain, Timer, Users, ArrowLeft } from 'lucide-react';

interface LearningHelpSelectionProps {
  onSelect: (type: 'focus' | 'support' | 'reflection') => void;
  onBack: () => void;
}

export default function LearningHelpSelection({ onSelect, onBack }: LearningHelpSelectionProps) {
  const options = [
    {
      id: 'focus' as const,
      icon: Timer,
      title: '집중력 도구',
      description: '타이머, 목표설정',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600'
    },
    {
      id: 'support' as const,
      icon: Users,
      title: '학습 지원',
      description: '매칭, 자료, 시험',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-600 hover:to-emerald-600'
    },
    {
      id: 'reflection' as const,
      icon: Brain,
      title: '학습 회고',
      description: 'AI 분석, 리포트',
      color: 'bg-gradient-to-br from-orange-500 to-amber-500',
      hoverColor: 'hover:from-orange-600 hover:to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">학습도움</h1>
        </div>
        <div className="text-center mb-12">
          <p className="text-lg text-slate-600">필요한 도구를 선택하세요</p>
        </div>

        <div className="space-y-4">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`w-full ${option.color} ${option.hoverColor} text-white rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 group-hover:bg-white/30 transition-colors">
                      <Icon size={40} className="text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold mb-1">{option.title}</h3>
                      <p className="text-white/90 text-lg">{option.description}</p>
                    </div>
                  </div>
                  <div className="text-white/60 group-hover:text-white transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            각 도구는 당신의 학습을 더 효과적으로 만들어줍니다
          </p>
        </div>
      </div>
    </div>
  );
}
