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

import UIKit

import Beagle
import BeagleGRPC
import BeagleDefaults

import NIO
import GRPC

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        let dependencies = BeagleDependencies()
        Beagle.dependencies = dependencies

        // Beagle configuration
        let grpcClient = NetworkClientGRPC(
            grpcAddress: "grpc://0.0.0.0:50051",
            customHttpClient: NetworkClientDefault(dependencies: dependencies),
            defaultCallOptions: CallOptions(timeLimit: .timeout(.seconds(10))),
            interceptors: NetworkInterceptor()
        )
        dependencies.logger = BeagleLoggerDefault()
        dependencies.networkClient = grpcClient
        dependencies.urlBuilder = UrlBuilder(baseUrl: URL(string: "grpc://0.0.0.0:50051"))

        // Presenting a screen
        let screen = BeagleScreenViewController(.remote(.init(url: "/home?name=John%20Doe")))
        let navigation = BeagleNavigationController(rootViewController: screen)

        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = navigation
        window?.makeKeyAndVisible()

        return true
    }
}

// MARK: -

/// gRPC interceptor sample
class NetworkInterceptor: ClientInterceptor<Beagle_ScreenRequest, Beagle_ViewNode> {

    override func send(
        _ part: GRPCClientRequestPart<Beagle_ScreenRequest>,
        promise: EventLoopPromise<Void>?,
        context: ClientInterceptorContext<Beagle_ScreenRequest, Beagle_ViewNode>
    ) {
        if case .message(let request, _) = part {
            print("[INFO]", "getScreen", request.name, request.parameters)
        }
        context.send(part, promise: promise)
    }

    override func receive(
        _ part: GRPCClientResponsePart<Beagle_ViewNode>,
        context: ClientInterceptorContext<Beagle_ScreenRequest, Beagle_ViewNode>
    ) {
        if case .end(let status, _) = part, status != .ok {
            print("[ERROR]", status)
        }
        context.receive(part)
    }

    override func errorCaught(
        _ error: Error,
        context: ClientInterceptorContext<Beagle_ScreenRequest, Beagle_ViewNode>
    ) {
        print("[ERROR]", error)
        context.errorCaught(error)
    }
}

extension NetworkInterceptor: Beagle_ScreenServiceClientInterceptorFactoryProtocol {
    func makegetScreenInterceptors() -> [ClientInterceptor<Beagle_ScreenRequest, Beagle_ViewNode>] {
        return [self]
    }
}
