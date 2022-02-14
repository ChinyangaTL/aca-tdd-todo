import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import mockData from './mockData';

beforeEach(() => {
  fetchMock.once(
    [JSON.stringify(mockData)],
  )
})

describe("<App /> test", () => {
  test("test that inital App state is rendered", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByText(/My Todos/i)).toBeInTheDocument();
  });

  test("test that todo item is added successfully", async () => {
    fetchMock.once(JSON.stringify({
      userId: 3,
      id: Math.floor(Math.random() * 100) + 1 ,
      title: 'Eat my dogs homework',
      completed: false
    }));

    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    
    userEvent.type(screen.getByRole("textbox"));
    userEvent.click(screen.getByText(/Add new todo/i));
    expect(screen.getByText(/Eat my dogs homework/i)).toBeInTheDocument();
  });

  test("test that todo item is removed from list", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.click(screen.getByTestId('close-btn-3'));
    expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument();
  });

  test("todo item should be crossed out after completing", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.click(screen.getByTestId('checkbox-1'));
    expect(screen.getByText(/eat breakfast/i)).toHaveClass('completed');
  });
});