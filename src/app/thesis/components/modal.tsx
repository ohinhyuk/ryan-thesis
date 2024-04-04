"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ThesisDialog() {
  //   async function onSubmit(formData: FormData) {
  //     "use server";
  //     // event.preventDefault();

  //     console.log("22");

  //     // const formData = new FormData(event.currentTarget);
  //     console.log(formData.get("content"));

  //     if (formData.get("password") !== "ryan") {
  //       return;
  //     }

  //     console.log(formData.get("content"), formData.get("password"));
  //     // const response = await fetch("/api/submit", {
  //     //   method: "POST",
  //     //   body: formData,
  //     // });

  //     console.log("@@");
  //     revalidatePath("/thesis", "page");

  //     // Handle response if necessary
  //     // const data = await response.json();
  //     // ...
  //   }

  const postThesis = () =>
    fetch("http://localhost:3000/api/thesis", {
      method: "POST",
    })
      .then((res) => alert("생성되었습니다."))
      .catch((e) => alert("실패하였습니다."));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="float-right">논문 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>논문 추가</DialogTitle>
          <DialogDescription>
            논문에 추가할 내용을 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <Textarea name="content" placeholder="내용 추가" rows={15} />
          </div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            placeholder="당신의 영어 이름 (소문자로)"
          />
          <DialogFooter>
            <Button onClick={postThesis}>저장</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
