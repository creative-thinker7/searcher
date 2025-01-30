import { render, screen, fireEvent } from "@testing-library/react";
import { useLogout } from "@/api";
import { usePathname } from "next/navigation";
import LogoutLink from "./LogoutLink";

jest.mock("@/api");

const mockMutate = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("LogoutLink", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (useLogout as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it("should render logout button when logged in", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<LogoutLink />);
    const button = screen.getByRole("button", { name: /logout/i });
    expect(button).toBeInTheDocument();
  });

  it("should not render logout button when not logged in", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    render(<LogoutLink />);
    const button = screen.queryByRole("button", { name: /logout/i });
    expect(button).not.toBeInTheDocument();
  });

  it("should call API on click", async () => {
    render(<LogoutLink />);
    const button = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(button);
    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it("should disable button when API is being called", () => {
    (useLogout as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });
    render(<LogoutLink />);
    const button = screen.getByRole("button", { name: /logout/i });
    expect(button).toBeDisabled();
  });
});
