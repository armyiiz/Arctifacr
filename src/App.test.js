import { render, screen } from '@testing-library/react';
import App from './App';

test('renders battle screen', () => {
  render(<App />);
  const titleElement = screen.getByText(/Battle Screen/i);
  expect(titleElement).toBeInTheDocument();
});
