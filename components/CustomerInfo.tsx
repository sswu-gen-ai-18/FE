import React from 'react';

interface CustomerData {
  name: string;
  gender: string;
  age: number;
  callHistory: number;
}

interface Props {
  customer: CustomerData;
}

export function CustomerInfo({ customer }: Props) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="w-3 h-3 bg-[#FF8827] rounded-full mr-2"></span>
        고객 정보
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="text-gray-400">이름:</span>
          <span className="font-semibold text-white">{customer.name}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="text-gray-400">성별:</span>
          <span className="font-semibold text-white">{customer.gender}</span>
        </div>
        <div className="flex justify-between border-b border-gray-700 pb-2">
          <span className="text-gray-400">나이:</span>
          <span className="font-semibold text-white">{customer.age}세</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">통화 이력:</span>
          <span className="font-semibold text-white">{customer.callHistory}회</span>
        </div>
      </div>
    </div>
  );
}
