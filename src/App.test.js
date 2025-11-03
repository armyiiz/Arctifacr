import { render, screen } from '@testing-library/react';
import App from './App';

test('renders battle screen', async () => {
  render(<App />);
  // Use findByText which waits for the element to appear
  const titleElement = await screen.findByText(/Player HP/i);
  expect(titleElement).toBeInTheDocument();

  const enemyHpElement = await screen.findByText(/Enemy HP/i);
  expect(enemyHpElement).toBeInTheDocument();
});
