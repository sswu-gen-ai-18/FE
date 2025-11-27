import React from 'react';

interface Props {
  transcript: string;
}

export function TranscriptDisplay({ transcript }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">실시간 통화 내용</h2>
      <div className="bg-gray-50 rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
        <p className="text-gray-700 whitespace-pre-wrap">
          {transcript || '통화 내용이 여기에 표시됩니다...'}
        </p>
      </div>
    </div>
  );
}
