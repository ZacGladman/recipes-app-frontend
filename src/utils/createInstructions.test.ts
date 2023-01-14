import createInstructionsParagraph from "./createInstructionsParagraph";

test("strings with line breaks in them are successfully converted into an array of objects", () => {
  expect(
    createInstructionsParagraph("Hello! \r\nMy name is Zac.")
  ).toStrictEqual([
    { key: 0, text: "Hello! " },
    { key: 1, text: "My name is Zac." },
  ]);
});

test("strings with no line break tags return an array of one object", () => {
  expect(createInstructionsParagraph("no line breaks here!")).toStrictEqual([
    { key: 0, text: "no line breaks here!" },
  ]);
});
