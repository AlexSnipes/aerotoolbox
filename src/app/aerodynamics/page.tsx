'use client';
import React, { useState } from 'react';
import Tabs from '@/components/tabs';
import ContinuityEquation from '@/components/aerodynamics/continuity-equation';
import Bernoulli from '@/components/aerodynamics/bernoulli';
import LiftAndDrag from '@/components/aerodynamics/lift-and-drag';
import LiftAndDragExplanation from '@/components/aerodynamics/lift-and-drag-explanation';
export default function AerodynamicsPage() {
  const [active, setActive] = useState('lift-drag');
  const tabs = [
    {
      label: 'Lift & Drag',
      key: 'lift-drag',
    },
    /*  {
      label: 'Ecuación de Continuidad',
      key: 'continuity',
    },
    {
      label: 'Teorema de Bernoulli',
      key: 'bernoulli',
    },
    {
      label: 'Tubo Pitot',
      key: 'pitot',
    },
    {
      label: 'Velocidades',
      key: 'velocity',
    },*/
  ];
  return (
    <div className="relative sm:mx-auto sm:flex gap-2">
      <div className="relative bg-white dark:bg-gray-700 md:mx-0 shadow rounded-3xl dark:text-white sm:w-6/12">
        <Tabs tabs={tabs} setActive={setActive} active={active}>
          <div className="p-2">
            <ContinuityEquation active={active} />
            <Bernoulli active={active} />
            <LiftAndDrag active={active} />
          </div>
        </Tabs>
      </div>
      <div className="sm:w-6/12 sm:mt-0 mt-2">
        <LiftAndDragExplanation />
      </div>
    </div>
  );
}
