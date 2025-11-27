'use client';

import { useRouter } from 'next/navigation';
import { Phone, Brain, Shield, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* 헤더 */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            CARELY
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            AI 기반 고객 감정 인식 및 상담사 지원 시스템
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Phone size={24} />
            상담 시작하기
          </button>
        </header>

        {/* 기능 소개 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Brain className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">실시간 감정 분석</h3>
            <p className="text-gray-600">
              고객의 음성을 실시간으로 분석하여 감정 상태를 파악하고 적절한 대응 전략을 제시합니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">상담사 보호</h3>
            <p className="text-gray-600">
              갑질이나 과도한 요구에 대한 대응 매뉴얼을 즉각 제공하여 상담사의 정신 건강을 보호합니다.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">통화 기록 관리</h3>
            <p className="text-gray-600">
              모든 통화 내용과 AI 분석 결과를 자동으로 기록하고 관리하여 서비스 품질을 향상시킵니다.
            </p>
          </div>
        </div>

        {/* 프로젝트 배경 */}
        <div className="bg-white p-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            왜 CARELY가 필요한가?
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              AI로 인한 직업 대체가 가속화되면서 고객센터 상담사도 그 영향을 받고 있습니다. 
              하지만 여전히 많은 사람들이 챗봇보다는 인간 상담사와의 대화를 선호합니다.
            </p>
            <p>
              문제는 일부 고객들이 상담사에게 갑질을 하거나 분노와 짜증 섞인 어투를 사용하여 
              상담사들의 정신적 피해가 심각해지고 있다는 점입니다.
            </p>
            <p className="font-semibold text-blue-600">
              CARELY는 상담사들의 심리 안정을 돕고, 어려운 상황에서도 적절한 대응 매뉴얼을 
              즉각적으로 제공하여 상담사를 보호합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}