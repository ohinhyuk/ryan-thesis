import { postThesis } from "@/action";
import { exec as execCallback } from "child_process";
import Error from "next/error";
import { promisify } from "util";

interface IObj {
  Authors: string;
  title: string;
  year: number;
  Bibtex: string;
  Filename: string;
  Type: string;
}

const token = process.env.NOTION_API_SECRET_KEY;
const databaseId = process.env.DATABASE_ID;

const mock = `@misc{hewamalage2021global,
  title={Global Models for Time Series Forecasting: A Simulation Study},
  author={Hansika Hewamalage and Christoph Bergmeir and Kasun Bandara},
  year={2021},
  eprint={2012.12485},
  archivePrefix={arXiv},
  primaryClass={cs.LG}
}`;

const parsePostStr = (str: string) => {
  const Bibtex = str;

  const parsedObj: any = {};

  const lines = str.split(",\n");
  const Type = lines[0].split("{")[0].split("@")[1];
  const Filename = lines[0].split("{")[1];

  lines.forEach((line) => {
    // 'key={value}' 형태를 파싱하기 위해 '=' 기준으로 분리
    const [key, value] = line.split("=").map((part) => part.trim());
    // 필요한 키에 따라 객체에 정보 저장
    switch (key) {
      case "title":
        parsedObj["title"] = value.replace(/{|}/g, ""); // 중괄호 제거
        break;
      case "author":
        parsedObj["Authors"] = value.replace(/{|}/g, ""); // 중괄호 제거 후 저자를 배열로 변환
        break;
      case "year":
        parsedObj["year"] = parseInt(value.replace(/{|}/g, ""), 10); // 중괄호 제거 후 정수로 변환
        break;
    }
  });

  parsedObj["Bibtex"] = Bibtex;
  parsedObj["Filename"] = Filename;
  parsedObj["Type"] = Type;

  return parsedObj;
};

const makePostBody = (obj: IObj) => ({
  parent: {
    database_id: databaseId,
  },
  properties: {
    Authors: {
      rich_text: [
        {
          text: {
            content: obj.Authors,
          },
        },
      ],
    },
    title: {
      title: [
        {
          text: {
            content: obj.title,
          },
        },
      ],
    },
    Year: {
      number: obj.year,
    },
    Bibtex: {
      rich_text: [
        {
          text: {
            content: obj.Bibtex,
          },
        },
      ],
    },
    Filename: {
      rich_text: [
        {
          text: {
            content: obj.Filename,
          },
        },
      ],
    },
    Type: {
      select: {
        name: obj.Type,
      },
    },
  },
});

const postBoard = async (data: string) => {
  const parsedObj = parsePostStr(data);
  const postBody = makePostBody(parsedObj);
  const res = postThesis(postBody)
    .then((res) => {
      return new Response(JSON.stringify({ message: "생성되었습니다." }));
    })
    .catch((error) => {
      console.log(error);
      return new Response(JSON.stringify({ message: "error" }));
    });
};

// const obj = {
//   "Authors": {type:"title", title: 'Mildenhall, Ben and Srinivasan, Pratul P. and Tancik, Matthew and Barron, Jonathan T. and Ramamoorthi, Ravi and Ng, Ren'},
//   "title": {type: "title" , title:'NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis'},
//   "year": {type: "number" , number: 2021},
//   "Bibtex":{type: "title" , title: '"""@article{10.1145/3503250,\n' +
//   '  author = {Mildenhall, Ben and Srinivasan, Pratul P. and Tancik, Matthew and Barron, Jonathan T. and Ramamoorthi, Ravi and Ng, Ren},\n' +
//   '  title = {NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis},\n' +
//   '  year = {2021},\n' +
//   '  issue_date = {January 2022},\n' +
//   '  publisher = {Association for Computing Machinery},\n' +
//   '  address = {New York, NY, USA},\n' +
//   '  volume = {65},\n' +
//   '  number = {1},\n' +
//   '  issn = {0001-0782},\n' +
//   '  url = {https://doi.org/10.1145/3503250},\n' +
//   '  doi = {10.1145/3503250},\n' +
//   '  abstract = {We present a method that achieves state-of-the-art results for synthesizing novel views of complex scenes by optimizing an underlying continuous volumetric scene function using a sparse set of input views. Our algorithm represents a scene using a fully connected (nonconvolutional) deep network, whose input is a single continuous 5D coordinate (spatial location (x, y, z) and viewing direction (θ, ϕ)) and whose output is the volume density and view-dependent emitted radiance at that spatial location. We synthesize views by querying 5D coordinates along camera rays and use classic volume rendering techniques to project the output colors and densities into an image. Because volume rendering is naturally differentiable, the only input required to optimize our representation is a set of images with known camera poses. We describe how to effectively optimize neural radiance fields to render photorealistic novel views of scenes with complicated geometry and appearance, and demonstrate results that outperform prior work on neural rendering and view synthesis.},\n' +
//   '  journal = {Commun. ACM},\n' +
//   '  month = {dec},\n' +
//   '  pages = {99–106},\n' +
//   '  numpages = {8}\n' +
//   '  }"""'} ,
//   "Filename": {type: "title" , title: '10.1145/3503250'}
// }

// postBoard(
//   `@article{10.1145/3503250,
//   author = {Mildenhall, Ben and Srinivasan, Pratul P. and Tancik, Matthew and Barron, Jonathan T. and Ramamoorthi, Ravi and Ng, Ren},
//   title = {NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis},
//   year = {2021},
//   issue_date = {January 2022},
//   publisher = {Association for Computing Machinery},
//   address = {New York, NY, USA},
//   volume = {65},
//   number = {1},
//   issn = {0001-0782},
//   url = {https://doi.org/10.1145/3503250},
//   doi = {10.1145/3503250},
//   abstract = {We present a method that achieves state-of-the-art results for synthesizing novel views of complex scenes by optimizing an underlying continuous volumetric scene function using a sparse set of input views. Our algorithm represents a scene using a fully connected (nonconvolutional) deep network, whose input is a single continuous 5D coordinate (spatial location (x, y, z) and viewing direction (θ, ϕ)) and whose output is the volume density and view-dependent emitted radiance at that spatial location. We synthesize views by querying 5D coordinates along camera rays and use classic volume rendering techniques to project the output colors and densities into an image. Because volume rendering is naturally differentiable, the only input required to optimize our representation is a set of images with known camera poses. We describe how to effectively optimize neural radiance fields to render photorealistic novel views of scenes with complicated geometry and appearance, and demonstrate results that outperform prior work on neural rendering and view synthesis.},
//   journal = {Commun. ACM},
//   month = {dec},
//   pages = {99–106},
//   numpages = {8}
//   }`
// );

// // exec 함수를 Promise로 사용하기 위해 promisify로 감싸줍니다.
// const exec = promisify(execCallback);

export async function POST(request: Request) {
  const { content, password } = await request.json();

  if (password !== process.env.PASSWORD)
    return new Response(JSON.stringify({ message: "패스워드가 틀립니다." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });

  const parsedObj = await parsePostStr(content);
  const postBody = makePostBody(parsedObj);

  return await postThesis(postBody)
    .then((res) => {
      return new Response(JSON.stringify({ message: "생성되었습니다." }));
    })
    .catch((error) => {
      console.log(error);
      return new Response(JSON.stringify({ message: "error" }));
    });

  // return new Response(JSON.stringify({ message: "생성되었습니다." }));
}
