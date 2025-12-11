import { getToken, requestAzureOboToken } from "@navikt/oasis";

// TODO: denne variablen eksisterer ikke enda
const isDev = Deno.env.get("TO_BE_SET") === "dev-gcp";

export async function getOboToken(
  request: Request,
  scope: string,
): Promise<string> {
  if (isDev) return "token"; // Auth er slått av i dev

  const incomingToken = getToken(request.headers);
  if (!incomingToken) {
    throw new Error("Ingen innkommende token funnet i headers");
  }

  const oboResult = await requestAzureOboToken(incomingToken, scope);
  if (!oboResult.ok) {
    console.error(oboResult.error, `Tokenutveklsing feilet for: ${scope}`);
    throw new Error(
      `Tokenutveksling feilet for OBO token med følgende scope: ${scope}`,
    );
  }

  return oboResult.token;
}
