import React from 'react';
import { Clock, MapPin, AlertCircle, BookOpen, FileText, Trophy, Bell, ChevronRight, Calendar, Lightbulb } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

interface TodayClass {
  id: number;
  name: string;
  time: string;
  room: string;
  color: string;
  icon: string;
  professor: string;
}

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  daysLeft: number;
  priority: 'high' | 'medium' | 'low';
}

interface Exam {
  id: number;
  subject: string;
  date: string;
  time: string;
  room: string;
  daysLeft: number;
  type: string;
}

function HomeScreen({ onNavigate }: HomeScreenProps) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const greeting = currentHour < 12 ? '좋은 아침이에요' : currentHour < 18 ? '좋은 오후에요' : '좋은 저녁이에요';
  const todayDate = currentTime.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' });

  const todayClasses: TodayClass[] = [
    {
      id: 1,
      name: '임상심리학',
      time: '09:00 - 10:30',
      room: '인문관 302호',
      color: 'from-blue-500 to-cyan-500',
      icon: '🧠',
      professor: '김교수님'
    },
    {
      id: 2,
      name: '발달심리학',
      time: '13:00 - 14:30',
      room: '심리학관 201호',
      color: 'from-green-500 to-emerald-500',
      icon: '👶',
      professor: '이교수님'
    },
    {
      id: 3,
      name: '인지심리학',
      time: '15:00 - 16:30',
      room: '심리학관 105호',
      color: 'from-purple-500 to-pink-500',
      icon: '💭',
      professor: '박교수님'
    }
  ];

  const upcomingAssignments: Assignment[] = [
    {
      id: 1,
      title: 'DSM-5 우울증 사례 분석 레포트',
      subject: '임상심리학',
      dueDate: '10월 5일',
      daysLeft: 3,
      priority: 'high'
    },
    {
      id: 2,
      title: '피아제 이론 정리 및 비판',
      subject: '발달심리학',
      dueDate: '10월 8일',
      daysLeft: 6,
      priority: 'medium'
    }
  ];

  const upcomingExams: Exam[] = [
    {
      id: 1,
      subject: '심리통계',
      date: '10월 12일',
      time: '14:00 - 16:00',
      room: '인문관 501호',
      daysLeft: 10,
      type: '중간고사'
    },
    {
      id: 2,
      subject: '사회심리학',
      date: '10월 15일',
      time: '10:00 - 12:00',
      room: '심리학관 301호',
      daysLeft: 13,
      type: '중간고사'
    }
  ];

  const getNextClass = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const cls of todayClasses) {
      const [startTime] = cls.time.split(' - ');
      const [hours, minutes] = startTime.split(':').map(Number);
      const classMinutes = hours * 60 + minutes;

      if (classMinutes > currentMinutes) {
        return cls;
      }
    }
    return null;
  };

  const nextClass = getNextClass();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 pb-24">
      <div className="px-6 pt-16 pb-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{greeting} ☀️</h1>
          <p className="text-lg text-slate-600">{todayDate}</p>
        </div>

        {nextClass && (
          <div className={`bg-gradient-to-r ${nextClass.color} rounded-3xl p-6 shadow-lg text-white mb-6`}>
            <div className="flex items-center gap-2 mb-3">
              <Bell size={20} />
              <span className="text-sm font-semibold uppercase tracking-wider">다음 수업</span>
            </div>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{nextClass.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold">{nextClass.name}</h3>
                    <p className="text-white/90 text-sm">{nextClass.professor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span className="font-semibold">{nextClass.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span className="font-semibold">{nextClass.room}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">오늘의 수업</h2>
            <button
              onClick={() => onNavigate('schedule')}
              className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              전체보기
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="space-y-3">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-xl shadow-md flex-shrink-0`}>
                    {cls.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 mb-1">{cls.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{cls.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{cls.room}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText size={24} className="text-amber-600" />
              과제
            </h2>
          </div>

          {upcomingAssignments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1 leading-snug">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-blue-600 font-semibold">{assignment.subject}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        assignment.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : assignment.priority === 'medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      D-{assignment.daysLeft}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={14} />
                      <span>마감: {assignment.dueDate}</span>
                    </div>
                    {assignment.daysLeft <= 3 && (
                      <div className="flex items-center gap-1 text-red-600 text-xs font-semibold">
                        <AlertCircle size={14} />
                        <span>마감 임박!</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
              <p className="text-slate-500">제출할 과제가 없어요 🎉</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Trophy size={24} className="text-purple-600" />
              시험 일정
            </h2>
          </div>

          <div className="space-y-3">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full mb-2">
                      {exam.type}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{exam.subject}</h3>
                    <p className="text-slate-700 font-semibold">{exam.date} {exam.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-700">D-{exam.daysLeft}</div>
                    <div className="text-xs text-slate-600 mt-1">{exam.daysLeft}일 남음</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 pt-3 border-t border-purple-200">
                  <MapPin size={14} />
                  <span>{exam.room}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
