import React, { useState } from 'react';
import { Clock, BookOpen, MapPin, User, Star, MessageSquare, TrendingUp, X, ChevronLeft } from 'lucide-react';

interface CourseScheduleProps {
  onBack: () => void;
}

interface Course {
  id: string;
  name: string;
  professor: string;
  location: string;
  color: string;
  day: number;
  startTime: number;
  duration: number;
  credits: number;
  rating: number;
  reviewCount: number;
  difficulty: string;
  workload: string;
  summary: string;
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    semester: string;
    content: string;
    helpful: number;
  }>;
}

const CourseSchedule: React.FC<CourseScheduleProps> = ({ onBack }) => {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: '임상심리학 기초',
      professor: '김교수',
      location: '심리학관 201',
      color: 'bg-blue-500',
      day: 1,
      startTime: 0,
      duration: 2,
      credits: 3,
      rating: 4.5,
      reviewCount: 28,
      difficulty: '보통',
      workload: '적당함',
      summary: '정신건강과 심리치료의 기초를 다루는 과목입니다. 이론과 실제 사례를 균형있게 배울 수 있으며, 교수님의 강의력이 매우 뛰어납니다.',
      reviews: [
        {
          id: 'r1',
          author: '심리학과 3학년',
          rating: 5,
          semester: '2023-2학기',
          content: '교수님께서 실제 임상 사례를 많이 들어주셔서 이해하기 쉬웠습니다. 중간, 기말고사 난이도도 적당하고 과제도 배울 점이 많았어요.',
          helpful: 15
        },
        {
          id: 'r2',
          author: '심리학과 2학년',
          rating: 4,
          semester: '2023-1학기',
          content: '내용은 흥미롭지만 암기할 게 많아요. 그래도 교수님이 친절하시고 질문에 잘 답해주십니다.',
          helpful: 8
        }
      ]
    },
    {
      id: '2',
      name: '발달심리학',
      professor: '박교수',
      location: '심리학관 105',
      color: 'bg-green-500',
      day: 1,
      startTime: 4,
      duration: 2,
      credits: 3,
      rating: 4.7,
      reviewCount: 32,
      difficulty: '쉬움',
      workload: '적당함',
      summary: '인간의 전생애 발달과정을 다루는 과목입니다. 아동기부터 노년기까지의 심리적 변화를 체계적으로 학습합니다.',
      reviews: [
        {
          id: 'r3',
          author: '심리학과 4학년',
          rating: 5,
          semester: '2023-2학기',
          content: '교수님이 정말 열정적이시고 학생들에게 관심이 많으세요. 수업 내용도 실생활과 연결해서 이해하기 쉬웠습니다.',
          helpful: 22
        },
        {
          id: 'r4',
          author: '심리학과 3학년',
          rating: 5,
          semester: '2023-1학기',
          content: '발달심리 중에서 가장 좋은 강의입니다. PPT 자료도 잘 정리되어 있고 시험도 공정합니다.',
          helpful: 18
        }
      ]
    },
    {
      id: '3',
      name: '통계학 개론',
      professor: '이교수',
      location: '공학관 B102',
      color: 'bg-amber-500',
      day: 1,
      startTime: 6,
      duration: 2,
      credits: 3,
      rating: 3.8,
      reviewCount: 45,
      difficulty: '어려움',
      workload: '많음',
      summary: 'SPSS를 활용한 기초 통계분석 방법을 배웁니다. 심리학 연구에 필수적인 통계 개념을 다룹니다.',
      reviews: [
        {
          id: 'r5',
          author: '심리학과 2학년',
          rating: 4,
          semester: '2023-2학기',
          content: '내용이 어렵긴 하지만 차근차근 따라가면 할만합니다. 실습 시간에 도움을 많이 받았어요.',
          helpful: 12
        },
        {
          id: 'r6',
          author: '심리학과 3학년',
          rating: 3,
          semester: '2023-1학기',
          content: '통계가 어려워서 고생했지만 교수님께서 친절하게 가르쳐주십니다. 과제가 좀 많은 편입니다.',
          helpful: 9
        }
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const days = ['월', '화', '수', '목', '금'];
  const timeSlots = Array.from({ length: 10 }, (_, i) => i + 9);

  const getCourseAtSlot = (day: number, time: number) => {
    return courses.find(course =>
      course.day === day &&
      time >= course.startTime &&
      time < course.startTime + course.duration
    );
  };

  const isCourseStart = (course: Course, time: number) => {
    return time === course.startTime;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
          <div className="px-6 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-blue-600 font-medium active:opacity-70 transition-opacity"
            >
              <ChevronLeft size={24} />
              <span>뒤로</span>
            </button>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">시간표</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">2024-1학기</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <BookOpen size={18} />
                  <span className="font-semibold">{courses.length}과목</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock size={18} />
                  <span className="font-semibold">{totalCredits}학점</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="w-16 p-3 text-sm font-semibold text-slate-600 text-center sticky left-0 bg-slate-50">
                      시간
                    </th>
                    {days.map((day) => (
                      <th key={day} className="p-3 text-sm font-semibold text-slate-600 text-center">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time} className="border-b border-slate-100 last:border-b-0">
                      <td className="p-3 text-sm text-slate-500 text-center font-medium bg-slate-50 sticky left-0">
                        {time}:00
                      </td>
                      {days.map((_, dayIndex) => {
                        const course = getCourseAtSlot(dayIndex, time - 9);

                        if (course && isCourseStart(course, time - 9)) {
                          return (
                            <td
                              key={`${dayIndex}-${time}`}
                              rowSpan={course.duration}
                              className={`${course.color} p-3 cursor-pointer hover:opacity-90 transition-all active:scale-[0.98]`}
                              onClick={() => setSelectedCourse(course)}
                            >
                              <div className="text-white">
                                <div className="text-sm font-bold leading-tight mb-1">
                                  {course.name}
                                </div>
                                <div className="text-xs opacity-90 leading-tight mb-2">
                                  {course.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current" />
                                  <span className="text-xs font-semibold">{course.rating}</span>
                                </div>
                              </div>
                            </td>
                          );
                        } else if (course) {
                          return null;
                        } else {
                          return (
                            <td
                              key={`${dayIndex}-${time}`}
                              className="p-3 bg-white"
                            >
                              <div className="h-16"></div>
                            </td>
                          );
                        }
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className={`${selectedCourse.color} text-white p-6 rounded-t-3xl sm:rounded-t-3xl`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3">{selectedCourse.name}</h2>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedCourse.professor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedCourse.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{selectedCourse.rating}</div>
                  <div className="flex items-center gap-1 justify-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(selectedCourse.rating)
                            ? 'fill-current'
                            : 'opacity-30'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm opacity-90">{selectedCourse.reviewCount}개 리뷰</div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                    <div className="text-xs opacity-90 mb-1">난이도</div>
                    <div className="text-sm font-bold">{selectedCourse.difficulty}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                    <div className="text-xs opacity-90 mb-1">과제량</div>
                    <div className="text-sm font-bold">{selectedCourse.workload}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  과목 총평
                </h3>
                <p className="text-slate-700 leading-relaxed">{selectedCourse.summary}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  수강 후기 ({selectedCourse.reviews.length})
                </h3>
                <div className="space-y-3">
                  {selectedCourse.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-slate-50 rounded-2xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-slate-900">{review.author}</div>
                          <div className="text-sm text-slate-500 mt-1">{review.semester}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-3">
                        {review.content}
                      </p>
                      <div className="text-sm text-slate-500">
                        도움됨 {review.helpful}명
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseSchedule;
