import { ensureDir } from "https://deno.land/std@0.133.0/fs/ensure_dir.ts";
import { dirname } from "https://deno.land/std@0.133.0/path/win32.ts";
import { green } from "https://deno.land/std@0.201.0/fmt/colors.ts";

const receiveFile = async (request: Request, filename: string) => {
  const data = await request.formData();
  const file = data.get("file");
  const buf = await new Response(file).arrayBuffer();
  const u8a = new Uint8Array(buf);
  await ensureDir(dirname(filename));
  await Deno.writeFile(filename, u8a);
};

const unzip = new Deno.Command("unzip", { args: ["src.zip"], cwd: "tmp" });
const run = new Deno.Command("make", { cwd: "tmp/src" });
const zip = new Deno.Command("zip", {
  args: ["-r", "src_res.zip", "src"],
  cwd: "tmp",
});

const handler = async (request: Request) => {
  console.log(green(request.method), request.url);
  await receiveFile(request, "tmp/src.zip");
  await unzip.output();
  await run.output();
  await zip.output();
  const res = new Response(`this is response\n`, { status: 200 });
  return res;
};

Deno.serve(handler);
