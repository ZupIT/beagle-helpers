/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Foundation
import Beagle

public class NetworkClientDefault: NetworkClientProtocol {
    
    public init() {}

    public var session = URLSession.shared

    public var httpRequestBuilder = HttpRequestBuilder()

    enum ClientError: Swift.Error {
        case invalidHttpResponse
        case invalidHttpRequest
    }

    public func executeRequest(
        _ request: Request,
        completion: @escaping RequestCompletion
    ) -> RequestToken? {
        return doRequest(request, completion: completion)
    }

    @discardableResult
    private func doRequest(
        _ request: Request,
        completion: @escaping RequestCompletion
    ) -> RequestToken? {
        
        let build = httpRequestBuilder.build(
            url: request.url,
            additionalData: request.additionalData
        )
        let urlRequest = build.toUrlRequest()

        let task = session.dataTask(with: urlRequest) { [weak self] data, response, error in
            guard let self = self else { return }
            Beagle.Dependencies.logger.log(Log.network(.httpResponse(response: .init(data: data, response: response))))
            completion(self.handleResponse(data: data, request: urlRequest, response: response, error: error))
        }
        
        Beagle.Dependencies.logger.log(Log.network(.httpRequest(request: .init(url: urlRequest))))
        task.resume()
        return task
    }

    private func handleResponse(
        data: Data?,
        request: URLRequest,
        response: URLResponse?,
        error: Swift.Error?
    ) -> NetworkClientProtocol.NetworkResult {
        if let error = error {
            return .failure(NetworkError(error: error, request: request))
        }

        guard
            let httpResponse = response as? HTTPURLResponse,
            (200...299).contains(httpResponse.statusCode),
            let responseData = data
        else {
            return .failure(NetworkError(
                error: ClientError.invalidHttpResponse,
                data: data,
                request: request,
                response: response
            ))
        }

        return .success(.init(data: responseData, response: httpResponse))
    }
}
