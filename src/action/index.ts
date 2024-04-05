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
