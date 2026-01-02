
import React from 'react';
import { ArchitectureType, LessonContent } from './types';

export const INITIAL_LESSON: LessonContent = {
  id: ArchitectureType.RULE_BASED,
  title: "1. Rule-Based Systems",
  problem: "Deterministic automation where the rules of logic are known and rigid. For example, a banking system calculating interest rates based on account balance and tenure. There's no 'guessing' involved—if X is true, then Y must happen.",
  diagramDescription: "Imagine a flow-chart. Data enters at the top. It hits a series of 'If-Then' gates. Depending on the answer, it moves to the next gate or triggers a final action. It's a linear, branching path with 100% predictable outcomes.",
  components: {
    model: "A set of explicit 'IF-THEN' statements stored in a Knowledge Base.",
    dataFlow: "Input -> Boolean Check -> Triggered Action. No feedback loops.",
    memory: "Static. The system only knows the rules it was manually given. It doesn't 'learn' from previous inputs.",
    orchestration: "Hard-coded logic or a simple Rule Engine (like Drools or nested if-else blocks)."
  },
  previousDifference: "This is the baseline. Before this, systems were manual. This introduced automated logic.",
  currentUseCases: [
    "Tax preparation software (TurboTax)",
    "Industrial safety shut-off systems",
    "Basic thermostat controls",
    "Legacy game AI (Pac-Man ghost behaviors)"
  ],
  analogy: "A physical recipe book. If you have eggs, then boil them. If you have flour, then bake it. If you have both, make a cake. The book never learns a new recipe unless a human writes it in.",
  whenNotToUse: "When patterns are fuzzy, data is noisy, or there are too many edge cases to manually code (e.g., identifying if a photo contains a cat).",
  pythonSnippet: `def calculate_discount(order_amount, is_premium_member):
    # This is a classic Rule-Based system logic
    if is_premium_member:
        if order_amount > 500:
            return 0.20 # 20% discount
        else:
            return 0.10 # 10% discount
    else:
        if order_amount > 1000:
            return 0.05 # 5% discount
        else:
            return 0.00 # No discount
            
# Predictable, explicit, and rigid.`
};

export const Icons = {
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 10 0 4 4 0 0 0 .52-8.105 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5z"/><path d="M9 13a4.5 4.5 0 0 0 3 0"/><path d="M15 13a4.5 4.5 0 0 1-3 0"/><path d="M12 13v8"/></svg>
  ),
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  )
};
