import { useState } from 'react';
import { ArrowLeft, User, GraduationCap, Bell, Clock, Download, Trash2, Moon, Sun, HelpCircle, MessageSquare, Info, FileText, Shield, LogOut, ChevronRight, Gift, Plus, X } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

interface Reward {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function Settings({ onBack }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    studyStart: true,
    studyEnd: true,
    breakTime: true,
    dailyGoal: true,
  });
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [dailyGoal, setDailyGoal] = useState(4);

  const [rewards, setRewards] = useState<Reward[]>([
    { id: 1, title: '커피 한 잔', description: '좋아하는 카페에서 커피 마시기', icon: '☕' },
    { id: 2, title: '산책 10분', description: '밖에 나가서 신선한 공기 마시기', icon: '🚶' },
    { id: 3, title: '게임 15분', description: '좋아하는 게임하기', icon: '🎮' },
    { id: 4, title: '유튜브 시청', description: '재미있는 영상 보기', icon: '📺' },
  ]);
  const [newReward, setNewReward] = useState({ title: '', description: '', icon: '🎁' });
  const [showRewardForm, setShowRewardForm] = useState(false);
  const [rewardsEnabled, setRewardsEnabled] = useState(true);

  const userInfo = {
    name: '김민수',
    major: '심리학과',
    studentId: '2024123456',
    semester: '1학년 1학기',
  };

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      alert('로그아웃 되었습니다');
    }
  };

  const handleDataExport = () => {
    alert('학습 기록을 CSV 파일로 내보냅니다');
  };

  const handleDataReset = () => {
    if (confirm('모든 학습 기록이 삭제됩니다. 계속하시겠습니까?')) {
      alert('학습 기록이 초기화되었습니다');
    }
  };

  const handleCacheClear = () => {
    if (confirm('앱 캐시를 삭제하시겠습니까?')) {
      alert('캐시가 삭제되었습니다');
    }
  };

  const addReward = () => {
    if (newReward.title.trim()) {
      setRewards([...rewards, { ...newReward, id: Date.now() }]);
      setNewReward({ title: '', description: '', icon: '🎁' });
      setShowRewardForm(false);
    }
  };

  const deleteReward = (id: number) => {
    setRewards(rewards.filter(r => r.id !== id));
  };

  const availableIcons = ['🎁', '☕', '🚶', '🎮', '📺', '🍕', '🍰', '🎵', '📚', '🎬', '🏃', '🧘', '🎨', '🌟', '💪', '🎯'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="text-3xl font-bold text-slate-800">설정</h1>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600">
              <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <User size={20} />
                계정 & 프로필
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-200">
                <div>
                  <div className="text-sm text-slate-500">이름</div>
                  <div className="font-semibold text-slate-800">{userInfo.name}</div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  수정
                </button>
              </div>

              <div className="py-3 border-b border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-slate-500">학과/학번 인증</div>
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                    인증완료
                  </span>
                </div>
                <div className="text-sm text-slate-700">
                  <div>{userInfo.major}</div>
                  <div className="text-slate-500">{userInfo.studentId}</div>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm text-slate-500">학기 정보</div>
                  <div className="font-semibold text-slate-800">{userInfo.semester}</div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  변경
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <Clock size={20} />
                학습 설정
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-slate-700 font-medium">포모도로 시간</label>
                  <span className="text-orange-600 font-bold">{pomodoroTime}분</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={pomodoroTime}
                  onChange={(e) => setPomodoroTime(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>15분</span>
                  <span>60분</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-slate-700 font-medium">휴식 시간</label>
                  <span className="text-orange-600 font-bold">{breakTime}분</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="5"
                  value={breakTime}
                  onChange={(e) => setBreakTime(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>5분</span>
                  <span>20분</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-slate-700 font-medium">일일 학습 목표</label>
                  <span className="text-orange-600 font-bold">{dailyGoal}시간</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1시간</span>
                  <span>12시간</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-slate-700 font-medium flex items-center gap-2">
                    <Bell size={18} />
                    알림 설정
                  </label>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">학습 시작 알림</span>
                    <button
                      onClick={() => setNotifications({...notifications, studyStart: !notifications.studyStart})}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.studyStart ? 'bg-orange-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.studyStart ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">학습 종료 알림</span>
                    <button
                      onClick={() => setNotifications({...notifications, studyEnd: !notifications.studyEnd})}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.studyEnd ? 'bg-orange-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.studyEnd ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">휴식 시간 알림</span>
                    <button
                      onClick={() => setNotifications({...notifications, breakTime: !notifications.breakTime})}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.breakTime ? 'bg-orange-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.breakTime ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">일일 목표 달성 알림</span>
                    <button
                      onClick={() => setNotifications({...notifications, dailyGoal: !notifications.dailyGoal})}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.dailyGoal ? 'bg-orange-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications.dailyGoal ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <Gift size={20} />
                나의 보상 목록
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Gift size={20} className="text-pink-600" />
                  <div>
                    <span className="text-slate-700 font-medium block">보상 시스템 사용</span>
                    <span className="text-xs text-slate-500">집중 시간 완료 후 보상을 선택할 수 있어요</span>
                  </div>
                </div>
                <button
                  onClick={() => setRewardsEnabled(!rewardsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    rewardsEnabled ? 'bg-pink-500' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    rewardsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {rewardsEnabled && (
                <>
                  {!showRewardForm ? (
                    <button
                      onClick={() => setShowRewardForm(true)}
                      className="w-full py-3 px-4 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      새 보상 추가
                    </button>
                  ) : (
                    <div className="p-4 bg-pink-50 rounded-xl space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-800">새 보상 만들기</h3>
                        <button
                          onClick={() => {
                            setShowRewardForm(false);
                            setNewReward({ title: '', description: '', icon: '🎁' });
                          }}
                          className="p-1 hover:bg-pink-100 rounded transition-colors"
                        >
                          <X size={20} className="text-slate-500" />
                        </button>
                      </div>

                      <div>
                        <label className="text-sm text-slate-600 block mb-2">아이콘 선택</label>
                        <div className="grid grid-cols-8 gap-2">
                          {availableIcons.map((icon) => (
                            <button
                              key={icon}
                              onClick={() => setNewReward({ ...newReward, icon })}
                              className={`text-2xl p-2 rounded-lg transition-all ${
                                newReward.icon === icon
                                  ? 'bg-pink-500 scale-110'
                                  : 'bg-white hover:bg-pink-100'
                              }`}
                            >
                              {icon}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-600 block mb-2">보상 제목</label>
                        <input
                          type="text"
                          value={newReward.title}
                          onChange={(e) => setNewReward({ ...newReward, title: e.target.value })}
                          placeholder="예: 커피 한 잔"
                          className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-slate-600 block mb-2">설명 (선택)</label>
                        <input
                          type="text"
                          value={newReward.description}
                          onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                          placeholder="예: 좋아하는 카페에서 커피 마시기"
                          className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={addReward}
                        disabled={!newReward.title.trim()}
                        className="w-full py-2 px-4 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        추가하기
                      </button>
                    </div>
                  )}

                  <div className="space-y-2">
                    {rewards.map((reward) => (
                      <div
                        key={reward.id}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl group hover:shadow-md transition-all"
                      >
                        <div className="text-3xl">{reward.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">{reward.title}</h4>
                          {reward.description && (
                            <p className="text-sm text-slate-600">{reward.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteReward(reward.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 rounded-lg transition-all"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {rewards.length === 0 && !showRewardForm && (
                    <div className="text-center py-8 text-slate-500">
                      <Gift size={48} className="mx-auto mb-3 text-slate-300" />
                      <p>아직 보상이 없어요</p>
                      <p className="text-sm">위 버튼을 눌러 첫 보상을 추가해보세요</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <Download size={20} />
                데이터 & 동기화
              </h2>
            </div>

            <div className="p-6 space-y-3">
              <button
                onClick={handleDataExport}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Download size={20} className="text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium">학습 기록 내보내기</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button
                onClick={handleDataReset}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                    <Trash2 size={20} className="text-red-600" />
                  </div>
                  <span className="text-slate-700 font-medium">학습 통계 초기화</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-green-500 to-green-600">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <HelpCircle size={20} />
                지원
              </h2>
            </div>

            <div className="p-6 space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <HelpCircle size={20} className="text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium">고객센터</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <MessageSquare size={20} className="text-orange-600" />
                  </div>
                  <span className="text-slate-700 font-medium">피드백 보내기</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Info size={20} className="text-purple-600" />
                  </div>
                  <span className="text-slate-700 font-medium">FAQ</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <GraduationCap size={20} className="text-green-600" />
                  </div>
                  <span className="text-slate-700 font-medium">튜토리얼 다시보기</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-slate-600 to-slate-700">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <Info size={20} />
                앱 정보
              </h2>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between p-4">
                <span className="text-slate-600">버전</span>
                <span className="text-slate-800 font-semibold">1.0.0</span>
              </div>

              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-slate-600" />
                  <span className="text-slate-700 font-medium">라이센스 정보</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-slate-600" />
                  <span className="text-slate-700 font-medium">개인정보 처리방침</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-slate-600" />
                  <span className="text-slate-700 font-medium">서비스 이용약관</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-amber-500 to-amber-600">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <Moon size={20} />
                기타
              </h2>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon size={20} className="text-slate-600" /> : <Sun size={20} className="text-slate-600" />}
                  <span className="text-slate-700 font-medium">다크 모드</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-slate-700' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <button
                onClick={handleCacheClear}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <Trash2 size={20} className="text-orange-600" />
                  </div>
                  <span className="text-slate-700 font-medium">앱 캐시 삭제</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                    <LogOut size={20} className="text-red-600" />
                  </div>
                  <span className="text-red-600 font-medium">로그아웃</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
