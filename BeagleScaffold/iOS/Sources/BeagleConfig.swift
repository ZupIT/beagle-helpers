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

class BeagleConfig: DependencyLogger {
    
    var logger: BeagleLoggerType = BeagleLoggerDefault()
    
    private var baseURL = "localhost"
    
    public init(dependencies: BeagleDependencies? = nil) {
        var dependenciesNew: BeagleDependencies

        if let dependenciesParam = dependencies {
//            dependenciesParam.urlBuilder = dependencies?.urlBuilder.baseUrl != nil
//            if dependenciesParam.logger == nil {
//                dependenciesParam = logger
//            }
//            dependenciesParam.logger = dependencies?.logger ?? logger
//            if dependenciesParam.logger
            
            if dependenciesParam.urlBuilder.baseUrl == nil {
                dependenciesParam.urlBuilder = UrlBuilder(baseUrl: URL(string: baseURL))
            }
            
            if dependenciesParam.networkClient == nil {
                dependenciesParam.networkClient = NetworkClientDefault(dependencies: self)
            }
            
            if dependenciesParam.cacheManager == nil {
                dependenciesParam.cacheManager = CacheManagerDefault(dependencies: self)
            }

            dependenciesNew = dependenciesParam
        } else {
            dependenciesNew = BeagleDependencies(networkClient: NetworkClientDefault(dependencies: self), cacheManager: CacheManagerDefault(dependencies: self), logger: logger)
            dependenciesNew.urlBuilder = UrlBuilder(baseUrl: URL(string: self.baseURL))
        }
        
        Beagle.dependencies = dependenciesNew
    }

    private func scaffoldConfig() {

    }
}
