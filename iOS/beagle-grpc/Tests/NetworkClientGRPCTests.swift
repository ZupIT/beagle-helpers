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

import XCTest

import GRPC
import NIOHPACK

import Beagle
@testable import BeagleGRPC

class NetworkClientGRPCTests: XCTestCase {

    func testCustomHttpClientShouldHandleNonFetchComponentRequests() throws {
        // Given
        let networkClientFake = NetworkClientFake()
        let sut = NetworkClientGRPC(
            redirectGrpcFrom: "",
            customHttpClient: networkClientFake,
            channel: FakeChannel()
        )
        let fetchComponent = try beagleRequest(type: .fetchComponent)
        let fetchImage = try beagleRequest(type: .fetchImage)
        let rawRequest = try beagleRequest(type: .rawRequest(.init()))
        let submitForm = try beagleRequest(type: .submitForm(.init(method: .post, values: [:])))

        // When
        _ = sut.executeRequest(fetchComponent) { _ in }
        // Then
        XCTAssertNil(networkClientFake.lastRequest)

        // When
        _ = sut.executeRequest(fetchImage) { _ in }
        // Then
        XCTAssertEqual(networkClientFake.lastRequest?.type, fetchImage.type)

        // When
        _ = sut.executeRequest(rawRequest) { _ in }
        // Then
        XCTAssertEqual(networkClientFake.lastRequest?.type, rawRequest.type)

        // When
        _ = sut.executeRequest(submitForm) { _ in }
        // Then
        XCTAssertEqual(networkClientFake.lastRequest?.type, submitForm.type)
        XCTAssertEqual(networkClientFake.requests.count, 3)
    }

    func testCustomHttpClientShouldHandleRequestsWithoutPrefix() throws {
        // Given
        let fetchComponent = try beagleRequest(url: "https://server")
        let networkClientFake = NetworkClientFake()
        let sut = networkClientGRPC(
            redirectGrpcFrom: "grpc://",
            customHttpClient: networkClientFake
        )
        // When
        _ = sut.executeRequest(fetchComponent) { _ in }
        // Then
        XCTAssertNotNil(networkClientFake.lastRequest)
    }

    func testBeaglePlatformHeader() throws {
        // Given
        let initialHeaders = ["h1": "v1", "h2": "v2"]
        let request = try beagleRequest(headers: initialHeaders)

        // When
        let (allHeaders, _) = grpcRequest(for: request)

        // Then
        XCTAssertEqual(allHeaders?["beagle-platform"], "IOS")
        XCTAssertEqual(allHeaders?["h1"], "v1")
        XCTAssertEqual(allHeaders?["h2"], "v2")
        XCTAssertEqual(allHeaders?.count, 3)
    }

    func testQueryStringParameters() throws {
        try queryStringTest(method: .GET)
        try queryStringTest(method: .DELETE)
        try queryStringTest(method: .HEAD)
    }

    private func queryStringTest(method: HttpAdditionalData.Method) throws {
        // Given
        let request = try beagleRequest(url: "grpc://app/screen?p1=v1&p2=v2", method: method)

        // When
        let (_, screenRequest) = grpcRequest(for: request)

        // Then
        let data = try XCTUnwrap(screenRequest?.parameters.data(using: .utf8))
        let parameters = try JSONSerialization.jsonObject(with: data, options: []) as? [String: String]
        XCTAssertEqual(screenRequest?.name, "app/screen")
        XCTAssertEqual(parameters, ["p1": "v1", "p2": "v2"])
    }

    func testBodyParameters() throws {
        try bodyTest(method: .POST)
        try bodyTest(method: .PUT)
        try bodyTest(method: .PATCH)
    }

    private func bodyTest(method: HttpAdditionalData.Method) throws {
        // Given
        let bodyObject = ["text": "string", "number": 42] as [String: Any]
        let bodyData = try JSONSerialization.data(withJSONObject: bodyObject, options: [])
        let request = try beagleRequest(url: "grpc://screen.app/content", method: method, body: bodyData)

        // When
        let (_, screenRequest) = grpcRequest(for: request)

        // Then
        let data = try XCTUnwrap(screenRequest?.parameters.data(using: .utf8))
        let parameters = try JSONSerialization.jsonObject(with: data, options: []) as? [AnyHashable: Any]
        XCTAssertEqual(screenRequest?.name, "screen.app/content")
        XCTAssertEqual(parameters?["text" as AnyHashable] as? String, "string")
        XCTAssertEqual(parameters?["number" as AnyHashable] as? Int, 42)
        XCTAssertEqual(parameters?.count, 2)
    }

    func testRequestError() throws {
        // Given
        let result = try makeRequest {
            // When
            try $0.sendError(GRPCStatus.processingError)
        }
        // Then
        let networkError = try XCTUnwrap(result.failure)
        XCTAssertEqual(networkError.error as? GRPCStatus, GRPCStatus.processingError)
        XCTAssertEqual(networkError.request.url?.absoluteString, "grpc://screen")
    }

