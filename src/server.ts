import { Eta } from "@bgub/eta";
import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { hentHendelselogggBackup } from "@/hendelselogg-backup.ts";

const app = new Hono();
const eta = new Eta({
  views: `${Deno.cwd()}/views`,
  cache: false,
  useWith: true,
});

// Serve static files from views folder
app.use("/static/*", serveStatic({ root: "./" }));


app.get("/", (c) => {
  return c.html(eta.render("pages/index", {
    title: "Brukerstøtte",
    user: { name: "Test", role: "admin" }
  }));
})

app.post("/search", async (c) => {
  const body = await c.req.parseBody();
  const query = body.q as string;
  console.log("Search query:", query);

  const headers = c.req.raw
  const res = await hentHendelselogggBackup(query, headers);

  console.log("Hendelselslogg backup result:", res);

  // Later som det tar litt tid
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return c.html(eta.render("pages/index", {
    title: `Søk: ${query}`,
    user: { name: "Test", role: "admin" },
    searchQuery: query
  }));
})

Deno.serve({ port: 8000 }, app.fetch);