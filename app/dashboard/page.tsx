'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Save, Download } from 'lucide-react';
import { CustomerInfo } from '@/components/CustomerInfo';
import { CallControls } from '@/components/CallControls';
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">통화 기록</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {records.length === 0 ? (
          <p className="text-gray-500 text-center py-8">아직 저장된 통화 기록이 없습니다.</p>
        ) : (
          records.map((record, index) => (
            <div key={index} className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-gray-600">통화 #{index + 1}</span>
                <span className="text-xs text-gray-500">{record.timestamp}</span>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <strong>내용:</strong> {record.transcript.substring(0, 100)}...
              </div>
              <div className="text-xs text-gray-600 bg-white p-2 rounded">
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
  const [customerData] = useState<CustomerData>({
    name: '김민수',
    gender: '남성',
    age: 35,
    callHistory: 3
  });

  const recognitionRef = useRef<any>(null);

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

  // 감정 분석 및 AI 대응 (시뮬레이션)
  const analyzeEmotion = async (text: string) => {
    // 실제로는 여기서 AI API 호출
    const emotionKeywords = {
      angry: ['화나', '짜증', '싫어', '최악', '불만'],
      sad: ['슬프', '우울', '힘들', '어렵'],
      frustrated: ['답답', '이해 안', '왜', '안되']
    };

    let detectedEmotion = 'neutral';
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        detectedEmotion = emotion;
        break;
      }
    }

    const manualResponse = getManualResponse(detectedEmotion);
    setAiManual(manualResponse);
  };

  const getManualResponse = (emotion: string): string => {
    const manuals: { [key: string]: string } = {
      angry: '🔴 화난 고객 대응법:\n1. 공감 표현: "불편을 드려 죄송합니다"\n2. 경청하기: 끊지 말고 충분히 들어주기\n3. 해결책 제시: 구체적 조치 안내\n4. 차분한 톤 유지',
      sad: '🟡 슬픈 고객 대응법:\n1. 따뜻한 위로의 말\n2. 공감과 이해 표현\n3. 신속한 문제 해결 약속\n4. 후속 조치 안내',
      frustrated: '🟠 답답한 고객 대응법:\n1. 명확한 설명 제공\n2. 단계별 해결 방법 안내\n3. 추가 질문 유도\n4. 인내심 있게 응대',
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
      
      // 통화 기록 저장
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CARELY 상담 시스템</h1>
          <p className="text-gray-600">AI 기반 고객 감정 인식 및 대응 가이드</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 고객 정보 */}
          <div className="lg:col-span-1">
            <CustomerInfo customer={customerData} />
            <ResponseManual manual={aiManual} />
          </div>

          {/* 오른쪽: 통화 인터페이스 */}
          <div className="lg:col-span-2">
            {/* 통화 컨트롤 */}
            <CallControls
              isRecording={isRecording}
              onStart={startRecording}
              onStop={stopRecording}
              onSave={saveToLocal}
              onDownload={downloadRecords}
            />

            {/* 실시간 통화 내용 */}
            <TranscriptDisplay transcript={transcript} />

            {/* 통화 기록 */}
            <CallHistory records={callRecords} />
          </div>
        </div>
      </div>
    </div>
  );
}