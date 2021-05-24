import { throwError } from 'rxjs';
import { ResponseApi } from 'src/app/shared/models/response-api';

export abstract class HandleObservableService {
  protected handleError(error: ResponseApi | any) {
    let errorMessage = '';
    if (error.status_code instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.status_message}`;
    } else {
      errorMessage = `Código do erro: ${error.status_code}\nMensagem: ${error.status_code}`;
    }
    return throwError(errorMessage);
  }

  protected extractResponseData(payload: ResponseApi) {
    const response = new ResponseApi();
    response.page = payload.page;
    response.results = payload.results;
    response.total_results = payload.total_results;
    response.total_pages = payload.total_pages;
    return response;
  }
}
