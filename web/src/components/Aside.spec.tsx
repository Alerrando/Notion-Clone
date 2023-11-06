import React from "react";
import { render } from "@testing-library/react";
import { Aside } from "./Aside";

test("aside renders correctly", () => {
  const { getByText } = render(<Aside></Aside>);

  expect(getByText("Arquivos")).toBeInTheDocument();
});

test("aside renders correctly", () => {
  const { getByText } = render(<Aside></Aside>);

  expect(getByText("Arquivos")).toBeInTheDocument();
});
