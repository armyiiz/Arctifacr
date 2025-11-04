import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders main menu, navigates to boss selection, then to route selection', () => {
  // 1. Render the App
  render(<App />);

  // 2. Find and click the "Story Mode" button
  const startGameButton = screen.getByText(/Story Mode/i);
  fireEvent.click(startGameButton);

  // 3. Check if the boss selection screen is rendered
  const bossSelectionTitle = screen.getByText(/Select Your Route/i);
  expect(bossSelectionTitle).toBeInTheDocument();

  // 4. Find and click the first boss
  const firstBossCard = screen.getByText(/Ender/i);
  fireEvent.click(firstBossCard);

  // 5. Check if the route selection screen is rendered
  const routeTitle = screen.getByText(/Stage: 1 \/ 11/i);
  expect(routeTitle).toBeInTheDocument();
});
