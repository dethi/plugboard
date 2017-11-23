const checkTruthTables = (truthTableRef, truthTableBoard) => {
  if (
    truthTableBoard.length !== truthTableRef.length ||
    truthTableRef[0].length !== truthTableBoard[0].length
  )
    return false;

  for (let i = 0; i < truthTableRef.length; ++i) {
    for (let j = 0; j < truthTableRef[i].length; ++j) {
      if (truthTableRef[i][j] !== truthTableBoard[i][j]) {
        return false;
      }
    }
  }
  return true;
};

const computeScore = (objectifStartedAt, nbElementRemoved) => {
  let scores = [];
  let total = 0;

  const timeSpent = Math.round((Date.now() - objectifStartedAt) / 1000);
  let el1 = {
    name: 'Time spent',
    value: timeSpent,
    score: Math.round(10 - timeSpent / 10 > 0 ? 10 - timeSpent / 10 : 0)
  };
  total = el1.score;
  scores.push(el1);
  let el2 = {
    name: 'Element removed',
    value: nbElementRemoved,
    score: 10 - nbElementRemoved > 0 ? 10 - nbElementRemoved : 0
  };
  total += el2.score;
  scores.push(el2);

  return { scores, total };
};

export { checkTruthTables, computeScore };
