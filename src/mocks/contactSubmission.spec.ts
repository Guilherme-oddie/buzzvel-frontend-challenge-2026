import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { contactValuesMock } from './contact';
import { createContactSubmissionMock } from './contactSubmission';

describe('createContactSubmissionMock', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it.each(['success', 'error'] as const)(
    'settles %s only after the default latency',
    async (outcome) => {
      const onSuccess = vi.fn();
      const onError = vi.fn();
      const submit = createContactSubmissionMock({ outcomes: [outcome] });
      const result = submit(contactValuesMock).then(onSuccess, onError);

      await vi.advanceTimersByTimeAsync(799);
      expect(onSuccess).not.toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(1);
      await result;

      if (outcome === 'success') {
        expect(onSuccess).toHaveBeenCalledExactlyOnceWith(undefined);
        expect(onError).not.toHaveBeenCalled();
      } else {
        expect(onError).toHaveBeenCalledExactlyOnceWith(
          new Error('Simulated contact submission failure.'),
        );
        expect(onSuccess).not.toHaveBeenCalled();
      }
    },
  );

  it('supports retry sequences, repeats the last outcome and isolates each factory', async () => {
    const options = { delayMs: 25, outcomes: ['error', 'success'] as const };
    const submit = createContactSubmissionMock(options);
    const independentSubmit = createContactSubmissionMock(options);

    for (const [handler, outcome] of [
      [submit, 'error'],
      [submit, 'success'],
      [submit, 'success'],
      [independentSubmit, 'error'],
    ] as const) {
      const result = handler(contactValuesMock);
      const assertion =
        outcome === 'error'
          ? expect(result).rejects.toThrow('Simulated contact submission failure.')
          : expect(result).resolves.toBeUndefined();

      await vi.advanceTimersByTimeAsync(25);
      await assertion;
    }
  });

  it('keeps an explicitly pending outcome unresolved without a timer', async () => {
    const onSettled = vi.fn();
    const submit = createContactSubmissionMock({ outcomes: ['pending'] });
    void submit(contactValuesMock).then(onSettled, onSettled);

    await vi.advanceTimersByTimeAsync(60_000);

    expect(onSettled).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('rejects invalid delay or empty outcome configuration', () => {
    for (const delayMs of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => createContactSubmissionMock({ delayMs })).toThrow(RangeError);
    }
    expect(() => {
      // @ts-expect-error Exercise invalid configuration supplied by JavaScript.
      createContactSubmissionMock({ outcomes: [] });
    }).toThrow(RangeError);
  });
});
