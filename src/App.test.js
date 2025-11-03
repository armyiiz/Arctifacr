import { render, screen } from '@testing-library/react';
import App from './App';

test('renders battle screen with player and opponent sections', () => {
  render(<App />);

  // Check for "Player" heading
  const playerHeading = screen.getByText(/Player/i);
  expect(playerHeading).toBeInTheDocument();

  // Check for "Opponent" heading
  const opponentHeading = screen.getByText(/Opponent/i);
  expect(opponentHeading).toBeInTheDocument();
});
