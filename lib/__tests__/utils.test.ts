import { cn } from '../utils';

describe('cn utility function', () => {
  it('combines multiple class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles conditional classes', () => {
    const result = cn('base', true && 'conditional', false && 'hidden');
    expect(result).toBe('base conditional');
  });

  it('handles undefined and null values', () => {
    const result = cn('class1', undefined, null, 'class2');
    expect(result).toBe('class1 class2');
  });

  it('merges conflicting Tailwind classes', () => {
    const result = cn('p-2', 'p-4');
    expect(result).toBe('p-4');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles object with boolean values', () => {
    const result = cn({
      active: true,
      disabled: false,
      primary: true,
    });
    expect(result).toBe('active primary');
  });

  it('handles complex mixed inputs', () => {
    const result = cn(
      'base-class',
      ['array-class1', 'array-class2'],
      { 'object-class': true, 'hidden-class': false },
      undefined,
      'final-class',
    );
    expect(result).toBe(
      'base-class array-class1 array-class2 object-class final-class',
    );
  });
});
