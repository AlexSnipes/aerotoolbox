import { useState } from 'react';

const Tabs = ({
  tabs,
  children,
  setActive,
  active,
  className,
}: {
  tabs: any;
  children: any;
  setActive: any;
  active: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabs.map((tab: { label: string; key: string }, index: number) => (
          <li className="me-2">
            <a
              onClick={() => setActive(tab.key)}
              href={`#${tab.key}`}
              aria-current="page"
              className={`inline-block ${active == tab.key ? 'active bg-gray-100 ' : 'hover:text-gray-600 hover:bg-gray-50 dark:bg-gray-800'} p-4 text-blue-600 rounded-t-lg  dark:text-blue-500`}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-2">{children}</div>
    </div>
  );
};
export default Tabs;
