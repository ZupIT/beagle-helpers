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

public class BeagleScaffoldDemoViewController: UIViewController {
    public override func viewDidLoad() {
        super.viewDidLoad()
        
        let beagleView = BeagleView(.remote(.init(url: "localhost:8080/sample")))
        beagleView.translatesAutoresizingMaskIntoConstraints = false
        
        let anchors = [
            beagleView.topAnchor.constraint(equalTo: view.topAnchor),
            beagleView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            beagleView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            beagleView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
        ]
        
        NSLayoutConstraint.activate(anchors)
    }
}
