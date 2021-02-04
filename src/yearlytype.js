const yearlytype = () => {
  const loadYealryCsv = () => {
    Plotly.d3.csv(
      "../cyber/csv/경찰청_연도별 사이버범죄통계_20191231.csv",
      (data) => {
        processData(data);
      }
    );
  };
  const processData = (allRows) => {
    const keys = Object.keys(allRows[0]).filter(
      (e) => e !== "연도" && e !== "구분"
    );
    const allLabels = [...keys];
    const allValues = [];

    console.log(allRows);
    makePlotly();
  };

  const makePlotly = () => {};
  loadYealryCsv();
};
