export const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
