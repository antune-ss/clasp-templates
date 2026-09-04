export interface ClaspJson {
  /**
   * O ID único do script do Google Apps Script. 
   * (Pode ser encontrado na URL do editor do GAS).
   */
  scriptId: string;
  
  /**
   * (Opcional) A pasta local onde estão os códigos que serão enviados para a nuvem.
   */
  rootDir?: string;
  
  /**
   * (Opcional) O ID do projeto do Google Cloud Platform, caso o usuário queira 
   * associar esse script a um projeto padrão do GCP.
   */
  projectId?: string;
  
  /**
   * (Opcional) Array com os caminhos dos arquivos para definir a ordem em que 
   * eles são subidos para o servidor do Google (raramente usado).
   */
  filePushOrder?: string[];
  
  /**
   * (Opcional) Qual extensão local representa os arquivos que vão virar .gs na nuvem.
   */
  fileExtension?: string;
}