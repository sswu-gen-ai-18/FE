'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Save, Download } from 'lucide-react';
import { CustomerInfo } from '@/components/CustomerInfo';
import { ResponseManual } from '@/components/ResponseManual';
import { TranscriptDisplay } from '@/components/TranscriptDisplay';

// 타입 정의
interface CustomerData {
  name: string;
  gender: string;
  age: number;
  callHistory: number;
}

interface CallRecord {
  timestamp: string;
  transcript: string;
  emotion: string;
  aiResponse: string;
}

// CallHistory 컴포넌트
function CallHistory({ records }: { records: CallRecord[] }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">통화 기록</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {records.length === 0 ? (
          <p className="text-gray-500 text-center py-8">아직 저장된 통화 기록이 없습니다.</p>
        ) : (
          records.map((record, index) => (
            <div key={index} className="border-l-4 border-[#FF8827] bg-gray-700 p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-gray-300">통화 #{index + 1}</span>
                <span className="text-xs text-gray-400">{record.timestamp}</span>
              </div>
              <div className="text-sm text-gray-200 mb-2">
                <strong>내용:</strong> {record.transcript.substring(0, 100)}...
              </div>
              <div className="text-xs text-gray-400 bg-gray-600 p-2 rounded">
                {record.aiResponse.substring(0, 80)}...
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiManual, setAiManual] = useState('');
  const [callRecords, setCallRecords] = useState<CallRecord[]>([]);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [customerData] = useState<CustomerData>({
    name: '김민수',
    gender: '남성',
    age: 35,
    callHistory: 3
  });

  const recognitionRef = useRef<any>(null);

  // 감정 분석 및 AI 대응
  const analyzeEmotion = async (text: string) => {
    // 빈 텍스트는 무시
    if (!text || text.trim().length === 0) {
      console.log('Empty text, skipping analysis');
      return;
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: `session_${Date.now()}`,
          text: text.trim(),
          emotion_label: 'sad',
          emotion_score: 0
        })
      });

      if (response.ok) {
        const data = await response.json();
        const result = data.result;
        
        if (result) {
          // 감정 라벨 설정
          const emotionMap: { [key: string]: string } = {
            'anger': 'angry',
            'sad': 'sad',
            'fear': 'frustrated',
            'neutral': 'neutral'
          };
          
          const detectedEmotion = emotionMap[result.emotion_label.toLowerCase()] || 'neutral';
          setCurrentEmotion(detectedEmotion);
          console.log('Emotion detected:', detectedEmotion, 'from:', result.emotion_label);
          
          // 대응 매뉴얼 설정
          setAiManual(result.response_text);
        }
      } else {
        console.error('API response not ok:', response.status);
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      // 오류 발생 시 기본 대응
      const emotionKeywords = {
        angry: ['화나', '짜증', '싫어', '최악', '불만'],
        sad: ['슬프', '우울', '힘들', '어렵'],
        frustrated: ['답답', '이해 안', '왜', '안되'],
        happy: ['좋아', '감사', '고마워', '훌륭', '완벽']
      };

      let detectedEmotion = 'neutral';
      for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
        if (keywords.some(keyword => text.includes(keyword))) {
          detectedEmotion = emotion;
          break;
        }
      }

      setCurrentEmotion(detectedEmotion);
      const manualResponse = getManualResponse(detectedEmotion);
      setAiManual(manualResponse);
    }
  };

  // Web Speech API 초기화
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ko-KR';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
          analyzeEmotion(finalTranscript);
        }
      };
    }
  }, []);

  const getEmotionEmoji = (emotion: string) => {
    const emojis: { [key: string]: string } = {
      angry: '😠',
      sad: '😢',
      frustrated: '😤',
      happy: '😊',
      neutral: '😐'
    };
    return emojis[emotion] || '😐';
  };

  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      angry: '#ef4444',
      sad: '#3b82f6',
      frustrated: '#f97316',
      happy: '#22c55e',
      neutral: '#6b7280'
    };
    return colors[emotion] || '#6b7280';
  };

  const getManualResponse = (emotion: string): string => {
    const manuals: { [key: string]: string } = {
      angry: '🔴 화난 고객 대응법:\n1. 공감 표현: "불편을 드려 죄송합니다"\n2. 경청하기: 끊지 말고 충분히 들어주기\n3. 해결책 제시: 구체적 조치 안내\n4. 차분한 톤 유지',
      sad: '🟡 슬픈 고객 대응법:\n1. 따뜻한 위로의 말\n2. 공감과 이해 표현\n3. 신속한 문제 해결 약속\n4. 후속 조치 안내',
      frustrated: '🟠 답답한 고객 대응법:\n1. 명확한 설명 제공\n2. 단계별 해결 방법 안내\n3. 추가 질문 유도\n4. 인내심 있게 응대',
      happy: '🟢 만족한 고객 대응법:\n1. 감사의 인사\n2. 긍정적인 태도 유지\n3. 추가 서비스 제안\n4. 재방문 권유',
      neutral: '🟢 일반 대응:\n1. 친절한 인사\n2. 요청사항 정확히 파악\n3. 신속한 처리\n4. 감사 인사'
    };
    return manuals[emotion] || manuals.neutral;
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      setTranscript('');
      setAiManual('통화를 시작합니다...');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      
      const record: CallRecord = {
        timestamp: new Date().toLocaleString('ko-KR'),
        transcript: transcript,
        emotion: '감정 분석 완료',
        aiResponse: aiManual
      };
      setCallRecords(prev => [...prev, record]);
    }
  };

  const saveToLocal = () => {
    const data = {
      customer: customerData,
      records: callRecords,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('call_records', JSON.stringify(data));
    alert('통화 기록이 저장되었습니다!');
  };

  const downloadRecords = () => {
    const data = {
      customer: customerData,
      records: callRecords
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `call_record_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">CARELY 상담 시스템</h1>
          <p className="text-gray-400">AI 기반 고객 감정 인식 및 대응 가이드</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 고객 정보 */}
          <div className="lg:col-span-1">
            <CustomerInfo customer={customerData} />
            <TranscriptDisplay transcript={transcript} />
          </div>

          {/* 중앙/오른쪽: 통화 인터페이스 */}
          <div className="lg:col-span-2">
            {/* 통화 컨트롤 + 감정 상태 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* 통화 컨트롤 */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <h2 className="text-lg font-bold text-white mb-4">통화 제어</h2>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={saveToLocal}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                  >
                    <Save size={18} />
                    저장
                  </button>
                  <button
                    onClick={downloadRecords}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#FF8827] text-white text-sm rounded-lg hover:bg-[#ff9d47] transition"
                  >
                    <Download size={18} />
                    다운로드
                  </button>
                </div>
                
                <div className="flex justify-center">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#FF8827] text-white rounded-full hover:bg-[#ff9d47] transition shadow-lg"
                    >
                      <Phone size={20} />
                      <span className="font-bold">시작</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg animate-pulse"
                    >
                      <PhoneOff size={20} />
                      <span className="font-bold">종료</span>
                    </button>
                  )}
                </div>

                {isRecording && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-[#FF8827]">
                    <Mic className="animate-pulse" size={18} />
                    <span className="text-sm font-semibold">녹음 중...</span>
                  </div>
                )}
              </div>

              {/* 감정 상태 원형 그래프 */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 flex flex-col items-center justify-center">
                <h2 className="text-lg font-bold text-white mb-4 w-full text-center">감정 상태</h2>
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* 배경 원 */}
                  <svg className="absolute w-full h-full" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#374151" strokeWidth="8" />
                    {/* 감정 상태 표시 */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke={getEmotionColor(currentEmotion)}
                      strokeWidth="8"
                      strokeDasharray={`${157 * (isRecording ? 1 : 0)} 157`}
                      className="transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* 중앙 이모지 */}
                  <div className="text-6xl z-10">{getEmotionEmoji(currentEmotion)}</div>
                </div>
                <p className="mt-4 text-center text-gray-300 font-semibold capitalize">{currentEmotion}</p>
              </div>
            </div>

            {/* 대응 매뉴얼 - 중앙에 크게 */}
            <ResponseManual manual={aiManual} />

            {/* 통화 기록 */}
            <CallHistory records={callRecords} />
          </div>
        </div>
      </div>
    </div>
  );
}
