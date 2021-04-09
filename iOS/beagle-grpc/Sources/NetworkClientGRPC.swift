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

import Beagle
import GRPC

public class NetworkClientGRPC: NetworkClient {

    private var metadataPlatformName: String { "beagle-platform" }
    private var metadataPlatformValue: String { "IOS" }

    private let redirectGrpcFrom: String
    private let customHttpClient: NetworkClient
    private let defaultCallOptions: CallOptions
    private let screenClient: Beagle_ScreenControllerClientProtocol

    public convenience init(
        redirectGrpcFrom: String = "grpc://",
        customHttpClient: NetworkClient,
        channel: GRPCChannel,
        defaultCallOptions: CallOptions = CallOptions(),
        interceptors: Beagle_ScreenControllerClientInterceptorFactoryProtocol? = nil
    ) {
        self.init(
            redirectGrpcFrom: redirectGrpcFrom,
            customHttpClient: customHttpClient,
            defaultCallOptions: defaultCallOptions,
            screenClient: Beagle_ScreenControllerClient(
                channel: channel,
                interceptors: interceptors
            )
        )
    }

    internal init(
        redirectGrpcFrom: String,
        customHttpClient: NetworkClient,
        defaultCallOptions: CallOptions,
        screenClient: Beagle_ScreenControllerClientProtocol
    ) {
        self.redirectGrpcFrom = redirectGrpcFrom
        self.customHttpClient = customHttpClient
        self.defaultCallOptions = defaultCallOptions
        self.screenClient = screenClient
    }

    public func executeRequest(
        _ request: Request,
        completion: @escaping RequestCompletion
    ) -> RequestToken? {
        guard let screenRequest = grpcRequest(request) else {
            return customHttpClient.executeRequest(request, completion: completion)
        }
        let callOptions = grpcCallOptions(request)
        let call = screenClient.getScreen(screenRequest, callOptions: callOptions)

        call.response.and(call.headers).flatMapThrowing { viewNode, headers in
            return NetworkResponse(
                data: try viewNode.jsonData(),
                response: try Self.successResponse(url: request.url, headers: headers)
            )
        }
        .whenComplete {
            let result = $0.mapError {
                NetworkError(error: $0, request: URLRequest(url: request.url))
            }
            completion(result)
        }
        return call
    }

    private func grpcRequest(_ request: Request) -> Beagle_ScreenRequest? {
        let urlString = request.url.absoluteString
        guard case .fetchComponent = request.type,
              urlString.hasPrefix(redirectGrpcFrom) else {
            return nil
        }
        let httpData = (request.additionalData as? HttpAdditionalData)?.httpData
        let urlStart = urlString.index(urlString.startIndex, offsetBy: redirectGrpcFrom.count)
        var components = URLComponents(string: String(urlString[urlStart...]))
        var screenRequest = Beagle_ScreenRequest()

        switch httpData?.method {
        case .some(.POST), .some(.PUT), .some(.PATCH):
            if let body = httpData?.body,
               let params = String(data: body, encoding: .utf8) {
                screenRequest.parameters = params
            }
        case .none, .some(.GET), .some(.DELETE), .some(.HEAD):
            if let queryItems = components?.queryItems {
                screenRequest.parameters = parameters(queryItems: queryItems)
                components?.queryItems = nil
            }
        }
        if let name = components?.string {
            screenRequest.name = name
        }
        return screenRequest
    }

    private func parameters(queryItems: [URLQueryItem]) -> String {
        let dic = queryItems.reduce(into: [:]) { $0[$1.name] = $1.value }
        guard let data = try? JSONEncoder().encode(dic),
              let params = String(data: data, encoding: .utf8) else {
            return ""
        }
        return params
    }

    private func grpcCallOptions(_ request: Request) -> CallOptions {
        var callOptions = defaultCallOptions
        if callOptions.customMetadata.contains(name: metadataPlatformName) == false {
            callOptions.customMetadata.add(name: metadataPlatformName, value: metadataPlatformValue)
        }
        request.additionalData?.headers.forEach { key, value in
            callOptions.customMetadata.add(name: key, value: value)
        }
        return callOptions
    }

    private static func successResponse(url: URL, headers: [String: String]) throws -> HTTPURLResponse {
        if let response = HTTPURLResponse(url: url, statusCode: 200, httpVersion: nil, headerFields: headers) {
            return response
        }
        throw Self.Error.invalidResponse
    }
}

// MARK: Erros

extension NetworkClientGRPC {
    private enum Error: String, Swift.Error {
        case invalidResponse = "Could not generate a response from the received data."
    }
}
