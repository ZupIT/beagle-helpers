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

class BeagleConfig {

    private init() {  }

    static func start() {

        let validator = ValidatorProviding()

        let dependencies = BeagleDependencies()
        dependencies.navigation.defaultAnimation = .init(
            pushTransition: .init(type: .fade, subtype: .fromRight, duration: 0.1),
            modalPresentationStyle: .formSheet
        )
        
        dependencies.validatorProvider = validator
        dependencies.isLoggingEnabled = true

        let innerDependencies = InnerDependencies()
        dependencies.networkClient = NetworkClientDefault(dependencies: innerDependencies)
        dependencies.cacheManager = CacheManagerDefault(dependencies: innerDependencies)
        dependencies.logger = innerDependencies.logger

        Beagle.dependencies = dependencies
    }
}

class InnerDependencies: DependencyLogger {
    var logger: BeagleLoggerType = BeagleLoggerDefault()
}
