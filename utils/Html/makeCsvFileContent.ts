function joinRow(rowData: (string | number)[]) {
  // todo: need to escape commas and quotes etc
  return rowData.join(',');
}

export function makeCsvFileContent(headers: string[], tableData: {[k: string]: string | number }[]) {
  return [joinRow(headers)].concat(
    tableData.map(
      csvRow => joinRow(Object.values(csvRow)),
    )
  ).join("\n");
}