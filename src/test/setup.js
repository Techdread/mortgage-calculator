import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock Chart.js animations
const mockAnimationDelay = () => ({
  x: { duration: 0 },
  y: { duration: 0 }
});

// Setup mocks
global.ResizeObserver = ResizeObserverMock;
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  };
};

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});
