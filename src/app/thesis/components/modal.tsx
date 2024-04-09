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
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ThesisDialog() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const postThesis = async () => {
    const res = await (
      await fetch(`/api/thesis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          password,
        }),
      })
    ).json();

    // console.log(res);

    alert(res.message);

    if (res.message === "생성되었습니다.") window.location.reload();
  };

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

        <Label htmlFor="content">내용</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          name="content"
          placeholder="예시) 
          @InProceedings{Armeni_2019_ICCV,
            author = {Armeni, Iro and He, Zhi-Yang and Gwak, JunYoung and Zamir, Amir R. and Fischer, Martin and Malik, Jitendra and Savarese, Silvio},
            title = {3D Scene Graph: A Structure for Unified Semantics, 3D Space, and Camera},
            booktitle = {Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)},
            month = {October},
            year = {2019}
          }"
          rows={15}
        />
        <Label htmlFor="password">비밀번호</Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          id="password"
          name="password"
          placeholder="당신의 영어 이름 (소문자로)"
        />

        <DialogFooter>
          <Button onClick={postThesis}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
