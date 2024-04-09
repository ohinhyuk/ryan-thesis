export const getThesis = async () => {
  const getThesis = await fetch(
    `https://api.notion.com/v1/databases/${process.env.DATABASE_ID}/query`,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        Authorization: `${process.env.NOTION_API_SECRET_KEY}`,
        "Notion-Version": "2022-02-22",
      },
    }
  );
  return getThesis.json();
};

export const postThesis = async (data: any) => {
  const addThesis = await fetch(`https://api.notion.com/v1/pages/`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.NOTION_API_SECRET_KEY}`,
      "Notion-Version": "2022-02-22",
    },
    body: JSON.stringify(data),
  });

  return addThesis.json();
};
