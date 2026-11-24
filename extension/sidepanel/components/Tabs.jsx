import React from 'react';

/**
 * Tabs - Segmented pill-style tab bar with smooth active sliding indicator
 */
export function Tabs({
  tabs = [], // [{ id: 'activity', label: 'Activity', icon: Icon, badge: 2 }]
  activeTab,
  onChange
}) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '3px',
        backgroundColor: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border)',
        gap: '2px',
        userSelect: 'none'
      }}
      className="browsify-tabs"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px 8px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: isActive ? 'var(--surface)' : 'transparent',
              color: isActive ? 'var(--text)' : 'var(--text-secondary)',
              fontWeight: isActive ? 500 : 400,
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)',
              position: 'relative',
              whiteSpace: 'nowrap'
            }}
          >
            {Icon && <Icon size={14} color={isActive ? 'var(--accent)' : 'currentColor'} />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '16px',
                  height: '16px',
                  padding: '0 4px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 600
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
