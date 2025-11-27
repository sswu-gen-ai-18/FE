import React from 'react';

interface Props {
  manual: string;
}

export function ResponseManual({ manual }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">AI 대응 매뉴얼</h2>
      <div className="bg-blue-50 rounded-lg p-4 min-h-[200px]">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
          {manual || '통화를 시작하면 실시간 대응 가이드가 표시됩니다.'}
        </pre>
      </div>
    </div>
  );
}
