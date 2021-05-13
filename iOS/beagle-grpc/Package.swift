// swift-tools-version:5.2

import PackageDescription

let package = Package(
    name: "beagle-grpc",
    platforms: [
        .iOS(.v10),
    ],
    products: [
        .library(name: "BeagleGRPC", targets: ["BeagleGRPC"]),
    ],
    dependencies: [
        .package(
            name: "Beagle",
            url: "https://github.com/ZupIT/beagle.git",
            from: "1.7.0"),
        .package(
            url: "https://github.com/grpc/grpc-swift.git",
            from: "1.0.0"),
    ],
    targets: [
        .target(
            name: "BeagleGRPC",
            dependencies: [
                .product(name: "Beagle", package: "Beagle"),
                .product(name: "GRPC", package: "grpc-swift"),
            ],
            path: "Sources"),
        .testTarget(
            name: "BeagleGRPCTests",
            dependencies: ["BeagleGRPC"],
            path: "Tests"),
    ]
)
