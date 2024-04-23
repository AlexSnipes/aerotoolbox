'use client';
import React, { useEffect, useState } from 'react';
import Toolbox from '@/components/toolbox';
import Explanation from '@/components/explanation';
export default function Home() {
  return (
    <div className=" relative py-3 sm:mx-auto sm:flex gap-2">
      <div className="sm:w-6/12">
        <Toolbox params={{ id: '1' }} />
      </div>
      <div className="sm:w-6/12 sm:mt-0 mt-2">
        <Explanation />
      </div>
    </div>
  );
}
