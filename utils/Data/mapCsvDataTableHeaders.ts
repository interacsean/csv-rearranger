const mapCsvDataTableHeaders = (csvDataTable: string[][]) => {
  if (csvDataTable.length === 0) return null;
  const headers = csvDataTable[0];
  const rows = csvDataTable.slice(1);
  return rows.map(
    row => row.reduce(
      (mappedRow, rowField, i) => {
        return { ...mappedRow, [headers[i]]: rowField}
      },
      {},
    )
  )
};

export default mapCsvDataTableHeaders;
