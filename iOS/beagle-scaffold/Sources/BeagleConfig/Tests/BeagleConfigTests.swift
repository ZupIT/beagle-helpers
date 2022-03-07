//
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
@testable import BeagleScaffold
@testable import Beagle
import BeagleDefaults

class DummyLogger: LoggerProtocol {
    func log(_ log: LogType) {
        // intentionally not implemented
    }
    
    func logDecodingError(type: String) {
        // intentionally not implemented
    }
}

class DummyNetworkClient: NetworkClientProtocol {
    func executeRequest(_ request: Request, completion: @escaping RequestCompletion) -> RequestToken? {
        // intentionally not implemented
        return nil
    }
}

class BeagleConfigTests: XCTestCase {
    
    /// These test cases suppose that a user creates a custom beagle dependencies, and we're seeing if this dependencies are actually set on Beagle.
    
    var userDependencies = BeagleDependencies()
    let baseUrl = "https://adopt-beagle.continuousplatform.com/scaffold"
    
    func test_whenUserGivesBaseUrl() {
        // Given
        userDependencies.urlBuilder = UrlBuilder(baseUrl: URL(string: "BaseUrl"))
        
        // When
        BeagleConfig.start(dependencies: userDependencies)

        // Then
        let urlBuilder: UrlBuilderProtocol = try! CurrentResolver.resolve()
        XCTAssertEqual(urlBuilder.baseUrl, URL(string: "BaseUrl"))
        assertNetworkClientWasSet()
        assertLoggerWasSet()
    }
    
    func test_whenUserGivesNetworkConfiguration() {
        // Given
        userDependencies.networkClient = DummyNetworkClient()
        
        // When
        BeagleConfig.start(dependencies: userDependencies)
        
        // Then
        let networkClient: NetworkClientProtocol = try! CurrentResolver.resolve()
        XCTAssert(networkClient is DummyNetworkClient)
        assertBaseUrlWasSet()
        assertLoggerWasSet()
    }
    
    func test_whenUserGivesCustomLogger() {
        // Given
        userDependencies.logger = DummyLogger()
        
        // When
        BeagleConfig.start(dependencies: userDependencies)
        
        // Then
        let logger: LoggerProtocol = try! CurrentResolver.resolve()
        XCTAssert((logger as? LoggerProxy)?.logger is DummyLogger)
        assertBaseUrlWasSet()
        assertNetworkClientWasSet()
    }
    
    func test_whenUserGivesNothing() {
        // When
        BeagleConfig.start()
        
        // Then
        assertBaseUrlWasSet()
        assertNetworkClientWasSet()
        assertLoggerWasSet()
    }
    
    private func assertLoggerWasSet() {
        let logger: LoggerProtocol = try! CurrentResolver.resolve()
        XCTAssert((logger as? LoggerProxy)?.logger is BeagleLoggerDefault)
    }
    
    private func assertNetworkClientWasSet() {
        let networkClient: NetworkClientProtocol = try! CurrentResolver.resolve()
        XCTAssert(networkClient is NetworkClientDefault)
    }
        
    private func assertBaseUrlWasSet() {
        let urlBuilder: UrlBuilderProtocol = try! CurrentResolver.resolve()
        XCTAssertEqual(urlBuilder.baseUrl, URL(string: baseUrl))
    }
    
}
