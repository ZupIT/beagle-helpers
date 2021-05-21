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
import NIO
import NIOHPACK

extension ClientCall {
    /// A dictionary combining `initialMetadata` and `trailingMetadata`,
    /// for any duplicate keys the latter takes precedence.
    var headers: EventLoopFuture<[String: String]> {
        initialMetadata.and(trailingMetadata).map { initial, trailing -> [String: String] in
            var headers = [String: String]()
            let merge = { (name, value, _: HPACKIndexing) in
                headers[name] = value
            }
            initial.forEach(merge)
            trailing.forEach(merge)
            return headers
        }
    }
}

// MARK: - Cancel request

extension UnaryCall: RequestToken {
    public func cancel() {
        cancel(promise: nil)
    }
}
