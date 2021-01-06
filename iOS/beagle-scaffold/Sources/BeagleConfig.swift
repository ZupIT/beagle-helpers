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
import BeagleDefaults

public class BeagleConfig: DependencyLogger {
    
    public var logger: BeagleLoggerType = BeagleLoggerDefault()
    
    static private var baseURL = "https://adopt-beagle.continuousplatform.com/scaffold"
    
    @discardableResult
    static public func start(dependencies: BeagleDependencies? = nil) -> BeagleConfig {
        let dependencyLogger = BeagleConfig()
        Beagle.dependencies = scaffoldConfig(userDependencies: dependencies, with: dependencyLogger)
        return dependencyLogger
    }

    static private func scaffoldConfig(userDependencies dependencies: BeagleDependencies?, with dependencyLogger: BeagleConfig) -> BeagleDependencies {
        var dependenciesNew: BeagleDependencies
        if let dependenciesParam = dependencies {
            
//            if dependenciesParam.logger == nil {
//                dependenciesParam.logger = logger
//            }
            
            if dependenciesParam.urlBuilder.baseUrl == nil {
                dependenciesParam.urlBuilder = UrlBuilder(baseUrl: URL(string: baseURL))
            }
            
            if dependenciesParam.networkClient == nil {
                dependenciesParam.networkClient = NetworkClientDefault(dependencies: dependencyLogger)
            }
            
            if dependenciesParam.cacheManager == nil {
                dependenciesParam.cacheManager = CacheManagerDefault(dependencies: dependencyLogger)
            }

            dependenciesNew = dependenciesParam
            
        } else {
            dependenciesNew = BeagleDependencies(networkClient: NetworkClientDefault(dependencies: dependencyLogger), cacheManager: CacheManagerDefault(dependencies: dependencyLogger), logger: dependencyLogger.logger)
            dependenciesNew.urlBuilder = UrlBuilder(baseUrl: URL(string: self.baseURL))
        }
        
        return dependenciesNew
    }
}
