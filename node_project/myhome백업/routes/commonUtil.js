//routes 폴더에 놓을것 commonUtil.js

function getPaging(pg, totalCnt, pageGroupSize = 10) {
  //전체페이지 개수  , 어느그룹에 속하는지 확인해야함.
  pnTotal = Math.ceil(totalCnt / 10); // 전체 페이지 개수.
  //한페이지당 데이터가 10개일때 15건  ,강제 올림

  pgGroupStart = parseInt((pg - 1) / pageGroupSize) * pageGroupSize + 1;
  pgGroupEnd = pgGroupStart + 10;
  if (pgGroupEnd > pnTotal) pgGroupEnd = pnTotal + 1;

  console.log(pg, pgGroupStart, pgGroupEnd);

  //함수는 반환값이 하나여야만 한다. json객체로 만들어 보내면 된다.
  return { pnTotal: pnTotal, pnStart: pgGroupStart, pnEnd: pgGroupEnd, pg: pg };
}

// for (i = 1; i <= 32; i++) getPaging(i, 320);

exports.getPaging = getPaging;
