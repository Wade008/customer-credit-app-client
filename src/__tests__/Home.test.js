

import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('renders the landing page', () => {
  render(<Home />);
  // expect(screen.getByRole("heading")).toHaveTextContent(/Customer Credit/);
});

