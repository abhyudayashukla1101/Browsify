/**
 * Browsify - LearningPanel Component (Framer Style)
 * Minimalist curriculum checklist and interactive concept mastery quiz.
 */

export function renderLearningPanel(educationData, quizState) {
  const currentQuiz = educationData.quiz[quizState.currentIndex] || educationData.quiz[0];
  const totalQuiz = educationData.quiz.length;
  const isAnswered = quizState.answered[quizState.currentIndex] !== undefined;
  const selectedOptionIndex = quizState.answered[quizState.currentIndex];

  const curriculumHtml = educationData.curriculum.map((item, idx) => {
    let badgeClass = 'badge-default';
    let statusLabel = item.status.replace('_', ' ');
    if (item.status === 'completed') badgeClass = 'badge-green';
    else if (item.status === 'in_progress') badgeClass = 'badge-blue';

    const isActive = item.status === 'in_progress';

    return `
      <div class="topic-row ${isActive ? 'active' : ''}">
        <div>
          <div style="font-weight: 500; font-size: 12px; color: var(--text-primary);">
            ${item.topic}
          </div>
          <div style="font-size: 11px; color: var(--text-muted);">${item.time}</div>
        </div>
        <button class="badge ${badgeClass} btn-toggle-topic" data-topic-index="${idx}" style="cursor: pointer;">
          ${statusLabel} ↻
        </button>
      </div>
    `;
  }).join('');

  const optionsHtml = currentQuiz.options.map((opt, idx) => {
    let optClass = '';
    let icon = '';

    if (isAnswered) {
      if (idx === currentQuiz.correctIndex) {
        optClass = 'correct';
        icon = '✓';
      } else if (idx === selectedOptionIndex) {
        optClass = 'incorrect';
        icon = '✕';
      }
    }

    return `
      <div class="quiz-opt ${optClass}" data-option-index="${idx}">
        <span>${opt}</span>
        <span style="font-weight: 600; font-size: 13px;">${icon}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="learning-panel">
      <!-- Curriculum Tracker Card -->
      <div class="card">
        <div class="card-header">
          <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted);">
            Course Tracker
          </span>
          <span class="badge badge-default">Active</span>
        </div>
        
        <h3 style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px;">
          ${educationData.courseName}
        </h3>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
          Currently studying <strong>${educationData.currentTopic}</strong>.
        </p>

        <div class="curriculum-list">
          ${curriculumHtml}
        </div>
      </div>

      <!-- Revision Quiz Widget -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">
            Concept Check
          </span>
          <span style="font-size: 11px; color: var(--text-muted);">
            ${quizState.currentIndex + 1} of ${totalQuiz}
          </span>
        </div>

        <div style="font-size: 13px; font-weight: 500; color: var(--text-primary); margin-bottom: 12px; line-height: 1.4;">
          ${currentQuiz.question}
        </div>

        <div class="quiz-options-list">
          ${optionsHtml}
        </div>

        ${isAnswered ? `
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-light); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 11px; color: var(--text-secondary); margin-top: 10px; line-height: 1.5;">
            <strong>Explanation:</strong> ${currentQuiz.explanation}
          </div>
          <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
            <button id="btn-next-quiz" class="btn btn-black" style="padding: 5px 12px; font-size: 11px;">
              ${quizState.currentIndex + 1 < totalQuiz ? 'Next Question →' : 'Restart Quiz ↻'}
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
