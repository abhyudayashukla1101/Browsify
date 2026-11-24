import React, { useState } from 'react';
import { Card, Chip } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressRing } from '../components/ConfidenceMeter';
import { CheckCircle2, ChevronDown, ChevronRight, HelpCircle, ExternalLink, Sparkles } from 'lucide-react';
import { mockLearningData } from '../data/mock';

/**
 * 5. Learning Panel / Dashboard
 * - Top: overall progress ring + "Data Structures: 2 of 6 topics complete"
 * - Topic tracker list with status chips and three-state control (Pending / In progress / Completed)
 * - Meaningful confirmation card: "Looks like you studied Linked Lists. Mark as completed?"
 * - Expandable topic cards with saved resources, summary, and mini revision-question toggle
 * - Subject switcher dropdown
 */
export function LearningPanel() {
  const [learningState, setLearningState] = useState(mockLearningData);
  const [selectedSubject, setSelectedSubject] = useState(mockLearningData.activeSubject);
  const [expandedTopic, setExpandedTopic] = useState('t2'); // Linked lists open by default
  const [showAnswer, setShowAnswer] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const { topics, overallProgress, pendingConfirmation } = learningState;

  function toggleTopicStatus(topicId) {
    setLearningState((prev) => {
      const updated = prev.topics.map((t) => {
        if (t.id === topicId) {
          const nextStatus = t.status === 'completed' ? 'in_progress' : t.status === 'in_progress' ? 'pending' : 'completed';
          return { ...t, status: nextStatus };
        }
        return t;
      });

      const completedCount = updated.filter((t) => t.status === 'completed').length;
      return {
        ...prev,
        topics: updated,
        overallProgress: {
          ...prev.overallProgress,
          completed: completedCount,
          percentage: Math.round((completedCount / updated.length) * 100)
        }
      };
    });
  }

  function toggleAnswer(qId) {
    setShowAnswer((prev) => ({ ...prev, [qId]: !prev[qId] }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      {/* Subject Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 12px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text)',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {learningState.subjects.map((sub) => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>

        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
          Curriculum Tracker
        </span>
      </div>

      {/* Progress Ring Overview Card */}
      <Card variant="raised" style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '16px' }}>
        <ProgressRing progress={overallProgress.percentage} size={58} />
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
            {selectedSubject}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {overallProgress.completed} of {overallProgress.total} topics completed ({overallProgress.percentage}%)
          </p>
        </div>
      </Card>

      {/* Meaningful Confirmation Card (Rule: progress is updated only by meaningful activity) */}
      {!confirmed && pendingConfirmation && (
        <Card style={{ backgroundColor: 'var(--success-soft)', borderColor: 'rgba(95, 138, 91, 0.35)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--success)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Study Activity Detected
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.45, marginBottom: '10px' }}>
            {pendingConfirmation.message}
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              onClick={() => {
                setConfirmed(true);
                toggleTopicStatus('t2');
              }}
            >
              Confirm completion
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmed(true)}>
              Not yet
            </Button>
          </div>
        </Card>
      )}

      {/* Topic List */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Topic Roadmap
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topics.map((t) => {
            const isExpanded = expandedTopic === t.id;

            const statusColors = {
              completed: { bg: 'var(--success-soft)', text: 'var(--success)', label: 'Completed' },
              in_progress: { bg: 'var(--accent-soft)', text: 'var(--accent)', label: 'In progress' },
              pending: { bg: 'var(--bg-subtle)', text: 'var(--text-tertiary)', label: 'Pending' }
            };

            const s = statusColors[t.status];

            return (
              <Card key={t.id} style={{ padding: '12px 14px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => setExpandedTopic(isExpanded ? null : t.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isExpanded ? <ChevronDown size={14} color="var(--text-tertiary)" /> : <ChevronRight size={14} color="var(--text-tertiary)" />}
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>
                      {t.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    title="Click to toggle status (Pending -> In progress -> Completed)"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTopicStatus(t.id);
                    }}
                    style={{
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: s.bg,
                      color: s.text,
                      fontSize: '11px',
                      fontWeight: 600,
                      border: '1px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    {s.label} ↻
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)' }} className="animate-fade-in">
                    {/* Saved Resources */}
                    {t.resources.length > 0 && (
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                          Saved Resources
                        </div>
                        {t.resources.map((res) => (
                          <a
                            key={res.title}
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '12px',
                              color: 'var(--accent)',
                              textDecoration: 'none',
                              marginBottom: '3px'
                            }}
                          >
                            <ExternalLink size={12} />
                            <span>{res.title}</span>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Mini Revision Question Card */}
                    {t.revisionQuestion && (
                      <div
                        style={{
                          backgroundColor: 'var(--bg-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '10px 12px',
                          border: '1px solid var(--border)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          <HelpCircle size={13} /> Revision Question
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '8px' }}>
                          {t.revisionQuestion.q}
                        </p>

                        <button
                          type="button"
                          onClick={() => toggleAnswer(t.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--accent)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          {showAnswer[t.id] ? 'Hide answer' : 'Reveal answer'}
                        </button>

                        {showAnswer[t.id] && (
                          <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.45 }} className="animate-fade-in">
                            <strong>Answer:</strong> {t.revisionQuestion.a}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
