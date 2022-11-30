export const fetcher = async (
  url: string,
  type: "GET" | "PUT" | "DELETE" | "POST",
  body?: any
) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: type,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return data.json();
};