    func testRequestSuccess() throws {
        // Given
        let initialMetadata: HPACKHeaders = ["common": "initial", "initial": "h1"]
        let trailingMetadata: HPACKHeaders = ["common": "trailing", "trailing": "h2"]
        let result = try makeRequest {
            // When
            try $0.sendMessage(
                Beagle_ViewNode(),
                initialMetadata: initialMetadata,
                trailingMetadata: trailingMetadata,
                status: GRPCStatus.ok
            )
        }
        // Then
        let networkResponse = try XCTUnwrap(result.success)
        let httpResponse = try XCTUnwrap(networkResponse.response as? HTTPURLResponse)
        XCTAssertEqual(httpResponse.statusCode, 200)
        XCTAssertEqual(httpResponse.allHeaderFields.count, 3)
        XCTAssertEqual(httpResponse.value(forHTTPHeaderField: "common"), "trailing")
        XCTAssertEqual(httpResponse.value(forHTTPHeaderField: "initial"), "h1")
        XCTAssertEqual(httpResponse.value(forHTTPHeaderField: "trailing"), "h2")
        XCTAssertNoThrow {
            try JSONSerialization.jsonObject(with: networkResponse.data, options: [])
        }
    }

    func testCancelRequest() throws {
        // Given
        let grpcClient = Beagle_ScreenControllerTestClient()
        let networkClient = networkClientGRPC(screenClient: grpcClient)

        // When
        _ = grpcClient.makegetScreenResponseStream()
        var result: Result<NetworkResponse, NetworkError>?
        networkClient.executeRequest(try beagleRequest()) {
            result = $0
        }?.cancel()

        // Then
        let error = try XCTUnwrap(result?.failure?.error as? GRPCError.RPCCancelledByClient)
        XCTAssertEqual(error.makeGRPCStatus().code, .cancelled)
    }

    // MARK: - Helpers
    
    private func networkClientGRPC(
        redirectGrpcFrom: String = "grpc://",
        customHttpClient: NetworkClient = NetworkClientFake(),
        defaultCallOptions: CallOptions = CallOptions(),
        screenClient: Beagle_ScreenControllerClientProtocol = Beagle_ScreenControllerTestClient()
    ) -> NetworkClientGRPC {
        return NetworkClientGRPC(
            redirectGrpcFrom: redirectGrpcFrom,
            customHttpClient: customHttpClient,
            defaultCallOptions: defaultCallOptions,
            screenClient: screenClient
        )
    }

    private func beagleRequest(
        type: Request.RequestType = .fetchComponent,
        headers: [String: String] = [:],
        url: String = "grpc://screen",
        method: HttpAdditionalData.Method = .GET,
        body: Data = Data()
    ) throws -> Request {
        return Request(
            url: try XCTUnwrap(URL(string: url)),
            type: type,
            additionalData: HttpAdditionalData(
                httpData: .init(method: method, body: body),
                headers: headers
            )
        )
    }

    /// Helper to get the values used in the gRPC client for a given `request`.
    /// - Parameter request: the request to simulate
    /// - Returns: Headers and Request used in the gRPC Client
    private func grpcRequest(for request: Request)
    -> (headers: [String: String]?, screenRequest: Beagle_ScreenRequest?) {
        let grpcClient = Beagle_ScreenControllerTestClient()
        let networkClient = networkClientGRPC(
            customHttpClient: NetworkClientFake(),
            screenClient: grpcClient
        )
        var headers: [String: String]?
        var screenRequest: Beagle_ScreenRequest?
        _ = grpcClient.makegetScreenResponseStream { part in
            switch part {
            case .metadata(let metadata):
                headers = metadata.reduce(into: [:]) { $0[$1.name] = $1.value }
            case .message(let message):
                screenRequest = message
            case .end:
                break
            }
        }
        _ = networkClient.executeRequest(request) { _ in }
        return (headers, screenRequest)
    }

    /// Helper to call `NetworkClientGRPC.executeRequest`
    /// - Parameter requestHandler: response building block, see `FakeUnaryResponse`
    /// - Parameter fake: use the methods `sendMessage` and `sendError` to build the response
    /// - Throws: any gRPC or `NetworkClientGRPC` error
    /// - Returns: the result of `NetworkClientGRPC.executeRequest`
    private func makeRequest(
        requestHandler: (_ fake: FakeUnaryResponse<Beagle_ScreenRequest, Beagle_ViewNode>) throws -> Void
    ) throws -> Result<NetworkResponse, NetworkError> {
        let grpcClient = Beagle_ScreenControllerTestClient()
        let networkClient = networkClientGRPC(
            customHttpClient: NetworkClientFake(),
            screenClient: grpcClient
        )
        var result: Result<NetworkResponse, NetworkError>?
        try requestHandler(grpcClient.makegetScreenResponseStream())
        _ = networkClient.executeRequest(try beagleRequest()) {
            result = $0
        }
        return try XCTUnwrap(result)
    }

}

 // MARK: -

class NetworkClientFake: NetworkClient {

    var result: NetworkResult?

    private(set) var requests: [Request] = []
    var lastRequest: Request? { requests.last }

    func executeRequest(_ request: Request, completion: @escaping RequestCompletion) -> RequestToken? {
        requests.append(request)
        if let result = result { completion(result) }
        return nil
    }
}

extension Request.RequestType: Equatable {
    public static func == (lhs: Request.RequestType, rhs: Request.RequestType) -> Bool {
        switch (lhs, rhs) {
        case (.fetchComponent, .fetchComponent): return true
        case (.submitForm, .submitForm): return true
        case (.fetchImage, .fetchImage): return true
        case (.rawRequest, .rawRequest): return true
        default: return false
        }
    }
}

extension Result {
    fileprivate var failure: Failure? {
        if case .failure(let error) = self {
            return error
        }
        return nil
    }
    fileprivate var success: Success? {
        if case .success(let value) = self {
            return value
        }
        return nil
    }
}
