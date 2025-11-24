const API_BASE_URL = 'http://localhost:3000/url';

export const shortenUrl = async (originalUrl) => {
  const res = await fetch(`${API_BASE_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.msg || "Failed to shorten URL");

  return data;
};
