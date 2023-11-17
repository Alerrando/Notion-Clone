import { Key } from "react";
import { Texts } from "./Texts";
import { twMerge } from "tailwind-merge";

type TextsInputProps = {
  className: string;
  text: string;
};

type FloatingMenuTextsProps = {
  texts: TextsInputProps[];
};

export function FloatingMenuShowTexts({ texts }: FloatingMenuTextsProps) {
  return (
    <div className="flex flex-col text-left">
      {texts.map((text: TextsInputProps, index: Key) => (
        <Texts className={twMerge(text.className, "text-white dark:text-black")} title={text.text} key={index} />
      ))}
    </div>
  );
}
