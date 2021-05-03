package br.com.zup.service

import br.com.zup.beagle.widget.layout.ScreenBuilder
import br.com.zup.grpc.BeagleScreenService
import br.com.zup.screen.SplashScreen
import br.com.zup.screen.HomeScreen
import javax.inject.Singleton

@Singleton
class MyBeagleAppService: BeagleScreenService() {
    override fun screens(): Map<String, (String) -> ScreenBuilder> {
        return mapOf(
            "splash" to { SplashScreen },
            "home" to { params -> HomeScreen(params) }
        )
    }
}