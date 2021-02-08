const yearlytype = () => {
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

    const FILEDS = [
      "해킹",
      "악성프로그램",
      "직거래",
      "사기",
      "금융범죄",
      "음란물",
      "도박",
      "저작권",
      "명예훼손",
      "기타",
    ];
    const allRowsMap = new Map();

    allRows.forEach((row) => {
      keys.forEach((key) => {
        if (key.includes(FILEDS[0])) {
          filterMap(FILEDS[0], key, row, allRowsMap);
        } else if (key.includes(FILEDS[1])) {
          filterMap(FILEDS[1], key, row, allRowsMap);
        } else if (key.includes(FILEDS[2])) {
          filterMap(FILEDS[2], key, row, allRowsMap);
        } else if (key.includes(FILEDS[3])) {
          filterMap(FILEDS[3], key, row, allRowsMap);
        } else if (key.includes(FILEDS[4])) {
          filterMap(FILEDS[4], key, row, allRowsMap);
        } else if (key.includes(FILEDS[5])) {
          filterMap(FILEDS[5], key, row, allRowsMap);
        } else if (key.includes(FILEDS[5])) {
          filterMap(FILEDS[6], key, row, allRowsMap);
        } else if (key.includes(FILEDS[6])) {
          filterMap(FILEDS[6], key, row, allRowsMap);
        } else if (key.includes(FILEDS[7])) {
          filterMap(FILEDS[7], key, row, allRowsMap);
        } else if (key.includes(FILEDS[8])) {
          filterMap(FILEDS[8], key, row, allRowsMap);
        } else {
          filterMap("기타", key, row, allRowsMap);
        }
      });
      if (row["구분"] === "발생건수") {
        x1.push(Array.from(allRowsMap.entries()));
      }
      allRowsMap.clear();
    });

    makePlotly(x1, x2);
  };

  const filterMap = (filed, key, row, allRowsMap) => {
    allRowsMap.set(
      filed,
      allRowsMap.has(filed)
        ? allRowsMap.get(filed) + parseInt(row[key])
        : parseInt(row[key])
    );
  };
  const makePlotly = (x1, x2) => {
    const values = [];
    const labels = [];
    x1.map((e) => {
      let temp = [];
      let temp2 = [];
      e.map((e2) => {
        temp.push(e2[1]);
        temp2.push(e2[0]);
      });
      values.push(temp);
      labels.push(temp2);
      temp = [];
      temp = [];
    });

    const data = [
      {
        values: values[0],
        labels: labels[0],
        type: "pie",
        name: "2019",
        title: "2019",
        titlefont: {
          size: 15,
        },
        domain: {
          row: 0,
          column: 0,
        },
        hoverinfo: "label+percent+name",
        textinfo: "none",
      },
      {
        values: values[1],
        labels: labels[0],
        type: "pie",
        name: "2018",
        title: "2018",
        titlefont: {
          size: 15,
        },
        domain: {
          row: 0,
          column: 1,
        },
        hoverinfo: "label+percent+name",
        textinfo: "none",
      },
      {
        values: values[2],
        labels: labels[0],
        type: "pie",
        name: "2017",
        title: "2017",
        titlefont: {
          size: 15,
        },
        domain: {
          row: 0,
          column: 2,
        },
        hoverinfo: "label+percent+name",
        textinfo: "none",
      },
      {
        values: values[3],
        labels: labels[0],
        type: "pie",
        name: "2016",
        title: "2016",
        titlefont: {
          size: 15,
        },
        domain: {
          row: 1,
          column: 0,
        },
        hoverinfo: "label+percent+name",
        textinfo: "none",
      },
      {
        values: values[4],
        labels: labels[0],
        type: "pie",
        name: "2015",
        title: "2015",
        titlefont: {
          size: 15,
        },
        domain: {
          row: 1,
          column: 1,
        },
        hoverinfo: "label+percent+name",
        textinfo: "none",
      },
      {
        values: values[5],
        labels: labels[0],
        type: "pie",
        name: "2014",
        title: "2014",
        titlefont: {
          size: 15,
        },
        domain: {
          row: 1,
          column: 2,
        },
        hoverinfo: "label+percent+name",
        textinfo: "none",
      },
    ];

    const layout = {
      height: 800,
      grid: { rows: 2, columns: 3 },
      title: "<b>범죄 비율 2014 ~ 2019 (발생건수)</b>",
      titlefont: {
        size: 25,
      },
    };
    Plotly.newPlot("chart", data, layout, { responsive: true });
  };
  loadYealryCsv();
};
