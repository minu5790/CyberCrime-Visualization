const makeplot = () => {
  Plotly.d3.csv(
    "../cyber/csv/경찰청_월별 사이버범죄 발생건수와 검거건수_20190520.csv",
    (data) => {
      processData(data);
    }
  );
};

const processData = (allRows) => {
  const x1 = [],
    x2 = [],
    y1 = [],
    y2 = [];
  const keys = Object.keys(allRows[0]).filter(
    (e) => e !== "연도" && e !== "구분"
  );

  allRows.forEach((row) => {
    const total = keys.reduce(
      (acc, currValue) => acc + parseInt(row[currValue]),
      0
    );

    if (row["구분"] === "발생건수") {
      x1.push(row["연도"]);
      y1.push(total);
    } else if (row["구분"] === "검거건수") {
      x2.push(row["연도"]);
      y2.push(total);
    }
  });
  console.log("X", x1, "Y", y1, "발생건수");
  console.log("X", x2, "Y", y2, "검거건수");
  makePlotly(x1, y1);
};

const makePlotly = (x, y) => {
  var traces = [
    {
      x: x,
      y: y,
    },
  ];
  var config = { responsive: true };

  Plotly.newPlot(
    "chart",
    traces,
    {
      title: "<b>연도별 통계</b>",
      titlefont: {
        size: 25,
      },
    },
    config
  );
};
makeplot();
