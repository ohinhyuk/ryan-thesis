import { Label } from "@/components/ui/label";
import { ThesisTable } from "./components/table";
import { getThesis } from "@/action";
import { PublicationDatabase } from "@/schema/thesis";
import { ThesisDialog } from "./components/modal";

export interface NotionPage {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: {
    Title: {
      title: [
        {
          text: {
            content: string;
          };
        }
      ];
    };
    Summary: {
      formula: {
        string: string;
      };
    };
    Year: {
      number: number;
    };
    Code: {
      url: string | null;
    };
  };
}

export default async function page() {
  const thesis = await getThesis();

  const data = thesis.results.reverse().map((row: NotionPage) => ({
    title: row.properties.Title.title[0].text.content,
    summary: row.properties.Summary.formula.string,
    year: row.properties.Year.number,
    codeURL: row.properties.Code.url || "No URL",
  }));

  return (
    <main className="w-full ">
      <h1 className="text-[23px] font-bold">이성원의 논문 데이터 베이스</h1>
      <div className="h-[15px]" />
      <div className="flex flex-col gap-[5px] text-gray-500">
        <Label>조회 / 추가 / 삭제가 가능해요!</Label>
        <Label>비밀번호는 당신의 영어 이름입니다.</Label>
      </div>

      <div className="h-[30px]" />
      <ThesisDialog />
      <ThesisTable data={data} />
    </main>
  );
}
