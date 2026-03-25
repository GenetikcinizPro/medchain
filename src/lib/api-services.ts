/**
 * MedChain Library - External API Services
 * Handles integrations with PubMed, CrossRef, and ORCID.
 */

export interface ExternalArticle {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
  abstract?: string;
  citations?: number;
}

const CROSSREF_BASE = "https://api.crossref.org/works/";
const PUBMED_SUMMARY_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=";
const ORCID_BASE = "https://pub.orcid.org/v3.0/";

export const ApiServices = {
  /**
   * Fetch metadata and citation count from CrossRef via DOI
   */
  async fetchByDOI(doi: string): Promise<ExternalArticle | null> {
    try {
      const response = await fetch(`${CROSSREF_BASE}${doi}`);
      if (!response.ok) return null;
      const data = await response.json();
      const msg = data.message;

      return {
        title: msg.title?.[0] || "Unknown Title",
        authors: msg.author?.map((a: any) => `${a.family} ${a.given?.[0] || ""}`).filter(Boolean) || [],
        journal: msg["container-title"]?.[0] || "Unknown Journal",
        year: msg.issued?.["date-parts"]?.[0]?.[0] || new Date().getFullYear(),
        doi: msg.DOI,
        abstract: msg.abstract?.replace(/<[^>]*>?/gm, ""), // Strip XML tags from abstract
        citations: msg["is-referenced-by-count"] || 0,
      };
    } catch (error) {
      console.error("CrossRef Fetch Error:", error);
      return null;
    }
  },

  /**
   * Fetch metadata from PubMed via PMID
   */
  async fetchByPMID(pmid: string): Promise<ExternalArticle | null> {
    try {
      const response = await fetch(`${PUBMED_SUMMARY_BASE}${pmid}`);
      if (!response.ok) return null;
      const data = await response.json();
      const result = data.result?.[pmid];

      if (!result) return null;

      return {
        title: result.title || "Unknown Title",
        authors: result.authors?.map((a: any) => a.name) || [],
        journal: result.fulljournalname || result.source || "Unknown Journal",
        year: parseInt(result.pubdate?.split(" ")?.[0]) || new Date().getFullYear(),
        pmid: pmid,
        doi: result.articleids?.find((ai: any) => ai.idtype === "doi")?.value,
      };
    } catch (error) {
      console.error("PubMed Fetch Error:", error);
      return null;
    }
  },

  /**
   * Fetch a researcher's works from ORCID
   */
  async fetchORCIDWorks(orcid: string): Promise<ExternalArticle[]> {
    try {
      const response = await fetch(`${ORCID_BASE}${orcid}/works`, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) return [];
      const data = await response.json();
      const groups = data.group || [];

      return groups.map((g: any) => {
        const summary = g["work-summary"]?.[0];
        return {
          title: summary?.title?.title?.value || "Unknown Title",
          authors: [], // ORCID works summary doesn't always include full author list easily
          journal: summary?.["journal-title"]?.value || "Unknown Source",
          year: summary?.["publication-date"]?.year?.value || 0,
          doi: summary?.["external-ids"]?.["external-id"]?.find((id: any) => id["external-id-type"] === "doi")?.["external-id-value"],
        };
      });
    } catch (error) {
      console.error("ORCID Fetch Error:", error);
      return [];
    }
  },
};
