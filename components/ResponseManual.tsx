import React from 'react';

interface Props {
  manual: string;
}

export function ResponseManual({ manual }: Props) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">AI 대응 매뉴얼</h2>
      <div className="bg-gray-700 rounded-lg p-4 min-h-[200px] border border-gray-600">
        <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono">
          {manual || '통화를 시작하면 실시간 대응 가이드가 표시됩니다.'}
        </pre>
      </div>
    </div>
  );
}
