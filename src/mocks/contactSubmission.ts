import type { ContactValues } from '@/components/ui/organism/ContactForm/ContactForm.schema';

export type ContactSubmissionOutcome = 'success' | 'error' | 'pending';

export interface ContactSubmissionMockOptions {
  delayMs?: number;
  outcomes?: readonly [ContactSubmissionOutcome, ...ContactSubmissionOutcome[]];
}

export function createContactSubmissionMock({
  delayMs = 800,
  outcomes = ['success'],
}: ContactSubmissionMockOptions = {}): (values: ContactValues) => Promise<void> {
  if (!Number.isFinite(delayMs) || delayMs < 0) {
    throw new RangeError('Submission delay must be a finite non-negative number.');
  }
  if (outcomes.length === 0) {
    throw new RangeError('At least one submission outcome is required.');
  }

  const sequence = [...outcomes];
  let nextOutcome = 0;

  return () => {
    const outcome = sequence[nextOutcome];
    nextOutcome = Math.min(nextOutcome + 1, sequence.length - 1);

    return new Promise<void>((resolve, reject) => {
      if (outcome === 'pending') return;

      setTimeout(() => {
        if (outcome === 'error') {
          reject(new Error('Simulated contact submission failure.'));
        } else {
          resolve();
        }
      }, delayMs);
    });
  };
}
