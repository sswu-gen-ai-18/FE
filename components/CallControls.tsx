import React from 'react';
import { Phone, PhoneOff, Save, Download, Mic } from 'lucide-react';

interface Props {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  onSave: () => void;
  onDownload: () => void;
}

export function CallControls({ isRecording, onStart, onStop, onSave, onDownload }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">통화 제어</h2>
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Save size={20} />
            저장
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Download size={20} />
            다운로드
          </button>
        </div>
      </div>
      
      <div className="flex justify-center">
        {!isRecording ? (
          <button
            onClick={onStart}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Phone size={24} />
            <span className="font-bold text-lg">통화 시작</span>
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg hover:shadow-xl animate-pulse"
          >
            <PhoneOff size={24} />
            <span className="font-bold text-lg">통화 종료</span>
          </button>
        )}
      </div>

      {isRecording && (
        <div className="mt-4 flex items-center justify-center gap-2 text-red-600">
          <Mic className="animate-pulse" size={20} />
          <span className="font-semibold">녹음 중...</span>
        </div>
      )}
    </div>
  );
}
