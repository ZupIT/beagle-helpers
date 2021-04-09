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
@testable import BeagleGRPC

class ViewNodeTests: XCTestCase {

    func testJsonData() throws {
        // Given, When
        let data = try screenViewNode.jsonData([.sortedKeys, .prettyPrinted])
        // Then
        let json = try XCTUnwrap(String(data: data, encoding: .utf8))
        XCTAssertEqual(json,
            """
            {
              "_beagleComponent_" : "beagle:screencomponent",
              "child" : {
                "_beagleComponent_" : "beagle:container",
                "children" : [
                  {
                    "_beagleComponent_" : "beagle:text",
                    "children" : [

                    ],
                    "id" : "txt",
                    "style" : {
                      "margin" : {
                        "all" : {
                          "type" : "REAL",
                          "value" : 10
                        }
                      }
                    },
                    "text" : "context: @{context}"
                  }
                ],
                "context" : {
                  "id" : "context",
                  "value" : 42
                },
                "style" : {
                  "padding" : {
                    "all" : {
                      "type" : "REAL",
                      "value" : 20
                    }
                  }
                }
              },
              "children" : [

              ]
            }
            """
        )
    }

    // MARK: -

    private var screenViewNode: Beagle_ViewNode {
        var screen = Beagle_ViewNode()
        screen.beagleComponent = "beagle:screencomponent"
        screen.child = containerViewNode
        return screen
    }

    private var containerViewNode: Beagle_ViewNode {
        var container = Beagle_ViewNode()
        container.beagleComponent = "beagle:container"
        container.context.id = "context"
        container.context.value = "42"
        container.children = [textViewNode]
        container.style = #"{"padding":{"all":{"value":20,"type":"REAL"}}}"#
        container.attributes = #"{"context":"ignored"}"#
        return container
    }

    private var textViewNode: Beagle_ViewNode {
        var text = Beagle_ViewNode()
        text.beagleComponent = "beagle:text"
        text.id = "txt"
        text.style = #"{"margin":{"all":{"value":10,"type":"REAL"}}}"#
        text.attributes = #"{"text":"context: @{context}"}"#
        return text
    }

}
