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
import SnapshotTesting
import Beagle
@testable import BeagleDefaults

final class HttpRequestBuilderTest: XCTestCase {

    let sut = HttpRequestBuilder()

    func testBuilder() {
        let builders = buildAllUrls()
        assertSnapshot(matching: builders, as: .dump)
    }

    // swiftlint:disable force_unwrapping
    private func buildAllUrls() -> [TestData] {

        let httpData = HttpAdditionalData(
            method: .post,
            headers: ["header": "header"],
            body: nil
        )
        let datas = [nil, httpData]

        let url = URL(string: "scheme://baseUrl/")!

        var builders = [TestData]()
        var count = 0
        
        datas.forEach { data in
            count += 1
            let result = sut.build(url: url, additionalData: data)

            builders.append(TestData(
                testNumber: count,
                parameters: .init(url: url, data: data),
                result: result
            ))
        }
        
        return builders
    }

    private struct TestData: AnySnapshotStringConvertible {

        static var renderChildren = true
        var snapshotDescription: String { return "" }

        let testNumber: Int
        let parameters: Parameters
        let result: HttpRequestBuilder.Result

        struct Parameters {
            let url: URL
            let data: HttpAdditionalData?
        }
    }
}
