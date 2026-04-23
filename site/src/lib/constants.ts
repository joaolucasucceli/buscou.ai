/**
 * Constantes canonicas da buscou.ai.
 * Fonte: base-de-conhecimento/00 - Verdade Unica/VERDADE_UNICA_BUSCOU.md §11
 *      + base-de-conhecimento/05 - Modelo de Negocio/Decision Log - 2026-04-23 - Contato Oficial.md
 *      + base-de-conhecimento/05 - Modelo de Negocio/Decision Log - 2026-04-23 - Venda Consultiva.md
 */

export const SITE_URL = "https://www.buscouai.com";

export const WHATSAPP_NUMBER = "5527996960847";
export const WHATSAPP_NUMBER_HUMAN = "+55 27 99696-0847";
export const WHATSAPP_MESSAGE =
  "Oi, vi o site da buscou.ai e quero agendar um diagnostico do meu negocio.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
