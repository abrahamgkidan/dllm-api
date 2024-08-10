import axios from "axios";

import config from "../config/config";
import logger from "../config/logger";

export class LlmApiService {
  /**
   * Query the LLM API with a model and prompt
   * @param model - the model to query
   * @param prompt - the prompt to use
   * @returns {Promise<any>} - The response from the LLM API
   * @throws {Error} - An error
   */
  public async queryModel(queryOptions: any) {
    logger.debug(`LlmApiService::queryModel`);
    const options = {
      url: `/chat`,
      headers: { "Content-Type": "application/json" },
      data: queryOptions,
    };
    return this.callApi(options);
  }

  /**
   * Call the LLM API
   * @param options - the options to use for the request
   * @returns {Promise<any>} - The response from the LLM API
   * @throws {Error} - An error
   * @private
   */
  private async callApi(options: any) {
    logger.debug(`LlmApiService::callApi`);
    // default request configuration (may be overridden by 'options')
    let requestConfig = {
      baseURL: config.llmApiUrl,
      method: "post",
      timeout: 30000,
      header: {
        "Content-Type": "application/json",
      },
      ...options,
    };
    logger.debug(
      `LlmApiService::callApi::request::${JSON.stringify(requestConfig)}`
    );

    const response = await axios(requestConfig);

    logger.debug(
      `LlmApiService::callOrigami::response::${response.status}::${
        response.statusText
      }::${JSON.stringify(response.data)}`
    );

    return response;
  }
}
