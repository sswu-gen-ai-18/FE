export const saveCallRecord = (data: any) => {
  const records = getCallRecords();
  records.push(data);
  localStorage.setItem('call_records', JSON.stringify(records));
};

export const getCallRecords = () => {
  const data = localStorage.getItem('call_records');
  return data ? JSON.parse(data) : [];
};

export const clearCallRecords = () => {
  localStorage.removeItem('call_records');
};

export const downloadRecordsAsJSON = (records: any[]) => {
  const dataStr = JSON.stringify(records, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `call_records_${Date.now()}.json`;
  link.click();
};
