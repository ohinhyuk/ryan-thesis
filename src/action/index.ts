export async function onSubmit(formData: FormData) {
  "use server";
  // event.preventDefault();

  console.log("22");

  // const formData = new FormData(event.currentTarget);
  console.log(formData.get("content"));

  if (formData.get("password") !== "ryan") {
    return;
  }

  console.log(formData.get("content"), formData.get("password"));
  // const response = await fetch("/api/submit", {
  //   method: "POST",
  //   body: formData,
  // });

  console.log("@@");
  revalidatePath("/thesis", "page");
}

import { PublicationDatabase } from "@/schema/thesis";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const getThesis = async () => {
  const getThesis = await fetch(
    "https://api.notion.com/v1/databases/313fb755e0124aecb193e666d7d671b0/query",
    {
      method: "POST",
      headers: {
        Authorization: "secret_U2s7zPXUgYm3RrVR6ayqVbSZuwoGzvt8EdtfNtChVn1",
        "Notion-Version": "2022-02-22",
      },
    }
  );
  return getThesis.json();
};
