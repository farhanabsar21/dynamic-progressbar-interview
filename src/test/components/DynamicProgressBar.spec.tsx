import { render, fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DynamicProgressBar from "../../components/DynamicProgressBar";

describe("DynamicProgressBar", () => {
  it("renders with the initial value", () => {
    render(<DynamicProgressBar initialValue={50} />);
    const progressHandle = screen.getByRole("button");
    expect(progressHandle).toHaveStyle({ left: "50%" });
  });

  it("prevents progress from exceeding bounds", () => {
    const onChangeMock = vi.fn();
    render(<DynamicProgressBar initialValue={0} onChange={onChangeMock} />);

    const progressBar = screen.getByRole("progressbar");
    const rect = progressBar.getBoundingClientRect();

    fireEvent.click(progressBar, {
      clientX: rect.left - 10,
    });

    expect(onChangeMock).toHaveBeenCalledWith(0);

    fireEvent.click(progressBar, {
      clientX: rect.right + 10,
    });

    expect(onChangeMock).toHaveBeenCalledWith(100);
  });
});
