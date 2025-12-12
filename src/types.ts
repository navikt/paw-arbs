import type { UtfoertAv } from "@navikt/arbeidssokerregisteret-utils";

/**
 * RFC 7807 Problem Details for HTTP APIs
 * @see https://datatracker.ietf.org/doc/html/rfc7807
 */
export interface ProblemDetails {
  /** Unique identifier for this specific error occurrence */
  id: string;
  /** A URI reference that identifies the problem type */
  type: string;
  /** The HTTP status code */
  status: number;
  /** A short, human-readable summary of the problem type */
  title: string;
  /** A human-readable explanation specific to this occurrence */
  detail: string;
  /** A URI reference that identifies the specific occurrence */
  instance: string;
  /** When the error occurred */
  timestamp: string;
}

/**
 * Type guard to check if an unknown value is a ProblemDetails object
 */
export function isProblemDetails(value: unknown): value is ProblemDetails {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    "status" in value &&
    "title" in value
  );
}

export type GjeldeneTilstand = {
  harAktivePeriode: boolean;
  periodeId?: string;
  startet: string;
  avsluttet: string | null;
  harOpplysningerMottattHendelse: boolean;
  apiKall: {
    harPeriode?: boolean;
    harOpplysning: boolean;
    harProfilering: boolean;
  };
};

type HistorikkHendelse = {
  hendelseId: string;
  hendelseType: string;
  merged?: boolean;
  metadata: {
    tidspunkt: string;
    utfoertAv: UtfoertAv;
    aarsak: string;
  };
  data: {
    identitetsnummer: string;
  };
  traceparent: string;
};

export type Historikk = {
  endret: boolean;
  gjeldeneTilstand: GjeldeneTilstand;
  nyTilstand: GjeldeneTilstand;
  hendelse: HistorikkHendelse;
};

export type ArbeidsoekerDetaljer = {
  arbeidssoekerId: number;
  recordKey: number;
  kafkaPartition: number;
  gjeldeneTilstand: GjeldeneTilstand;
  historikk: Historikk[];
};
