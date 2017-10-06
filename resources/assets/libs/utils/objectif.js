const checkTruthTables = (truthTableRef, truthTableBoard) => {
    console.log("ref", truthTableRef);
    console.log("board", truthTableBoard)
  if (
    truthTableBoard.length !== truthTableRef.length ||
    truthTableRef[0].length !== truthTableBoard[0].length
  )
    return false;

  for (let i = 0; i < truthTableRef.length; ++i) {
    for (let j = 0; j < truthTableRef[i].length; ++j) {
      console.log(truthTableRef[i][j], truthTableBoard[i][j]);
      if (truthTableRef[i][j] !== truthTableBoard[i][j]) {
        return false;
      }
    }
  }
  return true;
};

export { checkTruthTables };
