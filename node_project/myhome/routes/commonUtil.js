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

function checkInfo(req, checkInfos) {
  msg = "";
  result = 0;
  resultInfo = {};

  for (info of checkInfos) {
    // undefined 상대방이 이 키값을 아예 안보냈다는 의미
    if (req.body[info.key] == undefined) {
      msg = info.key + "is empty";
      result = 1;
      req.body[info.key] = ""; // 다음 처리를 위해서 가급적 else를 사용하지 않기 위해서
    }

    // 타입체크 혹은 범위체크
    if (
      info.type == "str" &&
      info.range != -1 &&
      req.body[info.key].length > info.range
    ) {
      msg = msg += info.key + "range error\n";
    }

    resultInfo[info.key] = req.body[info.key];
    resultInfo["result"] = result;
    resultInfo["msg"] = msg;

    return resultInfo;
  }
}

exports.getPaging = getPaging;
exports.checkInfo = checkInfo;
