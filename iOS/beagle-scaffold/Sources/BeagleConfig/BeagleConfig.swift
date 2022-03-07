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

public class BeagleConfig {
    
    static private var baseURL = "https://adopt-beagle.continuousplatform.com/scaffold"
    
    static public func start(dependencies: BeagleDependencies = BeagleDependencies()) {
        var dependencies = dependencies
        
        if dependencies.urlBuilder.baseUrl == nil {
            dependencies.urlBuilder = UrlBuilder(baseUrl: URL(string: BeagleConfig.baseURL))
        }
        if dependencies.networkClient == nil {
            dependencies.networkClient = NetworkClientDefault()
        }
        if dependencies.logger == nil {
            dependencies.logger = BeagleLoggerDefault()
        }
            
        BeagleConfigurator.setup(dependencies: dependencies)
    }

}
