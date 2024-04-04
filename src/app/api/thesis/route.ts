import { exec as execCallback } from "child_process";
import { promisify } from "util";

// exec 함수를 Promise로 사용하기 위해 promisify로 감싸줍니다.
const exec = promisify(execCallback);

export async function POST(request: any) {
  const bibtex = `"""@article{10.1145/3503250,
  author = {Mildenhall, Ben and Srinivasan, Pratul P. and Tancik, Matthew and Barron, Jonathan T. and Ramamoorthi, Ravi and Ng, Ren},
  title = {NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis},
  year = {2021},
  issue_date = {January 2022},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  volume = {65},
  number = {1},
  issn = {0001-0782},
  url = {https://doi.org/10.1145/3503250},
  doi = {10.1145/3503250},
  abstract = {We present a method that achieves state-of-the-art results for synthesizing novel views of complex scenes by optimizing an underlying continuous volumetric scene function using a sparse set of input views. Our algorithm represents a scene using a fully connected (nonconvolutional) deep network, whose input is a single continuous 5D coordinate (spatial location (x, y, z) and viewing direction (θ, ϕ)) and whose output is the volume density and view-dependent emitted radiance at that spatial location. We synthesize views by querying 5D coordinates along camera rays and use classic volume rendering techniques to project the output colors and densities into an image. Because volume rendering is naturally differentiable, the only input required to optimize our representation is a set of images with known camera poses. We describe how to effectively optimize neural radiance fields to render photorealistic novel views of scenes with complicated geometry and appearance, and demonstrate results that outperform prior work on neural rendering and view synthesis.},
  journal = {Commun. ACM},
  month = {dec},
  pages = {99–106},
  numpages = {8}
  }"""`;
  const token = process.env.NOTION_API_SECRET_KEY;
  const databaseId = process.env.DATABASE_ID;
  console.log(token, databaseId);
  try {
    // notion-scholar 설치
    const installOutput = await exec(
      "pip install git+https://github.com/thomashirtz/notion-scholar#egg=notion-scholar"
    );
    console.log(installOutput.stdout);

    // ns set-config 실행
    const configOutput = await exec(
      `ns set-config -t ${token} -db ${databaseId}`
    );
    console.log(configOutput.stdout);

    // ns run 실행
    const runOutput = await exec(`ns run -s """@article{10.1145/3503250,
    author = {Mildenhall, Ben and Srinivasan, Pratul P. and Tancik, Matthew and Barron, Jonathan T. and Ramamoorthi, Ravi and Ng, Ren},
    title = {NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis},
    year = {2021},
    issue_date = {January 2022},
    publisher = {Association for Computing Machinery},
    address = {New York, NY, USA},
    volume = {65},
    number = {1},
    issn = {0001-0782},
    url = {https://doi.org/10.1145/3503250},
    doi = {10.1145/3503250},
    abstract = {We present a method that achieves state-of-the-art results for synthesizing novel views of complex scenes by optimizing an underlying continuous volumetric scene function using a sparse set of input views. Our algorithm represents a scene using a fully connected (nonconvolutional) deep network, whose input is a single continuous 5D coordinate (spatial location (x, y, z) and viewing direction (θ, ϕ)) and whose output is the volume density and view-dependent emitted radiance at that spatial location. We synthesize views by querying 5D coordinates along camera rays and use classic volume rendering techniques to project the output colors and densities into an image. Because volume rendering is naturally differentiable, the only input required to optimize our representation is a set of images with known camera poses. We describe how to effectively optimize neural radiance fields to render photorealistic novel views of scenes with complicated geometry and appearance, and demonstrate results that outperform prior work on neural rendering and view synthesis.},
    journal = {Commun. ACM},
    month = {dec},
    pages = {99–106},
    numpages = {8}
    }"""`);
    console.log(runOutput.stdout);

    return new Response(JSON.stringify({ message: "Done" }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`exec error: ${error}`);
    return new Response(JSON.stringify({ message: "error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
