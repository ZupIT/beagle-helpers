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
import Beagle
import BeagleDefaults

class DummyLogger: BeagleLoggerType {
    func log(_ log: LogType) {
        // intentionally not implemented
    }
    
    func logDecodingError(type: String) {
        // intentionally not implemented
    }
}

class DummyCacheManager: CacheManagerProtocol {
    func addToCache(_ reference: CacheReference) {
        // intentionally not implemented
    }
    
    func getReference(identifiedBy id: String) -> CacheReference? {
        // intentionally not implemented
        return nil
    }
    
    func isValid(reference: CacheReference) -> Bool {
        // intentionally not implemented
        return true
    }
}

class DummyNetworkClient: NetworkClient {
    func executeRequest(_ request: Request, completion: @escaping RequestCompletion) -> RequestToken? {
        // intentionally not implemented
        return nil
    }
}

class BeagleConfigTests: XCTestCase {
    
    /// These test cases suppose that a user creates a custom beagle dependencies, and we're seeing if this dependencies are actually set on Beagle.
    
    let userDependencies = BeagleDependencies()
    let baseUrl = "https://adopt-beagle.continuousplatform.com/scaffold"
    
    func test_whenUserGivesBaseUrl() {
        // Given
        userDependencies.urlBuilder = UrlBuilder(baseUrl: URL(string: "BaseUrl"))
        
        // When
        BeagleConfig.start(dependencies: userDependencies)

        // Then
        XCTAssertEqual(Beagle.dependencies.urlBuilder.baseUrl, URL(string: "BaseUrl"))
        assertCacheManagerWasSet()
        assertNetworkClientWasSet()
        assertLoggerWasSet()
    }
    
    func test_whenUserGivesCacheConfiguration() {
        // Given
        userDependencies.cacheManager = DummyCacheManager()
        
        // When
        BeagleConfig.start(dependencies: userDependencies)
        
        // Then
        XCTAssert(Beagle.dependencies.cacheManager is DummyCacheManager)
        assertBaseUrlWasSet()
        assertNetworkClientWasSet()
        assertLoggerWasSet()
    }
    
    func test_whenUserGivesNetworkConfiguration() {
        // Given
        userDependencies.networkClient = DummyNetworkClient()
        
        // When
        BeagleConfig.start(dependencies: userDependencies)
        
        // Then
        XCTAssert(Beagle.dependencies.networkClient is DummyNetworkClient)
        assertBaseUrlWasSet()
        assertCacheManagerWasSet()
        assertLoggerWasSet()
    }
    
    func test_whenUserGivesCustomLogger() {
        // Given
        userDependencies.logger = DummyLogger()
        
        // When
        BeagleConfig.start(dependencies: userDependencies)
        
        // Then
        XCTAssert((Beagle.dependencies.logger as? BeagleLoggerProxy)?.logger is DummyLogger)
        assertBaseUrlWasSet()
        assertCacheManagerWasSet()
        assertNetworkClientWasSet()
    }
    
    func test_whenUserGivesNothing() {
        // When
        BeagleConfig.start()
        
        // Then
        assertBaseUrlWasSet()
        assertCacheManagerWasSet()
        assertNetworkClientWasSet()
        assertLoggerWasSet()
    }
    
    private func assertCacheManagerWasSet(line: UInt = #line) {
        XCTAssert(Beagle.dependencies.cacheManager is CacheManagerDefault, line: line)
    }
    
    private func assertLoggerWasSet(line: UInt = #line) {
        XCTAssert((Beagle.dependencies.logger as? BeagleLoggerProxy)?.logger is BeagleLoggerDefault, line: line)
    }
    
    private func assertNetworkClientWasSet(line: UInt = #line) {
        XCTAssert(Beagle.dependencies.networkClient is NetworkClientDefault, line: line)
    }
    
    private func assertBaseUrlWasSet(line: UInt = #line) {
        XCTAssertEqual(Beagle.dependencies.urlBuilder.baseUrl, URL(string: baseUrl), line: line)
    }
    
}
