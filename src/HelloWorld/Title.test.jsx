import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { Title } from './Title';

vi.mock('remotion', () => {
  return {
    useVideoConfig: vi.fn(() => ({ fps: 30 })),
    useCurrentFrame: vi.fn(() => 10),
    spring: vi.fn(() => 1),
  };
});

test('Title component renders words correctly', () => {
  render(<Title titleText="Hello World" titleColor="red" />);

  const helloElement = screen.getByText('Hello');
  const worldElement = screen.getByText('World');

  expect(helloElement).toBeInTheDocument();
  expect(worldElement).toBeInTheDocument();

  expect(helloElement).toHaveStyle({
    color: 'rgb(255, 0, 0)',
    transform: 'scale(1)'
  });

  expect(worldElement).toHaveStyle({
    color: 'rgb(255, 0, 0)',
    transform: 'scale(1)'
  });
});
