export default function createInstructionsParagraph(
  instructions: string
): { key: number; text: string }[] {
  const instructionsSplit = instructions.split("\r\n");
  const instructionsArray = [];
  for (let i = 0; i < instructionsSplit.length; i++) {
    instructionsArray.push({ key: i, text: instructionsSplit[i] });
  }
  return instructionsArray;
}
