import { render } from "@testing-library/react";
import { Aside } from "./Aside";

describe("Aside Component", () => {
  it("aside renders correctly", () => {
    const { getByText } = render(<Aside></Aside>);

    expect(getByText("Arquivos")).toBeInTheDocument();
  });
});
