import { MemoryRouter, useLocation } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlayerContext } from "../contexts/players";
import Layout from "../layouts/Layout";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useLocation: jest.fn(),
  Outlet: () => <div data-testid="test-end">Player Page</div>,
}));

describe("Layout component", () => {
  const mockSetQuery = jest.fn();

  const mockPlayers = [
    {
      id: 1,
      first_name: "Dwayne",
      last_name: "Bacon",
      position: "SF",
      team: { full_name: "Charlotte Hornets" },
      jersey_number: 23,
      country: "USA",
    },
    {
      id: 2,
      first_name: "Carmelo",
      last_name: "Anthony",
      position: "SG",
      team: { full_name: "Los Angeles Lakers" },
      jersey_number: 7,
      country: "USA",
    },
    {
      id: 3,
      first_name: "LeBron",
      last_name: "James",
      position: "SF",
      team: { full_name: "Los Angeles Lakers" },
      jersey_number: 23,
      country: "USA",
    },
    {
      id: 4,
      first_name: "Stephen",
      last_name: "Curry",
      position: "PG",
      team: { full_name: "Golden State Warriors" },
      jersey_number: 30,
      country: "USA",
    },
  ];

  const renderWithProviders = (location = "/players/1") => {
    jest.mocked(useLocation).mockReturnValue({ pathname: location });

    return render(
      <PlayerContext.Provider
        value={{ query: "c", setQuery: mockSetQuery, players: mockPlayers }}
      >
        <MemoryRouter initialEntries={["/players/2"]}>
          <Layout />
        </MemoryRouter>
      </PlayerContext.Provider>,
    );
  };

  it("Render correctly ", () => {
    renderWithProviders();
    expect(
      screen.getByText(/Stats only available for 2023 season/),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search for a player"),
    ).toBeInTheDocument();
  });

  it("Search for Carmelo player", () => {
    renderWithProviders();
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "C" } });
    expect(mockSetQuery).toHaveBeenCalledWith("c");
    expect(screen.queryAllByText("Carmelo Anthony"));
    const playerComboboxCard = screen.getByTestId("player-link-4");
    expect(playerComboboxCard).toHaveAttribute("href", "player/4");
    fireEvent.click(playerComboboxCard);
    const playerPage = screen.getByTestId("test-end");
    expect(playerPage).toBeVisible();
  });
});
