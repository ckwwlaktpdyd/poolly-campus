import { useState } from 'react';
import { MessageSquare, MessageCircle, Users, BookOpen, ArrowLeft, Plus, Star, ThumbsUp, Eye, Clock, Award, TrendingUp, Search, Filter } from 'lucide-react';

interface StudySupportProps {
  onBack: () => void;
}

export default function StudySupport({ onBack }: StudySupportProps) {
  const [activeTab, setActiveTab] = useState<'board' | 'chat' | 'groups' | 'mentor'>('board');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  const subjects = ['전체', '심리학', '통계학', '생물학', '수학', '영어', '물리학', '화학'];

  const helpRequests = [
    {
      id: 1,
      anonymousName: '멘티127',
      subject: '심리학',
      title: '발달심리학 피아제 이론 질문이요',
      content: '피아제의 인지발달 단계 중에서 전조작기와 구체적 조작기의 차이점이 잘 이해가 안 가요...',
      status: 'open' as const,
      urgency: 'medium' as const,
      responseCount: 3,
      viewCount: 24,
      helpfulCount: 5,
      timeAgo: '2시간 전',
    },
    {
      id: 2,
      anonymousName: '멘티089',
      subject: '통계학',
      title: 'SPSS 분석 결과 해석 도와주세요',
      content: '회귀분석을 돌렸는데 R-squared 값과 p-value를 어떻게 해석해야 할지...',
      status: 'answered' as const,
      urgency: 'high' as const,
      responseCount: 7,
      viewCount: 45,
      helpfulCount: 12,
      timeAgo: '5시간 전',
    },
    {
      id: 3,
      anonymousName: '멘티234',
      subject: '생물학',
      title: '유전학 멘델의 법칙 궁금해요',
      content: '독립의 법칙과 분리의 법칙 차이를 설명해주실 분...',
      status: 'resolved' as const,
      urgency: 'low' as const,
      responseCount: 5,
      viewCount: 38,
      helpfulCount: 9,
      timeAgo: '1일 전',
    },
  ];

  const myChatRooms = [
    {
      id: 1,
      partnerName: '멘토456',
      subject: '심리학',
      lastMessage: '네, 이해되셨다니 다행이에요!',
      unreadCount: 0,
      isActive: true,
      timeAgo: '10분 전',
    },
    {
      id: 2,
      partnerName: '멘티789',
      subject: '통계학',
      lastMessage: '분산분석 설명 감사합니다',
      unreadCount: 2,
      isActive: true,
      timeAgo: '1시간 전',
    },
  ];

  const studyGroups = [
    {
      id: 1,
      subject: '심리학',
      title: '임상심리학 기말고사 대비 스터디',
      description: '주 2회 온라인으로 모여서 내용 정리하고 문제풀이 같이 해요',
      currentMembers: 4,
      maxMembers: 6,
      creatorName: '스터디장123',
      status: 'recruiting' as const,
      schedule: '화, 목 19:00',
    },
    {
      id: 2,
      subject: '통계학',
      title: 'SPSS 실습 스터디 모집',
      description: '통계 프로그램 같이 공부하실 분! 초보 환영',
      currentMembers: 3,
      maxMembers: 5,
      creatorName: '스터디장456',
      status: 'recruiting' as const,
      schedule: '주말 오후 2시',
    },
    {
      id: 3,
      subject: '생물학',
      title: '분자생물학 논문 읽기 스터디',
      description: '매주 논문 1편씩 읽고 토론해요',
      currentMembers: 5,
      maxMembers: 6,
      status: 'active' as const,
      creatorName: '스터디장789',
      schedule: '수요일 18:00',
    },
  ];

  const topMentors = [
    {
      id: 1,
      anonymousName: '심리학멘토',
      subjects: ['심리학', '상담학'],
      level: 5,
      points: 2340,
      totalHelped: 127,
      rating: 4.9,
      recentHelp: '방금 전',
    },
    {
      id: 2,
      anonymousName: '통계학선배',
      subjects: ['통계학', '수학'],
      level: 4,
      points: 1890,
      totalHelped: 95,
      rating: 4.8,
      recentHelp: '5분 전',
    },
    {
      id: 3,
      anonymousName: '생물학고수',
      subjects: ['생물학', '화학'],
      level: 3,
      points: 1250,
      totalHelped: 67,
      rating: 4.7,
      recentHelp: '1시간 전',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'answered': return 'bg-green-100 text-green-700';
      case 'resolved': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return '답변 대기';
      case 'answered': return '답변 완료';
      case 'resolved': return '해결됨';
      default: return '대기중';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 5) return 'from-amber-400 to-yellow-500';
    if (level >= 3) return 'from-blue-400 to-cyan-500';
    return 'from-slate-400 to-slate-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">익명 멘토링</h1>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setActiveTab('board')}
            className={`py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'board'
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare size={20} className="mx-auto mb-1" />
            <div className="text-sm">질문 게시판</div>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'chat'
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageCircle size={20} className="mx-auto mb-1" />
            <div className="text-sm">1:1 채팅</div>
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'groups'
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users size={20} className="mx-auto mb-1" />
            <div className="text-sm">스터디 그룹</div>
          </button>
          <button
            onClick={() => setActiveTab('mentor')}
            className={`py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'mentor'
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Award size={20} className="mx-auto mb-1" />
            <div className="text-sm">멘토 활동</div>
          </button>
        </div>

        {activeTab === 'board' && (
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <button className="flex-1 bg-green-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg">
                <Plus size={24} />
                질문 작성하기
              </button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setFilterSubject(subject === '전체' ? 'all' : subject)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      filterSubject === (subject === '전체' ? 'all' : subject)
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {helpRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold">
                          {request.subject}
                        </span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(request.status)}`}>
                          {getStatusText(request.status)}
                        </span>
                        <span className={`text-xs font-bold ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency === 'high' ? '🔥 긴급' : ''}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg mb-2">{request.title}</h3>
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">{request.content}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MessageCircle size={16} />
                          답변 {request.responseCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={16} />
                          조회 {request.viewCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp size={16} />
                          도움 {request.helpfulCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {request.timeAgo}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-bold text-xs">익명</span>
                      </div>
                      <p className="text-xs text-slate-500 text-center mt-1">{request.anonymousName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <BookOpen size={24} />
                질문 게시판 가이드
              </h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  모든 질문과 답변은 완전히 익명으로 진행됩니다
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  도움이 된 답변에는 '도움됨\' 버튼을 눌러주세요
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  멘토는 답변으로 포인트와 레벨을 얻을 수 있습니다
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="space-y-4">
            <button className="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <Plus size={24} />
              새 채팅 시작하기
            </button>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <MessageCircle size={24} className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">내 채팅방</h2>
              </div>

              <div className="space-y-3">
                {myChatRooms.map((room) => (
                  <div key={room.id} className="border-2 border-slate-200 rounded-xl p-4 hover:border-green-300 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-700 font-bold text-sm">익명</span>
                          </div>
                          {room.unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{room.unreadCount}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-800">{room.partnerName}</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                              {room.subject}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{room.lastMessage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">{room.timeAgo}</p>
                        {room.isActive && (
                          <span className="inline-block mt-1 w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <MessageCircle size={24} />
                1:1 채팅 매칭
              </h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  과목을 선택하면 해당 분야 멘토와 자동 매칭됩니다
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  실시간 채팅으로 빠른 답변을 받을 수 있어요
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  채팅 종료 후 멘토에게 별점을 남겨주세요
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-4">
            <button className="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <Plus size={24} />
              스터디 그룹 만들기
            </button>

            <div className="space-y-4">
              {studyGroups.map((group) => (
                <div key={group.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold">
                          {group.subject}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          group.status === 'recruiting'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {group.status === 'recruiting' ? '모집중' : '진행중'}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-xl mb-2">{group.title}</h3>
                      <p className="text-slate-600 mb-3">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Users size={16} />
                          {group.currentMembers}/{group.maxMembers}명
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {group.schedule}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <Users size={24} className="text-green-700" />
                      </div>
                      <p className="text-xs text-slate-500 text-center">{group.creatorName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-green-500 rounded-full h-2 transition-all"
                        style={{ width: `${(group.currentMembers / group.maxMembers) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-600">
                      {Math.round((group.currentMembers / group.maxMembers) * 100)}%
                    </span>
                  </div>

                  {group.status === 'recruiting' && (
                    <button className="w-full mt-4 bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                      참여하기
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Users size={24} />
                스터디 그룹 혜택
              </h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  소규모 그룹(최대 6명)으로 효과적인 학습
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  정기적인 일정으로 꾸준한 학습 습관 형성
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300">✓</span>
                  같은 과목을 공부하는 동료들과 정보 공유
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'mentor' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">멘토 활동 시작하기</h2>
                  <p className="text-white/90">다른 학생들을 도와주고 포인트를 획득하세요!</p>
                </div>
                <Award size={48} />
              </div>
              <button className="w-full bg-white text-orange-600 py-3 px-6 rounded-xl font-bold hover:bg-orange-50 transition-colors">
                멘토로 등록하기
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <TrendingUp size={24} className="text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">상위 멘토</h2>
              </div>

              <div className="space-y-3">
                {topMentors.map((mentor, index) => (
                  <div key={mentor.id} className="border-2 border-slate-200 rounded-xl p-5 hover:border-amber-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`w-16 h-16 bg-gradient-to-br ${getLevelColor(mentor.level)} rounded-full flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-2xl">{index + 1}</span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-amber-400">
                            <span className="text-xs font-bold text-amber-600">L{mentor.level}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-800 text-lg">{mentor.anonymousName}</span>
                            <div className="flex items-center gap-1">
                              <Star size={16} className="text-yellow-500 fill-yellow-500" />
                              <span className="font-bold text-slate-700">{mentor.rating}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mb-2">
                            {mentor.subjects.map((subject, idx) => (
                              <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                                {subject}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <ThumbsUp size={14} />
                              {mentor.totalHelped}명 도움
                            </span>
                            <span className="flex items-center gap-1">
                              <Award size={14} />
                              {mentor.points}pt
                            </span>
                            <span className="text-green-600 font-medium">
                              {mentor.recentHelp} 활동
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors">
                        채팅하기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-lg text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award size={24} className="text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">레벨 시스템</div>
                <p className="text-sm text-slate-600">활동으로 레벨업</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-lg text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star size={24} className="text-green-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">포인트 적립</div>
                <p className="text-sm text-slate-600">답변으로 포인트 획득</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-lg text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">랭킹 등록</div>
                <p className="text-sm text-slate-600">상위 멘토 혜택</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-3">멘토 혜택</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="font-semibold mb-1">전문성 인정</div>
                  <div className="text-sm text-white/90">레벨과 평점으로 실력 증명</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl mb-1">💎</div>
                  <div className="font-semibold mb-1">포인트 리워드</div>
                  <div className="text-sm text-white/90">포인트로 다양한 혜택</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="font-semibold mb-1">학습 강화</div>
                  <div className="text-sm text-white/90">가르치며 더 깊이 이해</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl mb-1">🤝</div>
                  <div className="font-semibold mb-1">네트워킹</div>
                  <div className="text-sm text-white/90">대학생 커뮤니티 구축</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
