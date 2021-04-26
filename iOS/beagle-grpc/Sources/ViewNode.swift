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

extension Beagle_ViewNode {

    func jsonData(
        _ options: JSONSerialization.WritingOptions = []
    ) throws -> Data {
        return try JSONSerialization.data(
            withJSONObject: dictionary(),
            options: options
        )
    }

    // MARK: - ViewNode mapping

    private func dictionary() throws -> [String: Any] {
        var dictionary: [String: Any] = [
            "_beagleComponent_": beagleComponent,
            "children": try children.map { try $0.dictionary() }
        ]
        if id.isEmpty == false {
            dictionary["id"] = id
        }
        if hasContext {
            dictionary["context"] = try context.dictionary()
        }
        if hasChild {
            dictionary["child"] = try child.dictionary()
        }
        if let styleObject = try style.jsonObjectFromJsonString() {
            dictionary["style"] = styleObject
        }
        if let attributesObject = try attributes.jsonObjectFromJsonString() as? [String: Any] {
            dictionary.merge(attributesObject) { current, _ in current }
        }
        return dictionary
    }
}

extension Beagle_DataContext {

    // MARK: - DataContext mapping

    fileprivate func dictionary() throws -> [String: Any] {
        var contextDictionary: [String: Any] = ["id": id]
        if let valueObject = try value.jsonObjectFromJsonString() {
            contextDictionary["value"] = valueObject
        }
        return contextDictionary
    }
}

// MARK: - Handle JSON strings

extension String {
    fileprivate func jsonObjectFromJsonString() throws -> Any? {
        if !isEmpty, let data = data(using: .utf8) {
            return try JSONSerialization.jsonObject(with: data, options: .fragmentsAllowed)
        }
        return nil
    }
}
