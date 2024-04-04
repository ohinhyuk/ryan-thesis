import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface ThesisEntry {
  title: string;
  summary: string;
  year: number;
  codeURL: string;
}
interface IThesisTable {
  data: ThesisEntry[];
}

export function ThesisTable({ data }: IThesisTable) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[100px]">번호</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>요약</TableHead>
          <TableHead>년도</TableHead>
          <TableHead>코드 URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx: number) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell>{row.summary}</TableCell>
            <TableCell>{row.year}</TableCell>
            <TableCell>{row.codeURL}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
