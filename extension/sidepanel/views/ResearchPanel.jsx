import React, { useState } from 'react';
import { Card, Chip } from '../components/Card';
import { Button } from '../components/Button';
import { Bookmark, CheckCircle2, FileText, ListChecks, BookOpen, ExternalLink, Cpu, Sparkles } from 'lucide-react';
import { mockResearchData, mockFramerMcpData } from '../data/mock';

/**
 * Research Panel
 * Supports two demo modes:
 * 1. AI Agents Scholarly Paper (from demo-pages/research-ai-agents.html)
 * 2. Framer MCP Ecosystem (Connect Claude, Codex & Cursor to Framer with MCP - Image 1)
 */
export function ResearchPanel({ initialMode = 'paper' }) {
  const [researchMode, setResearchMode] = useState(initialMode); // 'paper' | 'framermcp'
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('all'); // all | summary | takeaways | tools/glossary

  const data = researchMode === 'framermcp' ? mockFramerMcpData : mockResearchData;
  const { article, summary, takeaways, collections } = data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      {/* Scenario Selector Pill in Research */}
      <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-full)' }}>
        <button
          type="button"
          onClick={() => { setResearchMode('paper'); setSaved(false); }}
          style={{
            flex: 1,
            padding: '5px 10px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            backgroundColor: researchMode === 'paper' ? 'var(--surface-raised)' : 'transparent',
            color: researchMode === 'paper' ? 'var(--text)' : 'var(--text-secondary)',
            fontWeight: researchMode === 'paper' ? 600 : 400,
            fontSize: '11px',
            cursor: 'pointer',
            boxShadow: researchMode === 'paper' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          📄 AI Agents Paper
        </button>
        <button
          type="button"
          onClick={() => { setResearchMode('framermcp'); setSaved(false); }}
          style={{
            flex: 1,
            padding: '5px 10px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            backgroundColor: researchMode === 'framermcp' ? 'var(--surface-raised)' : 'transparent',
            color: researchMode === 'framermcp' ? 'var(--text)' : 'var(--text-secondary)',
            fontWeight: researchMode === 'framermcp' ? 600 : 400,
            fontSize: '11px',
            cursor: 'pointer',
            boxShadow: researchMode === 'framermcp' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          ⚡ Framer MCP Hub
        </button>
      </div>

      {/* Current Article Card */}
      <Card variant="raised">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <Chip intent="research" size="sm">
            {researchMode === 'framermcp' ? 'Developer Ecosystem' : 'Scholarly Article'}
          </Chip>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            {article.readingTime}
          </span>
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.4 }}>
          {article.title}
        </h3>

        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          {article.source}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            variant={saved ? 'secondary' : 'primary'}
            size="sm"
            icon={saved ? CheckCircle2 : Bookmark}
            onClick={() => setSaved(true)}
          >
            {saved ? 'Saved in Vault' : 'Save to Collection'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            iconRight={ExternalLink}
            onClick={() => window.open(article.url, '_blank')}
          >
            Source
          </Button>
        </div>
      </Card>

      {/* Synthesis Section Selection Tabs */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
        {[
          { id: 'all', label: 'All notes' },
          { id: 'summary', label: 'Summary' },
          { id: 'takeaways', label: 'Takeaways' },
          { id: 'tools', label: researchMode === 'framermcp' ? 'MCP Tools' : 'Terms' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeSection === tab.id ? 'var(--bg-subtle)' : 'transparent',
              color: activeSection === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: activeSection === tab.id ? 600 : 400,
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Executive Summary Block */}
      {(activeSection === 'all' || activeSection === 'summary') && (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px' }}>
            <FileText size={14} /> Executive TL;DR
          </div>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '13.5px',
              color: 'var(--text)',
              lineHeight: 1.65,
              margin: 0
            }}
          >
            {summary}
          </p>
        </Card>
      )}

      {/* Bullet Takeaways */}
      {(activeSection === 'all' || activeSection === 'takeaways') && (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <ListChecks size={14} /> Key Takeaways
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {takeaways.map((point, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Specialised Section: Framer MCP Tool Integrations vs Glossary */}
      {(activeSection === 'all' || activeSection === 'tools') && researchMode === 'framermcp' && (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <Cpu size={14} /> Connected AI Coding Agents & Tools
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {mockFramerMcpData.tools.map((tool) => (
              <div
                key={tool.name}
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '10px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)' }}>
                    {tool.name}
                  </span>
                  <span style={{ fontSize: '9px', backgroundColor: 'var(--surface-raised)', padding: '2px 5px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                    {tool.badge}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                  {tool.desc}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {(activeSection === 'all' || activeSection === 'tools') && researchMode === 'paper' && (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <BookOpen size={14} /> Key Terminology
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mockResearchData.glossary.map((g) => (
              <div key={g.term} style={{ backgroundColor: 'var(--bg-subtle)', padding: '8px 10px', borderRadius: 'var(--radius-xs)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--info)' }}>
                  {g.term}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.45 }}>
                  {g.definition}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Saved Collections */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
          Your Research Collections
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {collections.map((col) => (
            <Card key={col.name} style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text)' }}>
                {col.name}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                {col.count} items
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
