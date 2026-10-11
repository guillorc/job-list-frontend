import axios, { AxiosResponse } from "axios";

const Catalog = async (domain: string): Promise<CatalogResponse> => {
  try {
    const response: AxiosResponse<CatalogResponse> = await axios.get(
      `http://localhost:5000/api-job-list/v1/catalog/domain/${domain}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el catálogo:", error);
    throw error;
  }
};

export default Catalog;

export interface CatalogResponse {
  domain: string;
  total: number;
  data: CatalogData[];
}

export interface CatalogData {
  uuid: string;
  domain: string;
  code: string;
  name: string;
  description: string;
  sortOrder: number;
  metadata: Record<string, unknown>;
}
