import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders main menu, navigates to boss selection, then to route selection', () => {
  // Clear localStorage before test to ensure consistent state
  localStorage.clear();

  // 1. Render the App
  render(<App />);

  // 2. Find and click the "Start Game" button (was "Story Mode")
  const startGameButton = screen.getByText(/Start Game/i);
  fireEvent.click(startGameButton);

  // 3. Check if the boss selection screen is rendered
  const bossSelectionTitle = screen.getByText(/Select Your Route/i);
  expect(bossSelectionTitle).toBeInTheDocument();

  // 4. Find and click the first boss (Ender)
  // Note: Depending on BossSelectionScreen implementation, find by text might vary.
  // Assuming boss name is rendered.
  const firstBossCard = screen.getByText(/Ender/i);
  fireEvent.click(firstBossCard);

  // 5. Check if the route selection screen is rendered
  // RouteSelection usually shows "Stage 1 / 11" or similar.
  // We can look for "Stage 1" or "Current Gold".
  const stageInfo = screen.getByText(/Stage 1/i);
  expect(stageInfo).toBeInTheDocument();
});
