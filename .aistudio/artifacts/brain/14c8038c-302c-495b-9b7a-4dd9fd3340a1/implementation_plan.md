# Mobile-Friendly Action Bar, Quiz Navigation Reliability & Final Review Recheck

Address floating action bar viewport overflow, ensure reliable visibility of quiz navigation buttons during retries, and provide a full question recheck grid and return button on the final review screen.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed with the user in Phase 1:
> - **Floating Bar Layout**: Allow smooth horizontal scrolling while keeping a unified pill bar design, preventing button text like "Dashboard" from clipping or overlapping off-screen.
> - **Final Review Rechecking**: Add a dedicated "Back to Questions" button alongside a complete interactive Question Grid showing all questions and their answered/flagged status before final submission.
> - **Retry Navigation Handling**: Guarantee a permanently visible sticky footer and dynamic label handling ("Next Question" vs "Finish Exam") across single-question and multi-question retry sessions.

---

### 1. Overview & Core Concept

This update resolves three usability bottlenecks identified during exam taking and review:
1. **Floating Quick Action Bar**: On narrow viewports or zoomed desktop screens, the multi-button pill bar will seamlessly scroll horizontally without clipping or pushing the "Dashboard" action off the viewport.
2. **Quiz Retry Navigation**: Eliminate the bug where the bottom right navigation button disappeared on retry by hardening the viewport docking (`h-[100dvh]`, flex bounds) and ensuring consistent rendering for both 1-question and multi-question retries.
3. **Pre-Submission Review & Recheck**: Empower users to verify any answer before final submission by providing a complete question grid (with answered, unanswered, and flagged indicators) and a direct "Back to Questions" button on the Final Review screen.

---

### 2. User Experience & Visual Design

#### A. Floating Action Bar Overflow Fix
- **Container Structure**: `fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1.5rem)] sm:max-w-[92vw] overflow-x-auto scrollbar-none flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl border border-gray-200 dark:border-gray-700`
- **Child Elements**: Every button (`Try Again`, `Try Again (Incorrect Only)`, `Review Mode`, `Dashboard`, `Scroll to Top`) maintains `shrink-0 whitespace-nowrap`.
- **Result**: Zero overlapping or screen edge clipping, with smooth touch and scroll panning on small displays.

#### B. Quiz Retry & Navigation Reliability
- **Sticky Footer Invariant**: The bottom action bar (`border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center shrink-0`) stays strictly pinned in the viewport without being pushed beneath iframe borders.
- **Single vs Multi-Question Logic**:
  - `totalQuestions === 1`: Shows "Finish Exam" (with checkmark/arrow icon), indicating immediate completion for 1-question retakes.
  - `totalQuestions > 1`: Shows "Next Question" until the final question, which transitions smoothly to "Finish Exam".
  - Always provides "Back" button when `currentQuestionIndex > 0`.

#### C. Final Review Screen Enhancements
- **Complete Question Grid**: Render all exam questions as clickable number badges color-coded by state:
  - *Answered*: Indigo accent (`bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200`)
  - *Flagged*: Amber accent (`bg-yellow-100 border-yellow-400 text-yellow-800`)
  - *Unanswered*: Muted gray (`bg-gray-100 border-gray-200 text-gray-500`)
- **Direct Navigation**: Clicking any badge returns directly to that question.
- **Action Buttons**:
  - "Back to Questions" (secondary white/outline button, returns to `currentQuestionIndex` or question 1).
  - "Submit Final Answers" (primary green CTA).

---

### 3. Key Product Decisions & Trade-Offs

- **Horizontal Scroll vs Multi-Row Wrap for Action Bar**:
  - *Chosen Approach*: Single pill bar with horizontal scrolling (`overflow-x-auto scrollbar-none`).
  - *Why*: Preserves the clean floating pill aesthetic while strictly eliminating screen overflow on mobile and narrow viewports.
- **Full Question Grid on Final Review**:
  - *Chosen Approach*: Supplement flagged/unanswered lists with a complete interactive Question Map.
  - *Why*: Enables users who answered all questions to still inspect and verify any question before locking in their score.

---

### 4. Technical Architecture & Component Structure

```
┌───────────────────────────────────────────────────────────────┐
│                           App.js                              │
├───────────────────────────────┬───────────────────────────────┤
│          Quiz State           │         Review State          │
│  - currentQuizQuestions       │  - completedQuizData          │
│  - userAnswers                │  - reviewingHistoryEntry      │
│  - flaggedQuestions           │  - isReviewVisible            │
│  - showFinalReview            │  - reviewFilter               │
└───────────────┬───────────────┴───────────────┬───────────────┘
                │                               │
        ┌───────┴───────┐               ┌───────┴───────┐
        ▼               ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ QuestionView │ │ FinalReview  │ │ ScoreScreen  │ │FloatingAction│
│ - Sticky Bar │ │ - Back Button│ │ - Score Card │ │ - Scrollable │
│ - Next/Finish│ │ - Full Grid  │ │ - Taken Cards│ │ - Dashboard  │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

#### Files to Modify
- `src/App.js`:
  1. Update `ScoreScreen` floating quick action bar classes (`overflow-x-auto scrollbar-none max-w-[calc(100vw-1.5rem)]`).
  2. Update `FinalReviewScreen` props and template: add `totalQuestions`, `userAnswers`, `questions`, and `onBackToQuestions`, rendering a full interactive grid and "Back to Questions" button.
  3. Ensure `QuestionView` container sizing and bottom bar layout withstand small viewports, ensuring the action bar never clips out of view on retry.

---

### 5. Verification Plan

1. **Compilation & Linting**: Run `lint_applet` and `compile_applet` to ensure pristine syntax and builds.
2. **Floating Bar Test**: Verify on mobile width (~375px–420px) that all 4+ buttons in the floating bar are scrollable, with "Dashboard" cleanly accessible and not overlapping or clipped.
3. **Retry Flow Test**: Trigger a 1-question and multi-question retry, verifying that the navigation footer is 100% visible and transitions from "Next Question" to "Finish Exam".
4. **Final Review Test**: Reach the final review screen, click "Back to Questions" to resume, and click individual question badges in the full grid to recheck answers.
