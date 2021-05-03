package br.com.zup.grpcbff.service

import br.com.zup.beagle.widget.layout.ScreenBuilder
import br.com.zup.grpc.BeagleHeadersInterceptor
import br.com.zup.grpc.BeagleScreenService
import net.devh.boot.grpc.server.service.GrpcService
import br.com.zup.grpcbff.screen.HomeScreen
import br.com.zup.grpcbff.screen.SplashScreen

@GrpcService(interceptors = [BeagleHeadersInterceptor::class])
class MyBeagleAppService: BeagleScreenService() {
    override fun screens(): Map<String, (String) -> ScreenBuilder> {
        return mapOf(
            "home" to { params -> HomeScreen(params) },
            "splash" to { SplashScreen },
        )
    }
}