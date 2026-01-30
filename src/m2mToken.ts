import { requestAzureClientCredentialsToken } from "@navikt/oasis";

// Denne funksjonen støtter kun DEV
async function getAzureM2MToken(scope: string): Promise<string> {
  const clientCredentals = await requestAzureClientCredentialsToken(scope);
  if (!clientCredentals.ok) {
    throw new Error(
      `M2M token forespørsel feilet for følgende scope: ${scope}. Error: ${
        JSON.stringify(clientCredentals.error)
      }`,
    );
  }
  return clientCredentals.token;
}

export { getAzureM2MToken };
