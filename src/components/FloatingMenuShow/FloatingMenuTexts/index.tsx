import { Key } from "react";
import { Texts } from "./Texts";

type TextsInputProps = {
  className: string;
  text: TimeRanges;
};

type FloatingMenuTextsProps = {
  texts: TextsInputProps[];
};

export function FloatingMenuShowTexts({ texts }: FloatingMenuTextsProps) {
  return (
    <div className="flex flex-col text-left">
      {texts.map((text: TextsInputProps, index: Key) => (
        <Texts className={text.className} title={text.text} key={index} />
      ))}
    </div>
  );
}