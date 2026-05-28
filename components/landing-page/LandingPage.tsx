'use client';

import Link from 'next/link'
import router from "next/dist/shared/lib/router/router";
import { useRouter } from "next/navigation";

import React from 'react';

export default function NoteEaseLanding() {
    const router = useRouter();

    const createDocument = async () => {
        const res = await fetch("/api/documents", {
        method: "POST",
        });

        const document = await res.json();

        router.push(`/documents/${document.id}`);
    };
  return (
    <div className="min-h-screen bg-[#0A1F2C] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">✓</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight">NoteEase</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#" className="hover:text-emerald-400 transition">Home</a>
          <a href="#" className="hover:text-emerald-400 transition">Features</a>
          <a href="#" className="hover:text-emerald-400 transition">Pricing</a>
          <a href="#" className="hover:text-emerald-400 transition">About</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-5 py-2 text-sm font-medium hover:bg-white/10 rounded-full transition">
            Sign In
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2.5 text-sm font-semibold rounded-full transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
                Organize Your Notes<br />
                <span className="text-emerald-400">Effortlessly</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Capture your thoughts and organize them in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
              
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-8 py-4 rounded-2xl text-lg transition flex items-center gap-2">
                Get Started
              </button>
              <button className="border border-white/30 hover:bg-white/5 font-medium px-8 py-4 rounded-2xl text-lg transition flex items-center gap-2">
                <span>▶</span> Watch Demo
              </button>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] -rotate-6 hover:rotate-0 transition-transform duration-700">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                {/* App Header */}
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-500 rounded-lg"></div>
                    <span className="text-gray-800 font-medium">NoteEase</span>
                  </div>
                  <div className="text-xs text-gray-500">8:42</div>
                </div>

                {/* Notes List */}
                <div className="p-4 space-y-3 bg-white">
                  {[
                    { color: 'bg-emerald-400', title: 'Client Meeting Notes' },
                    { color: 'bg-cyan-400', title: 'Project Brainstorm' },
                    { color: 'bg-teal-400', title: 'Marketing Strategy' },
                    { color: 'bg-amber-400', title: 'Product Roadmap 2026' },
                    { color: 'bg-sky-400', title: 'Team Retrospective' },
                  ].map((note, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 p-3 rounded-2xl transition">
                      <div className={`${note.color} w-3 h-3 rounded-full`}></div>
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm font-medium">{note.title}</p>
                        <p className="text-gray-500 text-xs">Updated just now</p>
                      </div>
                      <div className="text-emerald-500 text-xs font-medium">Done</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-emerald-400 text-black text-xs font-bold px-4 py-2 rounded-2xl shadow-xl rotate-12">
                NEW
              </div>
              <div className="absolute -bottom-4 -left-6 bg-white text-black px-5 py-3 rounded-3xl shadow-xl flex items-center gap-2">
                <span className="text-xl">📝</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-white text-gray-900 py-24 px-8">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-gray-600">Everything you need to stay organized.</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: '📝',
              title: 'Quick Notes',
              desc: 'Capture ideas instantly with minimal friction.'
            },
            {
              icon: '📁',
              title: 'Organize Notebooks',
              desc: 'Structure your thoughts with smart notebooks.'
            },
            {
              icon: '🔄',
              title: 'Sync Across Devices',
              desc: 'Access your notes anywhere, anytime.'
            },
            {
              icon: '🔒',
              title: 'Secure & Private',
              desc: 'End-to-end encryption for your peace of mind.'
            },
          ].map((feature, i) => (
            <div key={i} className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      

      
    </div>
  );
}