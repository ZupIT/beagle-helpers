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
    
    func test_whenUserGivesBaseUrl() {
        // Given
        userDependencies.urlBuilder = UrlBuilder(baseUrl: URL(string: "BaseUrl"))
        
        // When
        BeagleConfig.start(dependencies: userDependencies)

        // Then
        XCTAssertEqual(Beagle.dependencies.urlBuilder.baseUrl, URL(string: "BaseUrl"))
        XCTAssertNotNil(Beagle.dependencies.cacheManager)
        XCTAssertNotNil(Beagle.dependencies.networkClient)
    }
    
    func test_whenUserGivesCacheConfiguration() {
        // Given
        userDependencies.cacheManager = DummyCacheManager()
        
        // When
        BeagleConfig.start(dependencies: userDependencies)
        
        // Then
        XCTAssert(Beagle.dependencies.cacheManager is DummyCacheManager)
        XCTAssertNotNil(Beagle.dependencies.networkClient)
        XCTAssertNotNil(Beagle.dependencies.urlBuilder)
    }
    
    func test_whenUserGivesNetworkConfiguration() {
        // Given
        userDependencies.networkClient = DummyNetworkClient()
        
        // When
        BeagleConfig.start(dependencies: userDependencies)
        
        // Then
        XCTAssert(Beagle.dependencies.networkClient is DummyNetworkClient)
        XCTAssertNotNil(Beagle.dependencies.cacheManager)
        XCTAssertNotNil(Beagle.dependencies.urlBuilder)
    }
    
    func test_whenUserGivesNothing() {
        // When
        BeagleConfig.start()
        
        // Then
        XCTAssertEqual(Beagle.dependencies.urlBuilder.baseUrl, URL(string: "https://adopt-beagle.continuousplatform.com/scaffold"))
        XCTAssertNotNil(Beagle.dependencies.cacheManager)
        XCTAssertNotNil(Beagle.dependencies.networkClient)
    }
    
    
}
