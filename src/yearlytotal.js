const yearlytotal = () => {
  const loadYealryCsv = () => {
    Plotly.d3.csv("csv/경찰청_연도별 사이버범죄통계_20191231.csv", (data) => {
      processData(data);
    });
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
    makePlotly(x1, y1, x2, y2);
  };

  const makePlotly = (x1, y1, x2, y2) => {
    const trace1 = {
      x: x1,
      y: y1,
      type: "scatter",
      name: "발생건수",
    };

    const trace2 = {
      x: x2,
      y: y2,
      type: "scatter",
      name: "검거건수",
    };

    const data = [trace1, trace2];
    const config = { responsive: true };

    Plotly.newPlot(
      "yearly__total",
      data,
      {
        title: "<b>연도별 총 합계</b>",
        titlefont: {
          size: 25,
        },
      },
      config
    );
  };
  loadYealryCsv();
};

yearlytotal();
