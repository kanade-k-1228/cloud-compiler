import { ensureDir } from "https://deno.land/std@0.133.0/fs/ensure_dir.ts";
import { dirname } from "https://deno.land/std@0.133.0/path/win32.ts";
import { green } from "https://deno.land/std@0.201.0/fmt/colors.ts";
import { decompress } from "https://deno.land/x/zip@v1.2.5/mod.ts";

const receiveFile = async (request: Request, filename: string) => {
  const data = await request.formData();
  const file = data.get("file");
  const buf = await new Response(file).arrayBuffer();
  const u8a = new Uint8Array(buf);
  await ensureDir(dirname(filename));
  await Deno.writeFile(filename, u8a);
};

const handler = async (request: Request) => {
  console.log(green(request.method), request.url);
  await receiveFile(request, "server/src.zip");
  await decompress("server/src.zip", "server");
  const body = `this is response\n`;
  return new Response(body, { status: 200 });
};

Deno.serve(handler);
