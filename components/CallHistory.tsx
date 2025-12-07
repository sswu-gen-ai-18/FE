'use client';

import React from 'react';

interface CallRecord {
  timestamp: string;
  transcript: string;
  emotion: string;
  aiResponse: string;
}

interface Props {
  records: CallRecord[];
}

export function CallHistory({ records }: Props) {
  return (
    <div className="w-full bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-bold text-white mb-4">📞 통화 기록</h2>
      <div className="space-y-3 max-h-[350px] overflow-y-auto">
        {records.length === 0 ? (
          <p className="text-gray-400 text-center py-8">아직 저장된 통화 기록이 없습니다.</p>
        ) : (
          records.map((record, index) => (
            <div key={index} className="border-l-4 border-orange-500 bg-gray-700 p-3 rounded">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-gray-200">통화 #{index + 1}</span>
                <span className="text-xs text-gray-400">{record.timestamp}</span>
              </div>
              <div className="text-sm text-gray-300 mb-2">
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
