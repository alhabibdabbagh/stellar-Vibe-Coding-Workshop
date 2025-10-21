import { describe, it, expect, vi } from 'vitest';
import { getConfig, setConfigPartial } from '@/lib/config';

describe('config', () => {
  it('reads defaults from env on server', () => {
    expect(getConfig().network).toBeDefined();
  });

  it('overrides from localStorage on client', () => {
    // @ts-ignore
    global.window = { localStorage: {
      getItem: vi.fn(() => JSON.stringify({ network: 'PUBLIC' })),
      setItem: vi.fn(),
    }} as any;
    expect(getConfig().network).toBe('PUBLIC');
  });
});
