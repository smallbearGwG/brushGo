export default async function brushSercice<T>(
  serviceName: string,
  requestHead: string,
  requestData?: any
): Promise<T> {
  return await window.electronAPI.brushService(
    serviceName,
    requestHead,
    requestData
  );
}
