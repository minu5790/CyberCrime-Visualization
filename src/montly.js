const montly = () => {
  const x1 = [],
    y1 = [];

  const loadMontlyCsv = () => {
    Plotly.d3.csv(
      "csv/경찰청_월별 사이버범죄 발생건수와 검거건수_20190520.csv",
      (data) => {
        processData(data);
      }
    );
  };
  const processData = (allRows) => {
    const keys = Object.keys(allRows[0]).filter(
      (e) => e !== "구분" && e !== "연도"
    );

    allRows.forEach((row) => {
      let temp = [];
      x1.push(row["연도"]);
      keys.map((key) => {
        temp.push(row[key]);
      });
      y1.push(temp);
      temp = [];
    });

    makePlotly(x1, keys);
  };

  const makeTrace = (item, index, keys) => {
    return {
      x: keys,
      y: y1[index],
      line: {
        shape: "line",
      },
      visible: item === "2014",
      name: index % 2 === 0 ? "발생건수" : "검거건수",
    };
  };
  const makePlotly = (x1, keys) => {
    const data = x1.map((item, index) => makeTrace(item, index, keys));
    console.log(data);

    const layout = {
      height: 600,
      updatemenus: [
        {
          yanchor: "top",
          buttons: [
            {
              method: "restyle",
              args: [
                "visible",
                [
                  true,
                  true,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ],
              ],
              label: "2014",
            },
            {
              method: "restyle",
              args: [
                "visible",
                [
                  false,
                  false,
                  true,
                  true,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ],
              ],
              label: "2015",
            },
            {
              method: "restyle",
              args: [
                "visible",
                [
                  false,
                  false,
                  false,
                  false,
                  true,
                  true,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ],
              ],
              label: "2016",
            },
            {
              method: "restyle",
              args: [
                "visible",
                [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  true,
                  true,
                  false,
                  false,
                  false,
                  false,
                ],
              ],
              label: "2017",
            },
            {
              method: "restyle",
              args: [
                "visible",
                [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  true,
                  true,
                  false,
                  false,
                ],
              ],
              label: "2018",
            },
            {
              method: "restyle",
              args: [
                "visible",
                [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  true,
                  true,
                ],
              ],
              label: "2019",
            },
          ],
        },
      ],
    };
    Plotly.newPlot("chart", data, layout);
  };
  loadMontlyCsv();
};
