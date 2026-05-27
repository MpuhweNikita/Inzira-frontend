import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-text-secondary/5 mb-6">
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}
