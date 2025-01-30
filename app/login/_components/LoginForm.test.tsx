import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLogin } from "@/api";
import LoginForm from "./LoginForm";

jest.mock("@/api");

const mockMutate = jest.fn();
describe("LoginForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (useLogin as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<LoginForm />);
  });

  it("should render the login form", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should validate required fields", async () => {
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/please enter your name/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it("should submit the form with valid data", async () => {
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    (useLogin as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
      });
    });
  });

  it("should display error message on failed submission", async () => {
    mockMutate.mockImplementationOnce(() => {
      throw new Error("Failed to login.");
    });

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(async () => {
      expect(await screen.findByText(/failed to login/i)).toBeInTheDocument();
    });
  });
});
