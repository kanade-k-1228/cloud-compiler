import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

const request_file = async (url: string, src: string) => {
  const form = new FormData();
  form.append("file", new File([await Deno.readFile(src)], src));
  const req = new Request(url, { method: "POST", body: form });
  const res = await fetch(req);
  if (res.body !== null) await Deno.writeFile("res.zip", res.body);
};

const localhost = "http://localhost:8000";
const dir = "src";

await new Command()
  .name("cc-client")
  .version("v0.0.0")
  .description("Cloud Compiler client")
  .option("-u, --url:string", "Server URL", { default: localhost })
  .option("-d, --directory:string", "Directory name", { default: "src" })
  .action(async () => {
    new Deno.Command("zip", { args: ["-r", "src.zip", dir] }).outputSync();
    await request_file(localhost, "src.zip");
    new Deno.Command("unzip", { args: ["-u", "res.zip"] }).outputSync();
  })

  .parse(Deno.args);
