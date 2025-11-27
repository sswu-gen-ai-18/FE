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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
        고객 정보
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">이름:</span>
          <span className="font-semibold">{customer.name}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">성별:</span>
          <span className="font-semibold">{customer.gender}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">나이:</span>
          <span className="font-semibold">{customer.age}세</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">통화 이력:</span>
          <span className="font-semibold">{customer.callHistory}회</span>
        </div>
      </div>
    </div>
  );
}
