import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders main menu first, then navigates to route selection', () => {
  render(<App />);

  // 1. Check if the main menu is rendered
  const titleElement = screen.getByText(/Artifact/i);
  expect(titleElement).toBeInTheDocument();

  const startGameButton = screen.getByRole('button', { name: /Start Game/i });
  expect(startGameButton).toBeInTheDocument();

  // 2. Simulate clicking the "Start Game" button
  fireEvent.click(startGameButton);

  // 3. Check if the route selection screen is rendered
  const routeTitle = screen.getByText(/Choose Your Path/i);
  expect(routeTitle).toBeInTheDocument();
});
